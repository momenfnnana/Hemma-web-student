import React, { Component } from "react";
import { Sidebar } from "../shared/sidebar/sidebar";
import { Lecture } from "../shared/lecture/lecture";
import { Schedule } from "./schedule";
import AccountBreadcrumb from "../shared/breadcrumb/breadcrumb";
import { Instructors } from "../shared/instructors/instructors";
import { RecordedLectures } from "./recorded-lectures";
import { RecordedVideos } from "./recorded-videos";

export class SubscriptionDetails extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container mt-5 pb-5">
          <div className="row">
            <div className="col-4">
              <Sidebar />
              <Instructors />
            </div>
            <div className="col-8">
              <div className="row no-gutters">
                <div className="col-12">
                  <AccountBreadcrumb />
                  <Lecture />
                </div>
              </div>
              {this.props.location.pathname.startsWith(
                "/subscriptions/details/schedule"
              ) ? (
                <Schedule />
              ) : this.props.location.pathname.startsWith(
                  "/subscriptions/details/recorded-lectures"
                ) ? (
                <RecordedLectures />
              ) : this.props.location.pathname.startsWith(
                  "/subscriptions/details/recorded-videos"
                ) ? (
                <RecordedVideos />
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
