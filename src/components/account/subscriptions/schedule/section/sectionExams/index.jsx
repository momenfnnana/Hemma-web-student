import React, { useContext, useEffect } from 'react'
import { useFetch } from '../../../../../../hooks/useFetch';
import { ScheduleContext } from '../../../scheduleDetails/context';
import { apiBaseUrl } from './../../../../../../api/helpers';
import ExamsList from './../chapterExams/Exams/index';
const url = `${apiBaseUrl}/Exams/GetSectionexams`;

export default function SectionExams() {
    const [getExams, exams,loading] = useFetch(url);
    const { nestedId } = useContext(ScheduleContext);
  
    useEffect(() => {
        getExams({ params: { sectionId: nestedId,type:'Exam' } });
    }, []);
    return (
        <div>
            <ExamsList loading={loading} exams={exams?.data} />
        </div>
    )
}
