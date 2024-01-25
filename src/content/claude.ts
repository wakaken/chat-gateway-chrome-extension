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
chrome.runtime.onMessage.addListener(
  async (
    request: any,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: any) => void
  ) => {
    if (request.command === CommandName.Prompt) {
      window.focus();
      const promptInputField = document.querySelector(
        "[contenteditable=true]"
      ) as HTMLDivElement;
      promptInputField.removeChild(promptInputField.childNodes[0]);
      const prompt: string = request.prompt as string;
      const lines = prompt.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const promptTextNode = document.createElement("p");
        promptTextNode.appendChild(document.createTextNode(lines[i]));
        promptInputField.appendChild(promptTextNode);
      }
      sendResponse({ status: Status.Ok, serviceName: ServiceName.Claude });

      await delay(delayTimeToWaitForEnablingButton);

      const sendButton = document.querySelectorAll(
        '[aria-label="Send Message"]'
      )[0] as HTMLButtonElement;
      sendButton.click();

      // Get the number of good answer buttons visible before generation
      const previousNumberOfPositiveFeedback = document.querySelectorAll(
        '[title="Share positive feedback"]'
      ).length;
      const startTimerToWatchCompletion = () => {
        intervalId = setInterval(async () => {
          const currentNumberOfPositiveFeedback = document.querySelectorAll(
            '[title="Share positive feedback"]'
          ).length;

          // If the number of good answer buttons increases by one, the generation is considered complete.
          if (
            currentNumberOfPositiveFeedback ===
            previousNumberOfPositiveFeedback + 1
          ) {
            clearInterval(intervalId!);
            await delay(delayTimeToInsertResponse);

            // get last answer
            const resopnseNodeList = document.querySelectorAll(
              "div.contents > p.whitespace-pre-wrap"
            );
            const chatResponse =
              resopnseNodeList[resopnseNodeList.length - 1].parentElement;
            chrome.runtime.sendMessage(
              {
                serviceName: ServiceName.Claude,
                chatResponse: chatResponse?.innerHTML,
              },
              (_response) => {}
            );
          }
        }, intervalToCheckResponse);
      };
      startTimerToWatchCompletion();
    } else if (request.command === CommandName.Cancel) {
      if (intervalId !== null) {
        clearInterval(intervalId);
        sendResponse({
          status: Status.Ok,
          command: CommandName.Cancel,
          serviceName: ServiceName.Claude,
        });
      }
    }
  }
);

export {};
