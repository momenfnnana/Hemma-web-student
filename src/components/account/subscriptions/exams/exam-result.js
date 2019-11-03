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

class ExamResultComponent extends Component {
  constructor() {
    super();
    this.state = {
      isConfirmExamOpen: false,
      isHintOpen: false,
      examDetails: [],
      questions: [],
      nav1: null,
      nav2: null
    };
  }

  componentDidMount = () => {
    const attemptId = this.props.match.params.attemptId;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/Exams/Attempts/${attemptId}/DetailedScorecard`, {
        headers
      })
      .then(response => {
        this.setState({ questions: response.data.data.questions });
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

  renderQuestionsTitle() {
    const questions = this.state.questions || [];
    return questions.map(question => (
      <div className="box-layout h-55 d-flex justify-content-center flex-column p-3 br-0 border-right-0 border-top-0">
        <h6
          className={`small mb-1 ${
            question.isCorrect == true ? "green-text" : "red-text"
          }`}
        >
          السؤال {question.id}
        </h6>
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
                  <p className="small dark-silver-text mb-0">الإجابة الصحيحة</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {Object.keys(question.choices).map(function(key) {
                    const value = question.choices[key];
                    console.log(key);
                    return (
                      <div className="box-layout h-40 d-flex align-items-center pr-2 pl-2 mb-2">
                        <input
                          type="radio"
                          checked={
                            question.correctChoice == key ||
                            question.selectedChoice == key
                          }
                          disabled
                          className={`radio-custom ${
                            question.correctChoice == key
                              ? "radio-success"
                              : question.selectedChoice == key
                              ? "radio-failure"
                              : "radio-custom"
                          }`}
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
        </div>
      </React.Fragment>
    ));
  }

  render() {
    const courseId = this.props.match.params.id;
    const settings = {
      className: "center",
      centerMode: true,
      infinite: false,
      centerPadding: "50",
      slidesToShow: 3.5,
      speed: 500
    };

    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12">
            <div className="box-layout shadow-sm h-100 pb-2">
              <div className="row p-4">
                <div className="col-12 d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="mid-text mb-0">
                      الامتحان الأول: القطوع المخروطية
                    </h6>
                    <p className="dark-silver-text mb-0 mt-1 smaller">
                      وصف الامتحان
                    </p>
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
                    <p className="small en-text dark-silver-text mb-0">3:30</p>
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
                  <button className="btn light-outline-btn w-25">
                    إنهاء الامتحان
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.ExamResult && state.form.ExamResult.values
  };
}

ExamResultComponent = reduxForm({
  form: "ExamResult"
})(ExamResultComponent);

ExamResultComponent = connect(mapStateToProps)(ExamResultComponent);

export const ExamResult = withRouter(ExamResultComponent);
