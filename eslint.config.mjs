import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier/recommended";

export default {
  languageOptions: {
    globals: globals.browser,
    parserOptions: {
      ecmaVersion: 12,
      sourceType: "module"
    }
  },
  rules: {
    indent: ["error", 2],
    quotes: ["error", "single"],
    semi: ["error", "always"]
  },
  ...pluginJs.configs.recommended,
  ...pluginPrettier
};
