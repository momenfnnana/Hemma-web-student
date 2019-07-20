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
