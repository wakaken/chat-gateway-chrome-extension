import React, { useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import {
  delay,
  ChatAIResponseAreaSize,
  CommandName,
  ServiceName,
  Status,
  delayTimeToWaitForEnablingButton,
} from "../../utils/utils";
import { ChromeTabs } from "../types";
import { ResponseTitle } from "../components/ResponseTitle";

export const CopilotResponse: React.FC<{
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
        if (request.serviceName === ServiceName.Copilot) {
          props.updateLoadingState(ServiceName.Copilot, false);
          await delay(delayTimeToWaitForEnablingButton);

          const responseArea = document.getElementById(
            `${ServiceName.Copilot}Response`
          ) as HTMLDivElement;
          responseArea.innerHTML = request.chatResponse as string;
          sendResponse({ message: Status.Ok });
        }
      });
    })();
  }, []);

  const handleCancel = () => {
    props.updateLoadingState(ServiceName.Copilot, false);

    if (props.chromeTabs[ServiceName.Copilot]) {
      chrome.tabs.sendMessage(
        props.chromeTabs[ServiceName.Copilot]!.id!,
        { command: CommandName.Cancel },
        (_response) => {}
      );
    }
  };
  return (
    <>
      <ResponseTitle serviceName={ServiceName.Copilot} />
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
            id={`${ServiceName.Copilot}Response`}
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
