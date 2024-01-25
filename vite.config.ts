import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Chat Gateway",
  version: "1.0.0",
  permissions: ["tabs", "activeTab", "storage"],
  action: {
    default_title: "GPT Automation",
    default_popup: "src/popup/popup.html",
  },
  /* TODO options.htm will be implemented for configuration.
  options_ui: {
    page: "options.html",
    open_in_tab: false,
  },*/
  content_scripts: [
    {
      matches: ["https://bard.google.com/*"],
      js: ["src/content/bard.ts"],
    },
    {
      matches: ["https://chat.openai.com/*"],
      js: ["src/content/chatgpt.ts"],
    },
    {
      matches: ["https://claude.ai/*"],
      js: ["src/content/claude.ts"],
    },
    {
      matches: ["https://copilot.microsoft.com/*"],
      js: ["src/content/copilot.ts"],
    },
  ],
});

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  server: {
    port: 5174,
    strictPort: true,
    hmr: {
      port: 5174,
    },
  },
});
