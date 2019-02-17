import React, { Component } from "react";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

export class Login extends Component {
  render() {
    return (
      <form className="centered">
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
        <button type="submit" className="btn dark-outline-btn w-100">
          تسجيل الدخول
        </button>
      </form>
    );
  }
}
