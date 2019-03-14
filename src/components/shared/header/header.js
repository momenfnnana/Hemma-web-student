import React, { Component } from "react";
import "./styles.sass";
import { NavLink, Route } from "react-router-dom";
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

export class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isAuthenticated: false,
      isPhoneConfirmed: false,
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    let jwtToken = jwt.decode(token);

    if (token) {
      this.setState({ isAuthenticated: true });
    } else this.setState({ isAuthenticated: false });

    if (jwtToken && jwtToken.phoneConfirmed == "True") {
      this.setState({ isPhoneConfirmed: true });
    } else {
      this.setState({ isPhoneConfirmed: false });
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.setState({ isAuthenticated: false });
  }

  render() {
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
                <span />
                <h5 className="dark-text">سلسلة بالبيد التعليمية</h5>
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                {this.state.isAuthenticated == false ? (
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/categories"
                      >
                        الدورات الحالية
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/auth/login"
                      >
                        تسجيل الدخول
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav-item rounded-nav-item pl-2 pr-2">
                      <NavLink
                        className="nav-link"
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
                        className="nav-link"
                        activeClassName="active"
                        to="/categories"
                      >
                        الدورات الحالية
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/account/courses"
                      >
                        دوراتي
                      </NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle className="light-text" nav>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/user-circle.png"
                          }
                          height="22"
                          className="mr-2"
                        />
                        ساره صلاح
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem className="p-0">
                          <NavLink
                            className="nav-link"
                            activeClassName="active"
                            to="/account/edit"
                          >
                            تعديل الملف
                          </NavLink>
                        </DropdownItem>
                        <DropdownItem className="p-0">
                          <a
                            className="nav-link clickable"
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
