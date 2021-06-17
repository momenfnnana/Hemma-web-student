import React from "react";

export default function EmptyCountWrapper({
  count,
  emptyComp = null,
  children,
  loading
}) {
  const emptyCondition = !count && !loading;
  return <>{emptyCondition ? emptyComp() : <> { children }</>}</>;
}
