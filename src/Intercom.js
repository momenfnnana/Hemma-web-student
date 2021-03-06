import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "./actions/user.actions";

const appId = "idpad6q3";

class IntercomComponent extends Component {
  componentDidMount() {
    let w = window;
    let ic = w.Intercom;
    if (typeof ic === "function") {
      ic("reattach_activator");
      ic("update", w.intercomSettings);
    } else {
      let d = document;
      let i = function() {
        i.c(arguments);
      };
      i.q = [];
      i.c = function(args) {
        i.q.push(args);
      };
      w.Intercom = i;
      let l = function() {
        let s = d.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.intercom.io/widget/" + appId;
        let x = d.getElementsByTagName("script")[0];
        x.parentNode.insertBefore(s, x);
      };
      if (w.attachEvent) {
        w.attachEvent("onload", l);
      } else {
        w.addEventListener("load", l, false);
      }
    }

    window.Intercom("boot", {
      app_id: appId
      //Website visitor so may not have any user related info
    });

    if (window.location.href.indexOf("?support") > 0) {
      window.Intercom("show");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.user && this.props.user) {
      // user logged in
      window.Intercom("update", {
        email: this.props.user.email,
        user_id: this.props.user.id,
        name: this.props.user.name,
        phone: this.props.user.phoneNumber
      });
    } else if (prevProps.user && !this.props.user) {
      // logged out
    }
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user
  };
}

IntercomComponent = connect(
  mapStateToProps,
  { getUser }
)(IntercomComponent);

export default IntercomComponent;
