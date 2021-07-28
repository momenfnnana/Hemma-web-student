import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { courseTypeKey } from "../choose-options";
import './style.sass';
export default function CourseTabPicker({
  id,
  selectedId,
  onClick,
  title = "دورة الرخصة المهنية",
  points =[
    "محاضرات مباشرة وتبقى مسجلة في الموقع" ,
    'عدد كبير من التدريبات والتجميعات',
    'ملزمة شاملة لكل المعايير' ,
    "إجابة لجميع الاستفسارات"
  ],
  checkCourseCondition,
  optionsData,
  getCourseData = () => {},
  completedOptionsLength,
}) {
  const baseClassName = "label-course-btn flex-root";
  const selectedClassName = (id === selectedId && "with-bg") || "";
  const [disabled, setDisabled] = useState(false);
  const [changeCounter,setChangeCounter] = useState(0)

  const disableClass = (disabled && "disabled-label") || "";
  const tabClass = [baseClassName, selectedClassName, disableClass].join(" ");

  const handleClick = () => {
    if (disabled) return;
    onClick(id);
  };
  const disabeledTooltip = (props) => (
      <Tooltip {...props}  className="in" id="tooltip-top">
        <ul className="card-licences-list-info" type="none">
          {points.map((point) => (
              <li>{point}</li>
          ))}
        </ul>
      </Tooltip>
  );

  const checkIfValidArray = (array) => Array.isArray(array) && array.length > 0
  const checkIfValidObject = (obj) => Object.keys(obj || {}).length > 0

  const checkIfDisabled = () => {
    const courseTypeParams = { [courseTypeKey]: id };
    getCourseData((res) => {
      setChangeCounter((c) => c + 1);
      setDisabled(!res?.data);
      setChangeCounter(c => c+1)
      // if(res.data)
      // handleClick();
    }, courseTypeParams);
  };
  // useEffect(() => {
  //   if(!changeCounter)return
  //   if(!disabled) handleClick();
  // },[changeCounter])


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
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={disabeledTooltip}
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
