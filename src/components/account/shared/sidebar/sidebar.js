import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../../../actions/user.actions";
import { NewInstallment } from "../../subscriptions/transactions/installment/NewInstallment";
import { apiBaseUrl } from "../../../../api/helpers";
import axios from "axios";
import "./styles.sass";

export class SidebarComponent extends Component {
  state = {
    isInstallmentOpen: false,
    details: []
  };
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.getUser();
    }
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    const courseId = this.props.match.params.id;
    axios
      .get(`${apiBaseUrl}/content/${courseId}/remaining_payment_details`, {
        headers
      })
      .then(response => {
        this.setState({ details: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.authenticated && this.props.authenticated) {
      this.props.getUser();
    }
  }

  openInstallmentModal = () => {
    this.setState({ isInstallmentOpen: true });
  };
  closeInstallmentModal = () => {
    this.setState({ isInstallmentOpen: false });
  };

  render() {
    const user = this.props.user;
    const courseId = this.props.match.params.id;
    const channelID = this.props.chatChannelSid;

    return (
      <React.Fragment>
        <div className="sidebar mb-4">
          <div className="header">
            <div className="d-inline-flex align-items-center">
              {this.props.user && this.props.user.gender == "Male" ? (
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/male-avatar.png"
                  }
                  height="70"
                  className="mr-3 contain-img"
                />
              ) : (
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/female-avatar.png"
                  }
                  height="70"
                  className="mr-3 contain-img"
                />
              )}

              <div className="d-flex flex-column align-items-center">
                <h6 className="dark-text mb-0"> {user && user.name}</h6>
                {/* <div className="d-inline-flex">
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
                </div> */}
              </div>
            </div>
          </div>
          <div className="sidebar-list">
            <ul className="list-unstyled mb-0">
              <li>
                <NavLink
                  className="dark-text small"
                  to={`/subscriptions/${this.props.id}/schedule`}
                  activeClassName="active"
                >
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
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="dark-text small"
                  to={`/subscriptions/${this.props.id}/recorded-lectures`}
                  activeClassName="active"
                >
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
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="dark-text small"
                  to={`/subscriptions/${this.props.id}/booklet`}
                  activeClassName="active"
                >
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/course-booklet.png"
                    }
                    height="20"
                    width="20"
                    className="mr-2 contain-img"
                  />
                  الملزمة
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="dark-text small"
                  to={`/subscriptions/${this.props.id}/discussions`}
                  activeClassName="active"
                >
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
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  className="dark-text small"
                  to={`/subscriptions/${this.props.id}/challenges`}
                  activeClassName="active"
                >
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
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  className="dark-text small"
                  to={`/subscriptions/${this.props.id}/exams/list`}
                  activeClassName="active"
                  className="dark-text small"
                >
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/course-exam.png"
                    }
                    height="20"
                    width="20"
                    className="mr-2 contain-img"
                  />
                  الاختبارات الإلكترونية
                </NavLink>
              </li>
              {channelID && (
                <li>
                  <NavLink
                    to={`/subscriptions/${this.props.id}/chat`}
                    activeClassName="active"
                    className="dark-text small"
                  >
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/course-chat.png"
                      }
                      height="20"
                      width="20"
                      className="mr-2 contain-img"
                    />
                    الدردشة
                  </NavLink>
                </li>
              )}
              {/* {channelID && (
                <React.Fragment>
                  {channelID.startsWith("http") ? null : (
                    <li>
                      <NavLink
                        to={`/subscriptions/${this.props.id}/chat`}
                        activeClassName="active"
                        className="dark-text small"
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/course-chat.png"
                          }
                          height="20"
                          width="20"
                          className="mr-2 contain-img"
                        />
                        الدردشة
                      </NavLink>
                    </li>
                  )}
                </React.Fragment>
              )} */}
              <li>
                <NavLink
                  to={`/subscriptions/${this.props.id}/transactions/list`}
                  activeClassName="active"
                  className="dark-text small"
                >
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/course-payments.png"
                    }
                    height="20"
                    width="20"
                    className="mr-2 contain-img"
                  />
                  المدفوعات واسترجاع الرسوم
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/subscriptions/${this.props.id}/speed-up`}
                  activeClassName="active"
                  className="dark-text small"
                >
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/flash.png"}
                    height="20"
                    width="20"
                    className="mr-2 contain-img"
                  />
                  اختصر وقتك
                </NavLink>
              </li>
            </ul>
          </div>
          {/* <hr className="separator mt-0 mb-0" />

          <div className="settings d-flex align-items-center justify-content-center">
            <div className="d-inline-flex align-items-center">
              <h6 className="small mb-0">الاعدادات</h6>
              <span />
              <h6 className="small mb-0">تسجيل الخروج</h6>
            </div>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

SidebarComponent = connect(
  mapStateToProps,
  { getUser }
)(SidebarComponent);

export const Sidebar = withRouter(SidebarComponent);
