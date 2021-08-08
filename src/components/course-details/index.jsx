import React from "react";
import CourseDetailsNav from "./navigator/index";
import CourseDetailsView from "./details-view/index";

export default function _CourseDetails() {
  return (
    <div className="row">
      <div className="col-lg-3 card-container">
        <CourseDetailsNav />
      </div>
      <div className="col-lg-9">
        <CourseDetailsView />
      </div>
    </div>
  );
}
