import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { ActiveCourses } from "./active-courses/active-courses";

export class BillingCoursesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h5 className="dark-text mb-3">قائمة مشترياتي</h5>
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
                    <ActiveCourses subscriptionStatus="Active" />
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

export const BillingCourses = withRouter(BillingCoursesComponent);
