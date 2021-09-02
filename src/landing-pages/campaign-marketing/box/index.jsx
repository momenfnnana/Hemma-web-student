import React from "react";

export default function FixedBox({
  position,
  className,
  width = 10,
  height
}) {
  const baseClassName = "position-absolute d-none d-lg-block";
  const boxClass = [baseClassName, className].join(" ");
  return (
    <div
      className={boxClass}
      style={{zIndex:10, ...position, width: `${width}px`, height: `${height || width}px` }}
    ></div>
  );
}
