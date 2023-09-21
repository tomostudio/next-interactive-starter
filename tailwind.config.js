module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  media: false,
  theme: {
    fontFamily: {
      sans: ["Arial", "sans-serif"],
      mono: ["Lucida Console", "Courier", "monospace"],
    },
    extend: {
      height: {
        "screen-1/2": "50vh",
      },
      colors: {
        black: "#000",
        white: "#FFF",
        "example-color": {
          light: "#ffb288",
          DEFAULT: "#d18d67",
          dark: "#ce8860",
        },
      },
      transitionProperty: {
        background: "background",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
