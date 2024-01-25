import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { ChatGptResponse } from "./ChatGptResponse";
import { BardResponse } from "./BardResponse";
import { ClaudeResponse } from "./ClaudeResponse";
import { CopilotResponse } from "./CopilotResponse";
import { ChromeTabs, LoadingStates } from "../types";
import { ServiceName } from "../../utils/utils";

export const ChatResponseManager: React.FC<{
  isProcessing: boolean;
  setProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  chromeTabs: ChromeTabs;
}> = React.memo((props) => {
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    [ServiceName.ChatGPT]: false,
    [ServiceName.Bard]: false,
    [ServiceName.Claude]: false,
    [ServiceName.Copilot]: false,
  });

  const updateLoadingState = (key: string, value: boolean) => {
    setLoadingStates((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (props.isProcessing) {
      setLoadingStates({
        [ServiceName.ChatGPT]: true,
        [ServiceName.Bard]: true,
        [ServiceName.Claude]: true,
        [ServiceName.Copilot]: true,
      });
    }
  }, [props.isProcessing]);

  /*
  const [chatGptResponseLoading, setChatGptResponseLoading] =
    useState<boolean>(false);
  const [bardResponseLoading, setBardResponseLoading] =
    useState<boolean>(false);
  const [claudeResponseLoading, setClaudeResponseLoading] =
    useState<boolean>(false);
  const [copilotResponseLoading, setCopilotResponseLoading] =
    useState<boolean>(false);

  useEffect(() => {
    if (props.processing) {
      setChatGptResponseLoading(true);
      setBardResponseLoading(true);
      setClaudeResponseLoading(true);
      setCopilotResponseLoading(true);
    }
  }, [props.processing]);
  */

  useEffect(() => {
    if (
      !loadingStates[ServiceName.ChatGPT] &&
      !loadingStates[ServiceName.Bard] &&
      !loadingStates[ServiceName.Claude] &&
      !loadingStates[ServiceName.Copilot]
    ) {
      props.setProcessing(false);
    }
  });

  return (
    <>
      <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Col style={{ border: "1px solid white" }}>
          <ChatGptResponse
            loadingState={loadingStates[ServiceName.ChatGPT]}
            updateLoadingState={updateLoadingState}
            chromeTabs={props.chromeTabs}
          />
        </Col>
        <Col style={{ border: "1px solid white" }}>
          <BardResponse
            loadingState={loadingStates[ServiceName.Bard]}
            updateLoadingState={updateLoadingState}
            chromeTabs={props.chromeTabs}
          />
        </Col>
      </Row>
      <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Col style={{ border: "1px solid white" }}>
          <ClaudeResponse
            loadingState={loadingStates[ServiceName.Claude]}
            updateLoadingState={updateLoadingState}
            chromeTabs={props.chromeTabs}
          />
        </Col>
        <Col style={{ border: "1px solid white" }}>
          <CopilotResponse
            loadingState={loadingStates[ServiceName.Copilot]}
            updateLoadingState={updateLoadingState}
            chromeTabs={props.chromeTabs}
          />
        </Col>
      </Row>
    </>
  );
});
