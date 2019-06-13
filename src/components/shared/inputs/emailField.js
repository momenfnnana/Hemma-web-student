import React, { Component } from "react";

export class emailField extends Component {
  render() {
    let inputClass = this.props.className;
    let wrapperClass = "input-group mb-3";
    if (this.props.meta.touched && this.props.meta.error) {
      wrapperClass += " input-error";
    } else if (this.props.meta.touched && this.props.meta.valid) {
      wrapperClass += " input-success";
    } else if (this.props.disabled) {
      wrapperClass += " disabled-input";
    }
    return (
      <React.Fragment>
        <div className={wrapperClass}>
          <input
            {...this.props.input}
            type={this.props.type}
            className={inputClass}
            placeholder={this.props.placeholder}
            value={this.props.input.value}
            disabled={this.props.disabled}
          />
          <div className="input-group-prepend">
            <div className="input-group-text left-radius-5 border-left-0">
              {this.props.children}
            </div>
          </div>
          {this.props.meta.touched && this.props.meta.error && (
            <small className="w-100 smaller">{this.props.meta.error}</small>
          )}
        </div>
      </React.Fragment>
    );
  }
}
