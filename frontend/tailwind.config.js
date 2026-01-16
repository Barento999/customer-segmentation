/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Clean white theme colors - Professional research paper aesthetic
        "paper-white": "#ffffff",
        "text-primary": "#1a1a1a",
        "text-secondary": "#64748b",
        "accent-blue": "#3b82f6",
        "accent-purple": "#8b5cf6",
        "accent-green": "#10b981",
        "accent-red": "#ef4444",
        "accent-orange": "#f59e0b",
        "accent-gray": "#64748b",
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
    },
  },
  plugins: [],
};
