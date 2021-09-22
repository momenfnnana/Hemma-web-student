import React, { Component } from "react";
import axios from "axios";
import { Tooltip } from "reactstrap";
import { apiBaseUrl } from "../../../../api/helpers";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";
import { withRouter, Link } from "react-router-dom";
import "./index.scss";
class ActiveCoursesComponent extends Component {
  page = 1;
  limit = 50;
  endOfResults = false;
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false,
      courses: [],
      hideBtn: false,
      loading: false,
      disabled: false,
      pageLoading: true,
      nextPageUrl: `${apiBaseUrl}/courses/purchased?Page=${this.page}&Limit=${this.limit}&subscriptionStatus=Active`
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
          const newCourses = [
            ...this.state.courses,
            ...response.data.data.data
          ];
          this.endOfResults = response.data.data.itemCount < this.limit;
          this.page++;
          const nextUrl = `${apiBaseUrl}/courses/purchased?Page=${this.page}&Limit=${this.limit}&subscriptionStatus=Active`;
          this.setState({
            courses: newCourses,
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
    const courses = this.state.courses || [];
    return courses.map(course => (
      <React.Fragment>
        <div className="col-md-3 col-12 mt-3">
          <Link to={`/billing/${course.course.id}`}>
            <div className="card card-sm md-height shadow-sm border-0 clickable">
              <header className="card-thumb">
                <img className="w-100 h-150" src={course.course.bannerUrl} alt="Course image" />
              </header>
              <div className="card-body d-flex flex-column justify-content-center">
                <h6 className="card-title small mb-0 p-0 dark-text">
                  {course.course.nameAr}
                </h6>

                {course.cumulativePaymentStatus == "Unpaid" ? (
                  <p className="dark-silver-text small mb-0">غير مسدد</p>
                ) : course.cumulativePaymentStatus == "PartiallyPaid" ? (
                  <p className="dark-silver-text small mb-0">مسدد جزئياً</p>
                ) : course.cumulativePaymentStatus == "FullyPaid" ? (
                  <p className="dark-silver-text small mb-0">مسدد</p>
                ) : course.cumulativePaymentStatus == "Pending" ? (
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
          </Link>
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
          <div className="silver-bg box-layout w-100 pb-0 p-3 mt-4">
            {this.state.courses == undefined ||
            this.state.courses.length == 0 ? (
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
                <div className="row">{this.renderCourses()}</div>
              </React.Fragment>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export const ActiveCourses = withRouter(ActiveCoursesComponent);
