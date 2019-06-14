import React, { Component } from "react";
import axios from "axios";
import { Tooltip } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { apiBaseUrl } from "../../../api/helpers";
import swal from "@sweetalert/with-react";
import { connect } from "react-redux";
import { getProfile } from "../../../actions";

export class SubscriptionsComponent extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false,
      details: [],
      subscriptions: []
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  componentDidMount() {
    this.props.getProfile();

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/courses/purchased`, { headers })
      .then(response => {
        this.setState({ subscriptions: response.data.data.data });
        console.log(response.data.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderCourses() {
    const subscriptions = this.state.subscriptions || [];
    return subscriptions.map(subscription => (
      <React.Fragment>
        <div
          className="bg-white box-layout w-100 p-3 d-flex align-items-center mb-4 clickable"
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
              : this.props.history.push(
                  `/subscriptions/${subscription.course.id}`
                );
          }}
        >
          <div className="media w-75">
            <img
              className="mr-3 rounded cover-img"
              src={subscription.course.bannerUrl}
              height="100"
              width="100"
            />
            <div className="media-body mt-2">
              <h6 className="mt-0 dark-text">{subscription.course.nameAr}</h6>
              <span className="badge blue-status light-font-text">
                {subscription.subscriptionStatus == "Cancelled"
                  ? "ملغية"
                  : subscription.subscriptionStatus == "Expired"
                  ? "منتهية"
                  : subscription.subscriptionStatus == "Active"
                  ? "سارية"
                  : "سارية"}
              </span>
            </div>
          </div>
          <div className="seperator" />
          <div className="">
            <h6 className="dark-text mb-0 small">الحالة المالية</h6>
            <p className="dark-silver-text small mb-0">
              {subscription.cumulativePaymentStatus == "Unpaid"
                ? "غير مسدد"
                : subscription.cumulativePaymentStatus == "PartiallyPaid"
                ? "مسدد جزئياً"
                : subscription.cumulativePaymentStatus == "FullyPaid"
                ? "مسدد"
                : subscription.cumulativePaymentStatus == "Pending"
                ? "قيد المراجعة"
                : null}
            </p>
          </div>
        </div>
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
                <div className="white-bg box-layout w-100 p-4 d-flex align-items-center justify-content-center flex-column">
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
                    to="/account/edit"
                    className="light-text text-underline small"
                  >
                    تعديل الملف الشخصي
                  </Link>
                </div>
              </div>
              <div className="col-md-8">
                <h3 className="dark-text">قائمة دوراتي</h3>

                {this.state.subscriptions == undefined ||
                this.state.subscriptions.length == 0 ? (
                  <React.Fragment>
                    <div
                      className="silver-bg box-layout w-100 pb-0 p-4 mt-4 d-flex flex-column align-items-center justify-content-center"
                      style={{ height: 300 }}
                    >
                      <p className="dark-text mt-0">
                        لسا ما سجلت بدوره معانا؟ يشرفنا انضمامك لنا!
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
                  <div className="silver-bg box-layout w-100 pb-0 p-4 mt-4">
                    {this.renderCourses()}
                  </div>
                )}

                {/* <div className="bg-white box-layout w-100 p-3 d-flex align-items-center mb-4">
                    <div className="media w-75">
                      <img
                        className="mr-3 rounded cover-img"
                        src={
                          process.env.PUBLIC_URL + "/assets/images/course2.png"
                        }
                        height="100"
                        width="100"
                      />
                      <div className="media-body mt-2">
                        <h6 className="mt-0 dark-text">
                          دورة القدرات للجامعيين
                        </h6>

                        <span
                          className="badge yellow-status light-font-text tooltip-on-hover"
                          id="status-tooltip"
                        >
                          قيد المراجعة
                        </span>

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
                            حقك علينا لسه ما تم تأكيد طلبك إذا تجاوز طلبك 48
                            ساعة ياريت تراسلنا
                          </p>
                          <p
                            className="small en-text mb-2 d-inline-flex align-items-center"
                            dir="ltr"
                          >
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/whatsapp.png"
                              }
                              height="20"
                              width="20"
                              className="ml-1"
                            />
                            +9660539412412{" "}
                          </p>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="seperator" />
                    <div className="">
                      <h6 className="dark-text mb-0 small">الحالة المالية</h6>
                      <p className="dark-silver-text small mb-0">
                        مسددة جزئيا{" "}
                      </p>
                    </div>
                  </div> */}
                {/* </div> */}
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
