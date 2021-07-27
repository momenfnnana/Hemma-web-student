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
                <h5 className="dark-text mb-3">الحركات المالية</h5>
                <ActiveCourses subscriptionStatus="Active" />
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export const BillingCourses = withRouter(BillingCoursesComponent);
