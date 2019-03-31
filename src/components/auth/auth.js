import React, { Component } from "react";
import "./styles.sass";
import { Login } from "../login/login";
import { Register } from "../register/register";
import { NavLink, Route } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
import TwitterLogin from "react-twitter-auth";
import axios from "axios";
import swal from "@sweetalert/with-react";

export class Auth extends Component {
  responseGoogle = response => {
    let deviceId = localStorage.getItem("deviceId");
    let data = {
      accessToken: response.accessToken,
      deviceId: deviceId && deviceId != "undefined" ? deviceId : null
    };
    if (!response.accessToken) return;
    axios
      .post("https://api.staging.hemma.sa/api/v1/auth/login_with_google", data)
      .then(response => {
        localStorage.setItem("token", response.data.data.token);
        this.props.history.push("/");
      })
      .catch(error => {
        swal("عفواً", "هذا المستخدم غير موجود", "error", {
          button: "متابعة"
        });

        this.props.history.push("/auth/register");
      });
  };

  responseFacebook = response => {
    let deviceId = localStorage.getItem("deviceId");
    let data = {
      accessToken: response.accessToken,
      deviceId: deviceId && deviceId != "undefined" ? deviceId : null
    };
    if (!response.accessToken) return;
    axios
      .post(
        "https://api.staging.hemma.sa/api/v1/auth/login_with_facebook",
        data
      )
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.data.token);
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
        swal("عفواً", "هذا المستخدم غير موجود", "error", {
          button: "متابعة"
        });
        this.props.history.push("/auth/register");
      });
  };

  render() {
    return (
      <div className="container pt-5 pb-5">
        <div
          className="row align-items-center justify-content-center"
          style={{ minHeight: 550 }}
        >
          <div className="col-md-6 col-12 order-md-1 order-2">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/login-artwork.png"}
              height="350"
              className="artwork-img"
            />
          </div>
          <div className="col-md-6 col-12 order-md-2 order-1">
            <ul className="list-inline underlined-tabs mb-4 text-center">
              <li className="list-inline-item small">
                <NavLink
                  href=""
                  className="dark-text"
                  activeClassName="active"
                  to="/auth/login"
                >
                  تسجيل دخول
                </NavLink>
              </li>
              <li className="list-inline-item small">
                <NavLink
                  href=""
                  className="dark-text"
                  activeClassName="active"
                  to="/auth/register"
                >
                  إنشاء حساب
                </NavLink>
              </li>
            </ul>
            <Route
              exact
              path="/auth/login"
              render={props => <Login {...props} />}
            />
            <Route
              exact
              path="/auth/register"
              render={props => <Register {...props} />}
            />
            <div className="pt-4 pb-4">
              <p className="text-center dark-text circle-border">أو</p>
            </div>
            <ul className="list-inline mb-0 text-center">
              <li className="list-inline-item">
                <GoogleLogin
                  clientId="600035856994-8ogmo1qhb1fn8po54isgfnpn1q1lvdf1.apps.googleusercontent.com"
                  render={renderProps => (
                    <button
                      className="bg-transparent border-0 p-0 clickable"
                      onClick={renderProps.onClick}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/google-plus.png"
                        }
                        height="35"
                      />
                    </button>
                  )}
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                />
              </li>
              <li className="list-inline-item">
                <FacebookLogin
                  appId="381989645718539"
                  callback={this.responseFacebook}
                  autoLoad={false}
                  fields="name,email,picture"
                  render={renderProps => (
                    <button
                      className="bg-transparent border-0 p-0 clickable"
                      onClick={renderProps.onClick}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/facebook.png"
                        }
                        height="35"
                      />
                    </button>
                  )}
                />
              </li>
              <li className="list-inline-item">
                <TwitterLogin
                  loginUrl="http://localhost:4000/api/v1/auth/twitter"
                  onFailure={this.onFailed}
                  onSuccess={this.onSuccess}
                  requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
                  showIcon={true}
                  className="bg-transparent border-0 p-0 clickable"
                >
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/twitter.png"}
                    height="35"
                  />
                </TwitterLogin>
              </li>
            </ul>
            {this.props.location.pathname === "/auth/login" ? (
              <div className="text-center pt-4">
                <NavLink to="/forgot-password" className="dark-text small">
                  نسيت كلمة المرور؟
                </NavLink>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
