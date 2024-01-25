import React, { useCallback, useState } from "react";
import { Col } from "react-bootstrap";
import { ChatItem } from "../App";
import { PromptModal } from "./PromptModal";

interface ChatHistoryProps {
  history: ChatMessage[];
}

export const ChatHistory: React.FC<ChatHistoryProps> = React.memo(
  ({ history }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<ChatMessage | null>(null);

    const handleSelectItem = useCallback((item: ChatMessage) => {
      setSelectedItem(item);
      setShowModal(true);
    }, []);

    return (
      <>
        <Col
          xs={2}
          style={{
            overflowY: "auto",
            paddingRight: "0",
            backgroundColor: "#242424",
          }}
        >
          {history.map((item, index) => (
            <ChatItem
              key={index}
              prompt={item.prompt}
              onSelect={() => handleSelectItem(item)}
            />
          ))}
        </Col>
        <PromptModal
          selectedItem={selectedItem}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </>
    );
  }
);

export interface ChatMessage {
  prompt: string;
  response: string;
  date: string;
}
