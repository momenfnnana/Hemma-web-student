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
  endOfAllQuestionsResults = false;
  state = {
    isAddQuestionOpen: false,
    allQuestions: [],
    myQuestions: [],
    activeTab: "userQuestions",
    hideBtn: false,
    hideAllQuestionsBtn: false,
    disabled: false,
    nextPageUrl: `${apiBaseUrl}/AskQuestions/me?courseId=${this.props.match.params.id}&page=${this.page}&limit=${this.limit}`,
    nextAllQuestionPageUrl: `${apiBaseUrl}/AskQuestions?courseId=${this.props.match.params.id}&page=${this.allQuestionPage}&limit=${this.AllQuestionsLimit}`
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  toggleModal = () => {
    this.setState({ isAddQuestionOpen: !this.state.isAddQuestionOpen });
  };

  componentDidMount() {
    this.loadMore();
    this.loadAllQuestions();
  }

  loadMore = async () => {
    const courseId = this.props.match.params.id;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    this.setState({ loading: true, disabled: true });
    if (!this.endOfResults) {
      axios
        .get(this.state.nextPageUrl, { headers })
        .then(response => {
          this.setState({ loading: false, disabled: false });
          const paginationMyQuestions = [
            ...this.state.myQuestions,
            ...response.data.data.data
          ];
          this.endOfResults = response.data.data.data.itemCount < this.limit;
          this.page++;
          const nextUrl = `${apiBaseUrl}/AskQuestions/me?courseId=${courseId}&page=${this.page}&limit=${this.limit}`;
          this.setState({
            myQuestions: paginationMyQuestions,
            nextPageUrl: nextUrl
          });
          if (paginationMyQuestions.length === response.data.data.itemCount) {
            this.setState({ hideBtn: true });
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading: false, disabled: false });
        });
    }
  };

  loadAllQuestions = async () => {
    const courseId = this.props.match.params.id;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    this.setState({ loading: true, disabled: true });
    if (!this.endOfAllQuestionsResults) {
      axios
        .get(this.state.nextAllQuestionPageUrl, { headers })
        .then(response => {
          this.setState({ loading: false, disabled: false });
          const pagenationAllQuestions = [
            ...this.state.allQuestions,
            ...response.data.data.data
          ];
          this.endOfAllQuestionsResults =
            response.data.data.data.itemCount < this.limit;
          this.allQuestionPage++;
          const nextUrl = `${apiBaseUrl}/AskQuestions?courseId=${courseId}&page=${this.allQuestionPage}&limit=${this.AllQuestionsLimit}`;
          this.setState({
            allQuestions: pagenationAllQuestions,
            nextAllQuestionPageUrl: nextUrl
          });
          if (pagenationAllQuestions.length === response.data.data.itemCount) {
            this.setState({ hideAllQuestionsBtn: true });
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading: false, disabled: false });
        });
    }
  };

  renderMyQuestions() {
    const myQuestions = this.state.myQuestions;
    if (myQuestions) {
      return myQuestions.map((myQuestion, index) => {
        return (
          <>
            <tr className="text-center" key={index}>
              <td className="ar-text dark-silver-text small">
                {myQuestion.type === "Image" ? (
                  <img
                    src={myQuestion.content}
                    width="100"
                    className="contain-img"
                    alt="question"
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
              <td>
                <Link
                  className="btn light-btn unset-height unset-line-height w-50"
                  to={`/course/content/${this.props.match.params.id}/askQuestions/details/${myQuestion.id}`}
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
      return allQuestions.map((allQuestion, index) => {
        return (
          <tr className="text-center" key={index}>
            <td className="en-text dark-silver-text small">
              {allQuestion.type === "Image" ? (
                <img
                  src={allQuestion.content}
                  width="100"
                  className="contain-img"
                  alt="question"
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
            <td>
              <Link
                className="btn light-btn unset-height unset-line-height w-50"
                to={`/course/content/${this.props.match.params.id}/askQuestions/details/${allQuestion.id}`}
              >
                تفاصيل
              </Link>
            </td>
          </tr>
        );
      });
    }
  }

  updateQuestionsList = newQuestion => {
    this.setState({ myQuestions: [newQuestion, ...this.state.myQuestions] });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container pb-5">
          <div className="row">
            <div className="col-md-6">
              <Nav tabs className="border-bottom-0">
                <NavItem>
                  <NavLink
                    className={`${classnames({
                      active: this.state.activeTab === "userQuestions"
                    })} ${"clickable"}`}
                    onClick={() => {
                      this.toggle("userQuestions");
                    }}
                  >
                    <h6 className="dark-text small mb-0 mt-0">اسئلتي </h6>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={`${classnames({
                      active: this.state.activeTab === "allQuestions"
                    })} ${"clickable"}`}
                    onClick={() => {
                      this.toggle("allQuestions");
                    }}
                  >
                    <h6 className="dark-text small mb-0 mt-0">جميع الأسئلة </h6>
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <button
                className="btn border mid-text smaller"
                onClick={this.toggleModal}
              >
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/ask-question.png"
                  }
                  height="20"
                  width="20"
                  className="mr-2 contain-img"
                  alt="ask-question"
                />
                اضافة سؤال
              </button>
              <AddQuestion
                toggleModal={this.toggleModal}
                isAddQuestionOpen={this.state.isAddQuestionOpen}
                updateQuestions={this.updateQuestionsList}
              />
            </div>
          </div>
          <TabContent className="pt-3" activeTab={this.state.activeTab}>
            <TabPane tabId="userQuestions">
              <div className="row no-gutters">
                {this.state.myQuestions && this.state.myQuestions.length > 0 ? (
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
                              تحكم
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
                            {this.state.loading === true ? (
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
                    <div
                      className="silver-bg box-layout shadow-sm d-flex flex-column w-100 rounded p-4 justify-content-center align-items-center mb-3"
                      style={{ height: 300 }}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/no-questions.png"
                        }
                        height="80"
                        className="contain-img mb-3"
                        alt="questions"
                      />
                      <h5 className="dark-silver-text mt-0">
                        لا يوجد أسئلة مضافة
                      </h5>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </TabPane>
            <TabPane tabId="allQuestions">
              <div className="row no-gutters">
                {this.state.allQuestions &&
                this.state.allQuestions.length > 0 ? (
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
                      {!this.state.hideAllQuestionsBtn && (
                        <div className="col-12 d-flex  justify-content-center">
                          <button
                            className="btn dark-btn unset-height unset-line-height br-5 mt-3 w-25 mb-3"
                            onClick={this.loadAllQuestions}
                            disabled={false}
                          >
                            {this.state.loading === true ? (
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
                    <div
                      className="silver-bg box-layout shadow-sm d-flex flex-column w-100 rounded p-4 justify-content-center align-items-center mb-3"
                      style={{ height: 300 }}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/no-questions.png"
                        }
                        height="80"
                        className="contain-img mb-3"
                        alt="questions"
                      />
                      <h5 className="dark-silver-text mt-0">
                        لا يوجد أسئلة مضافة
                      </h5>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </TabPane>
          </TabContent>
        </div>
      </React.Fragment>
    );
  }
}
export const AskQuestionsList = withRouter(AskQuestionsListComponent);