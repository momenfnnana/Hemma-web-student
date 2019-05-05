import React, { Component } from "react";
import { AccountNavbar } from "../shared/navbar/navbar";
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
        <AccountNavbar />
        <div className="container mt-5">
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
              <RecordedVideos />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
