/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Clean white theme colors - Professional research paper aesthetic
        "paper-white": "#ffffff",
        "text-primary": "#1a1a1a",
        "text-secondary": "#666666",
        "accent-blue": "#3498db",
        "accent-green": "#2ecc71",
        "accent-red": "#e74c3c",
        "accent-orange": "#f39c12",
        primary: {
          50: "#ebf5fb",
          100: "#d6eaf8",
          200: "#aed6f1",
          300: "#85c1e9",
          400: "#5dade2",
          500: "#3498db",
          600: "#2e86c1",
          700: "#2874a6",
          800: "#21618c",
          900: "#1b4f72",
        },
      },
    },
  },
  plugins: [],
};
