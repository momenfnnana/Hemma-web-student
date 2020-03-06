import React, { Component } from "react";
import axios from "axios";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { apiBaseUrl } from "../../../api/helpers";
import { connect } from "react-redux";
import { getProfile } from "../../../actions";
import classnames from "classnames";
import { SubscriptionsList } from "./list/subscriptions-list";

export class SubscriptionsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      subscriptions: [],
      activeTab: "Active"
    };
    this.setActiveTab = this.setActiveTab.bind(this);
  }

  setActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  async componentDidMount() {
    this.props.getProfile();
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/courses/purchased?SubscriptionStatus=All`, {
        headers
      })
      .then(response => {
        this.setState({ subscriptions: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let avatarImg;
    if (this.props.initialValues.gender == "Male") {
      avatarImg = process.env.PUBLIC_URL + "/assets/images/male-avatar.png";
    } else if (this.props.initialValues.gender == "Female") {
      avatarImg = process.env.PUBLIC_URL + "/assets/images/female-avatar.png";
    }

    return (
      <React.Fragment>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
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
              </div>
              <div className="col-md-8">
                <h5 className="dark-text mb-3">قائمة دوراتي</h5>
                {this.state.subscriptions == undefined ||
                this.state.subscriptions.length == 0 ? (
                  <React.Fragment>
                    <div
                      className="silver-bg box-layout w-100 pb-0 p-4 mt-4 d-flex flex-column align-items-center justify-content-center"
                      style={{ height: 300 }}
                    >
                      <p className="dark-text mt-0">يشرفنا انضمامك لنا!</p>
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
                    <Nav tabs className="account-tabs mx-auto">
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
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="Active">
                        <SubscriptionsList subscriptionStatus="Active" />
                      </TabPane>
                      <TabPane tabId="Expired">
                        <SubscriptionsList subscriptionStatus="Expired" />
                      </TabPane>
                      <TabPane tabId="Withdrawn">
                        <SubscriptionsList subscriptionStatus="Withdrawn" />
                      </TabPane>
                    </TabContent>
                  </React.Fragment>
                )}
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
    entireState: state
  };
}

SubscriptionsComponent = connect(
  mapStateToProps,
  { getProfile }
)(SubscriptionsComponent);

export const Subscriptions = withRouter(SubscriptionsComponent);
