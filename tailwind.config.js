/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#cdba81",
          secondary: "#e3dbc4",
          accent: "#37cdbe",
          neutral: "#3d4451",
          error: "   #e4b4b4  ",
          success: " #a1ca9f ",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
