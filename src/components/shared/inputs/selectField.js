import React, { Component } from "react";

export class selectField extends Component {
  render() {
    let inputClass = this.props.className;
    let wrapperClass = "input-group mb-3";
    if (this.props.meta.touched && this.props.meta.error) {
      wrapperClass += " input-error";
    } else if (this.props.meta.touched && this.props.meta.valid) {
      wrapperClass += " input-success";
    }
    return (
      <React.Fragment>
        <select {...this.props.select} className={inputClass}>
          <option>{this.props.children}</option>
        </select>
        {this.props.meta.touched && this.props.meta.error && (
          <small className="w-100 smaller">{this.props.meta.error}</small>
        )}
      </React.Fragment>
    );
  }
}
