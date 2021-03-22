import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import { MdLockOutline } from "react-icons/md";
import { inputField } from "../shared/inputs/inputField";
import { phoneField } from "../shared/inputs/phoneField";
import { withRouter } from "react-router-dom";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-clip-rotate.scss";
import {
  loginAction,
  sendToken,
  loginFailed
} from "../../actions/login.actions";
import axios from "axios";
import { Helmet } from "react-helmet";

const validate = values => {
  const errors = {};
  if (
    !values.phone ||
    !values.phone.phoneNumber ||
    values.phone.phoneNumber.trim() === ""
  ) {
    errors.phone = "يجب تعبئة هذه الخانة";
  } else if (!/^[0-9]*$/.test(values.phone.phoneNumber)) {
    errors.phone = "هذه الخانة يجب أن تحتوي على أرقام فقط";
  } else if (!/^0\d{9}$/.test(values.phone.phoneNumber)  && values.phone.countryCode !="eg") {
    errors.phone = "رقم الهاتف يجب أن يحتوي 10 ارقام وان يبدأ بصفر";
  } 
 else if (!/^0\d{10}$/.test(values.phone.phoneNumber) && values.phone.countryCode =="eg") {
  errors.phone = "رقم الهاتف يجب أن يحتوي 11 ارقام وان يبدأ بصفر";
 }
  if (!values.password) {
    errors.password = "يجب تعبئة هذه الخانة";
  }
  return errors;
};

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: false,
      password: "",
      loading: false
    };
    this.togglePasswordShow = this.togglePasswordShow.bind(this);
  }

  togglePasswordShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  myFormHandler = values => {
    const request = this.props.loginAction({
      countryCode: values.phone.countryCode,
      phoneNumber: values.phone.phoneNumber,
      password: values.password
    });
    this.setState({ loading: true });

    request
      .then(action => {
        this.setState({ loading: false });
        if (!this.props.phoneNumberConfirmed) {
          this.props
            .sendToken()
            .then(response => {
              this.props.history.push("/verify");
            })
            .catch(error => {
              this.props.history.push("/");
            });
        } else {
          this.props.history.push("/");
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        this.props.loginFailed(error);
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
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>تسجيل الدخول | منصّة همّة التعليمية</title>
          <meta
            name="description"
            content="قم بتسجيل الدخول لحسابك الخاص وابدأ دوراتك الآن! "
          />
        </Helmet>
        <form className="centered" onSubmit={handleSubmit(this.myFormHandler)}>
          <Field
            fieldName="phone"
            name="phone"
            component={phoneField}
            containerClassName="intl-tel-input"
            inputClassName="form-control"
            defaultCountry="sa"
          />

          <div className="position-relative">
            <Field
              name="password"
              type={this.state.hidden ? "text" : "password"}
              component={inputField}
              className="form-control border-left-0 pl-0 ltr-input pw-input"
              placeholder="كلمة المرور"
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
                className="position-absolute left-input-icon"
                onClick={this.togglePasswordShow}
              />
            )}
          </div>

          <button
            type="submit"
            className="btn dark-outline-btn w-100 justify-content-center d-flex align-items-center"
            disabled={submitting}
          >
            {this.state.loading == true ? (
              <Loader type="ball-clip-rotate" />
            ) : (
              "تسجيل الدخول"
            )}
          </button>
        </form>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.Login && state.form.Login.values,
    phoneNumberConfirmed: state.auth.phoneNumberConfirmed,
    authenticated: state.auth.authenticated
  };
}

LoginComponent = reduxForm({
  form: "Login",
  validate
})(LoginComponent);

LoginComponent = connect(
  mapStateToProps,
  { loginAction, sendToken, loginFailed }
)(LoginComponent);

export const Login = withRouter(LoginComponent);
