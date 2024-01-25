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
  const lang = document.querySelector("html")?.getAttribute("lang");
  return document.querySelector(
    lang === "en-US"
      ? '[aria-label="Stop generating"]'
      : '[aria-label="生成を停止する"]'
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
      const promptTextArea: HTMLTextAreaElement = document.querySelector(
        "#prompt-textarea"
      ) as HTMLTextAreaElement;
      promptTextArea.focus();
      const promptMessage: string = request.prompt;
      promptTextArea.textContent = promptMessage;
      promptTextArea.value = promptMessage;
      promptTextArea.dispatchEvent(new Event("input", { bubbles: true }));
      promptTextArea.dispatchEvent(new Event("change", { bubbles: true }));
      sendResponse({
        command: CommandName.Prompt,
        serviceName: ServiceName.ChatGPT,
        status: Status.Ok,
      });

      await delay(delayTimeToWaitForEnablingButton);

      const sendButton = document.querySelectorAll(
        '[data-testid="send-button"]'
      )[0] as HTMLButtonElement;
      sendButton.focus();
      sendButton.click();

      const startTimerToWatchCompletion = () => {
        intervalId = setInterval(async () => {
          // If the stop generation button is hidden, the answer is considered complete.
          if (getStopButton() === null) {
            clearInterval(intervalId!);
            await delay(delayTimeToInsertResponse);

            // Since the answer is contained in the div tag with the attribute data-message-author-role="assistant",
            // send the contents of the last div tag using sendResponse.
            const resopnseNodeList = document.querySelectorAll(
              '[data-message-author-role="assistant"]'
            );
            const chatResponse =
              resopnseNodeList[resopnseNodeList.length - 1].querySelector(
                "div"
              );

            chrome.runtime.sendMessage(
              {
                serviceName: ServiceName.ChatGPT,
                chatResponse: chatResponse?.innerHTML,
              },
              (_response) => {}
            );
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
        serviceName: ServiceName.ChatGPT,
      });
    }
  }
);

export {};
