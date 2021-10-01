import React, { useMemo } from "react";
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
    displayKey : 'isContainExam'
  },
  {
    title: "تدريبات",
    path: section?.id,
    nestedPath: chapterSections.TRAININGS,
    docType :"section",
    displayKey : 'isContainTraining'
  },
];

export  const chapterLinks = (chapter)=> [
  {
    title: "محاضرات",
    path: chapter?.id,
    nestedPath: chapterSections.LECTURES,
    docType :"chapter",
    displayKey : 'isContainLectures'
  },
  {
    title: "اختبارات",
    path: chapter?.id,
    nestedPath: chapterSections.EXAMS,
    docType :"chapter",
    displayKey : 'isContainExam'
  },
  {
    title: "تدريبات",
    path: chapter?.id,
    nestedPath: chapterSections.TRAININGS,
    docType :"chapter",
    displayKey : 'isContainTraining'
  },
  {
    title: "مرفقات اضافية",
    path: chapter?.id,
    nestedPath: chapterSections.ATTACHMENTS,
    docType :"chapter",
    displayKey : 'isContainAttachments'
  },
];

export const urlTempalte = (docType, sectionType) => {
  return `/course/content/:courseId/schedule/${docType}/:chapterId/${sectionType}`;
};


export const ScheduleSection = ({ name, section, ...props }) =>{
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  const {chapters = []} = section || {}
  const hasTrainings = chapters.some(chapter => chapter.isContainTraining) 
  const hasExams = chapters.some(chapter => chapter.isContainExam) 

  const {
    match: {
      params: { id: courseId },
    },
    history: { push },
  } = props;

  const displayKeysObjects = {
    isContainTraining: hasTrainings,
    isContainExam: hasExams,
  }

  const sectionLinksfiltedByDisplayKey = useMemo(
    () =>
    sectionLinks(section)?.filter(
        (_headerBtn) => !!displayKeysObjects?.[_headerBtn?.displayKey]
      ),
    [displayKeysObjects]
  );

  const getByMultiProp = (value,props = [])=>{
    let propFound = false
    props.forEach(prop => {
      if(value?.[prop]) propFound = true
    })
    return propFound
  }

  const filteredEmptySections = useMemo(
    () =>
      section?.chapters.filter((chapter) =>
        getByMultiProp(chapter, ["isContainTraining", "isContainExam"])
      ),
    [section]
  );

  return (
    <>
      {
        <div className="part-name-section">
          <ScheduleHeader
            links={sectionLinksfiltedByDisplayKey}
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
              {filteredEmptySections?.map((chapter) => (
                <SectionContent isContainLectures={chapter?.lectures?.length} {...chapter} {...props} />
              ))}
            </div>
          )}
        </div>
      }
    </>
  );
}
