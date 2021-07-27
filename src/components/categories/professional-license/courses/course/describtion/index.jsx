import React from "react";
import "./index.scss";

const DescriptionPoint = ({ name, value,valueClass,nameClass="sub-color" }) => (
  <>
  { !!value && <div className="describtion-point">
      <span className={nameClass}>{name}</span>
      <span className={valueClass}>{value}</span>
    </div>}
  </>
);

const moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

export const CourseDescribtion = ({ descriptionData }) => {
  const getHijriDate = (date) => {
    var hijriDate = moment(date, "YYYY-MM-DD").format("iYYYY/iM/iD");
    return hijriDate;
  };

  return (
    <>
      <div className="mb-3">
        <h6 className="h6 sub-color font-weight-bold">مميزات الدورة :</h6>
        <p className="font-size-14 mb-3">{descriptionData?.descriptionAr}</p>
        <h6 className="h6 sub-color font-weight-bold">تتضمن :</h6>
        <div className="font-size-14">
          <div className="d-grid course-describtion-wrapper">
              <DescriptionPoint name="تاريخ البدء :" value={`هـجري ${getHijriDate(descriptionData?.startsAt)}`} />
              <DescriptionPoint name="عدد الساعات : " value={`${parseInt(descriptionData.durationInHours)}`} valueClass="mx-1"  />
              <DescriptionPoint name="وصف وقت المحاضرات :" value={descriptionData?.durationTextAr}   />
              <DescriptionPoint name=" وصف الصلاحية :" value={descriptionData?.validityTextAr }   />
              <DescriptionPoint name="وصف الجدول الاسبوعي :" value={descriptionData?.scheduleTextAr }   />
          </div>
        </div>
      </div>
    </>
  );
};
