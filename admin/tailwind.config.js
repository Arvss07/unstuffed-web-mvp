/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0189BE",
        light_primary: "#7DB9E5",
        drop_primary: "#63A9D6",
        primary_grey: "#EFF4FA",
        light_text: "#8F9BB3",
        drop_bg: "#F5F6FA",
        blue_bg: "#0189BE",
        blue_text: "#0189BE",
      },
    },
  },
  plugins: [],
};
