import React from "react";
import TrimmedText from "../../../../shared-components/trimmed-text";
import "./index.scss";

const Rating = ({ successCase }) => {
  console.log({});
  return (
    <div class="card-body px-2 py-2">
      <p class="d-flex align-items-center light-gray mb-1 font-size-13">
        <span class="d-block main-color-light mr-2">اسم الطالب : </span>
        {successCase?.rating?.studentName}
      </p>
      <p class="light-gray font-size-13 m-0">
        <span class="main-color-light">التقييم : </span>
        {successCase?.rating?.feedBack}
      </p>
    </div>
  );
};

const contentReducer = (successCase) => {
  switch (successCase?.source) {
    case "Media":
      return (
        <a href={successCase?.url}>
          <img
            src={successCase?.img}
            className="w-100 height-auto w-100"
            style={{ height: "170px !important" }}
          />
        </a>
      );
    case "Rating":
      return <Rating successCase={successCase} />;
    default:
      break;
  }
};

export const SuccessCard = ({ successCase }) => {
  return (
    <div class="">
      <div class="status-card sider-items h-100 d-flex flex-column">
        <div class="quote-icon d-flex mx-2">
          <h6 class="h6 main-color-light text-center mb-3">
            <TrimmedText text={successCase?.courseName} maxLength={18} />
          </h6>
          <i class="fas fa-quote-left mx-2"></i>
        </div>

        <div class="card flex-1">{contentReducer(successCase)}</div>
      </div>
    </div>
  );
};
