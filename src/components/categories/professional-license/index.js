import React from 'react'
import SubCourseWrapper from '../sub-course-wrapper'
import ProfessionalCourses from './courses'
import "./index.scss"
import SubscribtionRequest from './subscribtion-request'

export const ProfessionalLicenseText = 'الرخصة المهنية'

export default function ProfessionalLicense({categoryData}) {
    return (
        <div className="container professional-license-wrapper">
            <SubCourseWrapper />
            <ProfessionalCourses categoryData={categoryData} />
        </div>
    )
}
