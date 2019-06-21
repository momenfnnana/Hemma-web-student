import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { textareaField } from "../../../shared/inputs/textareaField";
import { withRouter } from "react-router-dom";
import "./styles.sass";

export class DiscussionDetailsComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row mb-4 no-gutters">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center responsive-col">
              <h6 className="dark-text small mb-0 mt-0">
                سؤال سريع عن إحدى زوايا المثلث
              </h6>
            </div>
          </div>
        </div>

        <div className="row no-gutters">
          <div className="col-12">
            <div className="box-layout shadow-sm">
              <div className="discussion-item pt-4 unset-height">
                <div className="media d-flex align-items-start mb-3">
                  <div className="media-body">
                    <h6 className="dark-text">
                      سؤال سريع عن إحدى زوايا المثلث
                    </h6>
                    <div className="d-flex align-items-center">
                      <h6 className="dark-silver-text smaller mb-0 mr-3">
                        بواسطة: ريحان شاهين،{" "}
                        <span className="light-text">النسبة والتناسب</span>
                      </h6>
                      <h6 className="dark-silver-text smaller en-text mb-0">
                        15 - 3 -2019
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-end justify-content-end">
                    <span className="badge red-bg text-white">سؤال مهم</span>
                  </div>
                </div>
                <p className="light-font-text dark-text small">
                  اللغة العربية من اللغات العالمية الأكثر انتشاراً في العالم،
                  وتعتبرُ من إحدى اللغات المُعتمدة في الأمم المُتحدة، كما إنها
                  تشكل اللغة الأولى في مناطق بلاد الشّام، وشبه الجزيرة العربية،
                  وشمال أفريقيا، وساهم هذا الانتشار الواسعُ للغة العربية في
                  تصنيفها كواحدة من اللّغاتِ التي يسعى.
                </p>
              </div>

              <div className="silver-bg p-4">
                <h6 className="dark-text mb-3">لديك تعليق؟</h6>
                <Field
                  component={textareaField}
                  className="form-control smaller silver-text shadow-sm"
                  name="desc"
                  placeholder="اذا كنت تعرف جواب السؤال اترك تعليقا"
                  rows="8"
                />
                <button className="btn light-outline-btn btn-sm unset-height pl-5 pr-5 float-right">
                  ارسال
                </button>
                <div className="clearfix" />

                <div className="d-flex justify-content-between align-items-center responsive-col mt-4">
                  <h6 className="dark-text small mb-0 mt-0">التعليقات</h6>

                  <div className="d-flex align-items-center">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/chat.png"}
                      height="15"
                      width="20"
                      className="contain-img mr-1"
                    />
                    <h6 className="mid-text en-text mb-0">1</h6>
                  </div>
                </div>

                <div className="box-layout shadow-sm bg-white mt-3">
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex align-items-center">
                        <h6 className="light-text smaller mb-0 mr-3">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/blue-user.png"
                            }
                            width="20"
                            className="contain-img mr-2"
                          />
                          محمد أحمد
                        </h6>
                      </div>
                      <div className="d-flex align-items-end justify-content-end">
                        <h6 className="light-text smaller mb-0 mr-3">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/check-mark.png"
                            }
                            width="15"
                            className="contain-img mr-1"
                          />
                          إجابة معتمدة{" "}
                        </h6>
                        <h6 className="dark-silver-text smaller en-text mb-0">
                          15 - 3 -2019
                        </h6>
                      </div>
                    </div>
                    <p className="light-font-text dark-text smaller">
                      اللغة العربية من اللغات العالمية الأكثر انتشاراً في
                      العالم، وتعتبرُ من إحدى اللغات المُعتمدة في الأمم
                      المُتحدة، كما إنها تشكل اللغة الأولى في مناطق بلاد الشّام،
                      وشبه الجزيرة العربية، وشمال أفريقيا، وساهم هذا الانتشار
                      الواسعُ للغة العربية في تصنيفها كواحدة من اللّغاتِ التي
                      يسعى.
                    </p>
                  </div>
                </div>

                <div className="box-layout shadow-sm bg-white mt-3">
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex align-items-center">
                        <h6 className="light-text smaller mb-0 mr-3">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/blue-user.png"
                            }
                            width="20"
                            className="contain-img mr-2"
                          />
                          محمد أحمد
                        </h6>
                      </div>
                      <div className="d-flex align-items-end justify-content-end">
                        <h6 className="dark-silver-text smaller en-text mb-0">
                          15 - 3 -2019
                        </h6>
                      </div>
                    </div>
                    <p className="light-font-text dark-text smaller">
                      وشمال أفريقيا، وساهم هذا الانتشار الواسعُ للّغة العربيّة.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues:
      state.form.DiscussionDetails && state.form.DiscussionDetails.values
  };
}

DiscussionDetailsComponent = reduxForm({
  form: "DiscussionDetails"
})(DiscussionDetailsComponent);

DiscussionDetailsComponent = connect(mapStateToProps)(
  DiscussionDetailsComponent
);

export const DiscussionDetails = withRouter(DiscussionDetailsComponent);
