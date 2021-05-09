import React, { Component } from "react";
// import "./styles.sass";
import { NavLink, Link, withRouter  } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";
import { apiBaseUrl } from "../../../api/helpers";
import { connect } from "react-redux";
import { signOutAction } from "../../../actions/login.actions";
import { getUser } from "../../../actions/user.actions";
import jwtDecode from "jwt-decode";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      categories: [],
      ClikedTab:""
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  logout = () => {
    this.props.signOutAction();
    this.props.history.push("/home");
  };
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.getUser();
    }

    if(window.location.href.includes("/home"))
    {
      this.setState({ClikedTab:"Main"});
    }
    else if(window.location.href.includes("/categories"))
    {
      this.setState({ClikedTab:"Category"});
    }
    else if(window.location.href.includes("/booklet"))
    {
      this.setState({ClikedTab:"Booklet"});
    }
    let token = localStorage.getItem("token");
    // Check for token expiration and redirect user to login if token is expired.
    if (token && jwtDecode(token).exp < Date.now() / 1000) {
      localStorage.clear();
      this.props.history.push("/auth/login");
    }
    axios
      .get(`${apiBaseUrl}/categories/CategoryHeader`)
      .then(response => {
       console.log("showthis",response);
        this.setState({ categories: response.data.data });
        setTimeout(
          function () {
            this.setState({loading: false });
          }.bind(this),
          800 
        );
      })
      .catch(error => {
        console.log(error);
      });

  }
renderSubCategory()
{
  const Categories = this.state.categories;
  debugger;
  return (
    <ul className="sub-list list-unstyled m-0 p-0">
  {Categories.map(cat => (
    <React.Fragment>
       {cat.childCatgories.length != 0 ? (
         <React.Fragment>
    <li className="dropdown-sub-wrapper position-relative">
      <a href={"/categories/details/"+cat.slug}>{cat.nameAr}</a>

   <ul className="sub-sub-list list-unstyled m-0 p-0">
   { cat.childCatgories.map(chiled=>(
    <li>
     <a href={"/categories/details/"+chiled.slug}>{chiled.nameAr}</a>
  </li>
   ))
   }
   </ul>
   </li>
   </React.Fragment>
  ) : (<li >
 <a href={"/categories/details/"+cat.slug}>{cat.nameAr}</a>
</li>)}
    </React.Fragment>
    
  ))}</ul>);
}
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.authenticated && this.props.authenticated) {
      this.props.getUser();
    }
  }

  verifyUser = () => {
    this.props.history.push("/verify");
  };

  render() {
    const user = this.props.user;
    return (
      <React.Fragment>
       {/* {!this.props.phoneNumberConfirmed &&
        this.props.authenticated &&
        !this.props.location.pathname.startsWith("/verify") ? (
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
        ) : null }

        <div className="header"> 
           <Navbar
            className={
              "navbar navbar-expand-lg navbar-light bg-transparent " +
              (this.props.location.pathname.startsWith(
                "/course/content/details"
              )
                ? "shadow-sm"
                : "null")
            }
          >
            <div className="container">
              <Link to="/home" className="navbar-brand mr-0">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                  height="80"
                />
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
                    to="/course/content"
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
                      className={"nav-link"}
                      activeClassName="active"
                      to="/banks"
                    >
                      حسابات البنوك
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={"nav-link"}
                      activeClassName="active"
                      to="/faq"
                    >
                      الأسئلة المتكررة
                    </NavLink>
                  </NavItem>
                  {!this.props.authenticated ? (
                    <React.Fragment>
                      <NavItem>
                        <NavLink
                          className={"nav-link"}
                          activeClassName="active"
                          to="/categories"
                        >
                          الدورات الحالية
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={"nav-link"}
                          activeClassName="active"
                          to="/booklet"
                        >
                          بيع الملازم
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={"nav-link"}
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
                          className={"nav-link "}
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
                          className={"nav-link "}
                          activeClassName="active"
                          to="/categories"
                        >
                          الدورات الحالية
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={"nav-link"}
                          activeClassName="active"
                          to="/booklet"
                        >
                          بيع الملازم
                        </NavLink>
                      </NavItem>
                      <NavItem className="d-none d-sm-block">
                        <NavLink
                          className={"nav-link "}
                          activeClassName="active"
                          to="/course/content"
                        >
                          دوراتي
                        </NavLink>
                      </NavItem>{" "}
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle className={"nav-link "} nav>
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
                            <NavLink
                              className="nav-link mid-text"
                              activeClassName="active"
                              to="/billing"
                            >
                              الحركات المالية
                            </NavLink>
                          </DropdownItem>
                          <DropdownItem className="p-0">
                            <NavLink
                              className="nav-link mid-text"
                              activeClassName="active"
                              to="/certificates"
                            >
                              الشهادات
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
        </div> */}
        {/* <!-- Start The Hemma Navbar --> */}
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white py-0">
      <div className="container-fluid">

        {/* <!-- Start The Main Hemma Logo --> */}
        {/* <Link class="navbar-brand">
          <img src="https://hemma.sa/assets/images/logo.png" height="60"/>
        </Link> */}
        <Link to="/home" className="navbar-brand mr-0" >
                <img className="logo-img"
                  src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                  height="60"
                />
              </Link>
        {/* <!-- End The Main Hemma Logo --> */}

        {/* <!-- Start The Mobile Button In Small Screen --> */}
        {/* <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-menu-mobile-navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> --> */}

        <button className="hamburger hamburger--spring navbar-toggler border p-2" type="button" data-bs-toggle="collapse" data-bs-target="#main-menu-mobile-navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="d-flex align-items-center justify-content-center">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </span>
        </button>
        {/* <!-- End The Mobile Button In Small Screen --> */}

        {/* <!-- Start The Main Links Of Hemma --> */}
        <div className="collapse navbar-collapse" id="main-menu-mobile-navbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a href="/home"  className={"nav-link d-inline-block "+(this.state.ClikedTab=="Main"?"active":"")}>الرئيسيه</a>
            </li>
            <li className="dropdown-wrapper nav-item position-relative">
              <a href="/categories" className={"nav-link d-inline-block " + (this.state.ClikedTab=="Category"?"active":"")}>
                <span>منصات همة </span>
               <i className="fas fa-caret-down"></i>
               </a>
               
            {this.renderSubCategory()}
            </li>
            <li className="nav-item">
              <a href="/booklet" className={"nav-link d-inline-block " + (this.state.ClikedTab=="Booklet"?"active":"")}>متجر همة للكتب</a>
            </li>
            <li className="nav-item">
              <a href="/home" className={"nav-link d-inline-block " + (this.state.ClikedTab=="Groups"?"active":"")}>المجموعات المجانيه</a>
            </li>
            {/* <li className="nav-item">
              <a href="/banks" className="nav-link d-inline-block">حسابات البنوك</a>
            </li>
            <li className="nav-item">
              <a href="/faq" className="nav-link d-inline-block">  الأسئلة المتكررة</a>
            </li> */}
            </ul>
            {!this.props.authenticated ? (
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
             <li className="nav-item">
               <a href="/auth/login" className="nav-link d-inline-block"> تسجيل الدخول</a>
             </li>
              <li className="nav-item">
              <a href="/auth/register" className="nav-link d-inline-block">  إنشاء حساب </a>
            </li>
              </ul>
            ):(
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
               <a href="/cart" className="nav-link d-inline-block">
               <img
                            src={"/assets/images/cart.png"}
                            height="18"
                            className="mr-2"
                          />سلة التسوق</a>
             </li>
             <li className="nav-item">
               <a href="/course/content" className="nav-link d-inline-block">دوراتي</a>
             </li> */}
             {/* <li className="nav-item">
              <a className="nav-link d-inline-block">
                <i className="far fa-bell"></i>
              </a>
            </li> */}
            {/* <li className="nav-item">
              <a className="nav-link d-inline-block">
                <i className="far fa-user"></i>
                <span>اسم الطالب</span>
              </a>
            </li> */}
            <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle className={"nav-link "} nav>
                          {/* <img
                            src={"/assets/images/user-circle.png"}
                            height="18"
                            className="mr-2"
                          /> */} 
                            <i className="far fa-user mr-2">  </i>
                          {user && user.name}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem className="p-0">
                          <a href="/account/update" className="nav-link d-inline-block">  تعديل الملف</a>
                            {/* <NavLink
                              className="nav-link mid-text"
                              activeClassName="active"
                              to="/account/update"
                            >
                            
                            </NavLink> */}
                          </DropdownItem>
                          <DropdownItem className="p-0">
                          <a  href="/cart" className="nav-link d-inline-block">مختاراتي</a>
                            {/* <NavLink
                              className="nav-link mid-text"
                              activeClassName="active"
                              to="/account/update"
                            >
                            
                            </NavLink> */}
                          </DropdownItem>
                          <DropdownItem className="p-0">
                          <a href="/course/content" className="nav-link d-inline-block"> دوراتي</a>
                            {/* <NavLink
                              className="nav-link mid-text"
                              activeClassName="active"
                              to="/account/update"
                            >
                            
                            </NavLink> */}
                          </DropdownItem>
                          <DropdownItem className="p-0">
                          <a href="/billing" className="nav-link d-inline-block">مشترياتي</a>
                            {/* <NavLink
                              className="nav-link mid-text"
                              activeClassName="active"
                              to="/billing"
                            >
                              الحركات المالية
                            </NavLink> */}
                          </DropdownItem>
                          <DropdownItem className="p-0">
                          <a href="/certificates" className="nav-link d-inline-block"> شهاداتي</a>
                            {/* <NavLink
                              className="nav-link mid-text"
                              activeClassName="active"
                              to="/certificates"
                            >
                              الشهادات
                            </NavLink> */}
                          </DropdownItem>
                          <DropdownItem className="p-0">
                            <a
                              className="nav-link d-inline-block"
                              onClick={this.logout}
                            >
                              تسجيل الخروج
                            </a>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
              </ul>
            )}
         
          {/* <ul class="navbar-nav mb-2 mb-lg-0">
           
            <li class="nav-item">
              <a class="nav-link d-inline-block">En</a>
            </li>
          </ul> */}
        </div>
        {/* <!-- End The Main Links Of Hemma --> */}

      </div>
      <div className="progressbar-wrapper">
        <div className="progressbar-line"></div>
      </div>
    </nav>
    {/* <!-- End The Hemma Navbar </nav>-->*/}
     
      </React.Fragment>
    );
  }
}


function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    phoneNumberConfirmed: state.auth.phoneNumberConfirmed,
    user: state.user,
  };
}

HeaderComponent = connect(mapStateToProps, { signOutAction, getUser })(
  HeaderComponent
);

export const Header = withRouter(HeaderComponent);
