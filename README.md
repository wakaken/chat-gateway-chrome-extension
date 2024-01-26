# chat-gateway-chrome-extension

Chrome extension to use the web screens of ChatGPT, Bard, Claude and Copilot at the same time

# Install
1. Clone this repository locally.
2. Install packages.
```sh
yarn install
```
3. Run this extension.
```sh
yarn dev
```
4. Open `chrome://extensions/` in your Chrome browser and enable developer mode.
5. Click `Load unpackaged` and select the folder for the built extension. The folder for the buld extension is `dist`.

# How to use
1. Open popup from Chrome and a small window will open.
2. Click "Open chat window" button and then the main chat-gateway window will open.
3. Cliek "Open Chat Windows" button and then the web screens of ChatGPT, Bard, Claude and Copilot.
4. Input some prompt text in the textarea and click send button.
5. The prompt is sent to the screens and each AI service start generating answer.
6. The answers are sent back to the chat-gateway window and will be displayed in each response area.

# Notes
- Please sign in to each service before using this extension.
- This extension is still under development. New functionality might be added if you have need.

# Todo
- Refactor messy codes
- Store the histories of prompt and answers into local storage
- Implementation of `options.html` for dynamic configuration such as window size, display position and so forth
- Supporting other AI service like Perplexity AI. Let me know if you know some good services.
