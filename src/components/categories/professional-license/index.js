import React from "react";
import SubCourseWrapper from "../sub-course-wrapper";
import ProfessionalCourses from "./courses";
import "./index.scss";
import SubscribtionRequest from "./subscribtion-request";

export const ProfessionalLicenseText = "الرخصة المهنية";

export default function ProfessionalLicense({
  categoryData,
  showProLicense = false,
  showGeneralCourse = false,
  showSpecialityCourse = false,
}) {
  return (
    <div className="container professional-license-wrapper">
      {showProLicense ? (
        <>
          <SubCourseWrapper />
          <ProfessionalCourses
            {...{ categoryData, showGeneralCourse, showSpecialityCourse }}
          />
        </>
      ) : null}
    </div>
  );
}
