import React, { useContext } from "react";
import { useEffect } from "react";
import { apiBaseUrl } from "./../../../../../../api/helpers";
import { useFetch } from "./../../../../../../hooks/useFetch";
import { ScheduleContext } from "./../../../scheduleDetails/context";
import LectureTemplate from "./../../../../../../shared-components/lectureTemplate/index";
const url = `${apiBaseUrl}/Content/GetchapterAttachments`;

export default function ChapterAttachments() {
  const [getAttachments, attachments] = useFetch(url);
  const { nestedId } = useContext(ScheduleContext);

  useEffect(() => {
    getAttachments({ params: { chapterId: nestedId } });
  }, []);
  return (
    <div>
      {attachments?.data?.map((attachment) => (
        <LectureTemplate
          Wrapper={({ children }) => (
            <a target="_blank" href={attachment?.url}>
              {children}
            </a>
          )}
          text={attachment?.title}
        />
      ))}
    </div>
  );
}
