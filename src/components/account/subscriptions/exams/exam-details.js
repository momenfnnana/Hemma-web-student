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
import "./index.scss";
import Slider from "react-slick";
import Countdown from "react-countdown-now";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";

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
      selectedQuestionId: null,
      selectedQuestion: 0,
      endCountdown: false,
      isChecked: false,
      isLoading:true
    };
    this.onInput = this.onInput.bind(this);
    this.onCountdownEnd = this.onCountdownEnd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  onCountdownEnd = () => {
    this.setState({ endCountdown: true });
    const questionsLength = this.state.questions.length;
    const answersLength = this.state.answers.length;
    const unansweredQuestions = questionsLength - answersLength;
    if (unansweredQuestions == 0) {
      const attemptId = this.props.match.params.attemptId;
      let token = localStorage.getItem("token");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      let data = {
        answers: this.state.answers,
      };
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
    } else {
      this.openConfirmExamModal();
    }
  };

  goToNext = () => {
    this.setState({
      selectedQuestion:
        (this.state.selectedQuestion + 1) % this.state.questions.length,
    });
  };

  goToPrevious = () => {
    this.setState({
      selectedQuestion:
        (this.state.selectedQuestion - 1) % this.state.questions.length,
    });
  };

  goTo = (questionId) => {
    this.setState({
      selectedQuestion: questionId - 1,
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

  openConfirmExamModal = () => {
    this.setState({ isConfirmExamOpen: true });
  };

  closeConfirmExamModal = () => {
    this.setState({ isConfirmExamOpen: false });
  };

  deleteAttempt(attemptId,cb=()=>{}){
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .delete(`${apiBaseUrl}/Exams/${attemptId}`, { headers })
      .then(()=>{
        cb()
      })
  }

  async handleCancel(){
    const {id : examId, attemptId} = this.props.match.params
    const {history:{push}} =  this.props
    this.deleteAttempt(attemptId,()=>{
      push(`/course/content/${examId}/exams/list`)
    })
  }

  openHintModal = (id) => {
    this.setState({ isHintOpen: true, selectedQuestionId: id });
  };
  closeHintModal = () => {
    this.setState({ isHintOpen: false });
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
          isLoading:false
        });
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          isLoading:false
        })
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
                    className="dark-text mb-0 encoded-text break-word question-container"
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
                    <p className="small dark-silver-text mb-0">
                      ???????? ?????????????? ??????????????
                    </p>
                  </div>
                  <div>
                 
                 {/* { !(Object.keys(question.explanation).length == 0 )?( */ } 
                  { question && question.allowHint  ?(
                  <div className="col-md-6">
                    <button
                      className="btn red-outline-btn btn-sm small float-right d-flex"
                      onClick={() => this.openHintModal(question.id)}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/assets/images/hint.png"}
                        height="17"
                        className="contain-img mr-2"
                        alt="hint"
                      />
                      ????????????????
                    </button>
                  </div>
                  ) : null}
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
                            label={value}
                            type="radio"
                            className="small dark-text light-font-text d-flex align-items-center"
                            name={`choice-${question.id}`}
                            onChange={() => this.onInput(question.id, key)}
                            id={value}
                            checked={selected}
                          />
                          <label
                            dangerouslySetInnerHTML={{ __html: value }}
                            className="mb-0 dark-text small ml-2 encoded-text mw-100 break-word"
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

  render() {
    if(this.state.isLoading){
      return  <div
      className="silver-bg box-layout w-100 pb-0 p-3 mt-4 d-flex justify-content-center align-items-center"
      style={{ minHeight: 350 }}
    >
      <Loader
        type="ball-spin-fade-loader"
        className="dark-loader"
      />
    </div>
    }
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
      arrows:false,
      accessibility:false,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows:false,
          }
        },
      ]
    };
    const isSafari = navigator.userAgent.toLowerCase().indexOf("safari/");

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
                      <h6 className="mid-text mb-0">?????????? ????????????????</h6>
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
                        {this.state.endCountdown ? (
                          "00:00:00"
                        ) : (
                          <>
                            {isSafari === 104 ? (
                              <Countdown
                                date={new Date(new Date(dueDate))}
                                onComplete={this.onCountdownEnd}
                                daysInHours="false"
                              />
                            ) : (
                              <Countdown
                                date={new Date(new Date(dueDate + "+0000"))}
                                onComplete={this.onCountdownEnd}
                                daysInHours="false"
                              />
                            )}
                          </>
                        )}
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
                  ???????? <span className="en-text">{unansweredQuestions}</span>{" "}
                  ?????????? ???? ?????? ???????????????? ?????????? ???? ?????? ?????????? ???? ?????? ???????? ??????????
                  ??????????????????
                </h6>

                <button
                  className="btn light-outline-btn w-75"
                  onClick={this.closeConfirmExamModal}
                >
                  ?????????????? ????????????????              
                </button>
                {/* <Link
              className="btn light-btn unset-height unset-line-height"
              to={`/course/content/${courseId}/exam/${attemptId}/result`}
            >
              ???????????? ???? ????????????????
            </Link> */}
                <Link
                 className="btn red-outline-btn light-outline-btn w-75 m-2"
                  to={`/course/content/${courseId}/exam/${attemptId}/result`}
                >
                   ?????????? ????????????????
                </Link>
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
    formValues: state.form.ExamDetails && state.form.ExamDetails.values,
  };
}

ExamDetailsComponent = reduxForm({
  form: "ExamDetails",
})(ExamDetailsComponent);

ExamDetailsComponent = connect(mapStateToProps)(ExamDetailsComponent);

export const ExamDetails = withRouter(ExamDetailsComponent);

