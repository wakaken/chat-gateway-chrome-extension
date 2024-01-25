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
  return document.querySelector(
    "stop-generating-button > div > button"
  ) as HTMLButtonElement | null;
};

const getNumberOfGoodResponseButtons = () => {
  const lang = document.querySelector("html")?.getAttribute("lang");
  return document.querySelectorAll(
    lang === "en" ? '[aria-label="Good response"]' : '[aria-label="良い回答"]'
  ).length;
};

chrome.runtime.onMessage.addListener(
  async (
    request: any,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: any) => void
  ) => {
    if (request.command === CommandName.Prompt) {
      window.focus();

      const promptInputField = document.querySelectorAll(
        "[role=textbox]"
      )[0] as HTMLDivElement;
      promptInputField.removeChild(promptInputField.childNodes[0]);
      const prompt: string = request.prompt as string;
      const lines = prompt.split("\n");

      for (let i = 0; i < lines.length; i++) {
        const promptTextNode = document.createElement("p");
        promptTextNode.appendChild(document.createTextNode(lines[i]));
        promptInputField.appendChild(promptTextNode);
      }
      sendResponse({ status: Status.Ok, serviceName: ServiceName.Bard });

      await delay(delayTimeToWaitForEnablingButton);

      const sendButton: HTMLButtonElement = document.querySelector(
        ".send-button-container > button"
      ) as HTMLButtonElement;
      sendButton.click();

      // Get the number of good answer buttons visible before generation
      const previousNumberOfPositiveFeedback = getNumberOfGoodResponseButtons();

      const startTimerToWatchCompletion = () => {
        intervalId = setInterval(async () => {
          const currentNumberOfPositiveFeedback =
            getNumberOfGoodResponseButtons();

          // If the number of good answer buttons increases by one,
          //  the generation is considered complete.
          if (
            currentNumberOfPositiveFeedback ===
            previousNumberOfPositiveFeedback + 1
          ) {
            clearInterval(intervalId!);
            await delay(delayTimeToInsertResponse);

            // Since the answer is contained in the class name response-content,
            // get the last response-content and pass it to sendresponse.
            const resopnseNodeList =
              document.querySelectorAll(".response-content");
            const chatResponse = resopnseNodeList[
              resopnseNodeList.length - 1
            ].querySelector("message-content > div");

            chrome.runtime.sendMessage(
              {
                serviceName: ServiceName.Bard,
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
      if (stopButton) {
        stopButton.click();
      }

      sendResponse({
        status: Status.Ok,
        command: CommandName.Cancel,
        serviceName: ServiceName.Bard,
      });
    }
  }
);

export {};
