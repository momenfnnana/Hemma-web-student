import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import axios from "axios";
import { FaRegUser, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { inputField } from "../shared/inputs/inputField";
import { phoneField } from "../shared/inputs/phoneField";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-clip-rotate.scss";
import jwt from "jsonwebtoken";

const required = value => (value ? undefined : "يجب تعبئة هذه الخانة");
const maxLength = max => value =>
  value && value.length > max
    ? `كلمة المرور يجب أن لا تزيد عن ${max} خانات`
    : undefined;
const maxLength10 = maxLength(10);
export const minLength = min => value =>
  value && value.length < min
    ? `كلمة المرور يجب أن لا تقل عن ${min} خانات`
    : undefined;
export const minLength4 = minLength(4);
// const nameValue = value =>
//   value && !/^[a-zA-Z]{2,40}(?: +[a-zA-Z]{2,40})+$/.test(value)
//     ? "الاسم يجب أن يحتوي على مقطعين على الأقل"
//     : undefined;
const passwordValue = value =>
  value &&
  !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})/.test(value)
    ? "كلمة المرور يجب أن تحتوي على أحرف كبيرة، أحرف صغيرة، رموز، و أرقام"
    : undefined;
const emailValue = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "يرجى إدخال البريد الإلكتروني بصيغة صحيحة"
    : undefined;
const passwordsMatch = (value, allValues) =>
  value !== allValues.password ? "كلمة المرور غير متطابقة" : undefined;
class RegisterComponent extends Component {
  state = {
    loading: false
  };
  myFormHandler = values => {
    let data = {
      countryCode: values.phone.countryCode,
      phoneNumber: values.phone.phoneNumber,
      email: values.email,
      password: values.password,
      name: values.username,
      gender: values.gender
    };
    this.setState({ loading: true });
    axios
      .post("https://api.staging.hemma.sa/api/v1/auth/register", data)
      .then(response => {
        axios
          .post(
            "https://api.staging.hemma.sa/api/v1/auth/login_with_phone",
            data
          )
          .then(response => {
            localStorage.setItem("token", response.data.data.token);
          })
          .then(res => {
            let token = localStorage.getItem("token");
            let jwtToken = jwt.decode(token);
            localStorage.setItem("jwtToken", jwtToken);
            this.setState({ loading: false });
            if (jwtToken.phoneConfirmed == "False") {
              let headers = {
                Authorization: `Bearer ${token}`
              };
              axios
                .post(
                  "https://api.staging.hemma.sa/api/v1/auth/phone/send_token",
                  null,
                  { headers }
                )
                .then(response => {
                  this.props.history.push("/verify");
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              this.props.history.push("/");
            }
          })
          .catch(error => {
            this.setState({ loading: false });
            switch (error.response.data && error.response.data.error) {
              case "InvalidCredentials":
                swal("عفواً", "يرجى التحقق من البيانات المدخلة", "error", {
                  button: "متابعة"
                });
                break;

              default:
                console.log(error);
            }
          });
      })
      .catch(error => {
        this.setState({ loading: false });
        switch (error.response.data && error.response.data.error) {
          case "Duplicate":
            swal("عفواً", "هذا المستخدم مسجل سابقاً", "error", {
              button: "متابعة"
            });
            break;

          default:
            console.log(error);
        }
      });
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form className="centered" onSubmit={handleSubmit(this.myFormHandler)}>
        <Field
          name="username"
          type="text"
          component={inputField}
          className="form-control border-left-0 pl-0"
          placeholder="الاسم الكامل"
          validate={required}
        >
          <FaRegUser />
        </Field>

        <label className="pr-2 dark-silver-text">أنا: </label>
        <div className="form-check form-check-inline mb-3">
          <Field
            className="form-check-input"
            type="radio"
            name="gender"
            value="0"
            component="input"
            validate={required}
          />
          <label className="form-check-label dark-text small">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/male.png"}
              width="100%"
              className="mr-1"
              width="12"
            />
            ذكر
          </label>
        </div>
        <div className="form-check form-check-inline mb-3">
          <Field
            className="form-check-input"
            type="radio"
            name="gender"
            value="1"
            component="input"
            validate={required}
          />
          <label className="form-check-label dark-text small">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/female.png"}
              width="100%"
              className="mr-1"
              width="12"
            />
            أنثى
          </label>
        </div>

        <Field
          fieldName="phone"
          name="phone"
          component={phoneField}
          containerClassName="intl-tel-input"
          inputClassName="form-control"
          defaultCountry="sa"
          validate={required}
        />

        <Field
          name="password"
          type="password"
          component={inputField}
          className="form-control border-left-0 pl-0 ltr-input"
          placeholder="كلمة المرور"
          validate={[
            required,
            maxLength10,
            minLength4,
            passwordValue,
            passwordsMatch
          ]}
        >
          <MdLockOutline />
        </Field>

        <Field
          name="confirmPassword"
          type="password"
          component={inputField}
          className="form-control border-left-0 pl-0 ltr-input"
          placeholder="تأكيد كلمة المرور"
          validate={[
            required,
            maxLength10,
            minLength4,
            passwordValue,
            passwordsMatch
          ]}
        >
          <MdLockOutline />
        </Field>

        <Field
          name="email"
          type="email"
          component={inputField}
          className="form-control border-left-0 pl-0 ltr-input"
          placeholder="البريد الإلكتروني"
          validate={emailValue}
        >
          <FaRegEnvelope />
        </Field>

        <button
          type="submit"
          className="btn dark-outline-btn w-100"
          disabled={submitting}
        >
          {this.state.loading == true ? (
            <Loader type="ball-clip-rotate" />
          ) : (
            "تسجيل"
          )}
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.Register && state.form.Register.values
  };
}

RegisterComponent = reduxForm({
  form: "Register"
})(RegisterComponent);

RegisterComponent = connect(mapStateToProps)(RegisterComponent);

export const Register = RegisterComponent;
