import React, { Component } from "react";
import * as Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export class dateTimeField extends Component {
  render() {
    let inputName = this.props.name;
    let inputValue = this.props.defaultValue;
    let formatTime = this.props.timeFormat;
    let formatDate = this.props.dateFormat;
    let wrapperClass = "input-group mb-3";
    if (this.props.meta.touched && this.props.meta.error) {
      wrapperClass += " input-error";
    } else if (this.props.meta.touched && this.props.meta.valid) {
      wrapperClass += " input-success";
    }

    return (
      <React.Fragment>
        <Datetime
          {...this.props.inputProps}
          defaultValue={inputValue}
          name={inputName}
          timeFormat={formatTime}
          dateFormat={formatDate}
        />

        {this.props.meta.touched && this.props.meta.error && (
          <small className="w-100 smaller">{this.props.meta.error}</small>
        )}
      </React.Fragment>
    );
  }
}
