import React, { Component } from "react";

export default class BankAccounts extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="pt-3 pb-5">
          <div className="container">
            <div className="row pt-5">
              <div className="col-12 text-center">
                <h6 className="dark-text">
                  حسابات البنوك المعتمدة لدى مؤسسة همّة التعليمية
                </h6>
              </div>
            </div>
            <div className="row pt-5 pb-5">
              <div className="col-md-1" />
              <div className="col-md-5">
                <div className="box-layout green-box">
                  <div className="box-header p-3 text-center bg-white">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/ncb.png"}
                      height="40"
                      className="contain-img"
                      alt="NCB Bank"
                    />
                  </div>
                  <div className="box-body silver-bg text-center p-3">
                    <h6 className="small dark-text mb-1">
                      رقم حسابنا البنكي (آيبان)
                    </h6>
                    <p className="small dark-silver-text en-text">
                      SA821 00000 22300 00011 6300
                    </p>

                    <h6 className="small dark-text mb-1">رقم حسابنا البنكي </h6>
                    <p className="small dark-silver-text en-text">
                      22300000116300
                    </p>

                    <h6 className="small dark-text mb-1">حسابنا باسم</h6>
                    <p className="small dark-silver-text mb-0">
                      مؤسسة همة التعليمية لتقنية المعلومات
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="box-layout blue-box">
                  <div className="box-header p-3 text-center">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/rajhi.png"}
                      height="40"
                      className="contain-img"
                      alt="Rajhi Bank"
                    />
                  </div>
                  <div className="box-body silver-bg text-center p-3">
                    <h6 className="small dark-text mb-1">
                      رقم حسابنا البنكي (آيبان)
                    </h6>
                    <p className="small dark-silver-text en-text">
                      SA04 8000 0510 6080 1058 8880
                    </p>

                    <h6 className="small dark-text mb-1">رقم حسابنا البنكي </h6>
                    <p className="small dark-silver-text en-text">
                      510608010588880
                    </p>

                    <h6 className="small dark-text mb-1">حسابنا باسم</h6>
                    <p className="small dark-silver-text mb-0">
                      مؤسسة همة التعليمية لتقنية المعلومات
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-1" />
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
