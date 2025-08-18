import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import js from "@eslint/js";
import pluginTestingLibrary from "eslint-plugin-testing-library";
import pluginJestDom from "eslint-plugin-jest-dom";
import pluginJest from "eslint-plugin-jest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  js.configs.recommended,

  ...compat.extends([
    "next/core-web-vitals",
    "next/typescript",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
    "plugin:jest/recommended",
  ]),

  {
    plugins: {
      "testing-library": pluginTestingLibrary,
      "jest-dom": pluginJestDom,
      jest: pluginJest,
    },
    languageOptions: {
      globals: {
        jest: true,
        describe: true,
        it: true,
        expect: true,
      },
    },
    rules: {
      // optional: relax rules in tests
      "react-hooks/rules-of-hooks": "off",
      "testing-library/no-unnecessary-act": "off",
    },
  },
];
