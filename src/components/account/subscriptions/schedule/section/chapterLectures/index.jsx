import React, { useContext } from "react";
import { ScheduleContext } from "./../../../scheduleDetails/context";
import LectureTemplate from "./../../../../../../shared-components/lectureTemplate/index";
import { getStatusText } from "./../../../../../../utils/statusText";
import { NoDataText } from "./../noDataText/index";
import { NavLink } from "react-router-dom";

export default function ChapterLectures() {
  const { chapterFound = { lectures: [] }, courseId } = useContext(
    ScheduleContext
  );
  return (
    <div>
      <NoDataText data={chapterFound?.lectures} />
      {chapterFound?.lectures?.map((lecture) => (
        <p>
          <LectureTemplate
            key={lecture.id}
            id={lecture.id}
            text={lecture?.nameAr}
            date={lecture?.scheduledAt}
            subText={getStatusText(lecture?.status)}
            Wrapper={ ({children})=><NavLink to={`/course/content/${courseId}/lecture/${lecture.id}`}>{children}</NavLink>}
          />
        </p>
      ))}
    </div>
  );
}
