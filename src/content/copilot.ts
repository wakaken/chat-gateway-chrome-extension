import {
  delay,
  CommandName,
  ServiceName,
  Status,
  delayTimeToWaitForEnablingButton,
  intervalToCheckResponse,
  delayTimeToInsertResponse,
} from "../utils/utils";

let intervalId: number | null = null;
const getStopButton = () => {
  return document
    .querySelector("#b_sydConvCont > cib-serp")
    ?.shadowRoot?.querySelector("#cib-action-bar-main")
    ?.shadowRoot?.querySelector("div > cib-typing-indicator")
    ?.shadowRoot?.querySelector(
      "#stop-responding-button"
    ) as HTMLButtonElement | null;
};

chrome.runtime.onMessage.addListener(
  async (
    request: any,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: any) => void
  ) => {
    if (request.command === CommandName.Prompt) {
      window.focus();

      const promptTextArea: HTMLTextAreaElement = document
        .querySelector("#b_sydConvCont > cib-serp")!
        .shadowRoot!.querySelector("#cib-action-bar-main")!
        .shadowRoot!.querySelector(
          "div > div.main-container > div > div.input-row > cib-text-input"
        )!
        .shadowRoot!.querySelector("#searchbox")!;
      promptTextArea.focus();
      const promptMessage: string = request.prompt;
      promptTextArea.textContent = promptMessage;
      promptTextArea.value = promptMessage;
      promptTextArea.dispatchEvent(new Event("input", { bubbles: true }));
      promptTextArea.dispatchEvent(new Event("change", { bubbles: true }));
      sendResponse({ status: Status.Ok, serviceName: ServiceName.Copilot });

      await delay(delayTimeToWaitForEnablingButton);

      const sendButton = document
        .querySelector("#b_sydConvCont > cib-serp")!
        .shadowRoot!.querySelector("#cib-action-bar-main")!
        .shadowRoot!.querySelector(
          "div > div.main-container > div > div.bottom-controls > div.bottom-right-controls > div.control.submit > button"
        )! as HTMLButtonElement;
      sendButton.click();

      const startTimerToWatchCompletion = () => {
        intervalId = setInterval(async () => {
          const stopButton = getStopButton();
          // If the generation stop button is disabled, the answer is considered complete.
          if (stopButton && stopButton.disabled) {
            clearInterval(intervalId!);
            await delay(delayTimeToInsertResponse);

            const cibChatTurnNodeList = document
              .querySelector("#b_sydConvCont > cib-serp")
              ?.shadowRoot?.querySelector("#cib-conversation-main")
              ?.shadowRoot?.querySelectorAll("#cib-chat-main > cib-chat-turn");

            if (cibChatTurnNodeList) {
              const cibChatTurnLastNode =
                cibChatTurnNodeList[cibChatTurnNodeList.length - 1];
              const cibMessageNodeList = cibChatTurnLastNode.shadowRoot
                ?.querySelector("cib-message-group.response-message-group")
                ?.shadowRoot?.querySelectorAll("cib-message");

              if (cibMessageNodeList) {
                const cibMessageLastNode =
                  cibMessageNodeList[cibMessageNodeList.length - 1];
                const chatResponse =
                  cibMessageLastNode.shadowRoot?.querySelector(
                    "cib-shared > div > div > div.ac-textBlock"
                  );
                chrome.runtime.sendMessage(
                  {
                    serviceName: ServiceName.Copilot,
                    chatResponse: chatResponse?.innerHTML,
                  },
                  (_response) => {}
                );
              }
            }
          }
        }, intervalToCheckResponse);
      };
      startTimerToWatchCompletion();
    } else if (request.command === CommandName.Cancel) {
      if (intervalId === null) {
        return;
      }

      clearInterval(intervalId);
      const stopButton = getStopButton();
      if (stopButton !== null) {
        stopButton.click();
      }

      sendResponse({
        status: Status.Ok,
        command: CommandName.Cancel,
        serviceName: ServiceName.Copilot,
      });
    }
  }
);

export {};
