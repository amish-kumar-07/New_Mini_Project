import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
//import dotenv from "dotenv";  // Load environment variables

const app = express();
const PORT = 5000;

let loggedInUserId = null; // Global variable to store logged-in user ID


// Middleware
app.use(cors());
app.use(bodyParser.json());

const db = new pg.Client({
  user: "postgres",
  host:  "localhost",
  database: "Miniproject",
  password:  "7323001107",
  port:  5432,
});

// Connect to PostgreSQL
db.connect()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => {
    console.error("❌ Database connection failed:", err.stack);
    process.exit(1);
  });

  app.post("/login", async (req, res) => {
    const { name, password } = req.body;
  
    if (!name || !password) {
      return res.status(400).json({ message: "Name and password are required" });
    }
  
    try {
      const result = await db.query(
        "SELECT * FROM users WHERE name = $1 AND password_hash = $2",
        [name, password]
      );
  
      if (result.rows.length === 0) {
        return res.status(401).json({ message: "Invalid name or password" });
      }
  
      loggedInUserId = result.rows[0].id; // Store user ID globally
      console.log(`✅ User logged in: ${loggedInUserId}`);
  
      // Ensure a row exists in the stopwatch table for the user
      await db.query(
        `INSERT INTO stopwatch (id, start_time, elapsed_time, is_running) 
         VALUES ($1, NOW(), 0, FALSE) 
         ON CONFLICT (user_id) DO NOTHING;`,
        [loggedInUserId]
      );
  
      res.status(200).json({ message: "Login successful", user: result.rows[0] });
    } catch (error) {
      console.error("❌ Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
  

// Register route
app.post("/register", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Name and password are required" });
  }

  try {
    const userExists = await db.query("SELECT * FROM users WHERE name = $1", [name]);

    if (userExists.rows.length > 0) {
      return res.status(409).json({ message: "Name already exists" });
    }

    const newUser = await db.query(
      "INSERT INTO users (name, password_hash) VALUES ($1, $2) RETURNING *",
      [name, password]
    );

    return res.status(201).json({
      message: "Registration successful",
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error("❌ Error during registration:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Start Stopwatch
app.post("/start", async (req, res) => {
  if (!loggedInUserId) return res.status(401).send("User not logged in");

  try {
    const result = await db.query(
      `INSERT INTO stopwatch (user_id, start_time, is_running) 
       VALUES ($1, NOW(), TRUE) 
       ON CONFLICT (user_id) 
       DO UPDATE SET start_time = NOW(), is_running = TRUE 
       RETURNING *;`,
      [loggedInUserId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error starting stopwatch");
  }
});

// Stop Stopwatch
app.post("/stop", async (req, res) => {
  if (!loggedInUserId) return res.status(401).send("User not logged in");

  try {
    const result = await db.query(
      `UPDATE stopwatch 
       SET elapsed_time = elapsed_time + EXTRACT(EPOCH FROM (NOW() - start_time)), 
           is_running = FALSE 
       WHERE user_id = $1 
       RETURNING *;`,
      [loggedInUserId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error stopping stopwatch");
  }
});

// Reset Stopwatch
app.post("/reset", async (req, res) => {
  if (!loggedInUserId) return res.status(401).send("User not logged in");

  try {
    await db.query(`UPDATE stopwatch SET elapsed_time = 0, is_running = FALSE WHERE user_id = $1;`, [loggedInUserId]);
    res.send("Stopwatch reset");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error resetting stopwatch");
  }
});

// Get Stopwatch Data
app.get("/status", async (req, res) => {
  if (!loggedInUserId) return res.status(401).send("User not logged in");

  try {
    const result = await db.query(`SELECT * FROM stopwatch WHERE user_id = $1;`, [loggedInUserId]);
    res.json(result.rows[0] || {});
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching stopwatch data");
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
