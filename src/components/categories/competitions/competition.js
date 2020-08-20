import React, { Component } from "react";
import { apiBaseUrl } from "../../../api/helpers";
import axios from "axios";
import swal from "@sweetalert/with-react";
import { Api } from "../../../api";
import { SpecificSchools } from "./cases/specific-schools";
import { NotAllowed } from "./cases/not-allowed";
import { CityMissing } from "./cases/city-missing";
import { getCompetitionDetails } from "../../../actions";
import { connect } from "react-redux";
import Countdown from "react-countdown-now";

class CompetitionComponent extends Component {
  constructor() {
    super();
    this.state = {
      answers: [],
      selectedQuestion: 0,
      attemptSubmitted: false,
      numberOfWrongAnswers: null,
      numberOfCorrectAnswers: null,
      notAllowed: false,
      cityMissing: false,
      specificSchools: false,
      endCountdown: false,
    };
    this.onInput = this.onInput.bind(this);
    this.onCountdownEnd = this.onCountdownEnd.bind(this);
  }

  onCountdownEnd = (attemptId) => {
    this.setState({ endCountdown: true });
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = {
      answers: this.state.answers,
    };
    axios
      .put(`${apiBaseUrl}/Competitions/Attempts/${attemptId}`, data, {
        headers,
      })
      .then((response) => {
        this.setState({
          numberOfCorrectAnswers: response.data.data.numberOfCorrectAnswers,
          numberOfWrongAnswers: response.data.data.numberOfWrongAnswers,
          attemptSubmitted: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  goToNext = () => {
    const questionsLength =
      this.props &&
      this.props.competition &&
      this.props.competition.questions &&
      this.props.competition.questions.length;
    this.setState({
      selectedQuestion: (this.state.selectedQuestion + 1) % questionsLength,
    });
  };

  goToPrevious = () => {
    const questionsLength =
      this.props &&
      this.props.competition &&
      this.props.competition.questions &&
      this.props.competition.questions.length;
    this.setState({
      selectedQuestion: (this.state.selectedQuestion - 1) % questionsLength,
    });
  };

  onInput(questionId, selectedChoice) {
    const id = questionId;
    const answer = { id, selectedChoice };
    let answers;
    if (this.state.answers.some((answer) => answer.id === id)) {
      answers = [
        ...this.state.answers.filter((answer) => answer.id !== id),
        answer,
      ];
    } else {
      answers = [...this.state.answers, answer];
    }
    this.setState({ answers });
  }
  renderQuestions() {
    const questions =
      (this.props &&
        this.props.competition &&
        this.props.competition.questions) ||
      [];
    const question = questions[this.state.selectedQuestion];
    const answer = this.state.answers.find((a) => a.id === question.id);

    return (
      <React.Fragment>
        {question && (
          <React.Fragment>
            <div className="d-flex justify-content-center align-items-center flex-row p-3 br-0 border-right-0 border-top-0">
              <h6 className="mb-0 dark-text">
                السؤال {this.state.selectedQuestion + 1}
              </h6>
            </div>
            <hr className="mt-0 mb-0" />
            <div className="row p-4 pb-2">
              <div className="col-12">
                <div className="box-layout box-border shadow-sm p-3">
                  <h6
                    className="dark-text mb-0 encoded-text"
                    dangerouslySetInnerHTML={{ __html: question.encodedStem }}
                  ></h6>
                </div>
              </div>
            </div>
            <div className="row pl-4 pr-4 pb-4">
              <div className="col-7">
                <div className="row d-flex justify-content-between align-items-center mb-3">
                  <div className="col-md-12">
                    <p className="small dark-silver-text mb-0">
                      اختر الإجابة الصحيحة
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {Object.keys(question.encodedChoices).map(function(key) {
                      const value = question.encodedChoices[key];
                      const selected = answer && answer.selectedChoice === key;
                      return (
                        <div className="box-layout h-40 d-flex align-items-center pr-2 pl-2 mb-2">
                          <input
                            type="radio"
                            label={value}
                            className="small dark-silver-text light-font-text d-flex align-items-center"
                            name={`choice-${question.id}`}
                            onChange={() => this.onInput(question.id, key)}
                            id={value}
                            checked={selected}
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
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  submitAnswers = (attemptId) => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = {
      answers: this.state.answers,
    };
    axios
      .put(`${apiBaseUrl}/Competitions/Attempts/${attemptId}`, data, {
        headers,
      })
      .then((response) => {
        this.setState({
          numberOfCorrectAnswers: response.data.data.numberOfCorrectAnswers,
          numberOfWrongAnswers: response.data.data.numberOfWrongAnswers,
          attemptSubmitted: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    this.props
      .getCompetitionDetails(params.id)
      .then((response) => {})
      .catch((error) => {
        switch (error.response.data && error.response.data.message) {
          case "Student City not match the Competition City":
            this.setState({ specificSchools: true });
            break;
          case "Student has attempt on this competition":
            this.setState({ notAllowed: true });
            break;
          case "Student Gender not match the Competition Gender":
            this.setState({ specificSchools: true });
            break;
          case "SACity is required to take the competition":
            this.setState({ cityMissing: true });
            break;
          default:
            console.log("other error");
        }
      });
  }

  updateCityState = (cityMissing) => {
    this.setState({ cityMissing: cityMissing });
  };
  updateSchoolState = (specificSchools) => {
    this.setState({ specificSchools: specificSchools });
  };
  updateDuplicateState = (notAllowed) => {
    this.setState({ notAllowed: notAllowed });
  };

  render() {
    const competitionDetails = this.props && this.props.competition;
    const attemptId =
      competitionDetails && competitionDetails.competitionAttemptId;

    const dueDate = competitionDetails && competitionDetails.dueAt;
    if (!dueDate) return null;

    const questionsLength =
      this.props &&
      this.props.competition &&
      this.props.competition.questions &&
      this.props.competition.questions.length;

    return (
      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="competition-item border-0 box-layout bg-white shadow-sm h-100">
                {this.state.specificSchools && <SpecificSchools />}
                {this.state.notAllowed && <NotAllowed />}
                {this.state.cityMissing && (
                  <CityMissing
                    updateCityState={this.updateCityState}
                    updateSpecificSchools={this.updateSchoolState}
                    updateDuplicateState={this.updateDuplicateState}
                  />
                )}
                {!this.state.attemptSubmitted &&
                !this.state.specificSchools &&
                !this.state.notAllowed &&
                !this.state.cityMissing ? (
                  <React.Fragment>
                    <div className="title d-flex align-items-center justify-content-between mb-3">
                      <div>
                        <h5 className="text-white mb-1">
                          {competitionDetails.name}
                        </h5>
                        <p className="text-white small mb-0">
                          تحدى نفسك و ابرز قدراتك في المسابقة الأقوى على الاطلاق
                          على مستوى مدارس
                        </p>
                      </div>
                      <h5 className="text-white en-text mb-0">
                        {this.state.endCountdown ? (
                          "00:00:00"
                        ) : (
                          <Countdown
                            date={new Date(new Date(dueDate + "+0000"))}
                            onComplete={this.onCountdownEnd}
                            daysInHours="false"
                          />
                        )}

                        <i className="fa fa-clock ml-2"></i>
                      </h5>
                    </div>
                    <div className="question-item">
                      {this.renderQuestions()}
                    </div>
                    <hr />

                    <div className="d-flex justify-content-between align-items-center">
                      {this.state.selectedQuestion == 0 ? (
                        <div />
                      ) : (
                        <div>
                          <button
                            className="btn light-btn"
                            onClick={this.goToPrevious}
                          >
                            السابق
                          </button>
                        </div>
                      )}
                      <button
                        className="btn light-outline-btn w-20"
                        onClick={() => this.submitAnswers(attemptId)}
                      >
                        إنهاء المسابقة
                      </button>
                      {this.state.selectedQuestion + 1 == questionsLength ? (
                        <div />
                      ) : (
                        <div>
                          <button
                            className="btn light-btn"
                            onClick={this.goToNext}
                          >
                            التالي
                          </button>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {this.state.numberOfCorrectAnswers >
                      this.state.numberOfWrongAnswers && (
                      <div className="row py-4">
                        <div className="col-12 d-flex flex-column align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/passed.png"
                            }
                            height="120"
                            className="contain-img mb-3"
                          />
                          <h5 className="mid-text mb-2">تهانينا، لقد نجحت!</h5>
                          <p className="green-text small mb-1">
                            عدد الإجابات الصحيحة:{" "}
                            <span className="en-text">
                              {this.state.numberOfCorrectAnswers}
                            </span>
                          </p>
                          <p className="red-text small mb-1">
                            عدد الإجابات الخاطئة:{" "}
                            <span className="en-text">
                              {this.state.numberOfWrongAnswers}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                    {this.state.numberOfCorrectAnswers <
                      this.state.numberOfWrongAnswers && (
                      <div className="row py-4">
                        <div className="col-12 d-flex flex-column align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/failed.png"
                            }
                            height="120"
                            className="contain-img mb-3"
                          />
                          <h5 className="mid-text mb-2">
                            لا بأس عاود المحاولة ..
                          </h5>
                          <p className="green-text small mb-1">
                            عدد الإجابات الصحيحة:{" "}
                            <span className="en-text">
                              {this.state.numberOfCorrectAnswers}
                            </span>
                          </p>
                          <p className="red-text small mb-1">
                            عدد الإجابات الخاطئة:{" "}
                            <span className="en-text">
                              {this.state.numberOfWrongAnswers}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                    {this.state.numberOfCorrectAnswers ==
                      this.state.numberOfWrongAnswers &&
                      this.state.numberOfCorrectAnswers !== null &&
                      this.state.numberOfWrongAnswers !== null && (
                        <div className="row py-4">
                          <div className="col-12 d-flex flex-column align-items-center">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/passed.png"
                              }
                              height="120"
                              className="contain-img mb-3"
                            />
                            <h5 className="mid-text mb-2">
                              تهانينا، لقد نجحت!
                            </h5>
                            <p className="green-text small mb-1">
                              عدد الإجابات الصحيحة:{" "}
                              <span className="en-text">
                                {this.state.numberOfCorrectAnswers}
                              </span>
                            </p>
                            <p className="red-text small mb-1">
                              عدد الإجابات الخاطئة:{" "}
                              <span className="en-text">
                                {this.state.numberOfWrongAnswers}
                              </span>
                            </p>
                          </div>
                        </div>
                      )}
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    competition: state.competition,
  };
}

const actionCreators = {
  getCompetitionDetails,
};

export const Competition = connect(
  mapStateToProps,
  actionCreators
)(CompetitionComponent);
