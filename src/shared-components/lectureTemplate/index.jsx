import React from "react";
import moment from "moment";
import { hijryFormat } from "./../../utils/date";

export default function LectureTemplate({
  text,
  date,
  subText,
  Wrapper = ({ children }) => <>{children}</>,
  ...rest
}) {
  return (
    <div class="list-group-item bg-transparent small dark-silver-text light-font-text">
      <div class="row">
        <div class="col-6"><Wrapper {...rest}>{text}</Wrapper></div>
        <div class="col-6 d-flex justify-content-end align-items-center">
          <div class="small mb-0 d-flex align-items-center">
            {date && <span class="en-text">{hijryFormat(date)}</span>}
            {subText && (
              <span class="badge mid-bg ml-2 text-white">{subText} </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
