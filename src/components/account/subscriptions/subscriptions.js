import React, { Component } from "react";
import axios from "axios";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Link, withRouter, Redirect } from "react-router-dom";
import { apiBaseUrl } from "../../../api/helpers";
import { connect } from "react-redux";
import { getProfile } from "../../../actions";
import classnames from "classnames";
import { SubscriptionsList } from "./list/subscriptions-list";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";
import "./index.scss"
export class SubscriptionsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      subscriptions: [],
      activeTab: "Active",
      isPageLoading: false,
    };
    this.setActiveTab = this.setActiveTab.bind(this);
  }

  setActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  async componentDidMount() {
    this.setState({ isPageLoading: true });
    this.props.getProfile();
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${apiBaseUrl}/courses/purchased?SubscriptionStatus=All`, {
        headers,
      })
      .then((response) => {
        this.setState({
          subscriptions: response.data.data,
          isPageLoading: false,
        });
      })
      .catch((error) => {
        this.setState({ isPageLoading: false });
        console.log(error);
      });
  }

  render() {
    let avatarImg;
    if (this.props.initialValues.gender == "Male") {
      avatarImg = process.env.PUBLIC_URL + "/assets/images/man.png";
    } else if (this.props.initialValues.gender == "Female") {
      avatarImg = process.env.PUBLIC_URL + "/assets/images/women.png";
    }
    return (
      <React.Fragment>
        <section className="pt-5 pb-5">
          <div className="container">
            <header className="mb-5">
              <div className="d-flex flex-column align-items-center">
                <div className="card-container">
                  <div className="img-wrapper card-hover mb-2 mx-180">
                    <img
                      src="/assets/images/icon-header.png"
                      className="height-70"
                      alt="Human Photo"
                    />
                  </div>
                </div>
                <h1 className="main-color h1 mb-4 font-weight-bold">دوراتي</h1>
              </div>
              {/* <hr style="background:#cecccc"/> */}
            </header>
            <div className="row">
              {/* <div className="col-md-4">
                <div className="white-bg box-layout w-100 p-4 d-flex align-items-center justify-content-center flex-column mb-4">
                  <img src={avatarImg} height="110" className="mb-3" />
                  <h6 className="dark-text mb-1">
                    {this.props.initialValues && this.props.initialValues.name}
                  </h6>
                  <p className="dark-text en-text small mb-0">
                    {this.props.initialValues && this.props.initialValues.email}
                  </p>
                  <p className="dark-text en-text small mb-1" dir="ltr">
                    {this.props.initialValues &&
                      this.props.initialValues.phoneNumber}
                  </p>
                  <Link
                    to="/account/update"
                    className="light-text text-underline small"
                  >
                    تعديل الملف الشخصي
                  </Link>
                </div>
              </div> */}
              <div className="col-lg-3 card-container m-0">
                <div className="card-hover mb-4 px-3 py-4 bg-transparent border-radius-40">
                  <img src={avatarImg} className="human-img" alt="Man Icons" />
                  <h5 className="h5 main-color font-weight-bold title-shadow-purple text-center mb-2">
                    {this.props.initialValues && this.props.initialValues.name}
                  </h5>
                  <h6 className="h6 text-muted font-weight-bold text-center">
                    {this.props.initialValues && this.props.initialValues.email}
                  </h6>
                  <h6 className="h6 text-muted font-weight-bold text-center mb-4">
                    {this.props.initialValues &&
                      this.props.initialValues.phoneNumber}
                  </h6>
                  <Link
                    to="/account/update"
                    className="btn-green mx-auto headShake"
                  >
                    تعديل الملف
                  </Link>
                  {/* <a className="">تعديل الملف الشخصى</a> */}
                </div>
                {/* <img src="./images/women.png" className="human-img" alt="Women Icon"/> */}
              </div>
              <div className="col-lg-9">
                <header className="d-flex align-items-center mb-3">
                  <div className="section-title-img">
                    <img
                      src="/assets/images/icon-title-section.png"
                      alt="ImageOfSection"
                    />
                  </div>
                  <h3 className="main-color h3 font-weight-bold">
                    قائمة الدورات
                  </h3>
                </header>
                <>
                  {this.state.isPageLoading ? (
                    <div
                      className="silver-bg box-layout w-100 pb-0 p-3 mt-4 d-flex justify-content-center align-items-center"
                      style={{ minHeight: 350 }}
                    >
                      <Loader
                        type="ball-spin-fade-loader"
                        className="dark-loader"
                      />
                    </div>
                  ) : (
                    <>
                      {/* {this.state.subscriptions == undefined || this.state.subscriptions.length == 0?(*/}
                      {this.state.subscriptions.itemCount == 0 ? (
                        <React.Fragment>
                          <div
                            className="silver-bg box-layout w-100 pb-0 p-4 mt-4 d-flex flex-column align-items-center justify-content-center"
                            style={{ height: 300 }}
                          >
                            <p className="dark-text mt-0">
                              يشرفنا انضمامك لنا!
                            </p>
                            <Link
                              to="/categories"
                              className="btn light-outline-btn w-25"
                            >
                              أختر دورتك الآن
                            </Link>{" "}
                          </div>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <div className="card tab-card">
                            <ul
                              className="card-header nav d-flex justify-content-between"
                              id="myTab"
                              role="tablist"
                            >
                              <li
                                className="card-items-tab nav-item font-weight-bold"
                                role="presentation"
                              >
                                <a
                                  className="nav-link active"
                                  id="home-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#Active"
                                  type="button"
                                  role="tab"
                                  aria-controls="Active"
                                  aria-selected="true"
                                >
                                  سارية
                                </a>
                              </li>
                              <li
                                className="card-items-tab nav-item font-weight-bold"
                                role="presentation"
                              >
                                <a
                                  className="nav-link"
                                  id="profile-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#Expired"
                                  type="button"
                                  role="tab"
                                  aria-controls="Expired"
                                  aria-selected="false"
                                >
                                  منتهية
                                </a>
                              </li>
                              <li
                                className="card-items-tab nav-item font-weight-bold"
                                role="presentation"
                              >
                                <a
                                  className="nav-link"
                                  id="contact-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#Withdrawn"
                                  type="button"
                                  role="tab"
                                  aria-controls="Withdrawn"
                                  aria-selected="false"
                                >
                                  منسحب
                                </a>
                              </li>
                            </ul>
                            {/* <Nav tabs className="account-tabs mx-auto">
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: this.state.activeTab === "Active"
                                    })}
                                    onClick={() => this.setActiveTab("Active")}
                                  >
                                    سارية
                        </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: this.state.activeTab === "Expired"
                                    })}
                                    onClick={() => this.setActiveTab("Expired")}
                                  >
                                    منتهية
                        </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: this.state.activeTab === "Withdrawn"
                                    })}
                                    onClick={() => this.setActiveTab("Withdrawn")}
                                  >
                                    منسحب
                        </NavLink>
                                </NavItem>
                              </Nav> */}
                            {/* <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="Active">
                                  <SubscriptionsList subscriptionStatus="Active" />
                                </TabPane>
                                <TabPane tabId="Expired">
                                  <SubscriptionsList subscriptionStatus="Expired" />
                                </TabPane>
                                <TabPane tabId="Withdrawn">
                                  <SubscriptionsList subscriptionStatus="Withdrawn" />
                                </TabPane>
                              </TabContent> */}
                            <div className="card-body">
                              <div className="tab-content" id="myTabContent">
                                <div
                                  className="tab-pane fade show active"
                                  id="Active"
                                  role="tabpanel"
                                  aria-labelledby="home-tab"
                                >
                                  <SubscriptionsList subscriptionStatus="Active" />
                                </div>
                                <div
                                  className="tab-pane fade "
                                  id="Expired"
                                  role="tabpanel"
                                  aria-labelledby="home-tab"
                                >
                                  <SubscriptionsList subscriptionStatus="Expired" />
                                </div>
                                <div
                                  className="tab-pane fade "
                                  id="Withdrawn"
                                  role="tabpanel"
                                  aria-labelledby="home-tab"
                                >
                                  <SubscriptionsList subscriptionStatus="Withdrawn" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      )}
                    </>
                  )}
                </>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialValues: state.profile,
    entireState: state,
  };
}

SubscriptionsComponent = connect(mapStateToProps, { getProfile })(
  SubscriptionsComponent
);

export default withRouter(SubscriptionsComponent);
