import React, { useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { delay, delayTimeToWaitForEnablingButton } from "../../utils/utils";
import {
  ChatAIResponseAreaSize,
  CommandName,
  ServiceName,
  Status,
} from "../../utils/utils";
import { ChromeTabs } from "../types";

export const BardResponse: React.FC<{
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
        if (request.serviceName === ServiceName.Bard) {
          props.updateLoadingState(ServiceName.Bard, false);
          await delay(delayTimeToWaitForEnablingButton);

          const responseArea = document.getElementById(
            `responseOfBard`
          ) as HTMLDivElement;
          responseArea.innerHTML = request.chatResponse as string;
          sendResponse({ message: Status.Ok });
        }
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    props.updateLoadingState(ServiceName.Bard, false);

    if (props.chromeTabs[ServiceName.Bard]) {
      chrome.tabs.sendMessage(
        props.chromeTabs[ServiceName.Bard]!.id!,
        { command: CommandName.Cancel },
        (_response) => {}
      );
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", fontWeight: "bold" }}>Bard</div>
      {props.loadingState ? (
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
      ) : (
        <div
          id="responseOfBard"
          style={{
            paddingTop: "10px",
            overflowY: "auto",
            height: ChatAIResponseAreaSize.height,
          }}
        ></div>
      )}
    </>
  );
});
