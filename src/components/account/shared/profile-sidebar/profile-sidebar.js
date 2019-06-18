import React, { Component } from "react";
import "./styles.sass";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../../../actions/user.actions";

export class ProfileSidebarComponent extends Component {
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.getUser();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.authenticated && this.props.authenticated) {
      this.props.getUser();
    }
  }

  render() {
    const user = this.props.user;

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
              </div>
            </div>
          </div>
          <div className="sidebar-list">
            <ul className="list-unstyled mb-0">
              <li>
                <NavLink
                  className="dark-text small"
                  to="/account/update"
                  activeClassName="active"
                >
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/settings.png"}
                    height="18"
                    width="18"
                    className="mr-2 contain-img"
                  />
                  حسابي
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="dark-text small"
                  to="/account/update-password"
                  activeClassName="active"
                >
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/dark-lock.png"
                    }
                    height="18"
                    width="18"
                    className="mr-2 contain-img"
                  />
                  تعديل كلمة المرور
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="dark-text small"
                  to="/account/update-phone"
                  activeClassName="active"
                >
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/phone.png"}
                    height="18"
                    width="18"
                    className="mr-2 contain-img"
                  />
                  تعديل رقم الهاتف
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="dark-text small"
                  to="/account/update-email"
                  activeClassName="active"
                >
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/dark-email.png"
                    }
                    height="18"
                    width="18"
                    className="mr-2 contain-img"
                  />
                  تعديل البريد الإلكتروني
                </NavLink>
              </li>
            </ul>
          </div>
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

ProfileSidebarComponent = connect(
  mapStateToProps,
  { getUser }
)(ProfileSidebarComponent);

export const ProfileSidebar = withRouter(ProfileSidebarComponent);
