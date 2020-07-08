import React, { Component } from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import axios from "axios";
import { apiBaseUrl } from "../../../api/helpers";
import { Link } from "react-router-dom";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-beat.scss";

var moment = require("moment");
moment().format();

export class QuickQuestions extends Component {
  page = 1;
  limit = 6;
  endOfResults = false;
  constructor(props) {
    super(props);
    this.state = {
      percent: 25,
      details: [],
      isJoined: null,
      quickQuestions: [],
      questionsFavorites: [],
      disabled: false,
      hideBtn: false,
      nextPageUrl: `${apiBaseUrl}/QuickQuestions?categoryGroupId=${this.props.match.params.categoryGroupId}&page=${this.page}&limit=${this.limit}`
    };
    this.toggleJoin = this.toggleJoin.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  loadMore = async () => {
    const {
      match: { params }
    } = this.props;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    this.setState({ loading: true, disabled: true });
    if (!this.endOfResults) {
      axios
        .get(this.state.nextPageUrl, { headers })
        .then(response => {
          this.setState({
            loading: false,
            disabled: false
          });
          const newQuestions = [
            ...this.state.quickQuestions,
            ...response.data.data.data
          ];
          this.endOfResults = response.data.data.itemCount < this.limit;
          this.page++;
          const nextUrl = `${apiBaseUrl}/QuickQuestions?categoryGroupId=${params.categoryGroupId}&page=${this.page}&limit=${this.limit}`;
          this.setState({
            quickQuestions: newQuestions,
            nextPageUrl: nextUrl
          });
          if (newQuestions.length == response.data.data.itemCount) {
            this.setState({ hideBtn: true });
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading: false, disabled: false });
        });
    }
  };

  async componentDidMount() {
    const {
      match: { params }
    } = this.props;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };

    await this.loadMore();

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
        axios
          .get(`${apiBaseUrl}/CategoryGroups/${params.categoryGroupId}`, {
            headers
          })
          .then(response => {
            this.setState({
              details: response.data.data
            });
          })
          .catch(error => {
            console.log(error);
          });
        this.setState({ isJoined: !this.state.isJoined });
        if (this.state.isJoined) {
          axios
            .get(
              `${apiBaseUrl}/QuickQuestions?categoryGroupId=${params.categoryGroupId}&page=1&limit=6`,
              {
                headers
              }
            )
            .then(response => {
              this.setState({ quickQuestions: response.data.data.data });
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
            `${apiBaseUrl}/QuickQuestions?categoryGroupId=${params.categoryGroupId}&page=1&limit=6`,
            {
              headers
            }
          )
          .then(response => {
            this.setState({ quickQuestions: response.data.data.data });
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
    const {
      match: { params }
    } = this.props;
    return this.state.quickQuestions.map(question => {
      let currentDate = new Date();
      let getCurrentDate =
        currentDate.getFullYear() +
        "-" +
        (currentDate.getMonth() + 1) +
        "-" +
        currentDate.getDate();
      let questionDate = new Date(question.publishDate);
      let getQuestionDate =
        questionDate.getFullYear() +
        "-" +
        (questionDate.getMonth() + 1) +
        "-" +
        questionDate.getDate();
      let currentDay = moment(getCurrentDate);
      let questionDay = moment(getQuestionDate);
      let diff = moment.duration(currentDay.diff(questionDay));
      let days = diff.days() % 7;
      const totalQuestionsNumber =
        question.numberOfWrongAnswers + question.numberOfCorrectAnswers;
      let wrongQuestionsRatio;
      if (totalQuestionsNumber === 0) {
        wrongQuestionsRatio = 0;
      } else {
        wrongQuestionsRatio = parseInt(
          (question.numberOfWrongAnswers / totalQuestionsNumber) * 100
        );
      }

      let correctQuestionsRatio;
      if (totalQuestionsNumber === 0) {
        correctQuestionsRatio = 0;
      } else {
        correctQuestionsRatio = parseInt(
          (question.numberOfCorrectAnswers / totalQuestionsNumber) * 100
        );
      }

      return (
        <React.Fragment>
          <div className="col-md-6 d-flex align-items-center" key={question.id}>
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
                    <div className="favorite-label d-flex align-items-center justify-content-end">
                      {!question.isFavorite && (
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/empty-heart.png"
                          }
                          height="12"
                          className="mr-1 clickable"
                          onClick={() => this.toggleFavorite(question.id)}
                          alt="favourite"
                        />
                      )}
                    </div>
                  </div>
                </React.Fragment>
              </div>
              <Link
                to={
                  question.isAnswered
                    ? `/categories/details/${params.slug}/quick-questions/summary/${question.id}`
                    : `/categories/details/${params.slug}/quick-questions/details/${question.id}`
                }
              >
                <div className="question-body">
                  <div className="row">
                    <div className="col-md-12">
                      {question.description ? (
                        <p className="mid-text light-font-text smaller text-break">
                          {question.description}
                        </p>
                      ) : (
                        <p className="mid-text light-font-text smaller text-break">
                          لا يوجد وصف للسؤال
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
              <div className="question-footer">
                <div className="row">
                  <div className="col-md-12">
                    <p className="light-font-text smaller dark-silver-text mb-0">
                      <React.Fragment>
                        منذ <span className="en-text">{days}</span> يوم
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
                        percent={correctQuestionsRatio}
                        status="success"
                        theme={{
                          success: {
                            symbol: correctQuestionsRatio + "%",
                            color: "#2bc3cc"
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
                        percent={wrongQuestionsRatio}
                        status="error"
                        theme={{
                          error: {
                            symbol: wrongQuestionsRatio + "%",
                            color: "#f66271"
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
      );
    });
  }

  renderQuestionsFavorites() {
    const {
      match: { params }
    } = this.props;
    return this.state.questionsFavorites.map(question => {
      return (
        <React.Fragment>
          <div
            className="col-md-6 d-flex align-items-center"
            key={question.quickQuestionId}
          >
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
                    <div className="favorite-label d-flex align-items-center justify-content-end ">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/red-heart.png"
                        }
                        height="14"
                        className="mr-1 clickable"
                        onClick={() =>
                          this.toggleFavorite(question.quickQuestionId)
                        }
                        alt="favourite"
                      />
                    </div>
                  </div>
                </React.Fragment>
              </div>
              <Link
                to={
                  question.isAnswered
                    ? `/categories/details/${params.slug}/quick-questions/summary/${question.quickQuestionId}`
                    : `/categories/details/${params.slug}/quick-questions/details/${question.quickQuestionId}`
                }
              >
                <div className="question-body">
                  <div className="row">
                    <div className="col-md-12">
                      {question.description ? (
                        <p className="mid-text light-font-text smaller text-break">
                          {question.description}
                        </p>
                      ) : (
                        <p className="mid-text light-font-text smaller text-break">
                          لا يوجد وصف للسؤال
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </React.Fragment>
      );
    });
  }
  render() {
    return (
      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div
                className={
                  "question-box-layout  text-center" +
                  (!this.state.isJoined ? " bg-white" : "")
                }
              >
                <div className="icon-circle mt-3 mb-3">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                    alt="logo"
                  />
                </div>
                <div className="col-12  align-items-center">
                  <h5 className="dark-text mb-0">{this.state.details.name}</h5>
                </div>
                <div className="col-md-12 mt-2">
                  <h6 className=" ar-text smaller mid-text ">
                    عدد الأعضاء: {this.state.details.numberOfMembers}
                  </h6>
                </div>
                <div className="col-md-12 mt-2 mb-2">
                  {!this.state.isJoined && (
                    <button
                      className="btn btn-lg p-1 w-100 br-20 unset-height small light-btn light-font-text mb-3"
                      onClick={this.toggleJoin}
                    >
                      إنضمام
                    </button>
                  )}
                  {this.state.isJoined && (
                    <button
                      className="btn btn-lg p-1 w-100 br-20 unset-height small red-bg text-white mb-3"
                      onClick={this.toggleJoin}
                    >
                      انسحاب
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-10">
              <div className="col-md-12">
                <h5 className="dark-text mt-2">الأسئلة السريعة</h5>
                <p className="dark-silver-text small text-break mb-2">
                  احصل على آخر إصداراتنا في القدرات والتحصيلي
                </p>
              </div>
              <div className="col-md-12 d-flex align-items-center mb-4">
                <h6 className="dark-text">
                  عدد الأسئلة المتاحة الآن على المجموعة:{" "}
                  <span className="ar-text">
                    {this.state.details.numberOfQuickQuestion}
                  </span>{" "}
                  سؤال
                </h6>
              </div>
              {this.state.isJoined && (
                <React.Fragment>
                  <div className="row ">
                    <div className="col-md-12 d-flex align-items-center">
                      <div className="title-circle">
                        <img
                          height="14"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/empty-heart.png"
                          }
                          alt="favourite"
                        />
                      </div>
                      <div className="ar-text  mb-0 title-groups">
                        <h5 className=" mb-0 pl-5">الأسئلة المفضلة</h5>
                      </div>
                    </div>
                  </div>

                  <div className="row pt-4">
                    {this.state.questionsFavorites === undefined ||
                    this.state.questionsFavorites.length === 0 ? (
                      <div className="col-md-12">
                        <div className="question-card">
                          <div className="question-body">
                            <div className="row">
                              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/assets/images/red-heart.png"
                                  }
                                  height="25"
                                  className="contain-img mb-2"
                                  alt="favourite"
                                />
                                <p className="mid-text light-font-text small text-break mb-0">
                                  لا يوجد لديك أسئلة مفضلة
                                </p>
                                <p className="mid-text light-font-text small text-break mb-0">
                                  قم بإضافة الأسئلة الآن!
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <React.Fragment>
                        {this.renderQuestionsFavorites()}
                      </React.Fragment>
                    )}
                  </div>
                </React.Fragment>
              )}
              {this.state.isJoined && (
                <React.Fragment>
                  <div className="row pt-4">
                    <div className="col-md-12 d-flex align-items-center">
                      <div className="title-circle">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/questionMark.png"
                          }
                          alt="question-mark"
                        />
                      </div>
                      <div
                        className={"ar-text title-groups mb-0" + " light-bg"}
                      >
                        <h5 className=" mb-0 pl-5">جميع الأسئلة</h5>
                      </div>
                    </div>
                  </div>
                  <div className="row pt-4">{this.renderQuestion()}</div>
                  <div className="row">
                    <div className="col-md-12">
                      {!this.state.hideBtn && (
                        <div className="d-flex align-items-center justify-content-center">
                          <button
                            className="btn dark-btn unset-height unset-line-height br-5 mt-3 w-25"
                            onClick={this.loadMore}
                            disabled={this.state.disabled}
                          >
                            {this.state.loading === true ? (
                              <Loader
                                type="ball-beat"
                                className="dark-loader"
                              />
                            ) : (
                              "تحميل المزيد"
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
