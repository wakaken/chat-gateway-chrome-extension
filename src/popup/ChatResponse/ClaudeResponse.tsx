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

export const ClaudeResponse: React.FC<{
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
        if (request.serviceName === ServiceName.Claude) {
          props.updateLoadingState(ServiceName.Claude, false);
          await delay(delayTimeToWaitForEnablingButton);

          const responseArea = document.getElementById(
            `${ServiceName.Claude}Response`
          ) as HTMLDivElement;
          responseArea.innerHTML = request.chatResponse as string;
          sendResponse({ message: Status.Ok });
        }
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    props.updateLoadingState(ServiceName.Claude, false);

    if (props.chromeTabs[ServiceName.Claude]) {
      chrome.tabs.sendMessage(
        props.chromeTabs[ServiceName.Claude]!.id!,
        { command: CommandName.Cancel },
        (_response) => {}
      );
    }
  };

  return (
    <>
      <ResponseTitle serviceName={ServiceName.Claude} />
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
            id={`${ServiceName.Claude}Response`}
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
