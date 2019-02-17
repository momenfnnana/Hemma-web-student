import React, { Component } from "react";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

export class Register extends Component {
  render() {
    return (
      <form className="centered">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/user.png"}
                height="15"
                width="20"
              />
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="الاسم الكامل"
          />
        </div>
        <label className="pr-2 dark-silver-text">أنا: </label>

        <div className="custom-control custom-radio custom-control-inline mb-3">
          <input type="radio" className="custom-control-input" />
          <label className="custom-control-label dark-text small d-flex align-items-center">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/male.png"}
              height="15"
              className="pr-1"
            />
            ذكر
          </label>
        </div>
        <div className="custom-control custom-radio custom-control-inline mb-3">
          <input type="radio" className="custom-control-input" />
          <label className="custom-control-label dark-text small d-flex align-items-center">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/female.png"}
              height="15"
              className="pr-1"
            />
            أنثى
          </label>
        </div>

        <div className="input-group mb-3">
          <IntlTelInput
            containerClassName="intl-tel-input"
            inputClassName="form-control"
            defaultCountry="sa"
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/lock.png"}
                height="15"
                width="20"
              />
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="كلمة المرور"
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/lock.png"}
                height="15"
                width="20"
              />
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="تأكيد كلمة المرور"
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/email.png"}
                height="15"
                width="20"
              />
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="البريد الإلكتروني"
          />
        </div>
        <button type="submit" className="btn dark-outline-btn w-100">
          تسجيل الدخول
        </button>
      </form>
    );
  }
}
