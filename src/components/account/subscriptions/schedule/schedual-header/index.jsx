import React from "react";
import "./index.scss";
import { chapterSections } from "./../section-content/index";
import { NavLink } from "react-router-dom";

export default function ScheduleHeader({
  onToggle = () => {},
  show,
  name,
  showToggle,
  push = () => {},
  courseId,
  links = [],
}) {
  const direction = !show ? "down" : "up";
  // class-img.png
  const urlTempalte = (path, sectionType,docType) => {
    return `/course/content/${courseId}/schedule/${docType}/${path}/${sectionType}`;
  };

  const onClick = (path, sectionType) => {
    const url = urlTempalte(path, sectionType);
    push(url);
  };
  return (
    <div class="card-info-course card-hover border-radius-5 overflow-hidden d-flex align-items-center justify-content-between mb-4 main-bgcolor px-4 py-2">
      <div className="card-options-head d-flex align-items-center">
        <div className="section-title-img">
          <img
            src="/assets/images/class-img.png"
          />
        </div>
        <h4 className="main-color h4 font-weight-bold m-0">{name}</h4>
      </div>
      <div className="d-flex align-items-center flex-wrap">
        {links?.map((link) => (
          <NavLink
          to={urlTempalte(link?.path, link?.nestedPath,link?.docType)}
           activeClassName="btn-yellow"
            className="btn-card-normal-outline hover-btn-yellow mr-1 w-auto headShake m-0 small-btn my-1"
          >
            {link?.title}
          </NavLink>
        ))}
        {/* <a onClick={()=>{onClick(chapterSections.EXAMS)}} className="btn-card-normal-outline hover-btn-yellow mr-1 w-auto headShake m-0 small-btn">
          الاختبارات الالكترونية
        </a>
        <a onClick={()=>{onClick(chapterSections.TRAININGS)}} className="btn-card-normal-outline hover-btn-yellow mr-1 w-auto headShake m-0 small-btn">
          تدريبات
        </a> */}
        {showToggle && (
          <a
            className="collapse-anchor d-block main-color ml-2 width-20 text-center cursor-pointer"
            data-opening="lectures-lists-one"
            onClick={onToggle}
          >
            <i className={`fas fa-chevron-${direction}`}></i>
          </a>
        )}
      </div>
    </div>
  );
}
