import React, { Component } from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import axios from "axios";
import { apiBaseUrl } from "../../../api/helpers";

export class QuickQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 25,
      details: [],
      isJoined: null,
      quickQuestions: [],
      questionsFavorites: []
    };
    this.toggleJoin = this.toggleJoin.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
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
      .get(`${apiBaseUrl}/CategoryGroups/${params.categoryGroupId}`, {
        headers
      })
      .then(response => {
        this.setState({
          details: response.data.data,
          isJoined: response.data.data.isJoined
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(
        `${apiBaseUrl}/QuickQuestions?categoryGroupId=${params.categoryGroupId}`,
        {
          headers
        }
      )
      .then(response => {
        this.setState({ quickQuestions: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(
        `${apiBaseUrl}/QuickQuestionFavorites?categoryGroupId=${params.categoryGroupId}`,
        {
          headers
        }
      )
      .then(response => {
        this.setState({ questionsFavorites: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggleJoin() {
    const {
      match: { params }
    } = this.props;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .put(
        `${apiBaseUrl}/CategoryGroups/${params.categoryGroupId}/ToggleJoin`,
        {},
        {
          headers
        }
      )
      .then(response => {
        this.setState({ isJoined: !this.state.isJoined });
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggleFavorite(questionId) {
    const {
      match: { params }
    } = this.props;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .put(
        `${apiBaseUrl}/QuickQuestionFavorites/${questionId}/ToggleFavorite`,
        {},
        {
          headers
        }
      )
      .then(response => {
        axios
          .get(
            `${apiBaseUrl}/QuickQuestions?categoryGroupId=${params.categoryGroupId}`,
            {
              headers
            }
          )
          .then(response => {
            this.setState({ quickQuestions: response.data.data });
          })
          .catch(error => {
            console.log(error);
          });

        axios
          .get(
            `${apiBaseUrl}/QuickQuestionFavorites?categoryGroupId=${params.categoryGroupId}`,
            {
              headers
            }
          )
          .then(response => {
            this.setState({ questionsFavorites: response.data.data });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderQuestion() {
    return this.state.quickQuestions.map(question => (
      <React.Fragment>
        <div className="col-md-4 d-flex align-items-center" key={question.id}>
          <div className="question-card">
            <div className="row">
              <React.Fragment>
                <div className="col-6">
                  {question.isAnswered && (
                    <div className="answer-label">
                      <h6 className="smaller light-text mb-0">
                        تمت الإجابة على السؤال
                      </h6>
                    </div>
                  )}
                </div>
                <div className="col-6">
                  {!question.isFavorite && (
                    <div
                      className="favorite-label d-flex align-items-center justify-content-end clickable"
                      onClick={() => this.toggleFavorite(question.id)}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/empty-heart.png"
                        }
                        height="12"
                        className="mr-1"
                      />
                      <h6 className="smaller mid-text mb-0">
                        إضافة إلى المفضلة
                      </h6>
                    </div>
                  )}
                </div>
              </React.Fragment>
            </div>
            <div className="question-body">
              <div className="row">
                <div className="col-md-12">
                  <h6 className="dark-text small">
                    سؤال عن النسبة والتناسب مكرر أعوام سابقة
                  </h6>
                  <p className="mid-text light-font-text smaller text-break">
                    {question.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="question-footer">
              <div className="row">
                <div className="col-md-12">
                  <p className="light-font-text smaller dark-silver-text mb-0">
                    <React.Fragment>
                      منذ <span className="en-text">14</span> يوم
                    </React.Fragment>
                  </p>
                </div>
              </div>
            </div>
            <div className="answers-ratio d-flex justify-content-center flex-column">
              <div className="row">
                <div className="col-md-12 d-flex align-items-center justify-content-center">
                  <h6 className="dark-text smaller mb-0 mr-2">
                    الإجابات الصحيحة
                  </h6>
                  <div className="w-50 en-text small red-text">
                    <Progress
                      percent={25}
                      status="error"
                      theme={{
                        error: {
                          symbol: this.state.percent + "%",
                          trailColor: "#f66271",
                          color: "#f66271"
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 d-flex align-items-center justify-content-center">
                  <h6 className="dark-text smaller mb-0 mr-2">
                    الإجابات الخاطئة
                  </h6>
                  <div className="w-50 en-text small">
                    <Progress
                      percent={100}
                      status="success"
                      theme={{
                        success: {
                          symbol: this.state.percent + "%",
                          trailColor: "#2bc3cc",
                          color: "#2bc3cc"
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ));
  }

  renderQuestionsFavorites() {
    return this.state.questionsFavorites.map(question => (
      <React.Fragment>
        <div className="col-md-4 d-flex align-items-center" key={question.id}>
          <div className="question-card">
            <div className="row">
              <React.Fragment>
                <div className="col-6">
                  {question.isAnswered && (
                    <div className="answer-label">
                      <h6 className="smaller light-text mb-0">
                        تمت الإجابة على السؤال
                      </h6>
                    </div>
                  )}
                </div>
                <div className="col-6">
                  <div
                    className="favorite-label d-flex align-items-center justify-content-end clickable"
                    onClick={() =>
                      this.toggleFavorite(question.quickQuestionId)
                    }
                  >
                    <img
                      src={
                        process.env.PUBLIC_URL + "/assets/images/red-heart.png"
                      }
                      height="12"
                      className="mr-1"
                    />
                    <h6 className="smaller mid-text mb-0">إزالة من المفضلة</h6>
                  </div>
                </div>
              </React.Fragment>
            </div>
            <div className="question-body">
              <div className="row">
                <div className="col-md-12">
                  <h6 className="dark-text small">
                    سؤال عن النسبة والتناسب مكرر أعوام سابقة
                  </h6>
                  <p className="mid-text light-font-text smaller text-break">
                    {question.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="question-footer">
              <div className="row">
                <div className="col-md-12">
                  <p className="light-font-text smaller dark-silver-text mb-0">
                    <React.Fragment>
                      منذ <span className="en-text">14</span> يوم
                    </React.Fragment>
                  </p>
                </div>
              </div>
            </div>
            <div className="answers-ratio d-flex justify-content-center flex-column">
              <div className="row">
                <div className="col-md-12 d-flex align-items-center justify-content-center">
                  <h6 className="dark-text smaller mb-0 mr-2">
                    الإجابات الصحيحة
                  </h6>
                  <div className="w-50 en-text small red-text">
                    <Progress
                      percent={25}
                      status="error"
                      theme={{
                        error: {
                          symbol: this.state.percent + "%",
                          trailColor: "#f66271",
                          color: "#f66271"
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 d-flex align-items-center justify-content-center">
                  <h6 className="dark-text smaller mb-0 mr-2">
                    الإجابات الخاطئة
                  </h6>
                  <div className="w-50 en-text small">
                    <Progress
                      percent={100}
                      status="success"
                      theme={{
                        success: {
                          symbol: this.state.percent + "%",
                          trailColor: "#2bc3cc",
                          color: "#2bc3cc"
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ));
  }

  render() {
    return (
      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9 d-flex align-items-center">
              <h4 className="light-text mb-0">{this.state.details.name}</h4>
            </div>
            <div className="col-md-3 d-flex align-items-center justify-content-end">
              {!this.state.isJoined && (
                <button
                  className="btn btn-sm unset-height small light-btn light-font-text w-25"
                  onClick={this.toggleJoin}
                >
                  إنضمام
                </button>
              )}
              <button
                className="btn btn-sm unset-height small red-outline-btn light-font-text w-25 ml-2"
                onClick={this.toggleJoin}
              >
                انسحاب
              </button>
            </div>
            <div className="col-md-12 mt-2">
              <p className="dark-text small text-break w-75">
                {this.state.details.description}
              </p>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <h6 className="dark-text mb-0">عدد الأعضاء:</h6>
              <div className="members-circle en-text text-white ml-1">
                {this.state.details.numberOfMembers}
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <h6 className="dark-text">
                عدد الأسئلة:{" "}
                <span className="en-text">
                  {this.state.details.numberOfQuickQuestion}
                </span>{" "}
                سؤال
              </h6>
            </div>
          </div>
          <div className="row pt-4">
            <div className="col-md-12 text-center">
              <h5 className="dark-text">الأسئلة السريعة</h5>
              <p className="dark-silver-text small text-break mb-0">
                احصل على آخر إصداراتنا في القدرات والتحصيلي
              </p>
            </div>
          </div>

          <div className="row pt-4">
            <div className="col-md-12 d-flex align-items-center">
              <div className="title-circle">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/heart-gradient.png"
                  }
                />
              </div>
              <h5 className="dark-text mb-0">الاسئلة المفضلة</h5>
            </div>
          </div>

          <div className="row pt-4">{this.renderQuestionsFavorites()}</div>
          <div className="row pt-4">
            <div className="col-md-12 d-flex align-items-center">
              <div className="title-circle">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/all-questions.png"
                  }
                />
              </div>
              <h5 className="dark-text mb-0">جميع الأسئلة</h5>
            </div>
          </div>
          <div className="row pt-4">{this.renderQuestion()}</div>
        </div>
      </section>
    );
  }
}
