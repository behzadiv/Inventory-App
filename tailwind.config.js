module.exports = {
  content: ["./public/**/*.html"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
