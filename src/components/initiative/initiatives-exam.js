import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
class InitiativesExamComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row mb-3">
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
                <h1 className="dark-text mb-1">
                  لمعرفة الاختبارات المناسبة لمؤهلك
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row mb-3">
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center mb-5">
                <Link
                  className="btn w-25 yellow-btn justify-content-center d-flex light-text align-items-center"
                  to={{
                    pathname:
                      "https://www.moe.gov.sa/ar/news/Documents/dleel_boys.pdf",
                  }}
                  target="_blank"
                >
                  <div className="col-md-2 w-25 p-2 pb-0 mb-4 center-right d-md-block d-none">
                    <img
                      className="d-none d-md-block"
                      height="50px"
                      width="50px"
                      src={process.env.PUBLIC_URL + "/assets/images/click.png"}
                      alt="click"
                    />
                  </div>
                  دليل التخصصات للمعلمين
                </Link>
              </div>
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center mb-5">
                <Link
                  className="btn w-25 yellow-btn justify-content-center d-flex light-text align-items-center"
                  to={{
                    pathname:
                      "https://www.moe.gov.sa/ar/news/Documents/dleel_girls.pdf",
                  }}
                  target="_blank"
                >
                  <div className="col-md-2 w-25 p-2 pb-0 mb-4 center-right d-md-block d-none">
                    <img
                      className="d-none d-md-block"
                      height="50px"
                      width="50px"
                      src={process.env.PUBLIC_URL + "/assets/images/click.png"}
                      alt="click"
                    />
                  </div>
                  دليل التخصصات للمعلمات
                </Link>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export const InitiativesExam = InitiativesExamComponent;
