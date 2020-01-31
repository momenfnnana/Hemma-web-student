import React, { Component } from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
export class QuestionSummary extends Component {
  state = {
    percent: 25
  };
  render() {
    return (
      <React.Fragment>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h5 className="dark-text mt-3">الأسئلة السريعة</h5>
                <p className="dark-text mt-2 small w-40 mx-auto text-break">
                  لا تفوت فرصة الاشتراك بأحدث دوراتنا التي تؤهلك لاجتياز امتحان
                  القدرات والتحصيلي بأعلى العلامات!
                </p>
              </div>
            </div>
            <div className="row py-5">
              <div className="col-md-12">
                <div className="row p-4 pb-2">
                  <div className="col-12">
                    <h6 className="dark-text">
                      سؤال عن النسبة والتناسب مكرر أعوام سابقة
                    </h6>
                    <p className="mid-text light-font-text small text-break w-50 mb-0">
                      سؤال عن النسبة و التناسب يقيس درجة فهم الطالب لمفاهيم
                      العامة للمفاهيم العامة للمفاهيم العامة للمفاهيم العامة
                    </p>
                  </div>
                </div>
                <div className="row pl-4 pr-4 pb-4">
                  <div className="col-7">
                    <div className="row d-flex justify-content-between align-items-center mb-3">
                      <div className="col-md-12">
                        <p className="small dark-silver-text mb-0">
                          ملخص الإجابات
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="en-text d-flex align-items-center mb-2">
                          <div className="key-circle failure ar-text">أ</div>
                          <div className="w-75">
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
                        <div className="en-text d-flex align-items-center mb-2">
                          <div className="key-circle success ar-text">ب</div>
                          <div className="w-75">
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
                        <div className="en-text d-flex align-items-center mb-2">
                          <div className="key-circle failure ar-text">ج</div>
                          <div className="w-75">
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
                        <div className="en-text d-flex align-items-center mb-2">
                          <div className="key-circle failure ar-text">د</div>
                          <div className="w-75">
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
                          <p className="ar-text mb-0 text-break smaller dark-text">
                            إجابتك
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-1" />
                  <div className="col-4 d-flex align-items-center">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/graph.png"}
                      className="contain-img w-100"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 d-flex align-items-center justify-content-center">
                <hr />
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
