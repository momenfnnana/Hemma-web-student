import React from 'react'
import { Modal } from '../../../../shared-components/modal'
import TrainerVideo from '../../professional-license/courses/course/video-content/video'
import { staticVideoUrl } from '../data/courses'

// course-preview
export default function CoursePreviewModal(props) {
    return (
        <Modal id="course-preview" {...props}>
            <TrainerVideo videoUrl={staticVideoUrl} removeTimes={0} />
        </Modal>
    )
}
