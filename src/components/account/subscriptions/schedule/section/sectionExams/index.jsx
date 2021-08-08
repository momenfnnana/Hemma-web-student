import React, { useContext, useEffect } from 'react'
import { useFetch } from '../../../../../../hooks/useFetch';
import { ScheduleContext } from '../../../scheduleDetails/context';
import { apiBaseUrl } from './../../../../../../api/helpers';
import ExamsList from './../chapterExams/Exams/index';
const url = `${apiBaseUrl}/Exams/Getchapterexams`;

export default function SectionExams() {
    const [getExams, exams] = useFetch(url);
    const { nestedId } = useContext(ScheduleContext);
  
    useEffect(() => {
        getExams({ params: { courseId: nestedId } });
    }, []);
    return (
        <div>
            <ExamsList exams={exams?.data} />
        </div>
    )
}
