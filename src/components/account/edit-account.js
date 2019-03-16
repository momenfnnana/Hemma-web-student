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

class EditAccountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
                <div className="white-bg box-layout w-100 p-5 d-flex align-items-center justify-content-center flex-column">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/profile-img.png"
                    }
                    height="110"
                    className="mb-4"
                  />
                  <form className="w-25">
                    <Field
                      name="username"
                      type="text"
                      component={inputField}
                      className="form-control border-left-0 pl-0"
                      placeholder="الاسم الكامل"
                    >
                      <FaRegUser />
                    </Field>
                    <Field
                      fieldName="phone"
                      name="phone"
                      component={phoneField}
                      containerClassName="intl-tel-input"
                      inputClassName="form-control"
                      defaultCountry="sa"
                    />

                    <Field
                      name="password"
                      type="password"
                      component={inputField}
                      className="form-control border-left-0 pl-0 ltr-input"
                      placeholder="كلمة المرور"
                    >
                      <MdLockOutline />
                    </Field>
                    <Link
                      to="/account/reset-password"
                      className="light-text smaller"
                    >
                      تعديل كلمة المرور
                    </Link>
                    <button
                      type="submit"
                      className="btn dark-outline-btn w-100 mt-3"
                    >
                      حفظ التعديلات{" "}
                    </button>
                  </form>
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
    formValues: state.form.EditAccount && state.form.EditAccount.values
  };
}

EditAccountComponent = reduxForm({
  form: "EditAccount",
  validate
})(EditAccountComponent);

EditAccountComponent = connect(mapStateToProps)(EditAccountComponent);

export const EditAccount = withRouter(EditAccountComponent);
