import React from "react";
import { useRef } from "react";

export default function TextArea({ show, placholderText, ...rest }) {
  const textAreaRef = useRef();

  const handleCustomPlacholderClick = () => {
    textAreaRef.current.focus();
  };
  return (
    <div className="position-relative">
      <textarea ref={textAreaRef} {...rest}></textarea>
      {show && (
        <span
          onClick={handleCustomPlacholderClick}
          className="position-absolute text-gray font-sm"
          style={{ top: 10, right: '9%', color: "#ddd" }}
        >
          {placholderText}
        </span>
      )}
    </div>
  );
}
