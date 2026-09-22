import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "wowdash-next-shadcn-typescript/**",
  ]),
  {
    // Ported UI component library (see docs/decisions for provenance): idiomatic
    // mount-guard effects and localStorage sync predate the React Compiler
    // purity rules and aren't bugs in code we authored. Code under src/app,
    // src/features and src/lib keeps full strict linting.
    files: ["src/components/**/*.{ts,tsx}", "src/hooks/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
    },
  },
]);

export default eslintConfig;
