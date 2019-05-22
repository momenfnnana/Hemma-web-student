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
import { RadioField } from "../shared/inputs/RadioFeild";
import { apiBaseUrl } from "../../api/helpers";

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
const nameValue = value =>
  value && !/^[\u0621-\u064A\w]{2,}(\s[\u0621-\u064A\w]{2,})+\s*$/.test(value)
    ? "الاسم يجب أن يحتوي على مقطعين على الأقل"
    : undefined;
const emailValue = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "يرجى إدخال البريد الإلكتروني بصيغة صحيحة"
    : undefined;

class RegisterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      password: "",
      loading: false
    };
    this.togglePasswordShow = this.togglePasswordShow.bind(this);
  }

  togglePasswordShow() {
    this.setState({ hidden: !this.state.hidden });
  }

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
      .post(`${apiBaseUrl}/auth/register`, data)
      .then(response => {
        axios
          .post(`${apiBaseUrl}/auth/login_with_phone`, data)
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
                .post(`${apiBaseUrl}/auth/phone/send_token`, null, { headers })
                .then(response => {
                  this.props.history.push("/verify");
                })
                .catch(error => {
                  window.location = "/";
                });
            } else {
              window.location = "/";
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
          validate={[required, nameValue]}
        >
          <FaRegUser />
        </Field>

        <div className="mb-3">
          <label className="pr-2 dark-silver-text mb-0">أنا: </label>

          <Field
            component={RadioField}
            name="gender"
            validate={required}
            options={[
              { title: "ذكر", value: "male" },
              { title: "أنثى", value: "female" }
            ]}
          />
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

        <div className="position-relative">
          <Field
            name="password"
            type={this.state.hidden ? "text" : "password"}
            component={inputField}
            className="form-control border-left-0 pl-0 ltr-input pw-input"
            placeholder="كلمة المرور"
            validate={[required, maxLength10, minLength4]}
          >
            <MdLockOutline />
          </Field>
          {this.state.hidden ? (
            <img
              src={process.env.PUBLIC_URL + "/assets/images/closed-eye.png"}
              width="100%"
              width="20"
              className="position-absolute left-input-icon"
              onClick={this.togglePasswordShow}
            />
          ) : (
            <img
              src={process.env.PUBLIC_URL + "/assets/images/eye.png"}
              width="100%"
              width="20"
              className="position-absolute left-input-icon custom-top"
              onClick={this.togglePasswordShow}
            />
          )}
        </div>

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
