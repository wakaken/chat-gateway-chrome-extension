export enum ServiceName {
  ChatGPT = "ChatGPT",
  Bard = "Bard",
  Claude = "Claude",
  Copilot = "Copilot",
}
export enum CommandName {
  Prompt = "Prompt",
  Cancel = "Cancel",
}

export enum Status {
  Ok = "Ok",
  Error = "Error",
}

export const ChatGatewayWindowSize = {
  width: 1000,
  height: 750,
};

export const ChatAIWindowSize = {
  width: 500,
  height: 350,
};

export const ChatAIResponseAreaSize = {
  height: 200,
};

export const ChatConfig = {
  titleAndUrlList: [
    {
      title: ServiceName.ChatGPT,
      url: "https://chat.openai.com/",
      top: 0,
      left: 0,
    },
    {
      title: ServiceName.Bard,
      url: "https://bard.google.com/chat",
      top: 0,
      left: ChatAIWindowSize.width,
    },
    {
      title: ServiceName.Claude,
      url: "https://claude.ai/chat",
      top: ChatAIWindowSize.height,
      left: 0,
    },
    {
      title: ServiceName.Copilot,
      url: "https://copilot.microsoft.com/",
      top: ChatAIWindowSize.height,
      left: ChatAIWindowSize.width,
    },
  ],
};

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const intervalToCheckResponse = 3000;
export const delayTimeToWaitForEnablingButton = 500;
export const delayTimeToInsertResponse = 1000;
