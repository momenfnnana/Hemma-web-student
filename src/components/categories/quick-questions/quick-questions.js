import React, { Component } from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

export class QuickQuestions extends Component {
  state = {
    percent: 25
  };
  render() {
    return (
      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9 d-flex align-items-center">
              <h4 className="light-text mb-0">الرياضيات</h4>
            </div>
            <div className="col-md-3 d-flex align-items-center justify-content-end">
              <button className="btn btn-sm unset-height small light-btn light-font-text w-25">
                إنضمام
              </button>
              <button className="btn btn-sm unset-height small red-outline-btn light-font-text w-25 ml-2">
                انسحاب
              </button>
            </div>
            <div className="col-md-12 mt-2">
              <p className="dark-text small text-break w-75">
                مجموعة الرياضيات هي مجموعة تابعة لمنصة القدرات و التحصيلي مجموعة
                الرياضيات هيي مجموعة تابعة لمنصة القدرات و التحصيلي مجموعة
                الرياضيات هيي مجموعة تابعة لمنصة القدرات و التحصيلي
              </p>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <h6 className="dark-text mb-0">عدد الأعضاء:</h6>
              <div className="members-circle en-text text-white ml-1">+30</div>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <h6 className="dark-text">
                عدد الأسئلة: <span className="en-text">50</span> سؤال
              </h6>
            </div>
          </div>
          <div className="row pt-4">
            <div className="col-md-12 text-center">
              <h5 className="dark-text">الأسئلة السريعة</h5>
              <p className="dark-silver-text small text-break mb-0">
                احصل على آخر إصداراتنا في القدرات والتحصيلي
              </p>
            </div>
          </div>

          <div className="row pt-4">
            <div className="col-md-12 d-flex align-items-center">
              <div className="title-circle">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/heart-gradient.png"
                  }
                />
              </div>
              <h5 className="dark-text mb-0">الاسئلة المفضلة</h5>
            </div>
          </div>

          <div className="row pt-4">
            <div className="col-md-4 d-flex align-items-center">
              <div className="question-card">
                <div className="row">
                  <div className="col-6">
                    <div className="answer-label">
                      <h6 className="smaller light-text mb-0">
                        تمت الإجابة على السؤال
                      </h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="favorite-label d-flex align-items-center justify-content-end">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/red-heart.png"
                        }
                        height="12"
                        className="mr-1"
                      />
                      <h6 className="smaller mid-text mb-0">
                        إزالة من المفضلة
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="question-body">
                  <div className="row">
                    <div className="col-md-12">
                      <h6 className="dark-text small">
                        سؤال عن النسبة والتناسب مكرر أعوام سابقة
                      </h6>
                      <p className="mid-text light-font-text smaller text-break">
                        سؤال عن النسبة و التناسب يقيس درجة فهم الطالب لمفاهيم
                        العامة للمفاهيم العامة للمفاهيم العامة للمفاهيم العامة
                      </p>
                    </div>
                  </div>
                </div>
                <div className="question-footer d-flex align-items-end justify-content-end">
                  <div className="row">
                    <div className="col-md-12">
                      <p className="light-font-text smaller dark-silver-text mb-0">
                        <React.Fragment>
                          منذ <span className="en-text">14</span> يوم
                        </React.Fragment>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="answers-ratio d-flex justify-content-center flex-column">
                  <div className="row">
                    <div className="col-md-12 d-flex align-items-center justify-content-center">
                      <h6 className="dark-text smaller mb-0 mr-2">
                        الإجابات الصحيحة
                      </h6>
                      <div className="w-50 en-text small red-text">
                        <Progress
                          percent={25}
                          status="error"
                          theme={{
                            error: {
                              symbol: this.state.percent + "%",
                              trailColor: "#f66271",
                              color: "#f66271"
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 d-flex align-items-center justify-content-center">
                      <h6 className="dark-text smaller mb-0 mr-2">
                        الإجابات الخاطئة
                      </h6>
                      <div className="w-50 en-text small">
                        <Progress
                          percent={100}
                          status="success"
                          theme={{
                            success: {
                              symbol: this.state.percent + "%",
                              trailColor: "#2bc3cc",
                              color: "#2bc3cc"
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <div className="question-card">
                <div className="row">
                  <div className="col-6">
                    <div className="answer-label">
                      <h6 className="smaller light-text mb-0">
                        تمت الإجابة على السؤال
                      </h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="favorite-label d-flex align-items-center justify-content-end">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/red-heart.png"
                        }
                        height="12"
                        className="mr-1"
                      />
                      <h6 className="smaller mid-text mb-0">
                        إزالة من المفضلة
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="question-body">
                  <div className="row">
                    <div className="col-md-12">
                      <h6 className="dark-text small">
                        سؤال عن النسبة والتناسب مكرر أعوام سابقة
                      </h6>
                      <p className="mid-text light-font-text smaller text-break">
                        سؤال عن النسبة و التناسب يقيس درجة فهم الطالب لمفاهيم
                        العامة للمفاهيم العامة للمفاهيم العامة للمفاهيم العامة
                      </p>
                    </div>
                  </div>
                </div>
                <div className="question-footer d-flex align-items-end justify-content-end">
                  <div className="row">
                    <div className="col-md-12">
                      <p className="light-font-text smaller dark-silver-text mb-0">
                        <React.Fragment>
                          منذ <span className="en-text">14</span> يوم
                        </React.Fragment>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="answers-ratio d-flex justify-content-center flex-column">
                  <div className="row">
                    <div className="col-md-12 d-flex align-items-center justify-content-center">
                      <h6 className="dark-text smaller mb-0 mr-2">
                        الإجابات الصحيحة
                      </h6>
                      <div className="w-50 en-text small red-text">
                        <Progress
                          percent={25}
                          status="error"
                          theme={{
                            error: {
                              symbol: this.state.percent + "%",
                              trailColor: "#f66271",
                              color: "#f66271"
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 d-flex align-items-center justify-content-center">
                      <h6 className="dark-text smaller mb-0 mr-2">
                        الإجابات الخاطئة
                      </h6>
                      <div className="w-50 en-text small">
                        <Progress
                          percent={100}
                          status="success"
                          theme={{
                            success: {
                              symbol: this.state.percent + "%",
                              trailColor: "#2bc3cc",
                              color: "#2bc3cc"
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row pt-4">
            <div className="col-md-12 d-flex align-items-center">
              <div className="title-circle">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/all-questions.png"
                  }
                />
              </div>
              <h5 className="dark-text mb-0">جميع الأسئلة</h5>
            </div>
          </div>
          <div className="row pt-4">
            <div className="col-md-4 d-flex align-items-center">
              <div className="question-card">
                <div className="row">
                  <div className="col-6">
                    <div className="answer-label">
                      <h6 className="smaller light-text mb-0">
                        تمت الإجابة على السؤال
                      </h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="favorite-label d-flex align-items-center justify-content-end">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/red-heart.png"
                        }
                        height="12"
                        className="mr-1"
                      />
                      <h6 className="smaller mid-text mb-0">
                        إزالة من المفضلة
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="question-body">
                  <div className="row">
                    <div className="col-md-12">
                      <h6 className="dark-text small">
                        سؤال عن النسبة والتناسب مكرر أعوام سابقة
                      </h6>
                      <p className="mid-text light-font-text smaller text-break">
                        سؤال عن النسبة و التناسب يقيس درجة فهم الطالب لمفاهيم
                        العامة للمفاهيم العامة للمفاهيم العامة للمفاهيم العامة
                      </p>
                    </div>
                  </div>
                </div>
                <div className="question-footer d-flex align-items-end justify-content-end">
                  <div className="row">
                    <div className="col-md-12">
                      <p className="light-font-text smaller dark-silver-text mb-0">
                        <React.Fragment>
                          منذ <span className="en-text">14</span> يوم
                        </React.Fragment>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="answers-ratio d-flex justify-content-center flex-column">
                  <div className="row">
                    <div className="col-md-12 d-flex align-items-center justify-content-center">
                      <h6 className="dark-text smaller mb-0 mr-2">
                        الإجابات الصحيحة
                      </h6>
                      <div className="w-50 en-text small red-text">
                        <Progress
                          percent={25}
                          status="error"
                          theme={{
                            error: {
                              symbol: this.state.percent + "%",
                              trailColor: "#f66271",
                              color: "#f66271"
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 d-flex align-items-center justify-content-center">
                      <h6 className="dark-text smaller mb-0 mr-2">
                        الإجابات الخاطئة
                      </h6>
                      <div className="w-50 en-text small">
                        <Progress
                          percent={100}
                          status="success"
                          theme={{
                            success: {
                              symbol: this.state.percent + "%",
                              trailColor: "#2bc3cc",
                              color: "#2bc3cc"
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
