export interface ChatItemProps {
  prompt: string;
  onSelect: () => void;
}
export type ChromeTabs = {
  [key: string]: chrome.tabs.Tab | undefined;
};

export type LoadingStates = {
  [key: string]: boolean;
};
