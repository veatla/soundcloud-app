import { globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextConfig from "eslint-config-next";

export default tseslint.config([
  nextConfig,
  nextVitals,
  globalIgnores(["dist", ".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
