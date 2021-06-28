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
          <a data-bs-toggle="modal" data-bs-target="#course-preview">
            <div class="card-licences-video-link">
              <span>فيديو توضيحى</span>
              <span class="vid-play">
                <svg
                  class="svg-inline--fa fa-caret-right fa-w-6"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="caret-right"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 192 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
                  ></path>
                </svg>
              </span>
            </div>
          </a>
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
