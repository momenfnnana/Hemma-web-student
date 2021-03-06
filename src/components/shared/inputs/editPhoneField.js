import React, { Component } from "react";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

export class editPhoneField extends Component {
  state = {
    profile: ""
  };
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

    // const handleChange = (valid, value, country) => {
    //   this.props.input.onChange({
    //     phoneNumber: value,
    //     countryCode: country.iso2
    //   });
    // };
    return (
      <React.Fragment>
        <div className={wrapperClass}>
          {this.props.initialCountry && (
            <IntlTelInput
              {...this.props.IntlTelInput}
              type={this.props.type}
              fieldName={inputName}
              containerClassName={containerClass}
              inputClassName={inputClass}
              defaultCountry={this.props.initialCountry}
              onPhoneNumberBlur={handleBlur}
              disabled={this.props.disabled}
              defaultValue={this.props.input.value}
              preferredCountries={['sa','ae','om','kw','qa','bh','iq']}
            />
          )}
          {this.props.meta.touched && this.props.meta.error && (
            <small className="w-100 smaller">{this.props.meta.error}</small>
          )}
        </div>
      </React.Fragment>
    );
  }
}
