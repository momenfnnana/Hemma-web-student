import React, { Component } from "react";
import { Sidebar } from "../shared/sidebar/sidebar";
import { Lecture } from "../shared/lecture/lecture";
import { Schedule } from "./schedule";
import AccountBreadcrumb from "../shared/breadcrumb/breadcrumb";
import { Instructors } from "../shared/instructors/instructors";
import { RecordedLectures } from "./recorded-lectures";
import { RecordedVideos } from "./recorded-videos";
import { Booklet } from "./booklet";
import { TransactionsList } from "./transactions/transactions-list";
import { Chat, ChatComponent } from "./chat";

export class SubscriptionDetails extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container mt-5 pb-5">
          <div className="row">
            <div className="col-md-3 col-12">
              <Sidebar />
              {this.props.location.pathname.startsWith(
                "/subscriptions/details/transactions/list"
              ) ? null : (
                <Instructors />
              )}
            </div>
            <div className="col-md-9 col-12">
              <div className="row no-gutters">
                <div className="col-12">
                  <AccountBreadcrumb />
                  {this.props.location.pathname.startsWith(
                    "/subscriptions/details/transactions/list"
                  ) ? null : (
                    <Lecture />
                  )}
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
              ) : this.props.location.pathname.startsWith(
                  "/subscriptions/details/booklet"
                ) ? (
                <Booklet />
              ) : this.props.location.pathname.startsWith(
                  "/subscriptions/details/transactions/list"
                ) ? (
                <TransactionsList />
              ) : this.props.location.pathname.startsWith(
                  "/subscriptions/details/chat"
                ) ? (
                <ChatComponent />
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
