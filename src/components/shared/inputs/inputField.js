import React, { Component } from "react";

export class inputField extends Component {
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
        <div className={wrapperClass}>
          <div className="input-group-prepend">
            <div className="input-group-text">{this.props.children}</div>
          </div>
          <input
            {...this.props.input}
            type={this.props.type}
            className={inputClass}
            placeholder={this.props.placeholder}
            value={this.props.input.value}
          />
          {this.props.meta.touched && this.props.meta.error && (
            <small className="w-100">{this.props.meta.error}</small>
          )}
        </div>
      </React.Fragment>
    );
  }
}
