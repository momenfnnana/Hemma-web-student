import React, { Component } from "react";
import "./styles.sass";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

export class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="footer pt-4 pb-4">
          <div className="row">
            <div className="col-md-8 col-12">
              <ul className="list-inline mb-1">
                <li className="list-inline-item light-font-text small">
                  <a href="" className="dark-text">
                    تعرف علينا
                  </a>
                </li>
                <li className="list-inline-item light-font-text small">
                  <a href="" className="dark-text">
                    الأسئلة المتكررة
                  </a>
                </li>
                <li className="list-inline-item light-font-text small">
                  <a href="" className="dark-text">
                    انضم كأستاذ
                  </a>
                </li>
              </ul>
              <p className="light-font-text small dark-text">
                جميع الحقوق محفوظة © 2018
              </p>

              <div className="d-inline-flex align-items-center">
                <p className="light-text small mb-0">خلينا على تواصل</p>
                <ul className="list-inline pl-3 mb-0">
                  <li className="list-inline-item">
                    <a href="">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/snapchat-dark.png"
                        }
                        height="15"
                      />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/instagram-dark.png"
                        }
                        height="15"
                      />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/twitter-dark.png"
                        }
                        height="15"
                      />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/youtube-dark.png"
                        }
                        height="15"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-12 d-flex flex-column">
              <p className="light-font-text small dark-text w-75">
                قم بترك بيانات التواصل الخاصة بك وسوف نقوم بارسال اشعارات حول
                الدورات المجانية{" "}
              </p>
              <form>
                <div className="input-group w-75">
                  <IntlTelInput
                    containerClassName="intl-tel-input"
                    inputClassName="form-control"
                    defaultCountry="sa"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
