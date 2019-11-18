import React, { Component } from "react";
import { CustomInput } from "reactstrap";
import { HintModal } from "./hint";
import { apiBaseUrl } from "../../../../api/helpers";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ExamPass } from "./exam-pass";
import { ExamFail } from "./exam-fail";
import Modal from "react-modal";
import axios from "axios";
import "../styles.sass";
import ReactMomentCountDown from "react-moment-countdown";

class ExamDetailsComponent extends Component {
  constructor() {
    super();
    this.state = {
      isConfirmExamOpen: false,
      isHintOpen: false,
      examDetails: [],
      questions: [],
      nav1: null,
      nav2: null,
      answers: [],
      status: "",
      scoreDetails: [],
      examDetails: [],
      selectedQuestionId: null,
      selectedQuestion: 0
    };
    this.onInput = this.onInput.bind(this);
    this.onCountdownEnd = this.onCountdownEnd.bind(this);
  }

  onCountdownEnd = () => {
    const questionsLength = this.state.questions.length;
    const answersLength = this.state.answers.length;
    const unansweredQuestions = questionsLength - answersLength;
    if (unansweredQuestions == 0) {
      const attemptId = this.props.match.params.attemptId;
      let token = localStorage.getItem("token");
      let headers = {
        Authorization: `Bearer ${token}`
      };
      let data = {
        answers: this.state.answers
      };
      axios
        .post(`${apiBaseUrl}/Exams/Attempts/${attemptId}/Submission`, data, {
          headers
        })
        .then(response => {
          if (response.data.data.status == "Pass") {
            this.setState({ status: "Pass", isConfirmExamOpen: false });
          } else if (response.data.data.status == "Fail") {
            this.setState({ status: "Fail", isConfirmExamOpen: false });
          }
          axios
            .get(`${apiBaseUrl}/Exams/Attempts/${attemptId}/Scorecard`, {
              headers
            })
            .then(response => {
              this.setState({ scoreDetails: response.data.data });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          this.setState({ isConfirmExamOpen: false });
          console.log(error);
        });
    } else {
      this.openConfirmExamModal();
    }
  };

  goToNext = () => {
    this.setState({
      selectedQuestion:
        (this.state.selectedQuestion + 1) % this.state.questions.length
    });
  };

  goToPrevious = () => {
    this.setState({
      selectedQuestion:
        (this.state.selectedQuestion - 1) % this.state.questions.length
    });
  };

  onInput(questionId, selectedChoice) {
    const id = questionId;
    const answer = { id, selectedChoice };
    let answers;
    if (this.state.answers.some(answer => answer.id === id)) {
      answers = [
        ...this.state.answers.filter(answer => answer.id !== id),
        answer
      ];
    } else {
      answers = [...this.state.answers, answer];
    }
    this.setState({ answers });
  }

  openConfirmExamModal = () => {
    this.setState({ isConfirmExamOpen: true });
  };

  closeConfirmExamModal = () => {
    this.setState({ isConfirmExamOpen: false });
  };

  openHintModal = id => {
    this.setState({ isHintOpen: true, selectedQuestionId: id });
  };
  closeHintModal = () => {
    this.setState({ isHintOpen: false });
  };

  componentDidMount = () => {
    const attemptId = this.props.match.params.attemptId;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/Exams/Attempts/${attemptId}/Sheet`, { headers })
      .then(response => {
        this.setState({
          questions: response.data.data.questions,
          examDetails: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  };

  submitAnswers = () => {
    const attemptId = this.props.match.params.attemptId;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      answers: this.state.answers
    };
    axios
      .post(`${apiBaseUrl}/Exams/Attempts/${attemptId}/Submission`, data, {
        headers
      })
      .then(response => {
        if (response.data.data.status == "Pass") {
          this.setState({ status: "Pass", isConfirmExamOpen: false });
        } else if (response.data.data.status == "Fail") {
          this.setState({ status: "Fail", isConfirmExamOpen: false });
        }
        axios
          .get(`${apiBaseUrl}/Exams/Attempts/${attemptId}/Scorecard`, {
            headers
          })
          .then(response => {
            this.setState({ scoreDetails: response.data.data });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        this.setState({ isConfirmExamOpen: false });
        console.log(error);
      });
  };

  renderQuestions() {
    const questions = this.state.questions || [];
    const question = questions[this.state.selectedQuestion];
    const answer = this.state.answers.find(a => a.id === question.id);

    return (
      <React.Fragment>
        {question && (
          <React.Fragment>
            <div className="d-flex justify-content-between flex-row p-3 br-0 border-right-0 border-top-0">
              {this.state.selectedQuestion == 0 ? (
                <div />
              ) : (
                <button className="btn light-btn" onClick={this.goToPrevious}>
                  السابق
                </button>
              )}
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h6 className="mb-0 dark-text">السؤال {question.id}</h6>
              </div>

              {this.state.selectedQuestion + 1 ==
              this.state.questions.length ? (
                <div />
              ) : (
                <button className="btn light-btn" onClick={this.goToNext}>
                  التالي
                </button>
              )}
            </div>
            <hr className="mt-0 mb-0" />
            <div className="row p-4 pb-2">
              <div className="col-12">
                <div className="box-layout box-border shadow-sm">
                  <p className="dark-text small mb-0 p-3 word-break">
                    {question.stem}
                  </p>
                </div>
              </div>
            </div>
            <div className="row pl-4 pr-4 pb-4">
              <div className="col-7">
                <div className="row d-flex justify-content-between align-items-center mb-3">
                  <div className="col-md-6">
                    <p className="small dark-silver-text mb-0">
                      اختر الإجابة الصحيحة
                    </p>
                  </div>
                  <div className="col-md-6">
                    <button
                      className="btn red-outline-btn btn-sm small float-right d-flex"
                      onClick={() => this.openHintModal(question.id)}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/assets/images/hint.png"}
                        height="17"
                        className="contain-img mr-2"
                      />
                      المساعدة
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {Object.keys(question.choices).map(function(key) {
                      const value = question.choices[key];
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
                          <label className="mb-0 dark-silver-text small ml-2">
                            {value}
                          </label>
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
        width: "35%",
        height: "auto",
        borderWidth: 0,
        padding: 20
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2
      }
    };

    const questionsLength = this.state.questions.length;
    const answersLength = this.state.answers.length;
    const unansweredQuestions = questionsLength - answersLength;

    const dueDate =
      this.state && this.state.examDetails && this.state.examDetails.dueAt;
    const formattedDate = new Date(dueDate);
    var day = formattedDate.getDate();
    var month = formattedDate.getMonth() + 1;
    var year = formattedDate.getFullYear();
    var finalDate = year + "-" + month + "-" + day;
    var hours = formattedDate.getHours() + 2;
    var minutes = formattedDate.getMinutes();
    var seconds = formattedDate.getSeconds();
    var finalTime = hours + ":" + minutes + ":" + seconds;
    var countdownTo = finalDate + " " + finalTime;
    const dateInFuture = new Date(countdownTo);

    return (
      <React.Fragment>
        {this.state.status == "Pass" ? (
          <ExamPass
            courseId={courseId}
            attemptId={attemptId}
            scoreDetails={this.state.scoreDetails}
          />
        ) : this.state.status == "Fail" ? (
          <ExamFail
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
                      <h6 className="mid-text mb-0">أسئلة الامتحان</h6>
                    </div>
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/silver-clock.png"
                        }
                        height="14"
                        width="14"
                        className="contain-img mr-1"
                      />

                      <p className="small en-text dark-silver-text mb-0">
                        <ReactMomentCountDown
                          toDate={dateInFuture}
                          sourceFormatMask="YYYY-MM-DD HH:mm:ss"
                          onCountdownEnd={this.onCountdownEnd}
                        />
                      </p>
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

                <div className="row pt-4 pb-3">
                  <div className="col-12 text-center">
                    {unansweredQuestions == 0 ? (
                      <button
                        className="btn light-outline-btn w-25"
                        onClick={this.submitAnswers}
                      >
                        إنهاء الامتحان
                      </button>
                    ) : (
                      <button
                        className="btn light-outline-btn w-25"
                        onClick={this.openConfirmExamModal}
                      >
                        إنهاء الامتحان
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <HintModal
                isHintOpen={this.state.isHintOpen}
                closeHint={this.closeHintModal}
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
    formValues: state.form.ExamDetails && state.form.ExamDetails.values
  };
}

ExamDetailsComponent = reduxForm({
  form: "ExamDetails"
})(ExamDetailsComponent);

ExamDetailsComponent = connect(mapStateToProps)(ExamDetailsComponent);

export const ExamDetails = withRouter(ExamDetailsComponent);
