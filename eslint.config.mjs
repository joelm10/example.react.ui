import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [...compat.extends("airbnb"), {
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",

    globals: {
      ...globals.browser,
      ...globals.commonjs,
      ...globals.node,
      ...globals.jest,
    },
  },

  rules: {
    "react/no-danger": 0,

    indent: ["error", 4, {
      SwitchCase: 1,
    }],

    "max-len": ["error", {
      code: 140,
      tabWidth: 4,
    }],

    "comma-dangle": ["error", "never"],
    "no-extra-boolean-cast": 0,
    "react/jsx-props-no-spreading": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-indent": 0,
    "react/jsx-indent-props": 0,
    "react/prop-types": "off",

    "react/function-component-definition": [2, {
      namedComponents: ["arrow-function", "function-declaration"],
      unnamedComponents: "arrow-function",
    }],

    "react/jsx-fragments": 0,
    "jsx-a11y/interactive-supports-focus": 0,
    "import/no-cycle": 0,
    "linebreak-style": 0,
    "import/extensions": "off"
  },
}];