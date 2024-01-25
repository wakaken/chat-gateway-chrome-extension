// vite.config.ts
import { defineConfig } from "file:///Users/waka/chrome-extension/chat-gateway-chrome-extension/node_modules/vite/dist/node/index.js";
import react from "file:///Users/waka/chrome-extension/chat-gateway-chrome-extension/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { crx, defineManifest } from "file:///Users/waka/chrome-extension/chat-gateway-chrome-extension/node_modules/@crxjs/vite-plugin/dist/index.mjs";
var manifest = defineManifest({
  manifest_version: 3,
  name: "Chat Gateway",
  version: "1.0.0",
  permissions: ["tabs", "activeTab", "storage"],
  action: {
    default_title: "GPT Automation",
    default_popup: "src/popup/popup.html"
  },
  /* TODO options.htm will be implemented for configuration.
  options_ui: {
    page: "options.html",
    open_in_tab: false,
  },*/
  content_scripts: [
    {
      matches: ["https://bard.google.com/*"],
      js: ["src/content/bard.ts"]
    },
    {
      matches: ["https://chat.openai.com/*"],
      js: ["src/content/chatgpt.ts"]
    },
    {
      matches: ["https://claude.ai/*"],
      js: ["src/content/claude.ts"]
    },
    {
      matches: ["https://copilot.microsoft.com/*"],
      js: ["src/content/copilot.ts"]
    }
  ]
});
var vite_config_default = defineConfig({
  plugins: [react(), crx({ manifest })],
  server: {
    port: 5174,
    strictPort: true,
    hmr: {
      port: 5174
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvd2FrYS9jaHJvbWUtZXh0ZW5zaW9uL2NoYXQtZ2F0ZXdheS1jaHJvbWUtZXh0ZW5zaW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvd2FrYS9jaHJvbWUtZXh0ZW5zaW9uL2NoYXQtZ2F0ZXdheS1jaHJvbWUtZXh0ZW5zaW9uL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy93YWthL2Nocm9tZS1leHRlbnNpb24vY2hhdC1nYXRld2F5LWNocm9tZS1leHRlbnNpb24vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgY3J4LCBkZWZpbmVNYW5pZmVzdCB9IGZyb20gXCJAY3J4anMvdml0ZS1wbHVnaW5cIjtcblxuY29uc3QgbWFuaWZlc3QgPSBkZWZpbmVNYW5pZmVzdCh7XG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gIG5hbWU6IFwiQ2hhdCBHYXRld2F5XCIsXG4gIHZlcnNpb246IFwiMS4wLjBcIixcbiAgcGVybWlzc2lvbnM6IFtcInRhYnNcIiwgXCJhY3RpdmVUYWJcIiwgXCJzdG9yYWdlXCJdLFxuICBhY3Rpb246IHtcbiAgICBkZWZhdWx0X3RpdGxlOiBcIkdQVCBBdXRvbWF0aW9uXCIsXG4gICAgZGVmYXVsdF9wb3B1cDogXCJzcmMvcG9wdXAvcG9wdXAuaHRtbFwiLFxuICB9LFxuICAvKiBUT0RPIG9wdGlvbnMuaHRtIHdpbGwgYmUgaW1wbGVtZW50ZWQgZm9yIGNvbmZpZ3VyYXRpb24uXG4gIG9wdGlvbnNfdWk6IHtcbiAgICBwYWdlOiBcIm9wdGlvbnMuaHRtbFwiLFxuICAgIG9wZW5faW5fdGFiOiBmYWxzZSxcbiAgfSwqL1xuICBjb250ZW50X3NjcmlwdHM6IFtcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbXCJodHRwczovL2JhcmQuZ29vZ2xlLmNvbS8qXCJdLFxuICAgICAganM6IFtcInNyYy9jb250ZW50L2JhcmQudHNcIl0sXG4gICAgfSxcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbXCJodHRwczovL2NoYXQub3BlbmFpLmNvbS8qXCJdLFxuICAgICAganM6IFtcInNyYy9jb250ZW50L2NoYXRncHQudHNcIl0sXG4gICAgfSxcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbXCJodHRwczovL2NsYXVkZS5haS8qXCJdLFxuICAgICAganM6IFtcInNyYy9jb250ZW50L2NsYXVkZS50c1wiXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG1hdGNoZXM6IFtcImh0dHBzOi8vY29waWxvdC5taWNyb3NvZnQuY29tLypcIl0sXG4gICAgICBqczogW1wic3JjL2NvbnRlbnQvY29waWxvdC50c1wiXSxcbiAgICB9LFxuICBdLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBjcngoeyBtYW5pZmVzdCB9KV0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDUxNzQsXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICBobXI6IHtcbiAgICAgIHBvcnQ6IDUxNzQsXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnVyxTQUFTLG9CQUFvQjtBQUM3WCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxLQUFLLHNCQUFzQjtBQUVwQyxJQUFNLFdBQVcsZUFBZTtBQUFBLEVBQzlCLGtCQUFrQjtBQUFBLEVBQ2xCLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxFQUNULGFBQWEsQ0FBQyxRQUFRLGFBQWEsU0FBUztBQUFBLEVBQzVDLFFBQVE7QUFBQSxJQUNOLGVBQWU7QUFBQSxJQUNmLGVBQWU7QUFBQSxFQUNqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU1BLGlCQUFpQjtBQUFBLElBQ2Y7QUFBQSxNQUNFLFNBQVMsQ0FBQywyQkFBMkI7QUFBQSxNQUNyQyxJQUFJLENBQUMscUJBQXFCO0FBQUEsSUFDNUI7QUFBQSxJQUNBO0FBQUEsTUFDRSxTQUFTLENBQUMsMkJBQTJCO0FBQUEsTUFDckMsSUFBSSxDQUFDLHdCQUF3QjtBQUFBLElBQy9CO0FBQUEsSUFDQTtBQUFBLE1BQ0UsU0FBUyxDQUFDLHFCQUFxQjtBQUFBLE1BQy9CLElBQUksQ0FBQyx1QkFBdUI7QUFBQSxJQUM5QjtBQUFBLElBQ0E7QUFBQSxNQUNFLFNBQVMsQ0FBQyxpQ0FBaUM7QUFBQSxNQUMzQyxJQUFJLENBQUMsd0JBQXdCO0FBQUEsSUFDL0I7QUFBQSxFQUNGO0FBQ0YsQ0FBQztBQUVELElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQUEsRUFDcEMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osS0FBSztBQUFBLE1BQ0gsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
