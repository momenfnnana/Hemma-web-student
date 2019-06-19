import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import axios from "axios";
import { MdLockOutline } from "react-icons/md";
import { inputField } from "../../shared/inputs/inputField";
import { phoneField } from "../../shared/inputs/phoneField";
import jwt from "jsonwebtoken";
import { withRouter, Link } from "react-router-dom";
import "./styles.sass";
import { FaRegUser } from "react-icons/fa";
import { apiBaseUrl } from "../../../api/helpers";

const validate = values => {
  const errors = {};
  if (!values.oldPassword) {
    errors.oldPassword = "يجب تعبئة هذه الخانة";
  }
  if (!values.newPassword) {
    errors.newPassword = "يجب تعبئة هذه الخانة";
  } else if (values.newPassword.length < 4) {
    errors.newPassword = "كلمة المرور يجب أن لا تقل عن 4 أحرف";
  } else if (values.newPassword.length > 10) {
    errors.newPassword = "كلمة المرور يجب أن لا تزيد عن 10 حرف";
  }
  return errors;
};

class UpdatePasswordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  myFormHandler = values => {
    let token = localStorage.getItem("token");

    let data = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword
    };
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .post(`${apiBaseUrl}/auth/password/change`, data, {
        headers
      })
      .then(response => {
        swal("تنبيه", "تم تغيير كلمة المرور بنجاح", "success", {
          button: "متابعة"
        });
        this.props.history.push("/account/update");
      })
      .catch(error => {
        switch (error.response.data && error.response.data.error) {
          case "InvalidCredentials":
            swal("عفواً", "كلمة المرور الحالية خاطئة", "error", {
              button: "متابعة"
            });
            break;

          default:
            console.log("other error");
        }
      });
  };

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <React.Fragment>
        <h3 className="dark-text">تغيير كلمة المرور</h3>

        <div className="row mt-3">
          <div className="col-md-12">
            <div className="bg-white box-layout w-100 p-5 d-flex align-items-center justify-content-center flex-column">
              <h6 className="dark-text small mb-4">
                قم بتعيين كلمة مرور جديدة
              </h6>
              <form
                className="w-35"
                onSubmit={handleSubmit(this.myFormHandler)}
              >
                <Field
                  name="oldPassword"
                  type="password"
                  component={inputField}
                  className="form-control border-left-0 pl-0 ltr-input"
                  placeholder="كلمة المرور الحالية"
                >
                  <MdLockOutline />
                </Field>
                <Field
                  name="newPassword"
                  type="password"
                  component={inputField}
                  className="form-control border-left-0 pl-0 ltr-input"
                  placeholder="كلمة المرور الجديدة"
                >
                  <MdLockOutline />
                </Field>

                <button className="btn dark-outline-btn w-100 mt-3">
                  حفظ التعديلات{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.ResetPassword && state.form.ResetPassword.values
  };
}

UpdatePasswordComponent = reduxForm({
  form: "ResetPassword",
  validate
})(UpdatePasswordComponent);

UpdatePasswordComponent = connect(mapStateToProps)(UpdatePasswordComponent);

export const UpdatePassword = withRouter(UpdatePasswordComponent);
