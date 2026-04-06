import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // 支援的語言
  locales: ["en", "zh-TW"],
  // 預設語言
  defaultLocale: "en",
});