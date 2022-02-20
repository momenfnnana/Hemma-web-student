import React, { Component } from "react";
import { CustomInput } from "reactstrap";
import { HintModal } from "../exams/hint";
import { apiBaseUrl } from "../../../../api/helpers";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import "../styles.sass";
import Slider from "react-slick";
import { ExamFail } from "../exams/exam-fail";
import { TrainingPass } from "./training-pass";
import { TrainingExamFail } from "./training-fail";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {SolutionModal} from "../exams/solution"
import "../index.scss";
// import MathType from '@wiris/mathtype-ckeditor5';

class TrainingExamDetailsComponent extends Component {
  constructor() {
    super();
    this.state = {
      isConfirmExamOpen: false,
      isHintOpen: false,
      isSolutionExplanationOpen:false,
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
    // this.onCountdownEnd = this.onCountdownEnd.bind(this);
  }

  goToNext = () => {
    this.setState({
      selectedQuestion:
        (this.state.selectedQuestion + 1) % this.state.questions.length,
      isCorrect: false,
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
    this.setState({ isHintOpen: false,selectedQuestionId: null });
  };
  openSolutionExplanationModal = (id) => {
       this.setState({ isSolutionExplanationOpen: true, selectedQuestionId: id });
     };
  closeSolutionExplanationModal = () => {
       this.setState({ isSolutionExplanationOpen: false,selectedQuestionId: null });
     };
  componentDidMount = () => {
    const attemptId = this.props.match.params.attemptId;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${apiBaseUrl}/Exams/Attempts/${attemptId}/Sheet`, { headers })
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
    const attemptId = this.props.match.params.attemptId;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = {
      answers: this.state.answers,
    };
    console.log(data);
    axios
      .post(`${apiBaseUrl}/Exams/Attempts/${attemptId}/Submission`, data, {
        headers,
      })
      .then((response) => {
        if (response.data.data.status == "Pass") {
          this.setState({ status: "Pass", isConfirmExamOpen: false });
        } else if (response.data.data.status == "Fail") {
          this.setState({ status: "Fail", isConfirmExamOpen: false });
        }
        axios
          .get(`${apiBaseUrl}/Exams/Attempts/${attemptId}/Scorecard`, {
            headers,
          })
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

    return (
      <React.Fragment>
        {question && (
          <React.Fragment>
            <div className="d-flex justify-content-center align-items-center flex-row p-3 br-0 border-right-0 border-top-0">
              <h6 className="mb-0 dark-text">السؤال {question.id}</h6>
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
            <div className="row pl-4 pr-4 flex-column flex-lg-row">
              <div className="col-12 col-lg-7 order-2  order-lg-1">
                <div className="row d-flex justify-content-between align-items-center mb-3ss">
                  {answer ? (
                    <div className="col-md-12">
                      <div className="my-5">
                        {correctAnswer.correctChoice ==
                        answer.selectedChoice ? (
                          <p className="small green-text mb-0">الإجابة صحيحة</p>
                        ) : correctAnswer.correctChoice !==
                          answer.selectedChoice ? (
                          <p className="small red-text mb-0">الإجابة خاطئة</p>
                        ) : (
                          <p className="small red-text mb-0">لم تقم بالإجابة</p>
                        )}
                        <br/>
                        <div className="row d-flex justify-content-between align-items-center mb-3">
                            {question && question.allowSolutionExplanation ? (
                                <div className="col-md-6 d-flex">
                                        <button
                                            disabled={!answer && !answer.selectedChoice}
                                            className="btn red-outline-btn btn-sm small float-right d-flex"
                                            onClick={() => this.openSolutionExplanationModal(question.id)}
                                        >
                                            طريقة الحل
                                        </button>
                                </div>
                            ) : null}
                        </div>
                      </div>
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
                                  className="flex-1 mb-0 dark-text small ml-2 encoded-text"
                                ></label>
                              </div>
                            );
                          },
                          this)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="col-md-12">
                      <div className="col-md-6 px-0">
                        <p className="small dark-silver-text mt-4">
                          اختر الإجابة الصحيحة
                        </p>
                      </div>
                      <div className="row d-flex justify-content-between align-items-center mb-3">
                        {question && question.allowHint ? (
                          <div className="col-md-6 d-flex">
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
                              المساعدة
                            </button>
                          </div>
                        ) : null}
                      </div>
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
                              className="flex-1 mb-0 dark-text small ml-2 encoded-text"
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
                <div className="col-lg-5 col-12 d-flex align-items-center order-1  order-lg-2">
                  <img src={question.imageUrl} width="100%" />
                </div>
              )}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
  render() {
    const courseId = this.props.match.params.id;
    const attemptId = this.props.match.params.attemptId;
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        // width: "35%",
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
        {this.state.status == "Pass" ? (
          <TrainingPass
            courseId={courseId}
            attemptId={attemptId}
            scoreDetails={this.state.scoreDetails}
          />
        ) : this.state.status == "Fail" ? (
          <TrainingExamFail
            courseId={courseId}
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
                      <h6 className="mid-text mb-0">أسئلة التدريب</h6>
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
                          السابق
                        </button>
                      </div>
                    )}
                    {unansweredQuestions == 0 ? (
                      <button
                        className="btn light-outline-btn w-25"
                        onClick={this.submitAnswers}
                      >
                        إنهاء التدريب
                      </button>
                    ) : (
                      <button
                        className="btn light-outline-btn w-25"
                        onClick={this.openConfirmExamModal}
                      >
                        إنهاء التدريب
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
                          التالي
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="question-item">
                      <Slider
                        asNavFor={this.state.nav1}
                        ref={(slider) => (this.slider2 = slider)}
                        slidesToShow={3.5}
                        swipeToSlide={true}
                        focusOnSelect={true}
                        {...settings}
                        className="mb-3"
                      >
                        {this.renderQuestionsTitle()}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
                <HintModal
                  isHintOpen={this.state.isHintOpen}
                  closeHint={this.closeHintModal}
                  id={this.state.selectedQuestionId}
                  attemptId={attemptId}
                />
              <SolutionModal
                  isSolutionOpen={this.state.isSolutionExplanationOpen}
                  closeSolution={this.closeSolutionExplanationModal}
                  id={this.state.selectedQuestionId}
                  attemptId={attemptId}
              />
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
                  هناك <span className="en-text">{unansweredQuestions}</span>{" "}
                  أسئلة لم تقم بالاجابة عليها هل أنت متأكد من أنك تريد ارسال
                  الاجابات؟
                </h6>

                <button
                  className="btn light-outline-btn w-75"
                  onClick={this.submitAnswers}
                >
                  اعتمد الاجابة
                </button>
                <h6
                  className="dark-silver-text small mt-3 mb-0 clickable"
                  onClick={this.closeConfirmExamModal}
                >
                  إلغاء
                </h6>
              </div>
            </div>
          </div>
        </Modal>
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

export const TrainingExamDetails = withRouter(TrainingExamDetailsComponent);
