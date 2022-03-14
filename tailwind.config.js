module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "var(--color-primary)",
      "primary-hover": "var(--color-primary-hover)",
      "primary-focus": "var(--color-primary-focus)",
      error: "var(--color-error)",
      success: "var(--color-success)",
      white: "var(--color-white)",
      headline: "var(--color-headline)",
      lighter: "var(--color-lighter)",
      darker: "var(--color-darker)",
      dark1: "var(--color-dark1)",
      dark2: "var(--color-dark2)",
      dark3: "var(--color-dark3)",
      dark4: "var(--color-dark4)",
      current: "currentColor",
      transparent: "transparent",
      inherit: "inherit",
    },

    fontSize: {
      caption: [
        "var(--text-caption)",
        {
          letterSpacing: "0em",
          lineHeight: "110%",
        },
      ],
      base: [
        "var(--text-base)",
        {
          letterSpacing: "-0.02em",
          lineHeight: "130%",
        },
      ],
      md: [
        "var(--text-md)",
        {
          letterSpacing: "-0.02em",
          lineHeight: "140%",
        },
      ],
      h1: [
        "var(--text-headline)",
        {
          letterSpacing: "-0.03em",
          lineHeight: "140%",
        },
      ],
    },
    extend: {
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};
