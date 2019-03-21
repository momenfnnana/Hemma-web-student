import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import axios from "axios";
import { MdLockOutline } from "react-icons/md";
import { inputField } from "../shared/inputs/inputField";
import { phoneField } from "../shared/inputs/phoneField";
import jwt from "jsonwebtoken";
import { withRouter, Link } from "react-router-dom";
import "./styles.sass";
import { FaRegUser } from "react-icons/fa";

const validate = values => {
  const errors = {};
  if (
    !values.phone ||
    !values.phone.phoneNumber ||
    values.phone.phoneNumber.trim() === ""
  ) {
    errors.phone = "يجب تعبئة هذه الخانة";
  } else if (values.phone.phoneNumber.length < 8) {
    errors.phone = "ادخل رقم هاتف صحيح";
  }
  if (!values.password) {
    errors.password = "يجب تعبئة هذه الخانة";
  } else if (values.password.length < 8) {
    errors.password = "كلمة المرور يجب أن لا تقل عن ٨ أحرف";
  } else if (values.password.length > 24) {
    errors.password = "كلمة المرور يجب أن لا تزيد عن ٢٤ حرف";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
      values.password
    )
  ) {
    errors.password =
      "كلمة المرور يجب أن تحتوي على أحرف كبيرة، أحرف صغيرة، رموز، و أرقام";
  }
  return errors;
};

class AccountResetComponent extends Component {
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
      .post("https://api.staging.hemma.sa/api/v1/auth/password/change", data, {
        headers
      })
      .then(response => {
        swal("تنبيه", "تم تغيير كلمة المرور بنجاح", "success", {
          button: "متابعة"
        });
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
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="dark-text">الملف الشخصي</h3>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <div className="bg-white box-layout w-100 p-5 d-flex align-items-center justify-content-center flex-column">
                  <h6 className="dark-text small mb-4">
                    قم بتعيين كلمة مرور جديدة
                  </h6>
                  <form
                    className="w-25"
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

                    <Field
                      name="confirmPassword"
                      type="password"
                      component={inputField}
                      className="form-control border-left-0 pl-0 ltr-input"
                      placeholder="تأكيد كلمة المرور"
                    >
                      <MdLockOutline />
                    </Field>

                    <button className="btn dark-outline-btn w-100">
                      حفظ التعديلات{" "}
                    </button>
                  </form>
                  <Link to="/account/edit" className="light-text small mt-3">
                    رجوع إلى الملف الشخصي{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.AccountReset && state.form.AccountReset.values
  };
}

AccountResetComponent = reduxForm({
  form: "AccountReset",
  validate
})(AccountResetComponent);

AccountResetComponent = connect(mapStateToProps)(AccountResetComponent);

export const AccountReset = withRouter(AccountResetComponent);
