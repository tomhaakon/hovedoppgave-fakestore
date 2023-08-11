/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#6e36a5",
          secondary: "#0a7f73",
          accent: "#b2db72",
          neutral: "#1e1e29",
          "base-100": "#ecedef",
          info: "#439cef",
          success: "#1ab798",
          warning: "#91630d",
          error: "#f83034",
          black: "#f0f0f0",
        },
      },
    ],
  },
};
