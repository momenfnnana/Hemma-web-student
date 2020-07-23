import React, { Component } from "react";
import { Table, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import classnames from "classnames";
import AddQuestion from "./add-question";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";

class AskQuestionsListComponent extends Component {
  state = {
    isِAddQuestionOpen: false,
    allQuestions: [],
    activeTab: "1",
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
    const courseId = this.props.match.params.id;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${apiBaseUrl}/AskQuestions/me?courseId=${courseId}`, { headers })
      .then((response) => {
        this.setState({ myQuestions: response.data.data.data });
        console.log(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${apiBaseUrl}/AskQuestions?courseId=${courseId}`, { headers })
      .then((response) => {
        this.setState({ allQuestions: response.data.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderMyQuestions() {
    const myQuestions = this.state.myQuestions;
    if (myQuestions) {
      return myQuestions.map((myQuestion) => {
        return (
          <>
            <tr className="text-center">
              <td className="ar-text dark-silver-text small">
                <span className="ar-text">{myQuestion.content}</span>
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
                  to="/course/content/askQuestions/details"
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
              <span className="ar-text">{allQuestion.content}</span>
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
                to="/course/content/askQuestions/details"
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
                  {!this.state.myQuestions == 0 ? (
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
                  {!this.state.allQuestions.length == 0 ? (
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
