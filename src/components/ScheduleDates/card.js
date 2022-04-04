import React from "react";
import moment from "moment";
import Countdown from "react-countdown";
import "./index.scss";

export const Card = ({ index, ...item }) => {
  const colorValidation =
    (index + 1) % 3 === 1
      ? "#9F78EB"
      : (index + 1) % 3 === 2
      ? "#EBD669"
      : "#56B3BE";
  const counterStyle = { borderColor: colorValidation, color: colorValidation };

  return (
    <Countdown
      date={item?.date}
      renderer={(props) => {
        return (
          <div className="col-12 col-md-4 p-3">
            <div
              className="card-container d-flex flex-column justify-content-center align-items-center text-center"
              style={{ backgroundColor: colorValidation }}
            >
              <p className="card-date mt-3">
                {moment(item?.date).format("DD-MM-YYYY")}
              </p>
              <p className="card-title">{item?.title}</p>
              <div
                className="card-footer w-100 bg-white"
                style={{ borderColor: colorValidation }}
              >
                <p style={{ color: colorValidation }}>الوقت المتبقي:</p>
                <div className="d-flex justify-content-center align-items-center my-1">
                  <p className="my-0 mx-1 counter-item" style={counterStyle}>
                    {props.seconds} <br /> ثانية
                  </p>
                  <p className="my-0 mx-1 counter-item" style={counterStyle}>
                    {props.minutes} <br /> دقيقة
                  </p>
                  <p className="my-0 mx-1 counter-item" style={counterStyle}>
                    {props.hours} <br /> ساعة
                  </p>
                  <p className="my-0 mx-1 counter-item" style={counterStyle}>
                    {props.days} <br /> يوم
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};
