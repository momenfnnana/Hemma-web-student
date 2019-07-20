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
import { UsersChatComponent } from "./chat";
import { SpeedUp } from "./speed-up/speed-up";
import { Route } from "react-router-dom";
import { LiveStream } from "./live-stream";
import { DiscussionsList } from "./discussions/discussions-list";
import { DiscussionDetails } from "./discussions/discussion-details";
import axios from "axios";
import { apiBaseUrl } from "../../../api/helpers";
import { ChallengesList } from "./challenges/challenges-list";
import { ExamsList } from "./exams/exams-list";
import { StartExam } from "./exams/start-exam";
import { ExamDetails } from "./exams/exam-details";
import { ChallengeDetails } from "./challenges/challenge-details";

export class SubscriptionDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: []
    };
  }

  componentDidMount() {
    const courseId = this.props.match.params.id;

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/content/${courseId}`, { headers })
      .then(response => {
        this.setState({ details: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const courseId = this.props.match.params.id;
    const channelID = this.state.details.chatChannelSid;

    return (
      <React.Fragment>
        {this.props.location.pathname.indexOf("live-stream") < 0 && (
          <div className="container mt-5 pb-5">
            <div className="row">
              <div className="col-md-3 col-12">
                <Sidebar
                  id={courseId}
                  chatChannelSid={this.state.details.chatChannelSid}
                />
                <Instructors id={courseId} />
              </div>
              <div className="col-md-9 col-12">
                <div className="row no-gutters">
                  <div className="col-12">
                    {/* <AccountBreadcrumb /> */}
                    {this.state.details.chatChannelSid && (
                      <Lecture
                        id={courseId}
                        chatChannelSid={this.state.details.chatChannelSid}
                      />
                    )}
                  </div>
                </div>

                <Route
                  path="/subscriptions/:id/schedule"
                  render={props => (
                    <Schedule
                      courseName={this.state.details.nameAr}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/subscriptions/:id/recorded-lectures"
                  component={RecordedLectures}
                />
                <Route
                  path="/subscriptions/:id/recorded-videos/:lectureId"
                  component={RecordedVideos}
                />
                <Route path="/subscriptions/:id/speed-up" component={SpeedUp} />
                <Route path="/subscriptions/:id/booklet" component={Booklet} />
                {/*<Route
                  path="/subscriptions/:id/discussions"
                  exact
                  component={DiscussionsList}
                />
                <Route
                  path="/subscriptions/:id/discussions/details"
                  component={DiscussionDetails}
                />
                <Route
                  path="/subscriptions/:id/challenges"
                  exact
                  component={ChallengesList}
                />
                <Route
                  path="/subscriptions/:id/challenges/details"
                  component={ChallengeDetails}
                />
                <Route
                  path="/subscriptions/:id/exams/list"
                  component={ExamsList}
                />
                <Route
                  path="/subscriptions/:id/exams/start"
                  component={StartExam}
                />
                <Route
                  path="/subscriptions/:id/exams/details"
                  component={ExamDetails}
                /> */}
                <Route
                  path="/subscriptions/:id/transactions/list"
                  render={props => (
                    <TransactionsList
                      remainingAmount={
                        this.state.details && this.state.details.remainingAmount
                      }
                      {...props}
                    />
                  )}
                />
                {channelID && channelID.startsWith("http") ? null : (
                  <React.Fragment>
                    {this.state.details.chatChannelSid && (
                      <Route
                        path="/subscriptions/:id/chat"
                        render={props => (
                          <UsersChatComponent
                            chatChannelSid={this.state.details.chatChannelSid}
                            {...props}
                          />
                        )}
                      />
                    )}
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        )}
        {this.state.details.chatChannelSid && (
          <Route
            path="/subscriptions/:id/live-stream/:lectureId"
            render={props => (
              <LiveStream
                chatChannelSid={this.state.details.chatChannelSid}
                {...props}
              />
            )}
          />
        )}
      </React.Fragment>
    );
  }
}
