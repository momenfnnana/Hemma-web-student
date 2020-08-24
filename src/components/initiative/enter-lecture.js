import React, { Component } from "react";
import { Link } from "react-router-dom";
class EnterToLectureComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="pb-2">
          <div className="container">
            <div className="row mb-4">
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
                <div className="initiative-icon-circle mt-3 mb-3">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                    alt="logo"
                  />
                </div>
              </div>
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
                <h1 className="dark-text mb-1">طريقة الدخول للمحاضرة</h1>
              </div>
            </div>
          </div>
        </section>
        <hr className="w-70"></hr>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row mx-auto d-flex justify-content-center align-items-center">
              <div className="col-lg-3 col-12">
                <Link
                  target="_blank"
                  to={{
                    pathname: "https://zoom.us/download",
                  }}
                >
                  <div className="initiative-categories-box-layout custom-height d-flex flex-column align-items-center justify-content-center clickable mb-2">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                      height="50%"
                      width="50%"
                      className="contain-img mb-2"
                    />
                    <h3 className="dark-text text-center mb-0">
                      حمل تطبيق Zoom
                    </h3>
                  </div>
                </Link>
              </div>
              <div className="col-lg-3 col-12">
                <div className="initiative-categories-box-layout custom-height d-flex flex-column align-items-center justify-content-center m-2">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                    height="50%"
                    width="50%"
                    className="contain-img mb-4"
                  />
                  <h5 className="dark-text text-center mb-0">
                    <span className="en-text">2- </span>
                    الدخول الى موقع منصة همة بعد مايتم اشتراكك في المحاضرة راح
                    تتغير كلمة اشترك الى انضم من خلال النقر عليها راح تقدر تدخل
                    المحاضرة
                  </h5>
                </div>
              </div>
              <div className="col-lg-3 col-12">
                <div className="initiative-categories-box-layout custom-height d-flex flex-column align-items-center justify-content-center m-2">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                    height="50%"
                    width="50%"
                    className="contain-img mb-2"
                  />
                  <h3 className="dark-text text-center mb-0">
                    ادخل اسمك وايميلك
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export const EnterToLecture = EnterToLectureComponent;
