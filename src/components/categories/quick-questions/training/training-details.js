import React, { Component } from "react";
import { CustomInput } from "reactstrap";
import { apiBaseUrl } from "../../../../api/helpers";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import Pagination from "react-js-pagination";
import "../styles.sass";
import "../index.scss";
import Slider from "react-slick";
import { TrainingExamFail } from "./training-fail";
import { TrainingPass } from "./training-pass";
import { HintModal } from "../exams/hint";
import ReactPlayer from "react-player";
class TrainingExamDetailsComponent extends Component {
  constructor() {
    super();
    this.state = {
      isSolutionOpen: false,
      isConfirmExamOpen: false,
      isHintOpen: false,
      examDetails: [],
      questions: [],
      nav1: null,
      nav2: null,
      answers: [],
      status: "",
      scoreDetails: [],
      selectedQuestionId: null,
      selectedQuestion: 0,
      endCountdown: false,
      isChecked: false,
      isCorrect: false,
      correctAnswer: "",
    };
    this.onInput = this.onInput.bind(this);
    this.correct = this.correct.bind(this);
  }

  goToNext = () => {
    this.setState({
      selectedQuestion:
        (this.state.selectedQuestion + 1) % this.state.questions.length,
      isCorrect: false,isSolutionOpen: false 
    });
  };

  goToPrevious = () => {
    this.setState({
      selectedQuestion:
        (this.state.selectedQuestion - 1) % this.state.questions.length,
      isCorrect: false,
    });
  };

  goTo = (questionId) => {
    this.setState({
      selectedQuestion: questionId - 1,
      isCorrect: false,
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

  correct = () => {
    this.setState({ isCorrect: true });
  };
  showSolution = () =>{
    this.setState({ isSolutionOpen: true });
  }
  closeSolution = () =>{
    this.setState({ isSolutionOpen: false });
  }
  openConfirmExamModal = () => {
    this.setState({ isConfirmExamOpen: true });
  };

  closeConfirmExamModal = () => {
    this.setState({ isConfirmExamOpen: false });
  };

  openHintModal = (id) => {
    this.setState({ isHintOpen: true, selectedQuestionId: id });
  };
  closeHintModal = () => {
    this.setState({ isHintOpen: false });
  };

  componentDidMount = () => {
    const attemptId = this.props.match.params.id;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${apiBaseUrl}/CategoryGroupExams/Attempts/${attemptId}/Sheet`, {
        headers,
      })
      .then((response) => {
        this.setState({
          questions: response.data.data.questions,
          examDetails: response.data.data,
          correctAnswer: response.data.data.answers,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  };

  submitAnswers = () => {
    const attemptId = this.props.match.params.id;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = {
      answers: this.state.answers,
    };
    axios
      .post(
        `${apiBaseUrl}/CategoryGroupExams/Attempts/${attemptId}/Submission`,
        data,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.data.data.status == "Pass") {
          this.setState({ status: "Pass", isConfirmExamOpen: false });
        } else if (response.data.data.status == "Fail") {
          this.setState({ status: "Fail", isConfirmExamOpen: false });
        }
        axios
          .get(
            `${apiBaseUrl}/CategoryGroupExams/Attempts/${attemptId}/Scorecard`,
            {
              headers,
            }
          )
          .then((response) => {
            this.setState({ scoreDetails: response.data.data });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        this.setState({ isConfirmExamOpen: false });
        console.log(error);
      });
  };

  renderQuestionsTitle() {
    const questions = this.state.questions || [];
    return questions.map((question, index) => (
      <div
        className={
          "box-layout d-flex text-center justify-content-center flex-column p-1 br-0 clickable" +
          (this.state.selectedQuestion === index ? " light-bg" : "")
        }
        onClick={() => {
          this.goTo(question.id);
        }}
      >
        <h3
          className="dark-text small mb-0"
          className={
            "small mb-0" +
            (this.state.selectedQuestion === index
              ? " text-white"
              : " dark-text")
          }
        >
          {" "}
          {question.id}
        </h3>
      </div>
    ));
  }

  renderQuestions() {
    const questions = this.state.questions || [];
    const question = questions[this.state.selectedQuestion];
    const answer = this.state.answers.find((a) => a.id === question.id);
    const correctAnswers = this.state.correctAnswer;
    const correctAnswer = correctAnswers[question.id - 1];
    const correct = this.state.isCorrect;
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        height: "auto",
        borderWidth: 0,
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 20,
      },
    };

    return (
      <React.Fragment>
        {question && (
          <React.Fragment>
            <div className="d-flex justify-content-center align-items-center flex-row p-3 br-0 border-right-0 border-top-0">
              <h6 className="mb-0 dark-text">???????????? {question.id}</h6>
            </div>
            <hr className="mt-0 mb-0" />
            <div className="row p-4 pb-2">
              <div className="col-12">
                <div className="box-layout box-border shadow-sm p-3">
                  <h6
                    className="dark-text mb-0 encoded-text question"
                    dangerouslySetInnerHTML={{ __html: question.encodedStem }}
                  ></h6>
                </div>
              </div>
            </div>
            <div className="row pl-4 pr-4 ">
              <div className="col-7">
                <div className="row d-flex justify-content-between align-items-center mb-3">
                  {answer ? (
                    <div className="col-md-12">
                      {correctAnswer.correctChoice == answer.selectedChoice ? (
                        <p className="small green-text mb-0">?????????????? ??????????</p>
                      ) : correctAnswer.correctChoice !==
                        answer.selectedChoice ? (
                        <p className="small red-text mb-0">?????????????? ??????????</p>
                      ) : (
                        <p className="small red-text mb-0">???? ?????? ????????????????</p>
                      )}
                      <div className="row">
                        <div className="col-md-12">
                          {Object.keys(question.encodedChoices).map(function(
                            key
                          ) {
                            const value = question.encodedChoices[key];
                            return (
                              <div className="box-layout h-40 d-flex align-items-center pr-2 pl-2 mb-2">
                                <input
                                  type="radio"
                                  checked={
                                    correctAnswer.correctChoice === key ||
                                    answer.selectedChoice === key
                                  }
                                  disabled
                                  className={`radio-custom ${
                                    correctAnswer.correctChoice === key
                                      ? "radio-success"
                                      : answer.selectedChoice === key
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
                          },
                          this)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="col-md-12 row">
                      <div className="col-md-6">
                        <p className="small dark-silver-text mb-0">
                          ???????? ?????????????? ??????????????
                        </p>
                      </div>
                      {/* { question && question.solutionExplanation.length > 0 && question.allowSolutionExplanation?(
                          <div className="col-md-6">
                            <button
                              className="btn red-outline-btn btn-sm small float-right d-flex"
                              onClick={() => this.showSolution()}
                            >
                              ?????????? ???????? 
                            </button>
                          </div>
                        ) : null} */}
                      <div className="row d-flex justify-content-between align-items-center mb-3">
                      { question  && question.allowHint ?(
                          <div className="col-md-6">
                            <button
                              className="btn red-outline-btn btn-sm small float-right d-flex"
                              onClick={() => this.openHintModal(question.id)}
                            >
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/hint.png"
                                }
                                height="17"
                                className="contain-img mr-2"
                                alt="hint"
                              />
                              ????????????????
                            </button>
                          </div>
                        ) : null}
                      </div>
                      {/* <div className="row d-flex justify-content-between align-items-center mb-3"> */}
                       
                      {/* </div> */}
                      {Object.keys(question.encodedChoices).map(function(key) {
                        const value = question.encodedChoices[key];
                        const selected =
                          answer && answer.selectedChoice === key;
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
                              className="mb-0 dark-text small ml-2 encoded-text"
                              dangerouslySetInnerHTML={{ __html: value }}
                            ></label>
                          </div>
                        );
                      }, this)}
                    </div>
                  )}
                </div>
              </div>
              {question.imageUrl && (
                <div className="col-5 d-flex align-items-center">
                  <img src={question.imageUrl} width="100%" />
                </div>
              )}
            </div>
            <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={this.state.isSolutionOpen}
          onRequestClose={this.closeSolution}
          closeHint={this.closeSolution}
        >
          <div className="container pt-4 pb-3">
            <div className="row">
              <div className="col-md-12 col-12">
                <span className="badge red-bg text-white mb-3 hint-badge">
                  ?????????? ???????? 
                </span>

                <div className="box-layout p-3">
                  {
                   question.explanation && question.explanation.type === "Text" ? (
                      <div
                        className="encoded-text"
                        dangerouslySetInnerHTML={{
                          __html:
                          question.explanation.value,
                        }}
                      ></div>
                    ) : question.explanation.type === "Video" ? (
                        <ReactPlayer
                        width="100%"
                        height="240"
                        url={
                          question.explanation.value
                        }
                        controls="true"
                        playing="true"
                        onError={(e) => this.onError(e)}
                      />
                      ) : (
                        <p className="dark-text mb-0 text-center">
                         {/*  ???? ???????? ?????????? ???????? ????????????*/}
                        </p>
                      )}
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <button
                    className="btn light-btn unset-height w-25 mt-4"
                    onClick={this.closeSolution}
                  >
                    ???????????? ????????????
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
          </React.Fragment>
       
        )}
      </React.Fragment>
    );
  }
  render() {
    const categoryGroupId = this.props.match.params.categoryGroupId;
    const slug = this.props.match.params.slug;
    const attemptId = this.props.match.params.id;
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "35%",
        height: "auto",
        borderWidth: 0,
        padding: 20,
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2,
      },
    };

    const questionsLength = this.state.questions.length;
    const answersLength = this.state.answers.length;
    const unansweredQuestions = questionsLength - answersLength;
    var timeInSeconds = 0;
    for (let q of this.state.questions) {
      timeInSeconds += q.duration;
    }
    const dueDate =
      this.state && this.state.examDetails && this.state.examDetails.dueAt;
    if (!dueDate) return null;
    const settings = {
      className: "center",
      centerMode: true,
      infinite: false,
      slidesToShow: questionsLength,
      speed: 500,
      rtl: true,
    };
    return (
      <React.Fragment>
        <div className="container mb-3">
          {this.state.status == "Pass" ? (
            <TrainingPass
              slug={slug}
              categoryGroupId={categoryGroupId}
              attemptId={attemptId}
              scoreDetails={this.state.scoreDetails}
            />
          ) : this.state.status == "Fail" ? (
            <TrainingExamFail
              slug={slug}
              categoryGroupId={categoryGroupId}
              attemptId={attemptId}
              scoreDetails={this.state.scoreDetails}
            />
          ) : (
            <div className="row no-gutters">
              <div className="col-12">
                <div className="box-layout shadow-sm h-100 pb-2">
                  <div className="row p-4">
                    <div className="col-12 d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="mid-text mb-0">?????????? ????????????????</h6>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <hr className="mb-0 mt-0" />
                    </div>
                  </div>
                  <div className="question-item">{this.renderQuestions()}</div>
                  <div className="row">
                    <div className="col-12">
                      <hr className="mb-0" />
                    </div>
                  </div>

                  <div className="row pt-4 pb-3 pl-3 pr-3">
                    <div className="col-12 text-center d-flex justify-content-between align-items-center">
                      {this.state.selectedQuestion == 0 ? (
                        <div />
                      ) : (
                        <div>
                          <button
                            className="btn light-btn"
                            onClick={this.goToPrevious}
                          >
                            ????????????
                          </button>
                        </div>
                      )}
                      {unansweredQuestions == 0 ? (
                        <button
                          className="btn light-outline-btn w-25"
                          onClick={this.submitAnswers}
                        >
                          ?????????? ????????????????
                        </button>
                      ) : (
                        <button
                          className="btn light-outline-btn w-25"
                          onClick={this.openConfirmExamModal}
                        >
                          ?????????? ????????????????
                        </button>
                      )}

                      {this.state.selectedQuestion + 1 ==
                      this.state.questions.length ? (
                        <div />
                      ) : (
                        <div>
                          <button
                            className="btn light-btn"
                            onClick={this.goToNext}
                          >
                            ????????????
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="question-item d-flex justify-content-center">
                        <Pagination
                          activePage={this.state.selectedQuestion+1}
                          itemsCountPerPage={10}
                          totalItemsCount={this.state.questions?.length*10}
                          pageRangeDisplayed={5}
                          onChange={(e)=>{
                            this.goTo(e)
                          }}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Modal
            style={customStyles}
            ariaHideApp={false}
            isOpen={this.state.isConfirmExamOpen}
            onRequestClose={this.closeConfirmExamModal}
            closeConfirmExam={this.closeConfirmExamModal}
          >
          
            <div className="container h-100 pt-3 pb-3 w-75 mx-auto">
              <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-center flex-column text-center">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/not-verified.png"
                    }
                    height="50"
                    width="50"
                    className="contain-img mb-3"
                  />
                  <h6 className="dark-text mb-4 mt-0">
                    ???????? <span className="en-text">{unansweredQuestions}</span>{" "}
                    ?????????? ???? ?????? ???????????????? ?????????? ???? ?????? ?????????? ???? ?????? ???????? ??????????
                    ??????????????????
                  </h6>

                  <button
                    className="btn light-outline-btn w-75"
                    onClick={this.submitAnswers}
                  >
                    ?????????? ??????????????
                  </button>
                  <h6
                    className="dark-silver-text small mt-3 mb-0 clickable"
                    onClick={this.closeConfirmExamModal}
                  >
                    ??????????
                  </h6>
                </div>
              </div>
            </div>
          </Modal>
          <HintModal
                  isHintOpen={this.state.isHintOpen}
                  closeHint={this.closeHintModal}
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
    formValues:
      state.form.TrainingExamDetails && state.form.TrainingExamDetails.values,
  };
}

TrainingExamDetailsComponent = reduxForm({
  form: "TrainingExamDetails",
})(TrainingExamDetailsComponent);

TrainingExamDetailsComponent = connect(mapStateToProps)(
  TrainingExamDetailsComponent
);

export default withRouter(TrainingExamDetailsComponent);
