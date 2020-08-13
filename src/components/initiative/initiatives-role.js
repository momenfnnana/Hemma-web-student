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
                <Button className="btn w-25 yellow-btn justify-content-center d-flex light-text align-items-center">
                  <div className="col-md-2 w-25 p-2 pb-0 mb-4 d-flex flex-column center-right">
                    <img
                      height="50px"
                      width="50px"
                      src={process.env.PUBLIC_URL + "/assets/images/click.png"}
                      alt="trophy"
                    />
                  </div>
                  <h4>اضغط هنا</h4>
                </Button>
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
                <div className={"ar-text role-groups mb-0 w-50" + " light-bg"}>
                  <h5 className=" mb-0 pl-5">الدخول الى نظام فارس</h5>
                </div>
              </div>
              <div className="col-md-12 d-flex align-items-center justify-content-center mt-4">
                <div className="number-circle">
                  <h4 className="en-text">2</h4>
                </div>
                <div className={"ar-text role-groups mb-0 w-50" + " light-bg"}>
                  <h5 className=" mb-0 pl-5">صلاحية الخدمة الذاتية للموظف</h5>
                </div>
              </div>
              <div className="col-md-12 d-flex align-items-center justify-content-center mt-4">
                <div className="number-circle">
                  <h4 className="en-text">3</h4>
                </div>
                <div className={"ar-text role-groups mb-0 w-50" + " light-bg"}>
                  <h5 className=" mb-0 pl-5">الرواتب والبدلات</h5>
                </div>
              </div>
              <div className="col-md-12 d-flex align-items-center justify-content-center mt-4">
                <div className="number-circle">
                  <h4 className="en-text">4</h4>
                </div>
                <div className={"ar-text role-groups mb-0 w-50" + " light-bg"}>
                  <h5 className=" mb-0 pl-5">تفاصيل الموظف</h5>
                </div>
              </div>
              <div className="col-md-12 d-flex align-items-center justify-content-center mt-4">
                <div className="number-circle">
                  <h4 className="en-text">5</h4>
                </div>
                <div className={"ar-text role-groups mb-0 w-50" + " light-bg"}>
                  <h5 className=" mb-0 pl-5">الوظيفة</h5>
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
