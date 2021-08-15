import React from "react";
import { findTitle } from "../../courses/course/choose-options/data/options";

export default function CourseOverview({ mergedData, onDelete, valueKey }) {
  const courseDetails = mergedData?.[valueKey];
  return (
    <>
      {!!courseDetails && (
        <div class="input-area mb-3">
          <div class="form-control border-radius-50 font-size-14 h-fit">
            <div className="" style={{wordBreak:"break-word"}}>
            {courseDetails?.nameAr}
            </div>
          </div>
          <span class="input-close cursor-pointer" onClick={onDelete}>
            <i class="fas fa-times"></i>
          </span>
        </div>
      )}
    </>
  );
}
