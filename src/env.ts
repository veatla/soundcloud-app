import { loadEnvConfig } from "@next/env";
const projectDir = process.cwd();
loadEnvConfig(projectDir);
export const ENV = {
  VITE_APP_SOUNDCLOUD_CLIENT_ID: process.env["VITE_APP_SOUNDCLOUD_CLIENT_ID"]!,
  VITE_APP_SOUNDCLOUD_CLIENT_SECRET: process.env["VITE_APP_SOUNDCLOUD_CLIENT_SECRET"]!,
  VITE_APP_SOUNDCLOUD_REDIRECT_URL: process.env["VITE_APP_SOUNDCLOUD_REDIRECT_URL"]!,
};
