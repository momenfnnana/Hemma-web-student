import React, { useState, useEffect } from "react";
import moment from "moment";
import "./index.scss";

export const Card = ({ index, ...item }) => {
  const [counter, setCounter] = useState(
    moment(new Date()).format("yy:hh:mm:ssA")
  );
  const [dataDetails, setDateDetails] = useState({
    restOfDay: null,
    restOfHours: null,
    restOfMinuts: null,
    restOfSeconds: null,
  });
  const { restOfDay, restOfHours, restOfMinuts, restOfSeconds } = dataDetails;
  useEffect(() => {
    setTimeout(() => {
      setCounter(moment(new Date()).format("yy:hh:mm:ssA"));
    }, 1000);
  }, [counter]);
  const colorValidation =
    (index + 1) % 3 === 1
      ? "#9F78EB"
      : (index + 1) % 3 === 2
      ? "#EBD669"
      : "#56B3BE";
  const counterStyle = { borderColor: colorValidation, color: colorValidation };
  var date = new Date();
  var date2 = new Date(item?.date);
  var diff = new Date(date2.getTime() - date.getTime());
  useEffect(() => {
    let days = diff.getUTCDate() - 1;
    let hours = diff.getUTCHours() - 1;
    let minuts = diff.getUTCMinutes() - 1;
    let seconds = diff.getUTCSeconds() - 1;
    setDateDetails({
      restOfDay: days,
      restOfHours: hours,
      restOfMinuts: minuts,
      restOfSeconds: seconds,
    });
  }, [date]);

  return restOfDay >= 0 &&
    restOfHours >= 0 &&
    restOfMinuts >= 0 &&
    restOfSeconds >= -1 ? (
    <div className="col-12 col-md-4 p-3">
      <div
        className="card-container d-flex flex-column justify-content-center align-items-center text-center"
        style={{ backgroundColor: colorValidation }}
      >
        <p className="card-date mt-3">{moment(item?.date).format("l")}</p>
        <p className="card-title">{item?.title}</p>
        <div
          className="card-footer w-100 bg-white"
          style={{ borderColor: colorValidation }}
        >
          <p style={{ color: colorValidation }}>الوقت المتبقي:</p>
          <div className="d-flex justify-content-center align-items-center my-1">
            <p className="my-0 mx-1 counter-item" style={counterStyle}>
              {restOfSeconds === -1 ? 59 : restOfSeconds} <br /> ثانية
            </p>
            <p className="my-0 mx-1 counter-item" style={counterStyle}>
              {restOfMinuts} <br /> دقيقة
            </p>
            <p className="my-0 mx-1 counter-item" style={counterStyle}>
              {restOfHours} <br /> ساعة
            </p>
            <p className="my-0 mx-1 counter-item" style={counterStyle}>
              {restOfDay} <br /> يوم
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
