import React, { useContext } from 'react'
import { ScheduleContext } from './../../../scheduleDetails/context';
import LectureTemplate from './../../../../../../shared-components/lectureTemplate/index';
import { getStatusText } from './../../../../../../utils/statusText';

export default function ChapterLectures() {
    const {chapterFound = {lectures : []} } = useContext(ScheduleContext)
    return (
        <div>
            {chapterFound?.lectures?.map(lecture =>(
                <p>
                    <LectureTemplate text={lecture?.nameAr} date={lecture?.scheduledAt} subText={getStatusText(lecture?.status)} />
                </p>
            ))}
        </div>
    )
}
