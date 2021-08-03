import React from "react";
import "./index.scss"

export default function WrapperText({ text ,className = "",Wrapper =({children,...rest})=><span {...rest}>{children}</span>,...rest }) {
  const baseClassName = "wrapped-text"
  const mergedClassNames = [baseClassName,className].join(' ')
  return <Wrapper  className={mergedClassNames} {...rest} >{text}</Wrapper>;
}
