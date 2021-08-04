import React from "react";
import ScheduleHeader from "./../schedule/schedual-header/index";
import axios from "axios";
import { apiBaseUrl } from "./../../../../api/helpers";
import { useState } from "react";
import { useEffect } from "react";
import { sectionLinks, chapterLinks } from "../schedule/section";
import DetailsContent from "./content/index";
import { ScheduleContext } from "./context";

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

  const links = sectionFound
    ? sectionLinks(sectionFound)
    : chapterLinks(chapterFound);

  const name = sectionFound ? sectionFound?.nameAr : chapterFound?.nameAr;

  const isChapter = chapterFound;
  const contextState = {
    sectionFound,
    chapters,
    chapterFound,
    details,
    nestedId
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
          {...props}
        />
        <DetailsContent isChapter={isChapter} contentType={contentType} />
      </ScheduleContext.Provider>
    </div>
  );
}
