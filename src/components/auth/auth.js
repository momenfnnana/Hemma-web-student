import React, { Component } from "react";
import "./styles.sass";
import { Login } from "../login/login";
import { Register } from "../register/register";
import { NavLink, Route } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";

const responseFacebook = response => {
  console.log(response);
};

const responseGoogle = response => {
  console.log(response);
};

export class Auth extends Component {
  render() {
    return (
      <div className="container pt-5 pb-5">
        <div className="row align-items-center h-100">
          <div className="col-md-6 col-12">
            <img
              src={
                this.props.location.pathname === "/auth/login"
                  ? process.env.PUBLIC_URL + "/assets/images/login-artwork.png"
                  : process.env.PUBLIC_URL +
                    "/assets/images/register-artwork.png"
              }
              width="100%"
            />
          </div>
          <div className="col-md-6 col-12">
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
                      className="transparent-bg border-0 p-0 clickable"
                      onClick={renderProps.onClick}
                    >
                      {" "}
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/google-plus.png"
                        }
                        height="35"
                      />
                    </button>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                />
              </li>
              <li className="list-inline-item">
                <FacebookLogin
                  appId="1088597931155576"
                  autoLoad
                  callback={responseFacebook}
                  render={renderProps => (
                    <button
                      className="transparent-bg border-0 p-0"
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
                <a href="">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/twitter.png"}
                    height="35"
                  />
                </a>
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
