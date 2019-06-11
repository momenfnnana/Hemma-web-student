import React, { Component } from "react";
import { connect } from "react-redux";
import { getChatToken } from "./actions/twilio.actions";

class TwilioComponent extends Component {
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.getChatToken();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authenticated && !prevProps.authenticated) {
      this.props.getChatToken();
    }
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

TwilioComponent = connect(
  mapStateToProps,
  { getChatToken }
)(TwilioComponent);

export default TwilioComponent;
