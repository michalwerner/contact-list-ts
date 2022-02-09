const path = require("path");

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "react-app",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    useJSXTextNode: true,
    project: path.resolve(__dirname, "./tsconfig.json"),
    tsconfigRootDir: __dirname,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        paths: ["src"],
      },
    },
  },
  rules: {
    "prettier/prettier": 1,

    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": [
      2,
      { devDependencies: ["**/*.test.ts"] },
    ],
    "arrow-body-style": 1,
    "no-nested-ternary": 0,

    "react/prop-types": 0,

    "@typescript-eslint/consistent-type-imports": [
      1,
      { prefer: "type-imports" },
    ],
  },
};
