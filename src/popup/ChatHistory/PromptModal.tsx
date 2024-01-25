import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ChatMessage } from "./ChatHistory";

export const PromptModal: React.FC<{
  selectedItem: ChatMessage | null;
  setShowModal: any;
  showModal: boolean;
}> = (props: {
  selectedItem: ChatMessage | null;
  setShowModal: any;
  showModal: boolean;
}) => {
  const [copyLabel, setCopyLabel] = useState<string>("Copy");

  const handleCloseModal = () => {
    props.setShowModal(false);
  };

  const handleCopy = () => {
    if (props.selectedItem) {
      navigator.clipboard.writeText(props.selectedItem.prompt);
      setCopyLabel("Done ✔️");
      setTimeout(() => {
        setCopyLabel("Copy");
      }, 1000);
    }
  };
  return (
    <>
      <Modal show={props.showModal} onHide={handleCloseModal} centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#343a40", color: "white" }}
        >
          <Modal.Title>Prompt text</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#242424", color: "white" }}>
          {props.selectedItem && props.selectedItem.prompt}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#343a40" }}>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCopy}>
            {copyLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
