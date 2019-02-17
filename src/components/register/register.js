import React, { Component } from "react";
import "./styles.sass";

class Register extends Component {
  render() {
    return (
      <div className="container pt-5 pb-5">
        <div className="row align-items-center h-100">
          <div className="col-md-6 col-12">
            <img
              src={
                process.env.PUBLIC_URL + "/assets/images/register-artwork.png"
              }
              width="100%"
            />
          </div>
          <div className="col-md-6 col-12">
            <ul className="list-inline underlined-tabs mb-4 text-center">
              <li className="list-inline-item small">
                <a href="" className="dark-text">
                  تسجيل دخول
                </a>
              </li>
              <li className="list-inline-item small">
                <a href="" className="dark-text active">
                  إنشاء حساب
                </a>
              </li>
            </ul>
            <form className="centered">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/user.png"}
                      height="15"
                      width="20"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="الاسم الكامل"
                />
              </div>
              <label className="pr-2 dark-silver-text">أنا: </label>

              <div className="custom-control custom-radio custom-control-inline mb-3">
                <input type="radio" className="custom-control-input" />
                <label className="custom-control-label dark-text small d-flex align-items-center">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/male.png"}
                    height="15"
                    className="pr-1"
                  />
                  ذكر
                </label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mb-3">
                <input type="radio" className="custom-control-input" />
                <label className="custom-control-label dark-text small d-flex align-items-center">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/female.png"}
                    height="15"
                    className="pr-1"
                  />
                  أنثى
                </label>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/flag.png"}
                      height="15"
                      width="20"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="رقم الجوال"
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/lock.png"}
                      height="15"
                      width="20"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="كلمة المرور"
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/lock.png"}
                      height="15"
                      width="20"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="تأكيد كلمة المرور"
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/email.png"}
                      height="15"
                      width="20"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="البريد الإلكتروني"
                />
              </div>
              <button type="submit" className="btn dark-outline-btn w-100">
                تسجيل الدخول
              </button>
            </form>
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

export default Register;
