import React, { Component } from "react";
import { Table, TabContent, TabPane, Nav, NavItem,  } from "reactstrap";
import { withRouter, Link, NavLink, Route } from "react-router-dom";
import classnames from "classnames";
import AddQuestion from "./add-question";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import Loader from "react-loaders";
import { AskQuestionDetails } from "./question-details";
import { connect } from "react-redux";
import SwitchRender from "../../../../HOC/SwitchRender";
import { Tooltip } from "reactstrap";
import "./index.scss"
class AskQuestionsListComponent extends Component {
  page = 1;
  limit = 10;
  AllQuestionsLimit = 10;
  allQuestionPage = 1;
  endOfResults = false;
  endOfAllQuestionsResults = false;
  constructor(props) {
    super(props)
    this.courseId = this.props.match.params.id;
  }
  state = {
    showTable: true,
    isAddQuestionOpen: false,
    allQuestions: [],
    myQuestions: [],
    activeTab: "userQuestions",
    hideBtn: false,
    hideAllQuestionsBtn: false,
    disabled: false,
    nextPageUrl: `${apiBaseUrl}/AskQuestions/me?courseId=${this.props.match.params.id}&page=${this.page}&limit=${this.limit}`,
    nextAllQuestionPageUrl: `${apiBaseUrl}/AskQuestions?courseId=${this.props.match.params.id}&page=${this.allQuestionPage}&limit=${this.AllQuestionsLimit}`,
  };

  // Start handle operations for multiple Tooltips
  toggleTooltip = targetName => {
    if (!this.state[targetName]) {
      this.setState({
        ...this.state,
        [targetName]: {
          tooltipOpen: true
        }
      });
    } else {
      this.setState({
        ...this.state,
        [targetName]: {
          tooltipOpen: !this.state[targetName].tooltipOpen
        }
      });
    }
  };

  isToolTipOpen = targetName => {
    return this.state[targetName] ? this.state[targetName].tooltipOpen : false;
  };
  // Start handle operations for multiple Tooltips


  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  hideTable = (id) => {
    this.setState({ showTable: false, qstId: id });
  };

  showTable = () => {
    this.setState({ showTable: true });
  };

  toggleModal = () => {
    this.setState({ isAddQuestionOpen: !this.state.isAddQuestionOpen });
    this.showTable();
  };

  componentDidMount() {
    this.loadMore();
    this.loadAllQuestions();
    if(!this.props.match.params.questionsType)
    this.props.history.push(`/course/content/${this.courseId}/askQuestions/list/myQuestions`)
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
          const paginationMyQuestions = [
            ...this.state.myQuestions,
            ...response.data.data.data,
          ];
          this.endOfResults = response.data.data.data.itemCount < this.limit;
          this.page++;
          const nextUrl = `${apiBaseUrl}/AskQuestions/me?courseId=${courseId}&page=${this.page}&limit=${this.limit}`;
          this.setState({
            myQuestions: paginationMyQuestions,
            nextPageUrl: nextUrl,
          });
          if (paginationMyQuestions.length === response.data.data.itemCount) {
            this.setState({ hideBtn: true });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ loading: false, disabled: false });
        });
    }
  };

  loadAllQuestions = async () => {
    const courseId = this.props.match.params.id;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    this.setState({ loading: true, disabled: true });
    if (!this.endOfAllQuestionsResults) {
      axios
        .get(this.state.nextAllQuestionPageUrl, { headers })
        .then((response) => {
          this.setState({ loading: false, disabled: false });
          const pagenationAllQuestions = [
            ...this.state.allQuestions,
            ...response.data.data.data,
          ];
          this.endOfAllQuestionsResults =
            response.data.data.data.itemCount < this.limit;
          this.allQuestionPage++;
          const nextUrl = `${apiBaseUrl}/AskQuestions?courseId=${courseId}&page=${this.allQuestionPage}&limit=${this.AllQuestionsLimit}`;
          this.setState({
            allQuestions: pagenationAllQuestions,
            nextAllQuestionPageUrl: nextUrl,
          });
          if (pagenationAllQuestions.length === response.data.data.itemCount) {
            this.setState({ hideAllQuestionsBtn: true });
          }
        })
        .catch((error) => {
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
              { myQuestion.type === "Both"? 
                  <div className="d-flex flex-column align-items-center" id={`question-text-${index}`}>
                    <img
                      src={myQuestion.imageUrl}
                      width="100"
                      className="contain-img  mb-2"
                      alt="question"
                    />
                    <span className="ar-text" >
                      {myQuestion.content && myQuestion.content.length > 30 ?
                       myQuestion.content.slice(0, 30).concat("..."): 
                       myQuestion.content 
                      }
                    </span>
                    <Tooltip
                      isOpen={this.isToolTipOpen(`question-text-${index}`)}
                      target={`question-text-${index}`}
                      toggle={() => this.toggleTooltip(`question-text-${index}`)}
                      style={{
                        backgroundColor: "#2bc3cc",
                        color: "#4b3a85"
                      }}
                      placement="top"
                    >
                      <p className="light-font-text small mb-1 mt-2 text-break">
                        {myQuestion.content}
                      </p>
                    </Tooltip>
                  </div>:
                  myQuestion.type === "Image" ?
                  <img
                  src={myQuestion.imageUrl}
                    width="100"
                    className="contain-img"
                    alt="question"
                  />: 
                  <>
                    <span className="ar-text" id={`question-text-${index}`}>
                      {myQuestion.content && myQuestion.content.length > 30?
                      myQuestion.content.slice(0, 30).concat("..."):
                      myQuestion.content
                      }
                    </span>
                    <Tooltip
                      isOpen={this.isToolTipOpen(`question-text-${index}`)}
                      target={`question-text-${index}`}
                      toggle={() => this.toggleTooltip(`question-text-${index}`)}
                      style={{
                        backgroundColor: "#2bc3cc",
                        color: "#4b3a85"
                      }}
                      placement="bottom"
                    >
                      <p className="light-font-text small mb-1 mt-2 text-break">
                        {myQuestion.content}
                      </p>
                    </Tooltip>
                  </>
                  
                }

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
                  التفاصيل
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

  updateQuestionsList = (newQuestion) => {
    this.setState({ myQuestions: [newQuestion, ...this.state.myQuestions] });
  };

  render() {
    const hasAskQuestion =
      this.props.subscription &&
      this.props.subscription.subscription.hasAskQuestion;
    return (
      <React.Fragment>
        <div className="container pb-5">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center">
              <Nav tabs className="border-bottom-0">
                <NavItem>
                  <NavLink
                   
                    to={`/course/content/${this.courseId}/askQuestions/list/myQuestions`}
                    // className={`${classnames({
                    //   active: this.state.activeTab === "userQuestions",
                    // })} ${"clickable"}`}
                    onClick={() => {
                      this.showTable();
                      this.toggle("userQuestions");
                    }}
                  >
                    <h6 className="dark-text small mb-0 mt-0">اسئلتي </h6>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to={`/course/content/${this.courseId}/askQuestions/list/allQeustions`}
                    className={`${classnames({
                      active: this.state.activeTab === "allQuestions",
                    })} ${"clickable"}`}
                    onClick={() => {
                      this.showTable();
                      this.toggle("allQuestions");
                    }}
                  >
                    <h6 className="dark-text small mb-0 mt-0">جميع الأسئلة </h6>
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            {hasAskQuestion ? (
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
                {this.state.isAddQuestionOpen && (
                  <AddQuestion
                    toggleModal={this.toggleModal}
                    isAddQuestionOpen={this.state.isAddQuestionOpen}
                    updateQuestions={this.updateQuestionsList}
                  />
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
          <SwitchRender
            path={this.props.location.pathname}
            className="pt-3"
            activeTab={this.state.activeTab}
          >
            <SwitchRender.Route
              routePath={`/course/content/${this.courseId}/askQuestions/list/myQuestions`}
              exact
              tabId="userQuestions"
            >
              <>
                {this.state.showTable ? (
                  <div className="row no-gutters">
                    {this.state.myQuestions &&
                    this.state.myQuestions.length > 0 ? (
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
                ) : (
                  <AskQuestionDetails id={this.state.qstId} />
                )}
              </>
            </SwitchRender.Route>
            <SwitchRender.Route
              routePath={`/course/content/${this.courseId}/askQuestions/list/allQeustions`}
              exact
              tabId="userQuestions"
            >
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
            </SwitchRender.Route>
          </SwitchRender>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    subscription: state.subscription,
  };
}

AskQuestionsListComponent = connect(
  mapStateToProps,
  {}
)(AskQuestionsListComponent);

export const AskQuestionsList = withRouter(AskQuestionsListComponent);
