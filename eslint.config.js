import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/prop-types": "off",
      "react/jsx-key": "off",
      "no-undef": "off",
    }
  }
];
