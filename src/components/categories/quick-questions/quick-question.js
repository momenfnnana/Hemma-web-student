import React, { Component } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../../api/helpers";

export class QuickQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      answers: [],
      selectedAnswer: null
    };
    this.onInput = this.onInput.bind(this);
  }

  onInput(questionId, selectedAnswer) {
    const id = questionId;
    const answer = { id, selectedAnswer };
    let answers;
    if (this.state.answers.some(answer => answer.id === id)) {
      answers = [
        ...this.state.answers.filter(answer => answer.id !== id),
        answer
      ];
    } else {
      answers = [...this.state.answers, answer];
    }
    this.setState({ selectedAnswer: answer.selectedAnswer });
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/QuickQuestions/${params.questionId}`, {
        headers
      })
      .then(response => {
        this.setState({ details: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  submitAnswer = () => {
    const {
      match: { params }
    } = this.props;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      selectedAnswer: this.state.selectedAnswer
    };
    axios
      .post(
        `${apiBaseUrl}/QuickQuestionAnswers?quickQuestionId=${params.questionId}`,
        data,
        {
          headers
        }
      )
      .then(response => {
        this.props.history.push(
          `/categories/details/${params.slug}/quick-questions/summary/${params.questionId}`
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const question = this.state.details && this.state.details.mcq;
    const answer = this.state.answers.find(a => a.id === question.id);
    return (
      <React.Fragment>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h5 className="dark-text mt-3">الأسئلة السريعة</h5>
                <p className="dark-text mt-2 small w-40 mx-auto text-break">
                  لا تفوت فرصة الاشتراك بأحدث دوراتنا التي تؤهلك لاجتياز امتحان
                  القدرات والتحصيلي بأعلى العلامات!
                </p>
              </div>
            </div>
            <div className="row py-5">
              <div className="col-md-12">
                <div className="row p-4 pb-2">
                  <div className="col-12">
                    <p className="smaller red-text d-flex align-items-center">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/warning.png"
                        }
                        height="15"
                        className="mr-1"
                      />
                      ملاحظة : يمكنك الإجابة عن السؤال لمرة واحدة فقط
                    </p>
                    <p className="mid-text light-font-text small text-break w-50 mb-0">
                      {this.state.details.description}
                    </p>
                  </div>
                </div>
                {question && (
                  <React.Fragment>
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
                              const selected =
                                answer && answer.selectedAnswer === key;
                              return (
                                <div className="box-layout h-40 d-flex align-items-center pr-2 pl-2 mb-2">
                                  <input
                                    type="radio"
                                    label={value}
                                    className="small dark-silver-text light-font-text d-flex align-items-center"
                                    name={`choice-${question.id}`}
                                    onChange={() =>
                                      this.onInput(question.id, key)
                                    }
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
                      <div className="col-1" />
                      {question.imageUrl && (
                        <div className="col-4 d-flex align-items-center">
                          <img src={question.imageUrl} width="100%" />
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 d-flex align-items-center justify-content-center">
                <button
                  className="btn light-outline-btn w-20"
                  onClick={this.submitAnswer}
                >
                  ارسال الاجابة
                </button>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
