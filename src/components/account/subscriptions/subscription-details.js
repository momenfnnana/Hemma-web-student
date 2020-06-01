import React, { Component } from "react";
import { Sidebar } from "../shared/sidebar/sidebar";
import { Lecture } from "../shared/lecture/lecture";
import { Schedule } from "./schedule/schedule";
import { Instructors } from "../shared/instructors/instructors";
import { RecordedLectures } from "./lectures/recorded-lectures";
import { LectureDetails } from "./lectures/recorded-videos";
import { Booklets } from "./booklets/booklets";
import { UsersChatComponent } from "../../chat/chat";
import { SpeedUp } from "./speed-up/speed-up";
import { Route } from "react-router-dom";
import { LiveStream } from "./live-stream/live-stream";
import { DiscussionsList } from "./discussions/discussions-list";
import { DiscussionDetails } from "./discussions/discussion-details";
import { ExamsList } from "./exams/exams-list";
import { StartExam } from "./exams/start-exam";
import { ExamDetails } from "./exams/exam-details";
import { ExamResult } from "./exams/exam-result";
import { RatingModal } from "./rating/rating-modal";
import { getSubscription } from "../../../actions/subscription.actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { NewInstallment } from "../billings/installment/NewInstallment";
import { Refund } from "../billings/refund/RefundForm";
import { BookletDetails } from "./booklets/booklet-details";

class SubscriptionDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      isInstallmentOpen: false,
      isRefundOpen: false
    };
  }

  openInstallmentModal = () => {
    this.setState({ isInstallmentOpen: true });
  };
  closeInstallmentModal = () => {
    this.setState({ isInstallmentOpen: false });
  };

  openRefundModal = () => {
    this.setState({ isRefundOpen: true });
  };
  closeRefundModal = () => {
    this.setState({ isRefundOpen: false });
  };

  componentDidMount() {
    const courseId = this.props.match.params.id;
    this.props.getSubscription(courseId);
  }

  render() {
    const courseId = this.props.match.params.id;
    const subscription =
      this.props &&
      this.props.subscription &&
      this.props.subscription.subscription;
    const ratingStatus = subscription && subscription.ratingStatus;
    const remainingAmount = subscription && subscription.remainingAmount;
    return (
      <React.Fragment>
        {remainingAmount > 0 ? (
          <React.Fragment>
            <div className="container mt-5 pb-5">
              <div className="row">
                <div className="col-12">
                  <div
                    className="white-bg box-layout w-100 pb-0 p-4 mt-4 d-flex flex-column align-items-center justify-content-center"
                    style={{ height: 350 }}
                  >
                    <img
                      src={
                        process.env.PUBLIC_URL + "/assets/images/warning.png"
                      }
                      className="mb-4"
                      height="65"
                    />
                    <p className="dark-silver-text mb-0">
                      يجب عليك سداد القسط المتبقي
                    </p>
                    <p className="dark-silver-text">
                      حتى تتمكن من تصفح تفاصيل الدورة
                    </p>
                    <div className="d-flex align-items-center">
                      <button
                        type="button"
                        className="btn light-btn btn-width mr-2"
                        onClick={this.openInstallmentModal}
                      >
                        سداد قسط
                      </button>
                      <button
                        type="button"
                        className="btn red-outline-btn btn-width"
                        onClick={this.openRefundModal}
                      >
                        استرجاع الرسوم
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <NewInstallment
              isInstallmentOpen={this.state.isInstallmentOpen}
              closeInstallmentModal={this.closeInstallmentModal}
              courseId={courseId}
            />
            <Refund
              isRefundOpen={this.state.isRefundOpen}
              closeRefundModal={this.closeRefundModal}
              courseId={courseId}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            {this.props.location.pathname.indexOf("live-stream") < 0 && (
              <div className="container mt-5 pb-5">
                <div className="row">
                  <div className="col-md-3 col-12">
                    {subscription && subscription.chatChannelSid && (
                      <Sidebar
                        id={courseId}
                        chatChannelSid={
                          subscription && subscription.chatChannelSid
                        }
                      />
                    )}
                    {ratingStatus == "Skipped" && (
                      <button
                        className="btn light-btn w-100 mb-3"
                        onClick={() =>
                          this.setState({ forceOpenRatingModal: true })
                        }
                      >
                        قيّم الدورة
                      </button>
                    )}
                    <RatingModal
                      isRatingModalOpen={
                        ratingStatus == "Available" ||
                        this.state.forceOpenRatingModal
                      }
                      onClose={() =>
                        this.setState({ forceOpenRatingModal: false })
                      }
                      status={ratingStatus}
                      courseId={courseId}
                    />
                    <Instructors id={courseId} />
                  </div>
                  <div className="col-md-9 col-12">
                    <div className="row no-gutters">
                      <div className="col-12">
                        {subscription && subscription.chatChannelSid && (
                          <Lecture
                            id={courseId}
                            chatChannelSid={subscription.chatChannelSid}
                          />
                        )}
                      </div>
                    </div>

                    <Route
                      path="/course/content/:id/schedule"
                      render={props => (
                        <Schedule
                          courseName={subscription && subscription.nameAr}
                          {...props}
                        />
                      )}
                    />
                    <Route
                      path="/course/content/:id/recorded-lectures"
                      component={RecordedLectures}
                    />
                    <Route
                      path="/course/content/:id/lecture/:lectureId"
                      component={LectureDetails}
                    />
                    <Route
                      path="/course/content/:id/speed-up"
                      component={SpeedUp}
                    />
                    <Route
                      exact
                      path="/course/content/:id/booklets"
                      component={Booklets}
                    />
                    <Route
                      exact
                      path="/course/content/:id/booklets/:bookletId"
                      component={BookletDetails}
                    />
                    {/* <Route
                      path="/course/content/:id/discussions"
                      exact
                      component={DiscussionsList}
                    /> */}
                    {/* {subscription && subscription.chatChannelSid && (
                      <Route
                        path="/course/content/:id/discussions/:discussionId"
                        component={DiscussionDetails}
                        chatChannelSid={subscription.chatChannelSid}
                      />
                    )} */}
                    <Route
                      path="/course/content/:id/exams/list"
                      component={ExamsList}
                    />
                    <Route
                      path="/course/content/:id/exam/:examId"
                      component={StartExam}
                      exact
                    />
                    <Route
                      path="/course/content/:id/exam/:attemptId/details"
                      component={ExamDetails}
                      exact
                    />
                    <Route
                      path="/course/content/:id/exam/:attemptId/result"
                      component={ExamResult}
                      exact
                    />
                    {subscription && (
                      <Route
                        path="/course/content/:id/chat"
                        render={props => (
                          <UsersChatComponent
                            chatChannelSid={subscription.chatChannelSid}
                            forceInternalChat={subscription.forceInternalChat}
                            internalChannelId={subscription.internalChannelId}
                            externalChannelUrl={subscription.externalChannelUrl}
                            chatEnabled={subscription.chatEnabled}
                            allowSend={true}
                            {...props}
                          />
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
            {subscription && subscription.chatChannelSid && (
              <Route
                path="/course/content/:id/live-stream/:lectureId"
                render={props => (
                  <LiveStream
                    chatChannelSid={subscription.chatChannelSid}
                    {...props}
                  />
                )}
              />
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    subscription: state.subscription
  };
}

SubscriptionDetailsComponent = connect(
  mapStateToProps,
  { getSubscription }
)(SubscriptionDetailsComponent);

export const SubscriptionDetails = withRouter(SubscriptionDetailsComponent);
