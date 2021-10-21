import React, { useMemo } from "react";
import ScheduleHeader from "./../schedule/schedual-header/index";
import axios from "axios";
import { apiBaseUrl } from "./../../../../api/helpers";
import { useState } from "react";
import { useEffect } from "react";
import { sectionLinks, chapterLinks } from "../schedule/section";
import DetailsContent from "./content/index";
import { ScheduleContext } from "./context";


export const filterHeaderTitles = (links,displayKeysObjects)=> {
  var chapter= links?.filter(_headerBtn => !!displayKeysObjects?.[_headerBtn?.displayKey])
   console.log(chapter);
   return chapter;
}

export default function ScheduleDetails(props) {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const {
    match: {
      params: { id: courseId, type, nestedId, contentType },
    },
    history: { push },
  } = props;

  const getCourseData = () => {
    setLoading(true);
    debugger;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${apiBaseUrl}/content/${courseId}/content`, { headers })
      .then((response) => {
        setDetails(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  useEffect(() => {
    getCourseData();
  }, []);

  useEffect(() => {}, []);
  const sectionFound = details?.sections?.find(
    (section) => section.id === nestedId
  );
  const chapters =
    details?.sections?.map((section) => section?.chapters).flat() || [];
  const chapterFound = chapters?.find((chapter) => chapter.id === nestedId);

  const isContainLectures = chapterFound?.lectures?.length
  // const{isContainExam,isContainTraining}=sectionFound?sectionFound:{}
  const {isContainExam,isContainAttachments,isContainTraining} = chapterFound ? chapterFound : {}  
  const {isContainsectionExam,isContainsectionTraining} = sectionFound ? sectionFound : {}  
  const displayKeysObjects = {
    isContainExam,
    isContainAttachments,
    isContainTraining,
    isContainLectures,
    isContainsectionExam,isContainsectionTraining
  }

  const chapterLinksfiltedByDisplayKey = useMemo(()=>  filterHeaderTitles(chapterLinks(chapterFound),displayKeysObjects),[displayKeysObjects])


  const links = sectionFound
    ? sectionLinks(sectionFound)
    : chapterLinksfiltedByDisplayKey;

  const name = sectionFound ? sectionFound?.nameAr : chapterFound?.nameAr;

  const isChapter = chapterFound;
  const contextState = {
    sectionFound,
    chapters,
    chapterFound,
    details,
    nestedId,
    courseId
  };
  //nestedId could be sectionId or chapterId accoring to type
  return (
    <div>
      <ScheduleContext.Provider value={contextState}>
        <ScheduleHeader
          name={name}
          links={links}
          courseId={courseId}
          push={push}
          navToHome
          {...props}
        />
        <DetailsContent isChapter={isChapter} contentType={contentType} />
      </ScheduleContext.Provider>
    </div>
  );
}
