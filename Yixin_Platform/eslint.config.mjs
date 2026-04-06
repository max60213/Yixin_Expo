import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // 將 any 類型從錯誤降級為警告
      "@typescript-eslint/no-explicit-any": "warn",
      // 將未使用變數從錯誤降級為警告
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];

export default eslintConfig;
