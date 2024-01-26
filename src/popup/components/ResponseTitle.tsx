import React, { useState } from "react";

export const ResponseTitle: React.FC<{
  serviceName: string;
}> = (props) => {
  const [copyLabel, setCopyLabel] = useState<string>("Copy");

  const handleCopy = async () => {
    const responseArea = document.getElementById(
      `${props.serviceName}Response`
    ) as HTMLDivElement;
    if (responseArea.innerHTML) {
      navigator.clipboard.writeText(responseArea.innerText);
      setCopyLabel("Done ✔️");
      setTimeout(() => {
        setCopyLabel("Copy");
      }, 500);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ textAlign: "center", fontWeight: "bold" }}>
        {props.serviceName}
      </div>
      <span
        style={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          cursor: "pointer",
          fontSize: "13px",
        }}
        onClick={handleCopy}
      >
        {copyLabel}
      </span>
    </div>
  );
};
