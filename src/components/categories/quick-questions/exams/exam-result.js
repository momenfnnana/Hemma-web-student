import React, { Component, useState } from "react";
import { apiBaseUrl } from "../../../../api/helpers";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemTitle,
} from "react-accessible-accordion";
import "../styles.sass";
import { SolutionModal } from "./solution";
import * as Sentry from "@sentry/react";

class ExamResultComponent extends Component {
  constructor() {
    super();
    this.state = {
      isConfirmExamOpen: false,
      isSolutionOpen: false,
      examDetails: [],
      questions: [],
      nav1: null,
      nav2: null,
      selectedQuestion: 0,
    };
  }

  openSolutionModal = (id) => {
    this.setState({ isSolutionOpen: true, selectedQuestionId: id });
  };
  closeSolutionModal = () => {
    this.setState({ isSolutionOpen: false });
  };

  goToNext = () => {
    this.setState({
      selectedQuestion:
        (this.state.selectedQuestion + 1) % this.state.questions.length,
    });
  };

  componentDidMount = () => {
    try {
      const attemptId = this.props.match.params.id;
      let token = localStorage.getItem("token");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          `${apiBaseUrl}/CategoryGroupExams/Attempts/${attemptId}/DetailedScorecard`,
          {
            headers,
          }
        )
        .then((response) => {
          this.setState({ questions: response.data.data.questions });
        })
        .catch((error) => {
          console.log(error);
          Sentry.captureException(error);
        });
    } catch (err) {
      Sentry.captureException(err);
    }
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  };

  renderQuestions() {
    const questions = this.state.questions || [];
    const question = questions[this.state.selectedQuestion];
    return (
      <Accordion className="quiz-accordion">
        {questions.map((question) => (
          <AccordionItem>
            <AccordionItemTitle>
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex flex-column">
                  <h6
                    className={`small mb-1 ${question.isCorrect == true ? "green-text" : "red-text"
                      }`}
                  >
                    السؤال {question.id}
                  </h6>
                </div>
                <span className="fa fa-chevron-down dark-text" />
              </div>
            </AccordionItemTitle>
            <AccordionItemBody className="w-100">
              <div className="row p-4 pb-2">
                <div className="col-12">
                  <div className="box-layout box-border shadow-sm p-3">
                    <h6
                      className="dark-text mb-0 encoded-text"
                      dangerouslySetInnerHTML={{
                        __html: question.encodedStem,
                      }}
                    ></h6>
                  </div>
                </div>
              </div>
              <div className="row pl-4 pr-4 pb-4">
                <div className="col-7">
                  <div className="row d-flex justify-content-between align-items-center mb-3">
                    <div className="col-md-6">
                      {question.correctChoice == question.selectedChoice ? (
                        <p className="small green-text mb-0">الإجابة صحيحة</p>
                      ) : question.correctChoice !== question.selectedChoice ? (
                        <p className="small red-text mb-0">الإجابة خاطئة</p>
                      ) : (
                            <p className="small red-text mb-0">لم تقم بالإجابة</p>
                          )}
                    </div>

                    <div className="col-md-6">
                      <button
                        className="btn red-outline-btn btn-sm small float-right d-flex"
                        onClick={() => this.openSolutionModal(question.id)}
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL + "/assets/images/hint.png"
                          }
                          height="17"
                          className="contain-img mr-2"
                        />
                        طريقة الحل
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {Object.keys(question.encodedChoices).map(function (key) {
                        const value = question.encodedChoices[key];
                        return (
                          <div className="box-layout h-40 d-flex align-items-center pr-2 pl-2 mb-2">
                            <input
                              type="radio"
                              checked={
                                question.correctChoice === key ||
                                question.selectedChoice === key
                              }
                              disabled
                              className={`radio-custom ${question.correctChoice === key
                                ? "radio-success"
                                : question.selectedChoice === key
                                  ? "radio-failure"
                                  : "radio-custom"
                                }`}
                            />
                            <label
                              dangerouslySetInnerHTML={{ __html: value }}
                              className="mb-0 dark-text small ml-2 encoded-text"
                            ></label>
                          </div>
                        );
                      }, this)}
                    </div>
                  </div>
                </div>
                {question.imageUrl && (
                  <div className="col-5 d-flex align-items-center">
                    <img src={question.imageUrl} width="100%" />
                  </div>
                )}
              </div>
            </AccordionItemBody>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  render() {
    const attemptId = this.props.match.params.id;
    const courseId = this.props.match.params.id;
    const settings = {
      className: "center",
      centerMode: true,
      infinite: false,
      centerPadding: "50",
      slidesToShow: 3.5,
      speed: 500,
    };

    return (
      <React.Fragment>
        <div className="container">
          <div className="row no-gutters mb-4">
            <div className="col-12">
              <div className="box-layout shadow-sm h-100">
                <div className="row p-4">
                  <div className="col-12 d-flex align-items-center justify-content-between">
                    <h6 className="mid-text mb-0">الإجابات</h6>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <hr className="mb-0 mt-0" />
                  </div>
                </div>
                {this.renderQuestions()}
              </div>
            </div>
          </div>

          <SolutionModal
            isSolutionOpen={this.state.isSolutionOpen}
            closeSolution={this.closeSolutionModal}
            id={this.state.selectedQuestionId}
            attemptId={attemptId}
          />
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.ExamResult && state.form.ExamResult.values,
  };
}

ExamResultComponent = reduxForm({
  form: "ExamResult",
})(ExamResultComponent);

ExamResultComponent = connect(mapStateToProps)(ExamResultComponent);

export const ExamResult = withRouter(ExamResultComponent);
