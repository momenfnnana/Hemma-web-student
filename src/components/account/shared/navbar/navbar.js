import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./styles.sass";

export class AccountNavbar extends Component {
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
  render() {
    return (
      <React.Fragment>
        <div className="account-navbar">
          <Navbar className="navbar navbar-expand-lg navbar-light bg-transparent">
            <div className="container">
              <NavbarBrand href="/">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                  height="55"
                />
                <span className="d-none d-sm-block" />
                <h6 className="dark-text d-none d-sm-block">
                  سلسلة بالبيد التعليمية
                </h6>
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink
                      className="nav-link mid-text"
                      activeClassName="active"
                      to="/cart"
                    >
                      <img src={"/assets/images/cart.png"} height="15" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link mid-text light-font-text"
                      activeClassName="active"
                      to="/categories"
                    >
                      الدورات الحالية
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className="nav-link mid-text light-font-text"
                      activeClassName="active"
                      to="/account/courses"
                    >
                      دوراتي
                    </NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle
                      className="nav-link mid-text light-font-text"
                      nav
                    >
                      <img
                        src={"/assets/images/user-circle.png"}
                        height="18"
                        className="mr-2"
                      />
                      ساره أبو التين
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem className="p-0">
                        <NavLink
                          className="nav-link mid-text light-font-text"
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
              </Collapse>
            </div>
          </Navbar>
        </div>
      </React.Fragment>
    );
  }
}
