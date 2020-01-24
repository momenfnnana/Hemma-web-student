import React, { Component } from "react";
import { apiBaseUrl } from "../../../api/helpers";
import axios from "axios";

export class Competition extends Component {
  constructor() {
    super();
    this.state = {
      competitionDetails: [],
      questions: [],
      answers: [],
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
        .post(`${apiBaseUrl}/Competitions/Attempts/${attemptId}`, data, {
          headers
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.openConfirmExamModal();
    }
  };

  componentDidMount = () => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    const {
      match: { params }
    } = this.props;
    axios
      .get(`${apiBaseUrl}/Competitions/${params.id}`, {
        headers
      })
      .then(response => {
        this.setState({
          questions: response.data.data.questions,
          competitionDetails: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
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
                  <img
                    src={question.renderedStem}
                    className="m-3 contain-img"
                    width="20%"
                    height="50"
                  />
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
    return (
      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="competition-item border-0 box-layout bg-white shadow-sm h-100">
                <div className="title d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <h5 className="text-white mb-1">
                      مسابقة كفايات المعلمين والمعلمات
                    </h5>
                    <p className="text-white small mb-0">
                      تحدى نفسك و ابرز قدراتك في المسابقة الأقوى على الاطلاق على
                      مستوى مدارس
                    </p>
                  </div>
                  <h5 className="text-white en-text mb-0">
                    01:02:30<i className="fa fa-clock ml-2"></i>
                  </h5>
                </div>
                <div className="question-item">{this.renderQuestions()}</div>
                <hr />
                <div className="d-flex align-items-center justify-content-center">
                  <button className="btn light-outline-btn w-20">
                    إنهاء المسابقة
                  </button>
                </div>

                {/* {unansweredQuestions == 0 ? (
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
                )} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
