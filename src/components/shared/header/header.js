import React, { Component } from "react";
import "./styles.sass";
import { NavLink, Route, withRouter } from "react-router-dom";
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
      isAuthenticated: false,
      isPhoneConfirmed: false,
      isOpen: false,
      details: null
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  getUser() {
    let token = localStorage.getItem("token");
    if (!token) {
      if (!this.state.isAuthenticated) return;
      this.setState({
        isAuthenticated: false,
        isPhoneConfirmed: false,
        details: null
      });
    }

    if (this.state.isAuthenticated) return;

    let jwtToken = jwt.decode(token);
    if (token) {
      this.setState({ isAuthenticated: true });
    } else this.setState({ isAuthenticated: false });
    if (jwtToken && jwtToken.phoneConfirmed == "True") {
      this.setState({ isPhoneConfirmed: true });
    } else {
      this.setState({ isPhoneConfirmed: false });
    }

    if (this.state.details) return;

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

  logout() {
    localStorage.removeItem("token");
    this.setState({ isAuthenticated: false });
    this.props.history.push("/");
  }

  render() {
    this.getUser();
    return (
      <React.Fragment>
        {this.state.isPhoneConfirmed == true ||
        this.state.isAuthenticated == false ? null : (
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
        )}

        <div className="header">
          <div className="container">
            <Navbar className="navbar navbar-expand-lg navbar-light bg-transparent">
              <NavbarBrand href="/">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                  height="70"
                />
                <span className="d-none d-sm-block" />
                <h5 className="dark-text d-none d-sm-block">
                  سلسلة بالبيد التعليمية
                </h5>
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                {this.state.isAuthenticated == false ? (
                  <Nav className="ml-auto" navbar>
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
                  </Nav>
                ) : (
                  <Nav className="ml-auto" navbar>
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
                        to="/account/courses"
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
                  </Nav>
                )}
              </Collapse>
            </Navbar>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export const Header = withRouter(HeaderComponent);
