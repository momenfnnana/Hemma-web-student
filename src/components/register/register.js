import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import { FaRegUser, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { inputField } from "../shared/inputs/inputField";
import { phoneField } from "../shared/inputs/phoneField";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-clip-rotate.scss";
import { RadioField } from "../shared/inputs/RadioFeild";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";
import {
  loginAction,
  signupUser,
  sendToken,
  loginFailed,
} from "../../actions/login.actions";
import { Helmet } from "react-helmet";
import { Api } from "../../api";
import axios from "axios";
import { apiBaseUrl } from "../../api/helpers";

const required = (value) => (value ? undefined : "يجب تعبئة هذه الخانة");
const maxLength = (max) => (value) =>
  value && value.length > max
    ? `كلمة المرور يجب أن لا تزيد عن ${max} خانات`
    : undefined;
const maxLength10 = maxLength(10);
export const minLength = (min) => (value) =>
  value && value.length < min
    ? `كلمة المرور يجب أن لا تقل عن ${min} خانات`
    : undefined;
const nameValue = (value) => {
  value = value || "";
  const trimmed = value.replace(/\s/g, "");
  const valid = /^[\u0621-\u064A\w]{5,}$/.test(trimmed);

  return valid ? undefined : "الاسم يجب أن يحتوي ٥ أحرف على الأقل";
};
const phoneValue = (value) => {
  value = value.phoneNumber || "";
  const trimmed = value.replace(/\s/g, "");
  const valid = /^0\d{9}$/.test(trimmed);

  return valid ? undefined : "رقم الهاتف يجب أن يحتوي 10 ارقام وان يبدأ بصفر";
};

export const minLength4 = minLength(4);
const emailValue = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "يرجى إدخال البريد الإلكتروني بصيغة صحيحة"
    : undefined;

class RegisterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      password: "",
      loading: false,
      cities: [],
      selectedCity: "",
      selectedLevel: "",
      educationalEntities: [],
      selected: null,
      nationalities: [],
      isPageLoading: false,
    };
    this.togglePasswordShow = this.togglePasswordShow.bind(this);
  }

  togglePasswordShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  myFormHandler = (values) => {
    const request = this.props.signupUser({
      countryCode: values.phone.countryCode,
      phoneNumber: values.phone.phoneNumber,
      email: values.email,
      password: values.password,
      name: values.username,
      gender: values.gender,
      educationalLevel: values.educationalLevel,
      educationalEntityId: values.educationalEntityId,
      saCityId: values.saCityId,
      nationalityId: values.nationalityId,
    });
    this.setState({ loading: true });
    request
      .then((action) => {
        // this.props.history.push("/");
        this.setState({ loading: false, isPageLoading: true });

        if (!this.props.phoneNumberConfirmed) {
          this.props
            .sendToken()
            .then(() => {
              this.props.history.push("/verify");
            })
            .catch((error) => {
              this.props.history.push("/");
            });
        } else {
          this.props.history.push("/");
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        switch (error.response.data && error.response.data.error) {
          case "Duplicate":
            swal("عفواً", "هذا المستخدم مسجل سابقاً", "error", {
              button: "متابعة",
            });
            break;

          default:
            console.log(error);
        }
      });
  };

  componentDidMount() {
    Api.auth.getCities().then((cities) => this.setState({ cities: cities }));
    axios.get(`${apiBaseUrl}/Nationalities/lookup`).then((response) => {
      this.setState({ nationalities: response.data.data });
    });
  }

  renderNationalities() {
    return this.state.nationalities.map((nationality) => (
      <option key={nationality.id} value={nationality.id}>
        {" "}
        {nationality.name}{" "}
      </option>
    ));
  }

  renderCities() {
    return this.state.cities.map((city) => (
      <option key={city.id} value={city.id}>
        {" "}
        {city.nameAr}{" "}
      </option>
    ));
  }

  renderEntities() {
    return this.state.educationalEntities.map((entity) => (
      <option key={entity.id} value={entity.id}>
        {" "}
        {entity.name}{" "}
      </option>
    ));
  }

  handleCitiesChange = (event) => {
    this.setState({ selectedCity: event.target.value });
    axios
      .get(
        `${apiBaseUrl}/EducationalEntities/lookup?SACityId=${event.target.value}&EducationalLevel=${this.state.selectedLevel}`
      )
      .then((response) => {
        this.setState({ educationalEntities: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleLevelChange = (event) => {
    this.setState({ selectedLevel: event.target.value });
    axios
      .get(
        `${apiBaseUrl}/EducationalEntities/lookup?SACityId=${this.state.selectedCity}&EducationalLevel=${event.target.value}`
      )
      .then((response) => {
        this.setState({ educationalEntities: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <React.Fragment>
        {this.state.isPageLoading ? (
          <React.Fragment>
            <div
              className="silver-bg box-layout w-100 pb-0 p-3 mt-4 d-flex justify-content-center align-items-center"
              style={{ minHeight: 350 }}
            >
              <Loader type="ball-spin-fade-loader" className="dark-loader" />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Helmet>
              <title> إنشاء حساب | منصّة همّة التعليمية </title>{" "}
              <meta
                name="description"
                content="طالب أو معلّم؟ سجّل حسابك في منصّة همّة الآن, واختر دورتك المناسبة."
              />
            </Helmet>{" "}
            <form
              className="centered"
              onSubmit={handleSubmit(this.myFormHandler)}
            >
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
                <label className="pr-2 dark-silver-text mb-0"> أنا: </label>
                <Field
                  component={RadioField}
                  name="gender"
                  validate={required}
                  options={[
                    { title: "ذكر", value: "male" },
                    { title: "أنثى", value: "female" },
                  ]}
                />{" "}
              </div>{" "}
              <Field
                fieldName="phone"
                name="phone"
                component={phoneField}
                containerClassName="intl-tel-input"
                inputClassName="form-control"
                defaultCountry="sa"
                validate={[required, phoneValue]}
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
                </Field>{" "}
                {this.state.hidden ? (
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/closed-eye.png"
                    }
                    width="20"
                    className="position-absolute left-input-icon"
                    onClick={this.togglePasswordShow}
                    alt="icon"
                  />
                ) : (
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/eye.png"}
                    width="20"
                    className="position-absolute left-input-icon"
                    onClick={this.togglePasswordShow}
                    alt="icon"
                  />
                )}{" "}
              </div>
              <Field
                name="email"
                type="email"
                component={inputField}
                className="form-control border-left-0 pl-0 ltr-input"
                placeholder="البريد الإلكتروني (اختياري)"
                validate={emailValue}
              >
                <FaRegEnvelope />
              </Field>
              {/* <Field
                        component={selectField}
                        className="form-control"
                        name="saCityId"
                        onChange={this.handleCitiesChange}
                      >
                        <option selected="selected">المدينة</option>
                        {this.renderCities()}
                      </Field>

                      <Field
                        component={selectField}
                        className="form-control"
                        name="educationalLevel"
                        onChange={this.handleLevelChange}
                      >
                        <option selected="selected">المستوى التعليمي</option>
                        <option value="Student">طالب</option>
                        <option value="Other">أخرى</option>
                      </Field>

                      <Field
                        component={selectField}
                        className="form-control"
                        name="educationalEntityId"
                        disabled={
                          !this.state.selectedCity ||
                          !this.state.selectedLevel ||
                          this.state.educationalEntities == undefined ||
                          this.state.educationalEntities.length == 0
                        }
                      >
                        <option selected="selected">الجهة التعليمية</option>
                        {this.renderEntities()}
                      </Field>

                      <Field
                        component={selectField}
                        className="form-control"
                        name="nationalityId"
                      >
                        <option selected="selected">الجنسية</option>
                        {this.renderNationalities()}
                      </Field> */}
              <button
                type="submit"
                className="btn dark-outline-btn w-100"
                disabled={submitting}
              >
                {" "}
                {this.state.loading === true ? (
                  <Loader type="ball-clip-rotate" />
                ) : (
                  "تسجيل"
                )}{" "}
              </button>{" "}
            </form>{" "}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.Register && state.form.Register.values,
    phoneNumberConfirmed: state.auth.phoneNumberConfirmed,
    authenticated: state.auth.authenticated,
  };
}

RegisterComponent = reduxForm({
  form: "Register",
})(RegisterComponent);

RegisterComponent = connect(mapStateToProps, {
  signupUser,
  loginAction,
  sendToken,
  loginFailed,
})(RegisterComponent);

export const Register = RegisterComponent;
