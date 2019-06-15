import React, { Component } from "react";

export class numberField extends Component {
  render() {
    let inputClass = this.props.className;
    let wrapperClass = "";
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
          {this.props.meta.touched && this.props.meta.error && (
            <small className="w-100 smaller">{this.props.meta.error}</small>
          )}
        </div>
      </React.Fragment>
    );
  }
}
