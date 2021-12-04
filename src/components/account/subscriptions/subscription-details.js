import React, { Component } from "react";
import { Sidebar } from "../shared/sidebar/sidebar";
import { Lecture } from "../shared/lecture/lecture";
import { Schedule } from "./schedule/schedule";
import { Instructors } from "../shared/instructors/instructors";
import { RecordedLectures } from "./lectures/recorded-lectures";
import { LectureDetails } from "./lectures/recorded-videos";
import { Booklets } from "./booklets/booklets";
import UsersChatComponent from "../../chat/chat";
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
import { setDeisgnType } from "../../../actions/user.actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { NewInstallment } from "../billings/installment/NewInstallment";
import { Refund } from "../billings/refund/RefundForm";
import { BookletDetails } from "./booklets/booklet-details";
import { AskQuestionsList } from "./ask-questions/ask-questions-list";
import { AskQuestionDetails } from "./ask-questions/question-details";
import { TrainingList } from "./training/training-list";
import { TrainingResult } from "./training/training-result";
import { StartTrainingExam } from "./training/start-training";
import { TrainingExamDetails } from "./training/training-details";

import firebase from "../../../firebase";
import ScheduleDetails from "./scheduleDetails/index";
import { ClassicSchedule } from "./schedule/schedule-classic";
import { ClassicSidebar } from "../shared/sidebar/sidebar-classic";
import { MergedSidebar } from "../shared/sidebar/merged-sidebar";
import DesignSwitch from "./schedule/design-switch";
import Evaluation from "../../evaluation";
const storedDesignType = localStorage.getItem("designType");

class SubscriptionDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      isInstallmentOpen: false,
      isRefundOpen: false,
      channelsRef: firebase.database().ref("channels"),
      // designType: Number.isInteger(+storedDesignType) ? +storedDesignType : 0,
    };
    this.toggleDesign = this.toggleDesign.bind(this);
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
    this.props.getSubscription(courseId).then(() => {
      this.createChannel();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.designType !== prevProps.designType) {
      this.setState({ loading: true }, () => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 300);
      });
    }
  }

  toggleDesign() {
    this.props.setDeisgnType(+!this.props.designType);
    // this.setState({ designType: +!this.state.designType });
  }

  createChannel = () => {
    const { channelsRef } = this.state;
    const { chatChannelSid } = this.props.subscription.subscription;
    const { forceInternalChat } = this.props.subscription.subscription;

    const key = chatChannelSid;
    const newChannel = {
      id: key,
    };
    if (forceInternalChat == true) {
      channelsRef.child(key).update(newChannel);
    }
  };

  render() {
    const courseId = this.props.match.params.id;
    const subscription =
      this.props &&
      this.props.subscription &&
      this.props.subscription.subscription;
    const ratingStatus = subscription && subscription.ratingStatus;
    const remainingAmount = subscription && subscription.remainingAmount;
const designType=this.props.designType
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
                      alt="warning"
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
              subscription={subscription}
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
                    {!this.state.loading && (
                      <div className="animate-down">
                        <MergedSidebar
                          designType={this.props.designType}
                          subscription={subscription}
                          courseId={courseId}
                        />
                        {ratingStatus === "Skipped" && !designType && (
                          <button
                            className="btn light-btn w-100 mb-3"
                            onClick={() =>{
                              this.props.history.push(`/course/content/${this.props.id}/evaluations`)
                              // this.setState({ forceOpenRatingModal: true })
                            }}
                          >
                            قيّم الدورة
                          </button>
                        )}
                        <RatingModal
                          isRatingModalOpen={
                            // ratingStatus === "Available" ||
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
                    )}
                  </div>
                  <div className="col-md-9 col-12">
                    <Route path="/course/content/:id/schedule" exact></Route>
                    <Route
                      path="/course/content/:id/schedule"
                      exact
                      render={(props) => (
                        <>
                          <DesignSwitch
                            designType={this.props.designType}
                            onChange={this.toggleDesign}
                          />
                          {!this.state.loading && (
                            <>
                              <div className="animate-down">
                                <Schedule
                                  designType={this.props.designType}
                                  subscription={subscription}
                                  courseId={courseId}
                                  courseName={
                                    subscription && subscription.nameAr
                                  }
                                  {...props}
                                >
                                  <div className="animate-down">
                                    <ClassicSchedule
                                      courseName={
                                        subscription && subscription.nameAr
                                      }
                                      {...props}
                                    />
                                  </div>
                                </Schedule>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    />
                    <Route
                      path="/course/content/:id/schedule/:type/:nestedId/:contentType"
                      exact
                      render={(props) => (
                        <>
                          <ScheduleDetails {...props} />
                        </>
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
                    <Route
                      path="/course/content/:id/discussions"
                      exact
                      component={DiscussionsList}
                    />
                    {subscription && subscription.chatChannelSid && (
                      <Route
                        path="/course/content/:id/discussions/:discussionId"
                        component={DiscussionDetails}
                        chatChannelSid={subscription.chatChannelSid}
                      />
                    )}
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
                    <Route
                      path="/course/content/:id/training/list"
                      component={TrainingList}
                      exact
                    />
                    <Route
                      path="/course/content/:id/exam/training/:examId"
                      component={StartTrainingExam}
                      exact
                    />
                    <Route
                      path="/course/content/:id/training/:attemptId/details"
                      component={TrainingExamDetails}
                      exact
                    />
                    <Route
                      path="/course/content/:id/training/:attemptId/result"
                      component={TrainingResult}
                      exact
                    />
                    <Route
                      exact
                      path="/course/content/:id/askQuestions/list"
                      component={AskQuestionsList}
                    />
                    <Route
                      path="/course/content/:id/askQuestions/list"
                      component={AskQuestionsList}
                    />
                    <Route
                      exact
                      path="/course/content/:id/askQuestions/list/:questionsType"
                      component={AskQuestionsList}
                    />
                    <Route
                      path="/course/content/:courseId/askQuestions/details/:id"
                      component={AskQuestionDetails}
                    />
                    <Route
                      path="/course/content/:courseId/evaluations"
                      component={Evaluation}
                    />
                    {subscription?.chatChannelSid && (
                      <Route
                        path="/course/content/:id/chat"
                        render={(props) => (
                          <UsersChatComponent
                            chatChannelSid={subscription.chatChannelSid}
                            forceInternalChat={subscription.forceInternalChat}
                            externalChannelUrl={subscription.externalChannelUrl}
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
                render={(props) => (
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
    subscription: state.subscription,
    designType: state.user?.designType,
    user: state.user,
  };
}
const mapDispatchToProps = {
  getSubscription,
  setDeisgnType,
};

SubscriptionDetailsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionDetailsComponent);

export default withRouter(SubscriptionDetailsComponent);

