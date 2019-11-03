import React, { Component } from "react";
import { CustomInput } from "reactstrap";
import { ConfirmExam } from "./confirm-exam";
import Slider from "react-slick";
import { HintModal } from "./hint";
import { apiBaseUrl } from "../../../../api/helpers";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles.sass";
import { ExamPass } from "./exam-pass";
import { ExamFail } from "./exam-fail";
import Countdown from "react-countdown-now";

const Completionist = () => <span>Times up</span>;

const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    return <Completionist />;
  } else {
    return (
      <React.Fragment>
        {minutes}:{seconds}
      </React.Fragment>
    );
  }
};

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
      isChecked: false,
      status: "",
      scoreDetails: [],
      examDetails: []
    };
    this.onInput = this.onInput.bind(this);
  }

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

  closeConfirmExamModal = () => {
    this.setState({ isConfirmExamOpen: false });
  };

  openHintModal = () => {
    this.setState({ isHintOpen: true });
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
        console.log(response.data.data);
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
    // this.setState({ isConfirmExamOpen: true });
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
          this.setState({ status: "Pass" });
        } else if (response.data.data.status == "Fail") {
          this.setState({ status: "Fail" });
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
        console.log(error);
      });
  };

  renderQuestionsTitle() {
    const questions = this.state.questions || [];
    return questions.map(question => (
      <div className="box-layout h-55 d-flex justify-content-center flex-column p-3 br-0 border-right-0 border-top-0">
        <h6 className="dark-text small mb-1">السؤال {question.id}</h6>

        <p className="dark-silver-text smaller mb-0 word-break">
          {question.stem}
        </p>
      </div>
    ));
  }

  renderQuestions() {
    const questions = this.state.questions || [];
    return questions.map(question => (
      <React.Fragment>
        <div dir="rtl">
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
                    onClick={this.openHintModal}
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
                    return (
                      <div className="box-layout h-40 d-flex align-items-center pr-2 pl-2 mb-2">
                        <CustomInput
                          type="radio"
                          label={value}
                          className="small dark-silver-text light-font-text d-flex align-items-center"
                          name="selectedAnswer"
                          onChange={() => this.onInput(question.id, key)}
                          id={value}
                          name="selectedChoice"
                        />
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
        </div>
      </React.Fragment>
    ));
  }

  render() {
    const courseId = this.props.match.params.id;
    const attemptId = this.props.match.params.attemptId;
    const settings = {
      className: "center",
      centerMode: true,
      infinite: false,
      centerPadding: "50",
      slidesToShow: 3.5,
      speed: 500
    };

    const dueDate =
      this.state && this.state.examDetails && this.state.examDetails.dueAt;
    const dueTime = new Date(dueDate);
    const countdownTime = dueTime.getTime();

    console.log(countdownTime);

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
                      <h6 className="mid-text mb-0">
                        {/* الامتحان الأول: القطوع المخروطية */}
                        أسئلة الامتحان
                      </h6>
                      {/* <p className="dark-silver-text mb-0 mt-1 smaller">
                        وصف الامتحان
                      </p> */}
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
                        <Countdown
                          date={Date.now() + countdownTime}
                          renderer={renderer}
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
                <div className="question-item">
                  <Slider
                    asNavFor={this.state.nav1}
                    ref={slider => (this.slider2 = slider)}
                    slidesToShow={3}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    {...settings}
                    className="mb-3"
                  >
                    {this.renderQuestionsTitle()}
                  </Slider>
                  <Slider
                    asNavFor={this.state.nav2}
                    ref={slider => (this.slider1 = slider)}
                    arrows={false}
                  >
                    {this.renderQuestions()}
                  </Slider>
                </div>
                <div className="row">
                  <div className="col-12">
                    <hr className="mb-0" />
                  </div>
                </div>

                <div className="row pt-4 pb-3">
                  <div className="col-12 text-center">
                    <button
                      className="btn light-outline-btn w-25"
                      // onClick={this.openConfirmExamModal}
                      onClick={this.submitAnswers}
                    >
                      إنهاء الامتحان
                    </button>
                  </div>
                </div>
              </div>

              <ConfirmExam
                isConfirmExamOpen={this.state.isConfirmExamOpen}
                closeConfirmExam={this.closeConfirmExamModal}
              />
              <HintModal
                isHintOpen={this.state.isHintOpen}
                closeHint={this.closeHintModal}
              />
            </div>
          </div>
        )}
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
