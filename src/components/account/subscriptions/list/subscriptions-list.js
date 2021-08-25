import React, { Component } from "react";
import axios from "axios";
import { Tooltip } from "reactstrap";
import { apiBaseUrl } from "../../../../api/helpers";
import swal from "@sweetalert/with-react";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";
import { withRouter, Link } from "react-router-dom";
import "./index.scss"

class SubscriptionsListComponent extends Component {
  page = 1;
  limit = 50;
  endOfResults = false;
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false,
      subscriptions: [],
      hideBtn: false,
      loading: false,
      disabled: false,
      pageLoading: true,
      nextPageUrl: `${apiBaseUrl}/courses/purchased?Page=${this.page}&Limit=${this.limit}&SubscriptionStatus=${this.props.subscriptionStatus}`
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  async componentDidMount() {
    await this.loadMore();
  }

  loadMore = async () => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    if (!this.endOfResults) {
      axios
        .get(this.state.nextPageUrl, { headers })
        .then(response => {
          const newSubscriptions = [
            ...this.state.subscriptions,
            ...response.data.data.data
          ];
          this.endOfResults = response.data.data.itemCount < this.limit;
          this.page++;
          const nextUrl = `${apiBaseUrl}/courses/purchased?Page=${this.page}&Limit=${this.limit}&SubscriptionStatus=${this.props.subscriptionStatus}`;
          this.setState({
            subscriptions: newSubscriptions,
            nextPageUrl: nextUrl,
            pageLoading: false
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  renderCourses() {
    const subscriptions = this.state.subscriptions || [];
    return subscriptions.map(subscription => (
      <React.Fragment>
        <div className="col-lg-4 card-container mb-3">
          <div
          className="h-100 card shadow-sm card-sm border-0"
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
                : subscription.subscriptionStatus == "Withdrawn"
                ? this.props.history.push(
                  `/course/details/${subscription.course.id}`)
                  : subscription.subscriptionStatus == "Replaced"
                  ? this.props.history.push(
                    `/course/details/${subscription.course.id}`)
                  : subscription.groupCouponPrivent  == true
                ?  swal(
                    "عفواً",
                    "تفاصيل الدورة غير متاحة بسبب عدم أكتمال عدد الكوبون",
                    "error",
                    {
                      button: "متابعة"
                    }
                  )
                : this.props.history.push(
                    `/course/content/${subscription.course.id}`
                  );
            }}
          >
            <div className="  md-height border-0 clickable h-100 d-flex flex-column">
              <header className="card-thumb">
                <img src={subscription.course.bannerUrl} alt="Course image" className="w-100 h-180 object-fit-contain" />
              </header>
              <div className="d-flex flex-column justify-content-center px-2">
                <h6 className="h6 font-weight-bold main-color mt-3">
                  {subscription.course.nameAr}
                </h6>

                {subscription.subscriptionStatus == "Replaced" ?(
                  <p className="mb-2 mt-auto font-weight-bold text-muted">مستبدله</p>
                ):subscription.cumulativePaymentStatus == "Withdrawn" ? (
                  <p className="mb-2 mt-auto font-weight-bold text-muted">منسحب</p>
                ):subscription.cumulativePaymentStatus == "Unpaid" ? (
                  <p className="mb-2 mt-auto font-weight-bold text-muted">غير مسدد</p>
                ) : subscription.cumulativePaymentStatus == "PartiallyPaid" ? (
                  <p className="mb-2 mt-auto font-weight-bold text-muted">مسدد جزئياً</p>
                ) : subscription.cumulativePaymentStatus == "FullyPaid" || subscription.cumulativePaymentStatus == "FullyUsedForReplacement" ? (
                  <p className="mb-2 mt-auto font-weight-bold text-muted">مسدد</p>
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
                      <p className="light-font-text small mb-1 mt-2 text-break">
                        تم تلقي الحوالة وسوف يتم الموافقة عليها خلال 48 ساعة
                      </p>
                    </Tooltip>
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ));
  }

  render() {
    return (
      <React.Fragment>
        {this.state.pageLoading ? (
          <div
            className="silver-bg box-layout w-100 pb-0 p-3 mt-4 d-flex justify-content-center align-items-center"
            style={{ minHeight: 350 }}
          >
            <Loader type="ball-spin-fade-loader" className="dark-loader" />
          </div>
        ) : (
          <div className="row">
            {this.state.subscriptions == undefined ||
            this.state.subscriptions.length == 0 ? (
              <React.Fragment>
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
              </React.Fragment>
            ) : (
              <React.Fragment>
               {this.renderCourses()}
              </React.Fragment>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export const SubscriptionsList = withRouter(SubscriptionsListComponent);
