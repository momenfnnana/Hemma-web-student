import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
export default function TrimmedText({
  text = "test",
  maxLength,
}) {
  const trimCondition = text.length > maxLength;
  const textTrim = (string = "") =>
    trimCondition ? string.substring(0, maxLength) + "..." : string;

  const trimmedText = textTrim(text);

  return (
    <OverlayTrigger placement="top" overlay={<Tooltip>{text}</Tooltip>}>
      <span>{trimmedText}</span>
    </OverlayTrigger>
  );
}
