import React, { useState, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import { ChatMessage } from "../ChatHistory/ChatHistory";
import { ChatResponseManager } from "../ChatResponse/ChatResponseManager";
import { ChatConfig, CommandName } from "../../utils/utils";
import { ChromeTabs } from "../types";

export const PromptForm: React.FC<{
  history: ChatMessage[];
  setHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  chromeTabs: ChromeTabs;
}> = React.memo((props) => {
  const [prompt, setPrompt] = useState<string>("");
  const [sendButtonEnabled, setSendButtonEnabled] = useState<boolean>(true);
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const handlePromptChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(event.target.value);
      if (event.target.value.length > 0) {
        setSendButtonEnabled(false);
      } else {
        setSendButtonEnabled(true);
      }
    },
    []
  );
  const handleSubmit = () => {
    const textArea: HTMLTextAreaElement = document.getElementById(
      "promptTextArea"
    )! as HTMLTextAreaElement;

    ChatConfig.titleAndUrlList.forEach(async (item) => {
      if (props.chromeTabs[item.title]) {
        const responseArea = document.getElementById(`${item.title}Response`);
        if (responseArea !== null) {
          responseArea.innerHTML = "";
        }

        chrome.tabs.sendMessage(
          props.chromeTabs[item.title]!.id!,
          {
            command: CommandName.Prompt,
            prompt: textArea.value,
          },
          (_response) => {}
        );
      }
    });
    setProcessing(true);
    props.setHistory(
      [
        {
          prompt: textArea.value,
          date: new Date().toUTCString(),
          response: "",
        } as ChatMessage,
      ].concat(props.history)
    );
    setPrompt("");
  };

  return (
    <>
      <div>Input prompt</div>
      <div style={{ display: "flex" }}>
        <Form.Control
          as="textarea"
          id="promptTextArea"
          value={prompt}
          rows={5}
          onChange={handlePromptChange}
          style={{
            marginBottom: "10px",
            backgroundColor: "#343a40",
            color: "white",
          }}
        />
        <Button
          variant="dark"
          onClick={handleSubmit}
          style={{ width: 100 }}
          disabled={sendButtonEnabled}
        >
          Send
        </Button>
      </div>
      <div
        style={{
          textAlign: "left",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        Response
      </div>
      <ChatResponseManager
        isProcessing={isProcessing}
        setProcessing={setProcessing}
        chromeTabs={props.chromeTabs}
      />
    </>
  );
});
