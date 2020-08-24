import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
class InitiativesRoleComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="pt-0">
          <div className="container">
            <div className="row mb-3">
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center mt-4">
                <h1 className="dark-text mb-4">
                  لمعرفة الرتبة التي تم تسكينك عليها
                </h1>
              </div>
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center mt-4">
                <h4 className="ultra-text mb-4">
                  لمعرفة الرتبة التي تم تسكينك عليها اتبع الخطوات التالية :
                </h4>
              </div>
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center mt-4">
                <Link
                  className="btn w-25 yellow-btn justify-content-center d-flex light-text align-items-center"
                  to={{
                    pathname:
                      "https://edu.moe.gov.sa/Wadi/ElectronicServices/Faris/Pages/default.aspx",
                  }}
                  target="_blank"
                >
                  <div className=" col-md-2 w-25 p-2 pb-0 mb-4 center-right d-md-block d-none">
                    <img
                      className="d-none d-md-block"
                      height="50px"
                      width="50px"
                      src={process.env.PUBLIC_URL + "/assets/images/click.png"}
                      alt="trophy"
                    />
                  </div>
                  <h4>اضغط هنا</h4>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container pb-5">
            <div className="row mb-3">
              <div className="col-md-12 d-flex align-items-center justify-content-center mt-4">
                <div className="number-circle">
                  <h4 className="en-text">1</h4>
                </div>
                <div className={"ar-text role-groups mb-0 w-75" + " light-bg"}>
                  <h6 className=" mb-0 pl-5">الدخول الى نظام فارس</h6>
                </div>
              </div>
              <div className="col-md-12 d-flex align-items-center justify-content-center mt-4">
                <div className="number-circle">
                  <h4 className="en-text">2</h4>
                </div>
                <div className={"ar-text role-groups mb-0 w-75" + " light-bg"}>
                  <h6 className=" mb-0 pl-5">صلاحية الخدمة الذاتية للموظف</h6>
                </div>
              </div>
              <div className="col-md-12 d-flex align-items-center justify-content-center mt-4">
                <div className="number-circle">
                  <h4 className="en-text">3</h4>
                </div>
                <div className={"ar-text role-groups mb-0 w-75" + " light-bg"}>
                  <h6 className=" mb-0 pl-5">الرواتب والبدلات</h6>
                </div>
              </div>
              <div className="col-md-12 d-flex align-items-center justify-content-center mt-4">
                <div className="number-circle">
                  <h4 className="en-text">4</h4>
                </div>
                <div className={"ar-text role-groups mb-0 w-75" + " light-bg"}>
                  <h6 className=" mb-0 pl-5">تفاصيل الموظف</h6>
                </div>
              </div>
              <div className="col-md-12 d-flex align-items-center justify-content-center mt-4">
                <div className="number-circle">
                  <h4 className="en-text">5</h4>
                </div>
                <div className={"ar-text role-groups mb-0 w-75" + " light-bg"}>
                  <h6 className=" mb-0 pl-5">الوظيفة</h6>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export const InitiativesRole = InitiativesRoleComponent;
