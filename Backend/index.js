import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import axios from "axios";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Configuration
const db = new pg.Client({
  connectionString: 'postgresql://neondb_owner:npg_n5qkVy6fuMdr@ep-curly-river-a5btldv9-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
  ssl: {
    rejectUnauthorized: false,
  },
});

// Connect to PostgreSQL
db.connect()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => {
    console.error("❌ Database connection failed:", err.stack);
    process.exit(1);
  });

// Store logged-in user ID globally
let loggedInUserId = null;

/**
 * 📌 User Login (Plain-text comparison)
 */
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = result.rows[0];
    
    // Skipping password hash check since bcrypt is removed
    if (user.password_hash !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    loggedInUserId = user.id;
    console.log(`✅ User logged in: ${loggedInUserId}`);

    res.status(200).json({
      message: "Login successful",
      user,
      loggedInUserId,
    });
  } catch (error) {
    console.error("❌ Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * 📌 User Registration (Plain-text password)
 */
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const userExists = await db.query("SELECT * FROM users WHERE username = $1", [username]);

    if (userExists.rows.length > 0) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const newUser = await db.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *",
      [username, password]
    );

    res.status(201).json({
      message: "Registration successful",
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error("❌ Error during registration:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * 📌 Get Current User ID
 */
app.get("/current-user", (req, res) => {
  if (loggedInUserId) {
    res.json({ loggedInUserId });
  } else {
    res.status(404).json({ message: "No user logged in" });
  }
});

/**
 * 📜 Get Chapter Summary by Number
 */
const API_HOST = "bhagavad-gita3.p.rapidapi.com";
const API_KEY = "9f6532efefmsh44df7a033084be9p187582jsnc4279017d598";

app.get("/chapter/:chapterNumber", async (req, res) => {
  const { chapterNumber } = req.params;

  try {
    const response = await axios.get(`https://${API_HOST}/v2/chapters/${chapterNumber}/`, {
      headers: {
        "x-rapidapi-host": API_HOST,
        "x-rapidapi-key": API_KEY,
      },
    });

    const data = response.data;

    if (!data || !data.chapter_summary) {
      return res.status(404).json({ error: "❌ Summary not available for this chapter." });
    }

    res.json({
      chapter_number: data.chapter_number,
      name: data.name_translated,
      meaning: data.name_meaning || "Meaning not available",
      summary: data.chapter_summary,
    });
  } catch (error) {
    console.error("❌ Error fetching chapter:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
