import React, { Component } from "react";
import { Table, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import classnames from "classnames";
import AddQuestion from "./add-question";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import Loader from "react-loaders";

class AskQuestionsListComponent extends Component {
  page = 1;
  limit = 10;
  AllQuestionsLimit = 10;
  allQuestionPage = 1;
  endOfResults = false;
  endOfAlllQuestionsResults = false;
  state = {
    isِAddQuestionOpen: false,
    allQuestions: [],
    myQuestions: [],
    activeTab: "1",
    hideBtn: false,
    hideAllQuestionsBtn: false,
    disabled: false,
    nextPageUrl: `${apiBaseUrl}/AskQuestions/me?courseId=${this.props.match.params.id}&page=${this.page}&limit=${this.limit}`,
    nextAllQuestionPageUrl: `${apiBaseUrl}/AskQuestions?courseId=${this.props.match.params.id}&page=${this.allQuestionPage}&limit=${this.AllQuestionsLimit}`,
  };
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  openAddQuestionModal = () => {
    this.setState({ isِAddQuestionOpen: true });
  };
  closeAddQuestionModal = () => {
    this.setState({ isِAddQuestionOpen: false });
  };

  toggleModal = () => {
    this.setState({ isِAddQuestionOpen: !this.state.isِAddQuestionOpen });
  };

  componentDidMount() {
    this.loadMore();
    this.loadAllQuestios();
  }

  loadMore = async () => {
    const courseId = this.props.match.params.id;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    this.setState({ loading: true, disabled: true });
    if (!this.endOfResults) {
      axios
        .get(this.state.nextPageUrl, { headers })
        .then((response) => {
          this.setState({ loading: false, disabled: false });
          const myquestions = [
            ...this.state.myQuestions,
            ...response.data.data.data,
          ];
          this.endOfResults = response.data.data.data.itemCount < this.limit;
          this.page++;
          const nextUrl = `${apiBaseUrl}/AskQuestions/me?courseId=${courseId}&page=${this.page}&limit=${this.limit}`;
          this.setState({
            myQuestions: myquestions,
            nextPageUrl: nextUrl,
          });
          if (myquestions.length == response.data.data.itemCount) {
            this.setState({ hideBtn: true });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ loading: false, disabled: false });
        });
    }
  };

  loadAllQuestios() {
    const courseId = this.props.match.params.id;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${apiBaseUrl}/AskQuestions?courseId=${courseId}`, { headers })
      .then((response) => {
        this.setState({ allQuestions: response.data.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
    // const courseId = this.props.match.params.id;
    // let token = localStorage.getItem("token");
    // let headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    // this.setState({ loading: true, disabled: true });
    // if (!this.endOfAlllQuestionsResults) {
    //   axios
    //     .get(this.state.nextAllQuestionPageUrl, { headers })
    //     .then((response) => {
    //       console.log("response =>", response);
    //       // this.setState({ loading: false, disabled: false });
    //       const Questions = [
    //         ...this.state.allQuestions,
    //         ...response.data.data.data,
    //       ];
    //       this.endOfAlllQuestionsResults =
    //         response.data.data.data.itemCount < this.limit;
    //       this.allQuestionPage++;
    //       const nextUrl = `${apiBaseUrl}/AskQuestions?courseId=${courseId}&page=${this.allQuestionPage}&limit=${this.AllQuestionsLimit}`;
    //       this.setState({
    //         myQuestions: Questions,
    //         nextPageUrl: nextUrl,
    //       });
    //       if (Questions.length == response.data.data.itemCount) {
    //         this.setState({ hideAllQuestionsBtn: true });
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       // this.setState({ loading: false, disabled: false });
    //     });
    // }
  }

  renderMyQuestions() {
    const myQuestions = this.state.myQuestions;
    if (myQuestions) {
      return myQuestions.map((myQuestion) => {
        return (
          <>
            <tr className="text-center">
              <td className="ar-text dark-silver-text small">
                {myQuestion.type == "Image" ? (
                  <img
                    src={myQuestion.content}
                    width="100"
                    className="contain-img"
                  />
                ) : (
                  <span className="ar-text">{myQuestion.content}</span>
                )}
              </td>
              <td className="dark-silver-text small">
                <span className="ar-text">
                  {myQuestion.isAnswered === true
                    ? "تمت الاجابة"
                    : "قيد المراجعة"}
                </span>
              </td>
              <td className="light-font-text dark-silver-text small">
                <Link
                  className="btn dark-outline-btn w-50"
                  to={`/course/content/askQuestions/details/${myQuestion.id}`}
                >
                  تفاصيل
                </Link>
              </td>
            </tr>
          </>
        );
      });
    }
  }

  renderAllQuestions() {
    const allQuestions = this.state.allQuestions;
    if (allQuestions) {
      return allQuestions.map((allQuestion) => {
        return (
          <tr className="text-center">
            <td className="en-text dark-silver-text small">
              {allQuestion.type == "Image" ? (
                <img
                  src={allQuestion.content}
                  width="100"
                  className="contain-img"
                />
              ) : (
                <span className="ar-text">{allQuestion.content}</span>
              )}
            </td>
            <td className="dark-silver-text small">
              <span className="ar-text">
                {allQuestion.isAnswered === true
                  ? "تمت الاجابة"
                  : "قيد المراجعة"}
              </span>
            </td>
            <td className="light-font-text dark-silver-text small">
              <Link
                className="btn dark-outline-btn w-50"
                to={`/course/content/askQuestions/details/${allQuestion.id}`}
              >
                تفاصيل
              </Link>
            </td>
          </tr>
        );
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="container pb-5">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={`${classnames({
                  active: this.state.activeTab === "1",
                })} ${"clickable"}`}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                <h6 className="dark-text small mb-0 mt-0">اسئلتي </h6>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`${classnames({
                  active: this.state.activeTab === "2",
                })} ${"clickable"}`}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                <h6 className="dark-text small mb-0 mt-0">جميع الأسئلة </h6>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="clickable" onClick={() => this.toggleModal}>
                <h6 className="dark-text small" onClick={this.toggleModal}>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/question.png"}
                    height="20"
                    width="20"
                    className="mr-2 contain-img"
                  />
                  اضافة سؤال
                </h6>
                <AddQuestion
                  toggleModal={this.toggleModal}
                  isِAddQuestionOpen={this.state.isِAddQuestionOpen}
                />
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              {this.state.activeTab == 1 ? (
                <div className="row no-gutters">
                  {this.state.myQuestions &&
                  this.state.myQuestions.length !== 0 ? (
                    <div className="col-12">
                      <div className="box-layout shadow-sm">
                        <Table className="mb-0">
                          <thead className="silver-bg">
                            <tr className="text-center">
                              <th className="w-25 dark-silver-text small border-0">
                                السؤال
                              </th>
                              <th className="w-25 dark-silver-text small border-0">
                                الحالة
                              </th>
                              <th className="w-25 dark-silver-text small border-0">
                                التفاصيل
                              </th>
                            </tr>
                          </thead>
                          <tbody>{this.renderMyQuestions()}</tbody>
                        </Table>
                        {!this.state.hideBtn && (
                          <div className="col-12 d-flex  justify-content-center">
                            <button
                              className="btn dark-btn unset-height unset-line-height br-5 mt-3 w-25 mb-3"
                              onClick={this.loadMore}
                              disabled={false}
                            >
                              {this.state.loading == true ? (
                                <Loader
                                  type="ball-beat"
                                  className="dark-loader"
                                />
                              ) : (
                                "تحميل المزيد"
                              )}{" "}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <React.Fragment>
                      <div className="col-12">
                        <div
                          className="d-flex flex-column align-items-center justify-content-center shadow-sm silver-bg"
                          style={{ height: 80, background: "#F2F2F2" }}
                        >
                          <h5 className="dark-silver-text mt-0">
                            لم تقم باضافة اسئله
                          </h5>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              ) : null}
            </TabPane>
            <TabPane tabId="2">
              {this.state.activeTab == 2 ? (
                <div className="row no-gutters">
                  {this.state.allQuestions &&
                  this.state.allQuestions.length !== 0 ? (
                    <div className="col-12">
                      <div className="box-layout shadow-sm">
                        <Table className="mb-0">
                          <thead className="silver-bg">
                            <tr className="text-center">
                              <th className="w-25 dark-silver-text small border-0">
                                السؤال
                              </th>
                              <th className="w-25 dark-silver-text small border-0">
                                الحالة
                              </th>
                              <th className="w-25 dark-silver-text small border-0">
                                التفاصيل
                              </th>
                            </tr>
                          </thead>
                          <tbody>{this.renderAllQuestions()}</tbody>
                        </Table>
                        {/* {!this.state.hideBtn && ( */}
                        <div className="col-12 d-flex  justify-content-center">
                          <button
                            className="btn dark-btn unset-height unset-line-height br-5 mt-3 w-25 mb-3"
                            onClick={this.loadMore}
                            disabled={false}
                          >
                            {this.state.loading == true ? (
                              <Loader
                                type="ball-beat"
                                className="dark-loader"
                              />
                            ) : (
                              "تحميل المزيد"
                            )}{" "}
                          </button>
                        </div>
                        {/* )} */}
                      </div>
                    </div>
                  ) : (
                    <React.Fragment>
                      <div className="col-12">
                        <div
                          className="d-flex flex-column align-items-center justify-content-center shadow-sm silver-bg"
                          style={{ height: 80, background: "#F2F2F2" }}
                        >
                          <h5 className="dark-silver-text mt-0">
                            لا يوجد أسئلة
                          </h5>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              ) : null}
            </TabPane>
          </TabContent>
        </div>
      </React.Fragment>
    );
  }
}
export const AskQuestionsList = withRouter(AskQuestionsListComponent);
