import React from "react";
import ScheduleHeader from "./../schedual-header/index";
import SectionContent, { chapterSections } from "./../section-content/index";
import "./index.scss";
import { useState } from "react";


export  const sectionLinks = (section)=> [
  {
    title: "الاختبارات الالكترونية",
    path: section?.id,
    nestedPath: chapterSections.EXAMS,
    docType :"section",
  },
  {
    title: "تدريبات",
    path: section?.id,
    nestedPath: chapterSections.TRAININGS,
    docType :"section",
  },
];

export  const chapterLinks = (chapter)=> [
  {
    title: "محاضرات",
    path: chapter?.id,
    nestedPath: chapterSections.LECTURES,
    docType :"chapter",
  },
  {
    title: "اختبارات",
    path: chapter?.id,
    nestedPath: chapterSections.EXAMS,
    docType :"chapter",
  },
  {
    title: "تدريبات",
    path: chapter?.id,
    nestedPath: chapterSections.TRAININGS,
    docType :"chapter",
  },
  {
    title: "مرفقات اضافية",
    path: chapter?.id,
    nestedPath: chapterSections.ATTACHMENTS,
    docType :"chapter",
  },
];

export const urlTempalte = (docType, sectionType) => {
  return `/course/content/:courseId/schedule/${docType}/:chapterId/${sectionType}`;
};


export const ScheduleSection = ({ name, section, ...props }) =>{
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  const {
    match: {
      params: { id: courseId },
    },
    history: { push },
  } = props;

  const links = sectionLinks(section)

  return (
    <>
      {
        <div className="part-name-section">
          <ScheduleHeader
            links={links}
            courseId={courseId}
            push={push}
            name={section?.nameAr}
            onToggle={toggleShow}
            show={show}
            showToggle={!!section?.chapters?.length}
            {...props}
          />
          {show && (
            <div className="row">
              {section?.chapters?.map((chapter) => (
                <SectionContent {...chapter} {...props} />
              ))}
            </div>
          )}
        </div>
      }
    </>
  );
}
