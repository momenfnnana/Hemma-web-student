import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { courseTypeKey } from "../choose-options";

const disabeledTooltip = (props) => (
  <Tooltip  {...props}>
    لا توجد دورات متاحة حاليًا
  </Tooltip>
);

export default function CourseTabPicker({
  id,
  selectedId,
  onClick,
  title = "دورة الرخصة الشاملة",
  checkCourseCondition,
  optionsData,
  getCourseData = () => {},
  completedOptionsLength,
}) {
  const baseClassName = "label-course-btn flex-root";
  const selectedClassName = (id === selectedId && "with-bg") || "";
  const [disabled, setDisabled] = useState(false);

  const disableClass = (disabled && "disabled-label") || "";
  const tabClass = [baseClassName, selectedClassName, disableClass].join(" ");

  const handleClick = () => {
    if (disabled) return;
    onClick(id);
  };

  const checkIfValidArray = (array) => Array.isArray(array) && array.length > 0
  const checkIfValidObject = (obj) => Object.keys(obj || {}).length > 0

  const checkIfDisabled = () => {
    const courseTypeParams = { [courseTypeKey]: id };
    getCourseData((res) => {
      const resData = res?.data;
      const validResponse = checkIfValidArray(resData) || checkIfValidObject(resData)
      setDisabled(!validResponse);
    }, courseTypeParams);
  };

  useEffect(() => {
    if (checkCourseCondition) checkIfDisabled();
  }, [checkCourseCondition, optionsData]);

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={disabled ? disabeledTooltip : () => <Tooltip></Tooltip>}
    >
      <a
        className={tabClass}
        data-courses="full-licences-course-one"
        onClick={handleClick}
      >
        {title}
      </a>
    </OverlayTrigger>
  );
}
