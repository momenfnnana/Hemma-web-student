import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./styles.sass";
import { AccountNavbar } from "../navbar/navbar";
import AccountBreadcrumb from "../breadcrumb/breadcrumb";
import { Lecture } from "../lecture/lecture";

export class Sidebar extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="sidebar mb-4">
          <div className="header">
            <div className="d-inline-flex align-items-center">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/profile-img.png"}
                height="70"
                className="mr-3 contain-img"
              />
              <div className="d-flex flex-column">
                <h6 className="dark-text mb-0">إبراهيم أحمد</h6>
                <div className="d-inline-flex">
                  <ul className="list-inline list-unstyled mt-2 mb-0 bordered-list">
                    <li className="list-inline-item">
                      <span className="en-text mid-text smaller">20</span>
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/coins.png"
                        }
                        height="11"
                        className="ml-1 contain-img"
                      />
                    </li>
                    <li className="list-inline-item">
                      <span className="en-text mid-text smaller">99</span>
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/trophy.png"
                        }
                        height="11"
                        className="ml-1 contain-img"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar-list">
            <ul className="list-unstyled mb-0">
              <li className="dark-text small active">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/course-schedule.png"
                  }
                  height="18"
                  width="18"
                  className="mr-2 contain-img"
                />
                جدول الدورة
              </li>
              <li className="dark-text small">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/course-recorded.png"
                  }
                  height="22"
                  width="22"
                  className="mr-2 contain-img"
                />
                المحاضرات المسجلة
              </li>
              <li className="dark-text small">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/course-discussions.png"
                  }
                  height="24"
                  width="24"
                  className="mr-2 contain-img"
                />
                المناقشات
              </li>
              <li className="dark-text small">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/course-challenge.png"
                  }
                  height="24"
                  width="24"
                  className="mr-2 contain-img"
                />
                التحديات
              </li>
              <li className="dark-text small">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/course-booklet.png"
                  }
                  height="20"
                  width="20"
                  className="mr-2 contain-img"
                />
                الملزمة
              </li>
              <li className="dark-text small">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/course-exam.png"
                  }
                  height="20"
                  width="20"
                  className="mr-2 contain-img"
                />
                الامتحانات الإلكترونية
              </li>
              <li className="dark-text small">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/course-chat.png"
                  }
                  height="20"
                  width="20"
                  className="mr-2 contain-img"
                />
                الدردشة
              </li>
            </ul>
          </div>
          <hr className="separator mt-0 mb-0" />
          <div className="footer d-flex align-items-center">
            <div className="d-inline-flex align-items-center">
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/images/course-payments.png"
                }
                height="30"
                className="mr-2 contain-img"
              />
              <h6 className="dark-text small mb-0">
                المدفوعات واسترجاع الرسوم
              </h6>
            </div>
          </div>
          <div className="settings d-flex align-items-center justify-content-center">
            <div className="d-inline-flex align-items-center">
              <h6 className="small mb-0">الاعدادات</h6>
              <span />
              <h6 className="small mb-0">تسجيل الخروج</h6>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
