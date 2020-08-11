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
                <Button className="btn w-50 yellow-btn justify-content-center d-flex light-text align-items-center">
                  دليل التخصصات للمعلمين
                </Button>
              </div>
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center mb-5">
                <Button className="btn w-50 yellow-btn justify-content-center d-flex light-text align-items-center">
                  دليل التخصصات للمعلمات
                </Button>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export const InitiativesExam = InitiativesExamComponent;
