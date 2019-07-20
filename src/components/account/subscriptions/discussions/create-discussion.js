import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../../../shared/inputs/inputField";
import { selectField } from "../../../shared/inputs/selectField";
import { textareaField } from "../../../shared/inputs/textareaField";
import { withRouter } from "react-router-dom";

export class DiscussionComponent extends Component {
  render() {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "30%",
        height: "auto",
        borderWidth: 0,
        padding: 20
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2
      }
    };
    const {
      isDiscussionOpen,
      closeDiscussion,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={isDiscussionOpen}
          onRequestClose={closeDiscussion}
          closeDiscussion={closeDiscussion}
        >
          <div className="container h-100 pt-3 pb-3 w-75 mx-auto">
            <div className="row">
              <div className="col-12">
                <h6 className="light-text mb-4 mt-0">إنشاء نقاش جديد</h6>
              </div>
            </div>

            <form>
              <div className="row">
                <div className="col-12">
                  <Field
                    name="fileName"
                    type="text"
                    component={inputField}
                    className="form-control border-left-0 pl-0"
                    placeholder="العنوان"
                  />
                </div>

                <div className="col-md-6 col-12">
                  <label className="dark-text small"> وقت البداية</label>
                  <Field
                    name="fileName"
                    type="date"
                    component={inputField}
                    className="form-control border-left-0 pl-0"
                  />
                </div>

                <div className="col-md-6 col-12">
                  <label className="dark-text small">وقت النهاية</label>

                  <Field
                    name="fileName"
                    type="date"
                    component={inputField}
                    className="form-control border-left-0 pl-0"
                  />
                </div>

                <div className="col-12 text-center">
                  <button className="btn light-outline-btn mt-3 w-100">
                    إنشاء
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.Discussion && state.form.Discussion.values
  };
}

DiscussionComponent = reduxForm({
  form: "Discussion"
})(DiscussionComponent);

DiscussionComponent = connect(mapStateToProps)(DiscussionComponent);

export const Discussion = withRouter(DiscussionComponent);
