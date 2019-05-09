import React, { Component } from "react";
import "./styles.sass";
import { NavLink, Link, withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      details: null
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout() {
    localStorage.removeItem("token");
    window.location = "/";
  }

  componentDidMount() {
    try {
      let token = localStorage.getItem("token");
      if (token) {
        let headers = {
          Authorization: `Bearer ${token}`
        };
        axios
          .get("https://api.staging.hemma.sa/api/v1/users/me", { headers })
          .then(response => {
            this.setState({ details: response.data.data });
          })
          .catch(error => {
            console.log(error);
          });
      }
    } catch (ex) {}
  }

  verifyUser = () => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .post("https://api.staging.hemma.sa/api/v1/auth/phone/send_token", null, {
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
    return (
      <React.Fragment>
        {this.props.user && this.props.user.phoneConfirmed == "False" ? (
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
              <NavbarBrand>
                <Link to="/">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                    height="70"
                  />
                  <span className="d-none d-sm-block" />
                  <h5 className="dark-text d-none d-sm-block">
                    سلسلة بالبيد التعليمية
                  </h5>
                </Link>
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {!this.props.user && (
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
                          "nav-item rounded-nav-item pl-2 pr-2 light-border"
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
                  )}

                  {this.props.user && (
                    <React.Fragment>
                      <NavItem>
                        <NavLink
                          className={"nav-link mid-text"}
                          activeClassName="active"
                          to="/cart"
                        >
                          <img src={"/assets/images/cart.png"} height="18" />
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

                      <NavItem>
                        <NavLink
                          className={"nav-link mid-text"}
                          activeClassName="active"
                          to="/account/subscriptions"
                        >
                          دوراتي
                        </NavLink>
                      </NavItem>
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle className={"nav-link mid-text"} nav>
                          <img
                            src={"/assets/images/user-circle.png"}
                            height="18"
                            className="mr-2"
                          />
                          {this.state.details ? this.state.details.name : ""}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem className="p-0">
                            <NavLink
                              className="nav-link mid-text"
                              activeClassName="active"
                              to="/account/edit"
                            >
                              تعديل الملف
                            </NavLink>
                          </DropdownItem>
                          <DropdownItem className="p-0">
                            <a
                              className="nav-link clickable mid-text"
                              onClick={() => this.logout()}
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

export const Header = withRouter(HeaderComponent);
