import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["*/.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      sourceType: "module",
      ecmaVersion: "latest"
    },
    plugins: {
      react: pluginReact
    },
    rules: {
      ...js.configs.recommended.rules
    }
  },

  {
    files: ["*/.js"],
    languageOptions: {
      sourceType: "script"
    }
  },

  pluginReact.configs.flat.recommended
];