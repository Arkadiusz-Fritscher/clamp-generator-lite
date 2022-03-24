module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:vue/vue3-strongly-recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    quotes: "off",
    semi: ["error", "always"],
    "comma-dangle": ["error", "only-multiline"],
  },
};
