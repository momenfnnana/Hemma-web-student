import React from "react";
import { NavLink } from "react-router-dom";

export const chapterSections = {
  LECTURES: "LECTURES",
  EXAMS: "EXAMS",
  TRAININGS: "TRAININGS",
  ATTACHMENTS: "ATTACHMENTS",
};

const sectionHeaderBtns = [
  {
    link: chapterSections.LECTURES,
    title: "محاضرات",
  },
  {
    link: chapterSections.EXAMS,
    title: "اختبارات",
  },
  {
    link: chapterSections.TRAININGS,
    title: "تدريبات",
  },
  {
    link: chapterSections.ATTACHMENTS,
    title: "مرفقات اضافية",
  },
];



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
            {sectionHeaderBtns.map((btn) => (
              <a
                onClick={() => {
                  onClick(btn.link);
                }}
                class="my-1 btn-card-normal-outline hover-btn-yellow mr-1 w-auto headShake m-0 small-btn"
              >
                {btn.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
