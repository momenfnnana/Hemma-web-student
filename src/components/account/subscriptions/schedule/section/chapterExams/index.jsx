import React, { useContext, useEffect } from "react";
import { useFetch } from "../../../../../../hooks/useFetch";
import { ScheduleContext } from "../../../scheduleDetails/context";
import { apiBaseUrl } from "./../../../../../../api/helpers";
import { Table } from "reactstrap";
import ExamsList from "./Exams";
// /course/content/26c39c02-db53-49e1-b321-acfab69fe531/exam/308
const url = `${apiBaseUrl}/Exams/Getchapterexams`;

export default function ChapterExams() {
  const [getExams, exams,loading] = useFetch(url);
  const { nestedId } = useContext(ScheduleContext);

  useEffect(() => {
    getExams({ params: { chapterId: nestedId } });
  }, []);

  return (
    <div>
      <ExamsList loading={loading} courseId={nestedId} exams={exams?.data} />
    </div>
  );
}
