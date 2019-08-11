import React, { Component } from "react";
import "./styles.sass";
import { NavLink, Link, withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import axios from "axios";
import { apiBaseUrl } from "../../../api/helpers";
import { connect } from "react-redux";
import { signOutAction } from "../../../actions/login.actions";
import { getUser } from "../../../actions/user.actions";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout = () => {
    this.props.signOutAction();
    this.props.history.push("/");
  };

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

  verifyUser = () => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .post(`${apiBaseUrl}/auth/phone/send_token`, null, {
        headers
      })
      .then(response => {
        this.props.history.push("/verify");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const user = this.props.user;
    return (
      <React.Fragment>
        {!this.props.phoneNumberConfirmed && this.props.authenticated ? (
          <div className="top-header dark-bg">
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <p className="text-white light-font-text">
                    لم تقم بتأكيد رقم الهاتف، يجب أن تقوم بتأكيده{" "}
                    <span
                      className="light-text text-decoration-none clickable"
                      onClick={this.verifyUser}
                    >
                      اضغط هنا
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="header">
          <Navbar
            className={
              "navbar navbar-expand-lg navbar-light bg-transparent " +
              (this.props.location.pathname.startsWith("/subscriptions/details")
                ? "shadow-sm"
                : "null")
            }
          >
            <div className="container">
              <Link to="/" className="navbar-brand mr-0">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                  height="70"
                />
                <span className="d-none d-sm-block" />
                <h5 className="dark-text d-none d-sm-block">
                  سلسلة بالبيد التعليمية
                </h5>
              </Link>
              <div className="d-block d-sm-none">
                {!this.props.authenticated ? (
                  <Link
                    className="btn light-outline-btn pl-4 pr-4 unset-height unset-line-height"
                    to="/auth/register"
                  >
                    إنشاء حساب
                  </Link>
                ) : (
                  <Link
                    className="btn light-outline-btn pl-4 pr-4 unset-height"
                    to="/subscriptions"
                  >
                    دوراتي
                  </Link>
                )}
              </div>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink
                      className={"nav-link mid-text"}
                      activeClassName="active"
                      to="/banks"
                    >
                      حسابات البنوك
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                    <NavLink
                      className={"nav-link mid-text"}
                      activeClassName="active"
                      to="/faq"
                    >
                      الأسئلة المتكررة
                    </NavLink>
                  </NavItem> */}
                  {!this.props.authenticated ? (
                    <React.Fragment>
                      <NavItem>
                        <NavLink
                          className={"nav-link mid-text"}
                          activeClassName="active"
                          to="/categories"
                        >
                          الدورات الحالية
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={"nav-link mid-text"}
                          activeClassName="active"
                          to="/auth/login"
                        >
                          تسجيل الدخول
                        </NavLink>
                      </NavItem>
                      <NavItem
                        className={
                          "nav-item rounded-nav-item pl-2 pr-2 light-border d-none d-sm-block"
                        }
                      >
                        <NavLink
                          className={"nav-link light-text"}
                          activeClassName="active"
                          to="/auth/register"
                        >
                          إنشاء حساب
                        </NavLink>
                      </NavItem>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <NavItem>
                        <NavLink
                          className={"nav-link mid-text"}
                          activeClassName="active"
                          to="/cart"
                        >
                          <img
                            src={"/assets/images/cart.png"}
                            height="18"
                            className="mr-2"
                          />
                          سلة التسوق
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={"nav-link mid-text"}
                          activeClassName="active"
                          to="/categories"
                        >
                          الدورات الحالية
                        </NavLink>
                      </NavItem>
                      <NavItem className="d-none d-sm-block">
                        <NavLink
                          className={"nav-link mid-text"}
                          activeClassName="active"
                          to="/subscriptions"
                        >
                          دوراتي
                        </NavLink>
                      </NavItem>{" "}
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle className={"nav-link mid-text"} nav>
                          <img
                            src={"/assets/images/user-circle.png"}
                            height="18"
                            className="mr-2"
                          />
                          {user && user.name}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem className="p-0">
                            <NavLink
                              className="nav-link mid-text"
                              activeClassName="active"
                              to="/account/update"
                            >
                              تعديل الملف
                            </NavLink>
                          </DropdownItem>
                          <DropdownItem className="p-0">
                            <a
                              className="nav-link clickable mid-text"
                              onClick={this.logout}
                            >
                              تسجيل الخروج
                            </a>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </React.Fragment>
                  )}
                </Nav>
              </Collapse>
            </div>
          </Navbar>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    phoneNumberConfirmed: state.auth.phoneNumberConfirmed,
    user: state.user
  };
}

HeaderComponent = connect(
  mapStateToProps,
  { signOutAction, getUser }
)(HeaderComponent);

export const Header = withRouter(HeaderComponent);
