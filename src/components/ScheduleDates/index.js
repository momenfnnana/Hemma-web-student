import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "./index.scss";
import { Card } from "./card";
import { apiBaseUrl } from "../../api/helpers";

const getDates = async () => {
  return await axios({
    method: "GET",
    url: `${apiBaseUrl}/HemmaDatesSchedule`,
  })
    .then((res) => res?.data)
    .catch((error) => error);
};
const ScheduleDates = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    getDates().then((res) => {
      setDates(res?.data.sort((a, b) => new Date(a.date) - new Date(b.date)));});
  }, []);

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
        {dates?.map((item, index) => {
          return <Card key={index} {...item} {...{ index }} />;
        })}
      </div>
    </div>
  );
};

export default ScheduleDates;
