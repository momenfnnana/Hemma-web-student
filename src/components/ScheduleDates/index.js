import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.scss";
import { Card } from "./card";

const data = [
  {
    id: uuidv4(),
    title: "التسجيل في الاختبار التحصيلي للطلاب والطالبات",
    date: new Date(2022, 1, 28),
  },
  {
    id: uuidv4(),
    title: "التسجيل في الاختبار التحصيلي للطلاب والطالبات",
    date: new Date(2022, 4, 15),
  },
  {
    id: uuidv4(),
    title: "التسجيل في الاختبار التحصيلي للطلاب والطالبات",
    date: new Date(2022, 3, 12),
  },
  {
    id: uuidv4(),
    title: "التسجيل في الاختبار التحصيلي للطلاب والطالبات",
    date: new Date(2022, 3, 12),
  },
  {
    id: uuidv4(),
    title: "التسجيل في الاختبار التحصيلي للطلاب والطالبات",
    date: new Date(2022, 3, 12),
  },
  {
    id: uuidv4(),
    title: "التسجيل في الاختبار التحصيلي للطلاب والطالبات",
    date: new Date(2022, 3, 12),
  },
  {
    id: uuidv4(),
    title: "التسجيل في الاختبار التحصيلي للطلاب والطالبات",
    date: new Date(2022, 3, 12),
  },
  {
    id: uuidv4(),
    title: "التسجيل في الاختبار التحصيلي للطلاب والطالبات",
    date: new Date(2022, 3, 12),
  },
  {
    id: uuidv4(),
    title: "التسجيل في الاختبار التحصيلي للطلاب والطالبات",
    date: new Date(2022, 3, 12),
  },
  {
    id: uuidv4(),
    title: "التسجيل في الاختبار التحصيلي للطلاب والطالبات",
    date: new Date(2022, 3, 12),
  },
  {
    id: uuidv4(),
    title: "التسجيل في الاختبار التحصيلي للطلاب والطالبات",
    date: new Date(2022, 3, 12),
  },
  {
    id: uuidv4(),
    title: "التسجيل في الاختبار التحصيلي للطلاب والطالبات",
    date: new Date(2022, 3, 12),
  },
  {
    id: uuidv4(),
    title: "التسجيل في الاختبار التحصيلي للطلاب والطالبات",
    date: new Date(2022, 3, 12),
  },
];

const ScheduleDates = () => {
  return (
    <div className="container-fluid page-container">
      <div className="d-flex justify-content-center align-items-center">
        <img
          src={process.env.PUBLIC_URL + "/assets/images/bookitem.png"}
          className="mr-2 contain-img bookitem mx-auto"
          alt="bookitem"
        />
        <p className="page-title text-center">تواريخ مهمة لك!</p>
      </div>
      <div className="row mt-5">
        {data?.map((item, index) => {
          return <Card key={index} {...item} {...{ index }} />;
        })}
      </div>
    </div>
  );
};

export default ScheduleDates;
