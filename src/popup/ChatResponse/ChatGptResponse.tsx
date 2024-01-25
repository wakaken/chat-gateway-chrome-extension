import React, { useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import {
  ChatAIResponseAreaSize,
  CommandName,
  ServiceName,
  Status,
  delay,
  delayTimeToWaitForEnablingButton,
} from "../../utils/utils";
import { ChromeTabs } from "../types";

export const ChatGptResponse: React.FC<{
  loadingState: boolean;
  updateLoadingState: (key: string, state: boolean) => void;
  chromeTabs: ChromeTabs;
}> = React.memo((props) => {
  useEffect(() => {
    (async () => {
      chrome.runtime.onMessage.addListener(async function (
        request,
        _sender,
        sendResponse
      ) {
        if (request.serviceName === ServiceName.ChatGPT) {
          props.updateLoadingState(ServiceName.ChatGPT, false);
          await delay(delayTimeToWaitForEnablingButton);

          const responseArea = document.getElementById(
            `responseOfChatGPT`
          ) as HTMLDivElement;
          if (responseArea !== null) {
            responseArea.innerHTML = request.chatResponse as string;
            sendResponse({ message: Status.Ok });
          }
        }
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    props.updateLoadingState(ServiceName.ChatGPT, false);

    if (props.chromeTabs[ServiceName.ChatGPT]) {
      chrome.tabs.sendMessage(
        props.chromeTabs[ServiceName.ChatGPT]!.id!,
        { command: CommandName.Cancel },
        (_response) => {}
      );
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", fontWeight: "bold" }}>ChatGPT</div>
      {props.loadingState ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: ChatAIResponseAreaSize.height,
            }}
          >
            <Spinner />
            <Button
              style={{ marginTop: 10 }}
              variant="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <div
            id="responseOfChatGPT"
            style={{
              paddingTop: "10px",
              overflowY: "auto",
              height: ChatAIResponseAreaSize.height,
            }}
          ></div>
        </>
      )}
    </>
  );
});
