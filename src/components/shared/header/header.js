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
      categorieslvl1: {},
      categorieslvl2: {},
      categorieslvl3: {},
      categorieslvl4: {},

      categoriesGroups:[],
      ClikedTab:""
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  logout = () => {
    localStorage.removeItem('account');
    localStorage.removeItem('checkbox');
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
       let categories= response.data.data;
        this.setState(
          { 
            categories: categories,
            categorieslvl1 : categories.find(c=>c.level==1),
            categorieslvl2 : categories.find(c=>c.level==2),
            categorieslvl3 : categories.find(c=>c.level==3),
            categorieslvl4 : categories.find(c=>c.level==4),

          }
          );
          PrepareDropdown('category-');
      })
      .catch(error => {
        console.log(error);
      });
      axios
      .get(`${apiBaseUrl}/categories/CategorygroupsHeader`)
      .then(response => {
        this.setState({ categoriesGroups: response.data.data });
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
      PrepareDropdown('');
   
      
      function PrepareDropdown(perfix)
      {
        /* Start Collapsing Sub Dropdown Menu By Ckicking */
        // [1] First Sub Menu Of Dropdown Menu
        let linkDropdown = document.querySelectorAll('.'+perfix+'dropdown-sub-wrapper-one');
        let subDropdown = document.querySelectorAll('.'+perfix+'sub-dropdown');
        handleActiveEle(linkDropdown, subDropdown);
        
      
        /* ______________________________________________________________________ */
      
        // [2] Second Sub Menu Of Dropdown Menu
        let linkDropdownTwo = document.querySelectorAll('.'+perfix+'dropdown-sub-wrapper-two');
        let subDropdownTwo = document.querySelectorAll('.'+perfix+'sub-dropdown2');
        handleActiveEle(linkDropdownTwo, subDropdownTwo);
      
        /* ______________________________________________________________________ */
      
        // [3] Third Sub Menu Of Dropdown Menu
        let linkDropdownThree = document.querySelectorAll('.'+perfix+'dropdown-sub-wrapper-three');
        let subDropdownThree = document.querySelectorAll('.'+perfix+'sub-dropdown3');
        handleActiveEle(linkDropdownThree, subDropdownThree);
      
      
      
      
        let mainLinkDropDown = document.querySelector('.'+perfix+'dropdown-wrapper');
        mainLinkDropDown.onmouseover = function(e) {
          let subListMenu = document.querySelector('.' + e.currentTarget.dataset.hover);
          if(!subListMenu.classList.contains('show')) {
            subListMenu.classList.add('show');
          }
        }
         mainLinkDropDown.onmouseout = function(e) {
          let subListMenu = document.querySelector('.' + e.currentTarget.dataset.hover);
          if(subListMenu.classList.contains('show')) {
            subListMenu.classList.remove('show');
          }
        }
        document.addEventListener('mouseover', function(event) {
          var isClickInside = mainLinkDropDown.contains(event.target);
          let subListMenu = document.querySelector('.'+perfix+'sub-list');
          if (isClickInside) { return false; } else {
            subListMenu.classList.remove('show');
            // document.querySelector('.'+perfix+'sub-dropdown').classList.remove('showing');
            // document.querySelector('.'+perfix+'sub-dropdown2').classList.remove('showing');
            // document.querySelector('.'+perfix+'sub-dropdown3').classList.remove('showing');
            document.querySelectorAll('.'+perfix+'sub-dropdown').forEach(ele => {
              ele.classList.remove('showing');
            })
      
            document.querySelectorAll('.'+perfix+'sub-dropdown2').forEach(ele => {
              ele.classList.remove('showing');
            })
      
            document.querySelectorAll('.'+perfix+'sub-dropdown3').forEach(ele => {
              ele.classList.remove('showing');
            })
      
            document.querySelectorAll('.'+perfix+'dropdown-sub-wrapper-one').forEach(ele => {
              ele.classList.remove('active');
            })
      
            document.querySelectorAll('.'+perfix+'dropdown-sub-wrapper-two').forEach(ele => {
              ele.classList.remove('active');
            })
      
            document.querySelectorAll('.'+perfix+'dropdown-sub-wrapper-three').forEach(ele => {
              ele.classList.remove('active');
            })
          }
        });
      }
      
      
        function handleActiveEle(element, list) {
          debugger;

          element.forEach(smEle => {
            smEle.addEventListener('click', (e) => {
console.log("sameh",e.currentTarget.dataset.haschild)
if(e.currentTarget.dataset.haschild == "false")
{
return;
}

              e.preventDefault();
              let dropMenu = document.querySelector('.' + e.currentTarget.dataset.dropmenu);
              element.forEach(ele => {
                ele.classList.remove('active');
              });
              list.forEach(subDrop => {
                subDrop.classList.remove('showing');
              });
              e.currentTarget.classList.add('active');
              dropMenu.classList.toggle('showing');
            })
          });
        }

  }




renderSubCategory()
{
  const Categories = this.state.categorieslvl1;
  
return(
  <React.Fragment>
 <div className="sm-scroll category-drop_one">
  {Categories?.categoriesIds?.map((categoryId,index) => (
    
      Categories.childCategories[categoryId].map((category,index) => (
      <li className="category-dropdown-sub-wrapper-one" data-dropmenu={"drop_"+category.id}  data-hasChild={category.hasChild}>
      <a href={"/categories/details/"+category.slug} className="linked">
        {
          category.hasChild == true? <i className="fas fa-chevron-left font-size-13 lighter-gray drop-icon"></i> : ""
        }
        
        <span>{category.nameAr}</span>
      </a>
    </li>))
    

  ))}
  </div>
  </React.Fragment>
)
}


renderSubCategorylvl2()
{
  const Categories = this.state.categorieslvl2;
  
return(
  <React.Fragment>

  {Categories?.categoriesIds?.map((categoryId,index) => (
     <div  className={"sm-scroll category-sub-dropdown drop_"+categoryId}>
     { Categories.childCategories[categoryId].map((category,index) => (
      <li className="category-dropdown-sub-wrapper-two" data-dropmenu={"drop_"+category.id} data-hasChild={category.hasChild}>
      <a href={"/categories/details/"+category.slug} className="linked" >
        {
          category.hasChild == true? <i className="fas fa-chevron-left font-size-13 lighter-gray drop-icon"></i> : ""
        }
        
        <span>{category.nameAr}</span>
      </a>
    </li>)) }
     </div>

  ))}
 
  </React.Fragment>
)
}

renderSubCategorylvl3()
{
  const Categories = this.state.categorieslvl3;
  
return(
  <React.Fragment>

  {Categories?.categoriesIds?.map((categoryId,index) => (
     <div  className={"sm-scroll category-sub-dropdown2 drop_"+categoryId}>
     { Categories.childCategories[categoryId].map((category,index) => (
      <li className="category-dropdown-sub-wrapper-three" data-dropmenu={"drop_"+category.id} data-hasChild={category.hasChild}>
      <a href={"/categories/details/"+category.slug} className="linked">
        {
          category.hasChild == true? <i className="fas fa-chevron-left font-size-13 lighter-gray drop-icon"></i> : ""
        }
        
        <span>{category.nameAr}</span>
      </a>
    </li>)) }
     </div>

  ))}
 
  </React.Fragment>
)
}
renderSubCategorylvl4()
{
  const Categories = this.state.categorieslvl4;
  
return(
  <React.Fragment>

  {Categories?.categoriesIds?.map((categoryId,index) => (
     <div  className={"sm-scroll category-sub-dropdown3 drop_"+categoryId}>
     { Categories.childCategories[categoryId].map((category,index) => (
      <li className="category-dropdown-sub-wrapper-four" data-dropmenu={"drop_"+category.id} data-hasChild={category.hasChild}>
      <a href={"/categories/details/"+category.slug} className="linked" >
        {
          category.hasChild == true? <i className="fas fa-chevron-left font-size-13 lighter-gray drop-icon"></i> : ""
        }
        
        <span>{category.nameAr}</span>
      </a>
    </li>)) }
     </div>

  ))}
 
  </React.Fragment>
)
}


  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.authenticated && this.props.authenticated) {
      this.props.getUser();
    }
  }

  verifyUser = () => {
    this.props.history.push("/verify");
  };
  renderGroupCategory()
  {
    const Categories = this.state.categoriesGroups;
    return(
      <React.Fragment>
         {Categories.map((category,index) => (
<li className="dropdown-sub-wrapper-four">
                    <a href={"/categories/details/"+category.slug+"#tab-three"} >
                      <span>{category.nameAr}</span>
                    </a>
                  </li>
  ))}
      </React.Fragment>
    )

  }

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
      <div className="container">

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
              <a href="/home"  className={"nav-link links-hover "+(this.state.ClikedTab=="Main"?"active":"")}>الرئيسيه</a>
            </li>
            <li className="category-dropdown-wrapper nav-item position-relative" data-hover="category-sub-list">
            <a className="nav-link links-hover d-flex align-items-center justify-content-between">
                <span className="mr-1">منصات همة</span>
                <i className="fas fa-chevron-down font-size-13"></i>
              </a>
               <ul className="category-sub-list list-unstyled m-0">
                 {this.renderSubCategory()}
                 {this.renderSubCategorylvl2()}
                 {this.renderSubCategorylvl3()}
                 {this.renderSubCategorylvl4()}
               </ul>
            </li>
             {/* <li class="category-dropdown-wrapper nav-item position-relative" data-hover="category-sub-list">
              <a class="nav-link links-hover d-flex align-items-center justify-content-between">
                <span>المجموعات المجانيه</span>
                <i class="fas fa-chevron-down font-size-13"></i>
              </a>
              <ul class="category-sub-list list-unstyled m-0">
                <div class="sm-scroll category-drop_one">
                  <li class="category-dropdown-sub-wrapper-one" data-dropmenu="category-drop_two">
                    <a href="#" class="linked">
                      <i class="fas fa-chevron-left font-size-13 lighter-gray drop-icon"></i>
                      <span>منصات الطالب</span>
                    </a>
                  </li>
                  <li class="category-dropdown-sub-wrapper-one" data-dropmenu="category-drop_two">
                    <a href="#" class="linked">
                      <i class="fas fa-chevron-left font-size-13 lighter-gray drop-icon"></i>
                      <span>منصة المعلم</span>
                    </a>
                  </li>
                  <li class="category-dropdown-sub-wrapper-one" data-dropmenu="category-drop_two">
                    <a href="#" class="linked">
                      <i class="fas fa-chevron-left font-size-13 lighter-gray drop-icon"></i>
                      <span>دورات اجتياز القياس</span>
                    </a>
                  </li>
                  <li class="category-dropdown-sub-wrapper-one">
                    <a href="#">
                      <i class="fas fa-chevron-left font-size-13 lighter-gray"></i>
                      <span>دورات وتدريبات</span>
                    </a>
                  </li>
                  <li class="category-dropdown-sub-wrapper-one">
                    <a href="#">
                      <i class="fas fa-chevron-left font-size-13 lighter-gray"></i>
                      <span>دورات وتدريبات</span>
                    </a>
                  </li>
                  <li class="category-dropdown-sub-wrapper-one">
                    <a href="#">
                      <span>دورات وتدريبات</span>
                    </a>
                  </li>
                  <li class="category-dropdown-sub-wrapper-one">
                    <a href="#">
                      <span>دورات وتدريبات</span>
                    </a>
                  </li>
                </div>

                <div class="sm-scroll category-sub-dropdown category-drop_two">
                  <li class="category-dropdown-sub-wrapper-two" data-dropmenu="category-drop_three_mina">
                    <a href="#">
                      <i class="fas fa-chevron-left font-size-13 lighter-gray"></i>
                      <span>عنصر 1</span>
                    </a>
                  </li>
                  <li class="category-dropdown-sub-wrapper-two" data-dropmenu="category-drop_three_mina1">
                    <a href="#" class="linked">
                      <i class="fas fa-chevron-left font-size-13 lighter-gray"></i>
                      <span>عنصر 2</span>
                    </a>
                  </li>
                  <li class="category-dropdown-sub-wrapper-two" data-dropmenu="category-drop_three_mina2">
                    <a href="#">
                      <i class="fas fa-chevron-left font-size-13 lighter-gray"></i>
                      <span>عنصر رقم 3</span>
                    </a>
                  </li>
                </div>



                <div class="sm-scroll category-sub-dropdown2 category-drop_three_mina">
                  <li class="category-dropdown-sub-wrapper-three" data-dropmenu="category-drop_four">
                    <a href="#">
                      <i class="fas fa-chevron-left font-size-13 lighter-gray"></i>
                      <span>عنصر 1.1</span>
                    </a>
                  </li>
                  <li class="category-dropdown-sub-wrapper-three" data-dropmenu="category-drop_four">
                    <a href="#" class="linked">
                      <i class="fas fa-chevron-left font-size-13 lighter-gray"></i>
                      <span>عنصر 2.1</span>
                    </a>
                  </li>
                  <li class="category-dropdown-sub-wrapper-three" data-dropmenu="category-drop_four">
                    <a href="#">
                      <i class="fas fa-chevron-left font-size-13 lighter-gray"></i>
                      <span>عنصر رقم 3.1</span>
                    </a>
                  </li>
                </div>

                <div class="sm-scroll category-sub-dropdown2 category-drop_three_mina1">
                 
                  <li class="category-dropdown-sub-wrapper-three" data-dropmenu="category-drop_four">
                    <a href="#" class="linked">
                      <i class="fas fa-chevron-left font-size-13 lighter-gray"></i>
                      <span>عنصر 2.1</span>
                    </a>
                  </li>
                 
                </div>   
                <div class="sm-scroll category-sub-dropdown2 category-drop_three_mina2">
               
                  <li class="category-dropdown-sub-wrapper-three" data-dropmenu="category-drop_four">
                    <a href="#">
                      <i class="fas fa-chevron-left font-size-13 lighter-gray"></i>
                      <span>عنصر رقم 3.1</span>
                    </a>
                  </li>
                </div>
                <div class="sm-scroll category-sub-dropdown3 category-drop_four">
                  <li class="category-dropdown-sub-wrapper-four">
                    <a href="#">
                      <span>عنصر 1.2</span>
                    </a>
                  </li>
                  <li class="category-dropdown-sub-wrapper-four">
                    <a href="#" class="linked">
                      <span>عنصر 2.2</span>
                    </a>
                  </li>
                  <li class="category-dropdown-sub-wrapper-four">
                    <a href="#">
                      <span>عنصر رقم 3.2</span>
                    </a>
                  </li>
                </div>

              </ul>
            </li> */}
            <li className="nav-item">
              <a href="/booklet" className={"nav-link links-hover " + (this.state.ClikedTab=="Booklet"?"active":"")}>متجر همة للكتب</a>
            </li>
            {/* <li className="nav-item">
              <a href="/home" className={"nav-link links-hover " + (this.state.ClikedTab=="Groups"?"active":"")}>المجموعات المجانيه</a>
            </li> */}
            <li className="dropdown-wrapper nav-item position-relative" data-hover="sub-list">
              <a className="nav-link links-hover d-flex align-items-center justify-content-between">
                <span className="mr-1">المجموعات المجانيه</span>
                <i className="fas fa-chevron-down font-size-13"></i>
              </a>
              <ul className="sub-list list-unstyled m-0">
              <div className="sm-scroll drop_one">
                { this.renderGroupCategory()}
              {/* <li className="dropdown-sub-wrapper-four">
                    <a href="#">
                      <span>عنصر 1.2</span>
                    </a>
                  </li>
                  <li className="dropdown-sub-wrapper-four">
                    <a href="#" className="linked">
                      <span>عنصر 2.2</span>
                    </a>
                  </li>
                  <li className="dropdown-sub-wrapper-four">
                    <a href="#">
                      <span>عنصر رقم 3.2</span>
                    </a>
                  </li>
                  <li className="dropdown-sub-wrapper-four">
                    <a href="#" className="linked">
                      <span>عنصر 2.2</span>
                    </a>
                  </li>
                  <li className="dropdown-sub-wrapper-four">
                    <a href="#">
                      <span>عنصر رقم 3.2</span>
                    </a>
                  </li> */}
                </div>
                </ul>
            </li>
            {/* <li className="nav-item">
              <a href="/banks" className="nav-link links-hover">حسابات البنوك</a>
            </li>
            <li className="nav-item">
              <a href="/faq" className="nav-link links-hover">  الأسئلة المتكررة</a>
            </li> */}
            </ul>
            {!this.props.authenticated ? (
              <ul className="navbar-nav mb-2 mb-lg-0">
             <li className="nav-item">
               <a href="/auth/login" className="nav-link links-hover"> تسجيل الدخول</a>
             </li>
              <li className="nav-item">
              <a href="/auth/register" className="nav-link links-hover">  إنشاء حساب </a>
            </li>
              </ul>
            ):(
              <ul className="navbar-nav mb-2 mb-lg-0">
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
