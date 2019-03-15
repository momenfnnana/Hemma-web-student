import React, { Component } from "react";
import "./styles.sass";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { FaAngleRight } from "react-icons/fa";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

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
  return errors;
};

class FooterComponent extends Component {
  render() {
    const renderPhoneField = props => {
      let inputClass = props.inputClassName;
      let containerClass = props.containerClassName;
      let countryCode = props.defaultCountry;
      let inputName = props.fieldName;
      let wrapperClass = "input-group mb-3";
      if (props.meta.touched && props.meta.error) {
        wrapperClass += " input-error";
      } else if (props.meta.touched && props.meta.valid) {
        wrapperClass += " input-success";
      }

      const handleBlur = (valid, value, country) => {
        props.input.onBlur({
          phoneNumber: value,
          countryCode: country.iso2
        });
      };

      const handleChange = (valid, value, country) => {
        props.input.onChange({
          phoneNumber: value,
          countryCode: country.iso2
        });
      };

      return (
        <React.Fragment>
          <div className={wrapperClass}>
            <div className="input-group-prepend">
              <button
                type="button"
                className="btn position-absolute br-5 phone-button"
              >
                <FaAngleRight color="#FFF" />
              </button>
            </div>
            <IntlTelInput
              {...props.IntlTelInput}
              type={props.type}
              fieldName={inputName}
              containerClassName={containerClass}
              inputClassName={inputClass}
              defaultCountry={countryCode}
              onPhoneNumberBlur={handleBlur}
              onPhoneNumberChange={handleChange}
            />
            {props.meta.touched && props.meta.error && (
              <small className="w-100">{props.meta.error}</small>
            )}
          </div>
        </React.Fragment>
      );
    };

    return (
      <div className="container">
        <div className="footer pt-4 pb-4">
          <div className="row">
            <div className="col-md-8 col-12">
              <ul className="list-inline mb-1">
                <li className="list-inline-item light-font-text small">
                  <a href="" className="dark-text">
                    تعرف علينا
                  </a>
                </li>
                <li className="list-inline-item light-font-text small">
                  <a href="" className="dark-text">
                    الأسئلة المتكررة
                  </a>
                </li>
                <li className="list-inline-item light-font-text small">
                  <a href="" className="dark-text">
                    انضم كأستاذ
                  </a>
                </li>
              </ul>
              <p className="light-font-text small dark-text">
                جميع الحقوق محفوظة © 2018
              </p>

              <div className="d-inline-flex align-items-center">
                <p className="light-text small mb-0">خلينا على تواصل</p>
                <ul className="list-inline pl-3 mb-0">
                  <li className="list-inline-item">
                    <a href="">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/snapchat-dark.png"
                        }
                        height="15"
                        alt="Snapchat"
                      />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/instagram-dark.png"
                        }
                        height="15"
                        alt="Instgram"
                      />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/twitter-dark.png"
                        }
                        height="15"
                        alt="Twitter"
                      />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/youtube-dark.png"
                        }
                        height="15"
                        alt="Youtube"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-12 d-flex flex-column">
              <p className="light-font-text small dark-text w-75">
                قم بترك بيانات التواصل الخاصة بك وسوف نقوم بارسال اشعارات حول
                الدورات المجانية
              </p>
              <form>
                <div className="d-flex flex-row w-75">
                  <Field
                    fieldName="phone"
                    name="phone"
                    component={renderPhoneField}
                    containerClassName="intl-tel-input"
                    inputClassName="form-control"
                    defaultCountry="sa"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.Footer && state.form.Footer.values
  };
}

FooterComponent = reduxForm({
  form: "Footer",
  validate
})(FooterComponent);

FooterComponent = connect(mapStateToProps)(FooterComponent);

export const Footer = withRouter(FooterComponent);
