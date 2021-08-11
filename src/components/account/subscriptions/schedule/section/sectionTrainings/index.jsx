import React, { useContext, useEffect } from "react";
import { apiBaseUrl } from "../../../../../../api/helpers";
import { useFetch } from "../../../../../../hooks/useFetch";
import { ScheduleContext } from "../../../scheduleDetails/context";
import ExamsList from './../chapterExams/Exams/index';
const url = `${apiBaseUrl}/Exams/GetSectionexams`;

export default function SectionTrainings() {
  const [getTrainings, trainings,loading] = useFetch(url);
  const { nestedId } = useContext(ScheduleContext);

  useEffect(() => {
    getTrainings({ params: { sectionId: nestedId,type :'Training' } });
  }, []);
  return <div><ExamsList loading={loading} courseId={nestedId} tableHeaderText="التدريب" rowBtnText="تدرب" exams={trainings?.data} /></div>;
}
