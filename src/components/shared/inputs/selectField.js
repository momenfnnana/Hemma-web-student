import React, { Component } from "react";

export class selectField extends Component {
  render() {
    let inputClass = this.props.className;
    let wrapperClass = "form-group mb-3";
    if (this.props.meta.touched && this.props.meta.error) {
      wrapperClass += " input-error";
    } else if (this.props.meta.touched && this.props.meta.valid) {
      wrapperClass += " input-success";
    }
    return (
      <React.Fragment>
        <div className={wrapperClass}>
          <select
            {...this.props.input}
            value={this.props.input.value}
            className={inputClass}
            disabled={this.props.disabled}
          >
            {this.props.children}
          </select>
          {this.props.meta.touched && this.props.meta.error && (
            <small className="w-100 smaller">{this.props.meta.error}</small>
          )}
        </div>
      </React.Fragment>
    );
  }
}
