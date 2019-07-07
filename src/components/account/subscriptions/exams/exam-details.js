import React, { Component } from "react";
import { CustomInput, Form, FormGroup, Label } from "reactstrap";
import "../styles.sass";

export class ExamDetails extends Component {
  render() {
    const courseId = this.props.match.params.id;

    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12">
            <div className="box-layout shadow-sm h-100 p-4 pb-5">
              <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-between">
                  <h6 className="mid-text mb-0">
                    الامتحان الأول: القطوع المخروطية
                  </h6>
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/silver-clock.png"
                      }
                      height="14"
                      width="14"
                      className="contain-img mr-1"
                    />
                    <p className="small en-text dark-silver-text mb-0">3:30</p>
                  </div>
                </div>
              </div>

              <div className="question-item">
                <div className="row">
                  <div className="col-12">
                    <hr />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-12">
                        <h6 className="dark-text">السؤال الأول</h6>
                        <p className="dark-silver-text small light-font-text">
                          ذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد
                          تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن
                          تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى
                          زيادة عدد الحروف التى يولدها التطبيق.
                        </p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <h6 className="dark-silver-text small mb-3">
                          اختر الإجابة الصحيحة
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <CustomInput
                          type="radio"
                          label="الإجابة الأولى"
                          className="small dark-silver-text light-font-text"
                        />
                      </div>
                      <div className="col-md-6">
                        <CustomInput
                          type="radio"
                          label="الإجابة الثانية"
                          className="small dark-silver-text light-font-text"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <CustomInput
                          type="radio"
                          label="الإجابة الثالثة"
                          className="small dark-silver-text light-font-text"
                        />
                      </div>
                      <div className="col-md-6">
                        <CustomInput
                          type="radio"
                          label="الإجابة الرابعة"
                          className="small dark-silver-text light-font-text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="question-item">
                <div className="row">
                  <div className="col-12">
                    <hr />
                  </div>
                </div>

                <div className="row">
                  <div className="col-8">
                    <div className="row">
                      <div className="col-12">
                        <h6 className="dark-text">السؤال الأول</h6>
                        <p className="dark-silver-text small light-font-text">
                          ذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد
                          تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن
                          تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى
                          زيادة عدد الحروف التى يولدها التطبيق.
                        </p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <h6 className="dark-silver-text small mb-3">
                          اختر الإجابة الصحيحة
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <CustomInput
                          type="radio"
                          label="الإجابة الأولى"
                          className="small dark-silver-text light-font-text"
                        />
                      </div>
                      <div className="col-md-6">
                        <CustomInput
                          type="radio"
                          label="الإجابة الثانية"
                          className="small dark-silver-text light-font-text"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <CustomInput
                          type="radio"
                          label="الإجابة الثالثة"
                          className="small dark-silver-text light-font-text"
                        />
                      </div>
                      <div className="col-md-6">
                        <CustomInput
                          type="radio"
                          label="الإجابة الرابعة"
                          className="small dark-silver-text light-font-text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="row">
                      <div className="col-12">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/assets/images/graph.png"
                          }
                          height="180"
                          width="100%"
                          className="contain-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="question-item">
                <div className="row">
                  <div className="col-12">
                    <hr />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-12">
                        <h6 className="dark-text">السؤال الأول</h6>
                        <p className="dark-silver-text small light-font-text">
                          ذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد
                          تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن
                          تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى
                          زيادة عدد الحروف التى يولدها التطبيق.
                        </p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <h6 className="dark-silver-text small mb-3">
                          اختر الإجابة الصحيحة
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <CustomInput
                          type="radio"
                          label="الإجابة الأولى"
                          className="small dark-silver-text light-font-text"
                        />
                      </div>
                      <div className="col-md-6">
                        <CustomInput
                          type="radio"
                          label="الإجابة الثانية"
                          className="small dark-silver-text light-font-text"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <CustomInput
                          type="radio"
                          label="الإجابة الثالثة"
                          className="small dark-silver-text light-font-text"
                        />
                      </div>
                      <div className="col-md-6">
                        <CustomInput
                          type="radio"
                          label="الإجابة الرابعة"
                          className="small dark-silver-text light-font-text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-12 text-center">
                  <button className="btn light-outline-btn w-40">
                    اعتمد الاجابة{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
