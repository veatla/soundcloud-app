const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

    "./app/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/js/**/*.js",
  ],

  theme: {
    extend: {
      fontSize: {
        h1: ["3rem", { lineHeight: "1.2" }], // Font size 'h1' with line height '1.2'
        "body-lg": ["1.125rem", { lineHeight: "1.75rem" }], // Font size 'body-lg' with a specific line height in rem
      },
    },
  },
  plugins: [],
};

export default config;
