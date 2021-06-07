import React from "react";
import "./index.scss";

const Rating = ({ successCase }) => {
  console.log({});
  return(
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
);}

const contentReducer = (successCase) => {
  switch (successCase?.source) {
    case "Media":
      return <a target={successCase?.url}>
        {/* <img src={successCase?.img} className="w-100 h-auto" /> */}
      </a>;
    case "Rating":
      return <Rating successCase={successCase} />;
    default:
      break;
  }
};

export const SuccessCard = ({ successCase }) => {
  return (
    <div class="col-lg-4">
      <div class="status-card sider-items">
        <div class="quote-icon">
          <i class="fas fa-quote-left"></i>
        </div>
        <h6 class="h6 main-color-light text-center mb-3">
          {successCase?.categoryName}
        </h6>
        <div class="card">
          {contentReducer(successCase)}
      </div>
      </div>
    </div>
  );
};
