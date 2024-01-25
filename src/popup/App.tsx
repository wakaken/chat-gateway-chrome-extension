import "./App.css";
import React, { useState, useCallback } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChatMessage, ChatHistory } from "./ChatHistory/ChatHistory";
import { PromptForm } from "./PromptForm/PromptForm";
import { ChatConfig, ChatAIWindowSize } from "../utils/utils";
import { ChatItemProps, ChromeTabs } from "./types";

export const ChatItem: React.FC<ChatItemProps> = ({ prompt, onSelect }) => (
  <div
    onClick={onSelect}
    style={{ cursor: "pointer", padding: "10px", color: "white" }}
  >
    {prompt.slice(0, 10)}...
  </div>
);

export const App: React.FC = () => {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [chromeTabs, setChromeTabs] = useState<ChromeTabs>({
    ChatGPT: undefined,
    Bard: undefined,
    Claude: undefined,
    Copilot: undefined,
  });

  const handleOpenWindow = useCallback(() => {
    ChatConfig.titleAndUrlList.forEach(async (item) => {
      chrome.tabs.query(
        {
          title: item.title,
        },
        (tabs) => {
          if (tabs.length == 0) {
            const browserWindow: chrome.windows.CreateData = {
              focused: true,
              left: item.left,
              top: item.top,
              width: ChatAIWindowSize.width,
              height: ChatAIWindowSize.height,
              type: "popup",
              url: item.url,
            };

            chrome.windows.create(browserWindow, (windowObject) => {
              chromeTabs[item.title] = windowObject!.tabs![0];
              setChromeTabs(chromeTabs);
            });
          }
        }
      );
    });
  }, [chromeTabs]);

  return (
    <Container
      fluid
      style={{
        backgroundColor: "#121212",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Row>
        <ChatHistory history={history} />
        <Col xs={10}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                paddingTop: 10,
                paddingRight: 10,
                textAlign: "left",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Chat Gateway
            </div>
            <Button
              variant="dark"
              onClick={handleOpenWindow}
              style={{ marginTop: 10 }}
            >
              Open Chat Windows
            </Button>
          </div>
          <PromptForm
            history={history}
            setHistory={setHistory}
            chromeTabs={chromeTabs}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
