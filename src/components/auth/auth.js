import React, { Component } from "react";
import "./styles.sass";

import { Login } from "../login/login";
import { Register } from "../register/register";

import { NavLink, Route } from "react-router-dom";

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
                <a href="">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/google-plus.png"
                    }
                    height="35"
                  />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/facebook.png"}
                    height="35"
                  />
                </a>
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
            <div className="text-center pt-4">
              <a href="" className="dark-text small">
                نسيت كلمة المرور؟
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
