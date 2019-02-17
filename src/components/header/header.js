import React, { Component } from "react";
import "./styles.sass";

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="top-header dark-bg">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <p className="text-white light-font-text">
                  لم تقم بتأكيد رقم الهاتف، يجب أن تقوم بتأكيده{" "}
                  <a href="" className="light-text text-decoration-none">
                    اضغط هنا
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="header">
          <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="#">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                  height="70"
                />
                <span />
                <h5 className="dark-text">سلسلة بالبيد التعليمية</h5>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">
                      الدورات الحالية
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      تسجيل الدخول
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      إنشاء حساب
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
