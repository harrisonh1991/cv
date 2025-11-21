/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      dt: { min: "1024px" },
      md: { max: "1024px" },
      sm: { max: "640px" },
    },
  },
  plugins: [],
};
