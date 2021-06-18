import React from "react";
import { subCoursesData } from "./data/courses";
import SubCourseItem from "./sub-course-item";

export default function SubCourseWrapper() {
  return (
    <div className="row">
      {subCoursesData.map((course) => (
        <SubCourseItem {...course} />
      ))}
    </div>
  );
}
