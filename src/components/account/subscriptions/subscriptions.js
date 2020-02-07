import React, { Component } from "react";
import axios from "axios";
import {
  Tooltip,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { apiBaseUrl } from "../../../api/helpers";
import swal from "@sweetalert/with-react";
import { connect } from "react-redux";
import { getProfile } from "../../../actions";
import classnames from "classnames";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-clip-rotate.scss";

export class SubscriptionsComponent extends Component {
  page = 1;
  limit = 4;
  endOfResults = false;
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false,
      details: [],
      subscriptions: [],
      hideBtn: false,
      loading: false,
      disabled: false,
      nextPageUrl: `${apiBaseUrl}/courses/purchased?Page=${this.page}&Limit=${this.limit}`,
      activeTab: "Active",
      activeCourses: [],
      expiredCourses: [],
      cancelledCourses: []
    };
    this.setActiveTab = this.setActiveTab.bind(this);
  }

  setActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  async componentDidMount() {
    this.props.getProfile();
    await this.loadMore();
  }

  loadMore = async () => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    this.setState({ loading: true, disabled: true });
    if (!this.endOfResults) {
      axios
        .get(this.state.nextPageUrl, { headers })
        .then(response => {
          this.setState({ loading: false, disabled: false });
          const newSubscriptions = [
            ...this.state.subscriptions,
            ...response.data.data.data
          ];
          this.endOfResults = response.data.data.itemCount < this.limit;
          this.page++;
          const nextUrl = `${apiBaseUrl}/courses/purchased?Page=${this.page}&Limit=${this.limit}`;
          this.setState({
            subscriptions: newSubscriptions,
            nextPageUrl: nextUrl
          });
          if (newSubscriptions.length == response.data.data.itemCount) {
            this.setState({ hideBtn: true });
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading: false, disabled: false });
        });
    }
  };

  renderCourses() {
    const subscriptions = this.state.subscriptions || [];
    const activeTabSubs = subscriptions.filter(
      s => s.subscriptionStatus === this.state.activeTab
    );
    if (activeTabSubs.length == 0) {
      return (
        <div className="col-12">
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ height: 200 }}
          >
            <img
              src={process.env.PUBLIC_URL + "/assets/images/course.png"}
              className="mb-1"
              height="80"
            />
            <h5 className="dark-text mt-0">لا يوجد دورات</h5>
          </div>
        </div>
      );
    }
    return activeTabSubs.map(subscription => (
      <React.Fragment>
        {this.state.activeTab == subscription.subscriptionStatus && (
          <div className="col-md-4 col-12">
            <div
              key={subscription.id}
              onClick={() => {
                subscription.cumulativePaymentStatus == "Unpaid" ||
                // subscription.cumulativePaymentStatus == "PartiallyPaid" ||
                subscription.cumulativePaymentStatus == "Pending"
                  ? swal(
                      "عفواً",
                      "تفاصيل الدورة غير متاحة حتى يتم مراجعة الحوالة من قبل الإدارة",
                      "error",
                      {
                        button: "متابعة"
                      }
                    )
                  : subscription.subscriptionStatus == "Expired"
                  ? swal(
                      "عفواً",
                      "تفاصيل الدورة غير متاحة بسبب انتهاء الاشتراك",
                      "error",
                      {
                        button: "متابعة"
                      }
                    )
                  : this.props.history.push(
                      `/subscriptions/${subscription.course.id}`
                    );
              }}
            >
              <div className="card card-sm md-height shadow-sm border-0 clickable">
                <header className="card-thumb">
                  <img src={subscription.course.bannerUrl} alt="Course image" />
                </header>
                <div className="card-body d-flex flex-column justify-content-center">
                  <h6 className="card-title small mb-0 p-0 dark-text">
                    {subscription.course.nameAr}
                  </h6>

                  {subscription.cumulativePaymentStatus == "Unpaid" ? (
                    <p className="dark-silver-text small mb-0">غير مسدد</p>
                  ) : subscription.cumulativePaymentStatus ==
                    "PartiallyPaid" ? (
                    <p className="dark-silver-text small mb-0">مسدد جزئياً</p>
                  ) : subscription.cumulativePaymentStatus == "FullyPaid" ? (
                    <p className="dark-silver-text small mb-0">مسدد</p>
                  ) : subscription.cumulativePaymentStatus == "Pending" ? (
                    <React.Fragment>
                      <p
                        className="dark-silver-text small mb-0"
                        id="status-tooltip"
                      >
                        قيد المراجعة
                      </p>
                      <Tooltip
                        placement="right"
                        isOpen={this.state.tooltipOpen}
                        target="status-tooltip"
                        toggle={this.toggle}
                        placement="bottom"
                        style={{
                          backgroundColor: "#f2fdfe",
                          color: "#4b3a85"
                        }}
                      >
                        <p className="light-font-text small mb-1 mt-2">
                          تم تلقي الحوالة وسوف يتم الموافقة عليها خلال 48 ساعة
                        </p>
                      </Tooltip>
                    </React.Fragment>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    ));
  }

  render() {
    const classes = "tooltip-inner";
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
                        <div className="silver-bg box-layout w-100 pb-0 p-3 mt-4">
                          <div className="row">{this.renderCourses()}</div>
                        </div>
                        {!this.state.hideBtn && (
                          <div className="d-flex align-items-center justify-content-center">
                            <button
                              className="btn dark-btn unset-height unset-line-height br-5 mt-3 w-25"
                              onClick={this.loadMore}
                              disabled={this.state.disabled}
                            >
                              {this.state.loading == true ? (
                                <Loader type="ball-clip-rotate" />
                              ) : (
                                "تحميل المزيد"
                              )}
                            </button>
                          </div>
                        )}
                      </TabPane>
                      <TabPane tabId="Expired">
                        <div className="silver-bg box-layout w-100 pb-0 p-3 mt-4">
                          <div className="row">{this.renderCourses()}</div>
                        </div>
                        {!this.state.hideBtn && (
                          <div className="d-flex align-items-center justify-content-center">
                            <button
                              className="btn dark-btn unset-height unset-line-height br-5 mt-3 w-25"
                              onClick={this.loadMore}
                              disabled={this.state.disabled}
                            >
                              {this.state.loading == true ? (
                                <Loader type="ball-clip-rotate" />
                              ) : (
                                "تحميل المزيد"
                              )}
                            </button>
                          </div>
                        )}
                      </TabPane>
                      <TabPane tabId="Withdrawn">
                        <div className="silver-bg box-layout w-100 pb-0 p-3 mt-4">
                          <div className="row">{this.renderCourses()}</div>
                        </div>
                        {!this.state.hideBtn && (
                          <div className="d-flex align-items-center justify-content-center">
                            <button
                              className="btn dark-btn unset-height unset-line-height br-5 mt-3 w-25"
                              onClick={this.loadMore}
                              disabled={this.state.disabled}
                            >
                              {this.state.loading == true ? (
                                <Loader type="ball-clip-rotate" />
                              ) : (
                                "تحميل المزيد"
                              )}
                            </button>
                          </div>
                        )}
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
