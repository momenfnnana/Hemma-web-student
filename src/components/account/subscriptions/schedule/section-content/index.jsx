import React from "react";
import { NavLink } from "react-router-dom";

export const chapterSections = {
  LECTURES: "LECTURES",
  EXAMS: "EXAMS",
  TRAININGS: "TRAININGS",
  ATTACHMENTS: "ATTACHMENTS",
};

export default function SectionContent({
  nameAr,
  lectures,
  id: chapterId,
  ...props
}) {
  const {
    match: {
      params: { id: courseId },
    },
    history: { push },
  } = props;

  const urlTempalte = (sectionType) => {
    return `/course/content/${courseId}/schedule/chapter/${chapterId}/${sectionType}`;
  };

  const onClick = (sectionType) => {
    const url = urlTempalte(sectionType);
    push(url);
  };
  return (
    <div class="row col-md-6 col-12" id="lectures-lists-one">
      <div class=" card-container col-12">
        <div class="card-hover border-radius-20 overflow-hidden p-3">
          <div class="d-flex align-items-center mb-3">
            <img
              src="https://hemmma.netlify.app/images/icon-title-section.png"
              class="width-60 mr-3"
              alt="Class Icon"
            />
            <div class="main-color font-weight-bold font-size-20">{nameAr}</div>
          </div>
          <div class="card-options-btns d-flex align-items-center flex-wrap">
            <a
              onClick={() => {
                onClick(chapterSections.LECTURES);
              }}
              class="btn-card-normal-outline hover-btn-yellow mr-1 w-auto headShake m-0 small-btn"
            >
              محاضرات
            </a>
            <a
              onClick={() => {
                onClick(chapterSections.EXAMS);
              }}
              class="btn-card-normal-outline hover-btn-yellow mr-1 w-auto headShake m-0 small-btn"
            >
              اختبارات
            </a>
            <a
              onClick={() => {
                onClick(chapterSections.TRAININGS);
              }}
              class="btn-card-normal-outline hover-btn-yellow mr-1 w-auto headShake m-0 small-btn"
            >
              تدريبات
            </a>
            <a
              onClick={() => {
                onClick(chapterSections.ATTACHMENTS);
              }}
              class="btn-card-normal-outline hover-btn-yellow mr-1 w-auto headShake m-0 small-btn"
            >
              مرفقات اضافية
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
