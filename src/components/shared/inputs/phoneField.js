import React, { Component } from "react";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

export class phoneField extends Component {
  render() {
    let inputClass = this.props.inputClassName;
    let containerClass = this.props.containerClassName;
    let countryCode = this.props.defaultCountry;
    let inputName = this.props.fieldName;
    let wrapperClass = "input-group mb-3";
    if (this.props.meta.touched && this.props.meta.error) {
      wrapperClass += " input-error";
    } else if (this.props.meta.touched && this.props.meta.valid) {
      wrapperClass += " input-success";
    }

    const handleBlur = (valid, value, country) => {
      this.props.input.onBlur({
        phoneNumber: value,
        countryCode: country.iso2
      });
    };

    const handleChange = (valid, value, country) => {
      this.props.input.onChange({
        phoneNumber: value,
        countryCode: country.iso2
      });
    };
    return (
      <React.Fragment>
        <div className={wrapperClass}>
          <IntlTelInput
            {...this.props.IntlTelInput}
            type={this.props.type}
            fieldName={inputName}
            containerClassName={containerClass}
            inputClassName={inputClass}
            defaultCountry={countryCode}
            onPhoneNumberBlur={handleBlur}
            onPhoneNumberChange={handleChange}
          />
          {this.props.meta.touched && this.props.meta.error && (
            <small className="w-100">{this.props.meta.error}</small>
          )}
        </div>
      </React.Fragment>
    );
  }
}
