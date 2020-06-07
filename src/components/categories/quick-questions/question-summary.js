import React, { Component } from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { apiBaseUrl } from "../../../api/helpers";
import axios from "axios";
import { CommentsList } from "./comments/comments-list";
import { Link } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {ToastsContainerPosition,ToastsContainer, ToastsStore} from 'react-toasts';

export class QuestionSummary extends Component {
  state = {
    details: [],
    value: window.location.href,
    copied: false,
  };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(
        `${apiBaseUrl}/QuickQuestionAnswers?quickQuestionId=${params.questionId}`,
        {
          headers
        }
      )
      .then(response => {
        this.setState({ details: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const question =
      this.state.details &&
      this.state.details.quickQuestion &&
      this.state.details.quickQuestion.mcq;
    const rateChoices = this.state.details && this.state.details.rateChoices;
    const {
      match: { params }
    } = this.props;
    return (
      <React.Fragment>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h5 className="dark-text mt-3">الأسئلة السريعة</h5>
                <p className="dark-text mt-2 small text-break">
                  لا تفوت فرصة الاشتراك بأحدث دوراتنا التي تؤهلك لاجتياز امتحان
                  القدرات والتحصيلي بأعلى العلامات!
                </p>
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-end">
              <CopyToClipboard text={this.state.value}
                  onCopy={() => ToastsStore.info("تم النسخ")}
                  > 
                        <button
                  type="button"
                    className="btn btn-xs unset-height small light-btn light-font-text mr-2"
                
                  >
                    مشاركة السؤال
                </button> 
                 </CopyToClipboard> 
            
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_LEFT}/>
                <Link
                  to={`/categories/details/${params.slug}/quick-questions/${this.state.details.categoryGroupId}`}
                  className="btn btn-sm unset-height small light-btn light-font-text"
                >
                  العودة إلى المجموعة
                </Link>
                <Link
                  to="/"
                  className="btn btn-sm unset-height small red-outline-btn light-font-text ml-2"
                >
                  العودة إلى الرئيسية
                </Link>

              </div>
            </div>
            {question && rateChoices && (
              <React.Fragment>
                <div className="row pb-2">
                  <div className="col-12">
                    <p className="mid-text light-font-text small text-break w-50 mb-0">
                      {this.state.details.description}
                    </p>
                  </div>
                </div>
                <div className="row pb-4">
                  <div className="col-12">
                    <div className="box-layout box-border shadow-sm p-3">
                      <img
                        src={question.renderedStem}
                        className="contain-img"
                        width="90%"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-7">
                    <div className="row d-flex justify-content-between align-items-center mb-3">
                      <div className="col-md-12">
                        <p className="small dark-silver-text mb-0">
                          ملخص الإجابات
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        {Object.keys(rateChoices).map((item, i) => (
                          <div
                            className="en-text d-flex align-items-center mb-2"
                            key={i}
                          >
                            <div
                              className={`key-circle ar-text ${
                                this.state.details.correctChoice == item
                                  ? "success"
                                  : "failure"
                              }`}
                            >
                              {item == "a"
                                ? "أ"
                                : item == "b"
                                ? "ب"
                                : item == "c"
                                ? "ج"
                                : item == "d"
                                ? "د"
                                : null}
                            </div>
                            <div className="w-75">
                              <Progress
                                percent={parseInt(rateChoices[item].rate * 100)}
                                status={
                                  this.state.details.correctChoice == item
                                    ? "success"
                                    : "error"
                                }
                                theme={{
                                  error: {
                                    symbol:
                                      parseInt(rateChoices[item].rate * 100) +
                                      "%",
                                    color: "#f66271"
                                  },
                                  success: {
                                    symbol:
                                      parseInt(rateChoices[item].rate * 100) +
                                      "%",
                                    color: "#2bc3cc"
                                  }
                                }}
                              />
                            </div>
                            {this.state.details.selectedChoice == item && (
                              <p className="ar-text mb-0 text-break small dark-text ml-1">
                                إجابتك
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-1" />
                  <div className="col-4 d-flex align-items-center">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/graph.png"}
                      className="contain-img w-100"
                    />
                  </div>
                </div>
              </React.Fragment>
            )}
            <div className="row">
              <div className="col-md-12">
                <hr />
              </div>
            </div>
            <div className="row">
              <CommentsList quickQuestionId={params.questionId} />
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
