import React from "react";

export default function ShowAt({ at, children }) {
  return <>{at && <>{children}</>}</>;
}
