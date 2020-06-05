import React, { Component } from "react";
import ReactCodeInput from "react-code-input";

export class VerificationField extends Component {
  render() {
    return (
      <React.Fragment>
        <ReactCodeInput {...this.props.input} fields={4} />
      </React.Fragment>
    );
  }
}
