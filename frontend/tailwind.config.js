/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      header: ["Sigmar"],
      hand: ['"Nothing You Could Do"'],
      body: ["Karla"],
    },
    colors: {
      light: "#fbfcfd",
      error: "#e33535",
      succes: "#2ad555",
      daysky: {
        50: "#eefcfd",
        100: "#d4f5f9",
        200: "#afeaf2",
        300: "#77d9e9",
        400: "#51c7dc", // 400 is main
        500: "#1da3bd",
        600: "#1b839f",
        700: "#1d6a81",
        800: "#20576a",
        900: "#1f495a",
        950: "#0f2f3d",
      },
      nightsky: {
        50: "#ecebff",
        100: "#dbdaff",
        200: "#c2bdff",
        300: "#a095ff",
        400: "#886bff",
        500: "#7b49ff",
        600: "#7529ff",
        700: "#681ee4",
        800: "#541bb8",
        900: "#451f90",
        950: "#200e40", // 950 is main
      },
      acc: {
        50: "#fef5fd",
        100: "#fdeafa",
        200: "#f9d5f3",
        300: "#f4b3e6",
        400: "#ec86d4", // Hover
        500: "#dd58bc",
        600: "#b0338f", // 600 is main
        700: "#a02b7f",
        800: "#832567",
        900: "#6c2355",
        950: "#460c33",
      },
    },
    extend: {},
  },
  plugins: [],
};
