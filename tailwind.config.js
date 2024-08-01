module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      theme: {
        extend: {
          backgroundImage: {
            "ai-background": "url('./src/components/Home/ai.png')",
          },
        },
      },
      colors: {
        primary: "#FFA500", // Orange color
        secondary: "#4A90E2", // Blue color
        beige: "#fdf9f4",
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};
