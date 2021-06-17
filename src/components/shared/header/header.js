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
        linkDropdown.forEach(linkBtn => {
          linkBtn.onclick = function() {
            if (document.querySelector('.'+perfix+'sub-dropdown2')?.classList.contains('showing') || 
            document.querySelector('.'+perfix+'sub-dropdown3')?.classList.contains('showing')) {
              document.querySelector('.'+perfix+'sub-dropdown2').classList.remove('showing');
              document.querySelector('.'+perfix+'sub-dropdown3').classList.remove('showing');

              document.querySelectorAll('.'+perfix+'dropdown-sub-wrapper-three').forEach(ele => {
                ele.classList.remove('active');
              })
              document.querySelectorAll('.'+perfix+'dropdown-sub-wrapper-four').forEach(ele => {
                ele.classList.remove('active');
              })
              document.querySelectorAll('.'+perfix+'dropdown-sub-wrapper-two').forEach(ele => {
                ele.classList.remove('active');
              })
            } else {
              
            }
          }
        })
       

        /* ______________________________________________________________________ */
      
        // [2] Second Sub Menu Of Dropdown Menu
        let linkDropdownTwo = document.querySelectorAll('.'+perfix+'dropdown-sub-wrapper-two');
        let subDropdownTwo = document.querySelectorAll('.'+perfix+'sub-dropdown2');
        handleActiveEle(linkDropdownTwo, subDropdownTwo);
        linkDropdownTwo.forEach(linkBtn => {
          linkBtn.onclick = function() {
            if (document.querySelector('.'+perfix+'sub-dropdown2').classList.contains('showing')) {
              document.querySelector('.'+perfix+'sub-dropdown3').classList.remove('showing');
              document.querySelectorAll('.'+perfix+'dropdown-sub-wrapper-four').forEach(ele => {
                ele.classList.remove('active');
              })
              document.querySelectorAll('.'+perfix+'dropdown-sub-wrapper-three').forEach(ele => {
                ele.classList.remove('active');
              })
      
            }
          }
        })
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
      <span>{category.nameAr}</span>
        {
          category.hasChild == true? <i className="fas fa-chevron-left font-size-13 lighter-gray drop-icon"></i> : ""
        }
        
       
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
      <span>{category.nameAr}</span>
        {
          category.hasChild == true? <i className="fas fa-chevron-left font-size-13 lighter-gray drop-icon"></i> : ""
        }
        
        
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
      <span>{category.nameAr}</span>
        {
          category.hasChild == true? <i className="fas fa-chevron-left font-size-13 lighter-gray drop-icon"></i> : ""
        }
        
        
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
      <span>{category.nameAr}</span>
        {
          category.hasChild == true? <i className="fas fa-chevron-left font-size-13 lighter-gray drop-icon"></i> : ""
        }
        
       
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
    
        {/* <!-- Start The Hemma Navbar --> */}
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white py-0">
      <div className="container">

        {/* <!-- Start The Main Hemma Logo --> */}
     
        <Link to="/home" className="navbar-brand mr-0" >
                <img className="logo-img"
                  src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                  height="60"
                />
              </Link>
        {/* <!-- End The Main Hemma Logo --> */}

        {/* <!-- Start The Mobile Button In Small Screen --> */}
   

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
            <a href="/categories" className={"nav-link links-hover d-flex align-items-center justify-content-between "+(this.state.ClikedTab=="Category"?"active":"")}>
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
            
           
          
            <li className="dropdown-wrapper nav-item position-relative" data-hover="sub-list">
              <a className="nav-link links-hover d-flex align-items-center justify-content-between">
                <span className="mr-1">المجموعات المجانيه</span>
                <i className="fas fa-chevron-down font-size-13"></i>
              </a>
              <ul className="sub-list list-unstyled m-0">
              <div className="sm-scroll drop_one">
                { this.renderGroupCategory()}
              
                </div>
                </ul>
            </li>
           
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
                          </DropdownItem>
                          <DropdownItem className="p-0">
                          <a  href="/cart" className="nav-link d-inline-block">مختاراتي</a>
                          </DropdownItem>
                          <DropdownItem className="p-0">
                          <a href="/course/content" className="nav-link d-inline-block"> دوراتي</a>
                          </DropdownItem>
                          <DropdownItem className="p-0">
                          <a href="/billing" className="nav-link d-inline-block">الحركات المالية</a>
                          </DropdownItem>
                          <DropdownItem className="p-0">
                          <a href="/certificates" className="nav-link d-inline-block"> شهاداتي</a>
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
