export function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 bg-indigo-600 text-white rounded-lg text-sm sm:text-base md:text-lg hover:bg-indigo-700 transition-all duration-200"
    >
      {children}
    </button>
  );
}
