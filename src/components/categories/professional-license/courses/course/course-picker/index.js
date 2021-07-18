import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { courseTypeKey } from "../choose-options";

const disabeledTooltip = (props) => (
  <Tooltip {...props}>لا توجد دورات متاحة حاليًا</Tooltip>
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
  const [changeCounter, setChangeCounter] = useState(0);

  const disableClass = (disabled && "disabled-label") || "";
  const tabClass = [baseClassName, selectedClassName, disableClass].join(" ");

  const handleClick = () => {
    if (disabled) return;
    onClick(id);
  };

  const checkIfDisabled = () => {
    const courseTypeParams = { [courseTypeKey]: id };
    getCourseData((res) => {
      setChangeCounter((c) => c + 1);
      setDisabled(!res?.data);
    }, courseTypeParams);
  };


  useEffect(() => {
    checkIfDisabled();
  }, [checkCourseCondition, optionsData]);

  useEffect(() => {
    setTimeout(() => {
      if(!disabled)
      handleClick()
    }, 400);
  },[disabled])

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
