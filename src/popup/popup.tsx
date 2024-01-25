import React from "react";
import ReactDOM from "react-dom/client";
import { ChatGatewayWindowSize } from "../utils/utils";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./popup.css";

export const Popup = () => {
  const openPopup = () => {
    window.open(
      chrome.runtime.getURL("src/popup/index.html"),
      "_blank",
      `popup,width=${ChatGatewayWindowSize.width},height=${ChatGatewayWindowSize.height}`
    );
  };

  return (
    <>
      <div className="popup">
        <div style={{ textAlign: "center" }}>
          <Button variant="secondary" onClick={openPopup} id="sendPromptButton">
            Open chat window
          </Button>
        </div>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
