import React from "react";
import { useRef } from "react";

export default function TextArea({ show, placholderText = [], ...rest }) {
  const textAreaRef = useRef();

  const handleCustomPlacholderClick = () => {
    textAreaRef.current.focus();
  };
  return (
    <div className="position-relative">
      <textarea ref={textAreaRef} {...rest}></textarea>
      {show && (
        <div
          onClick={handleCustomPlacholderClick}
          className="position-absolute text-gray font-sm d-flex flex-column"
          style={{ top: 10, right: '9%', color: "#ddd" }}
        >
          {placholderText?.map(placholder => (
            <span className="mt-1">
              {placholder}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
