import React from "react";

export default function SubCourseItem({ topTitle, subTitle, points = [] }) {
  return (
    <div className="col-lg-6 my-2">
      <div class="card-licences card-hover border-light-bold h-100">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <div class="d-flex align-items-center font-size-25 main-color cursor-pointer">
            <i class="fas fa-angle-double-left"></i>
            <span class="ml-2 font-weight-bold">{topTitle}</span>
          </div>
        </div>
        <p class="font-size-15 font-weight-bold">{subTitle}</p>
        <ul class="card-licences-list-info" type="none">
          {points.map((point) => (
            <li>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
