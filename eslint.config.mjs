import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["**/node_modules/**", "**/dist/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,jsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Workshop uses plain React without PropTypes
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
]);
