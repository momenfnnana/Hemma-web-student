import React, { Component } from "react";
import Modal from "react-modal";
import { inputField } from "../../../shared/inputs/inputField";
import { Field, reduxForm, Fields } from "redux-form";
import { apiBaseUrl } from "../../../../api/helpers";
import axios from "axios";
import * as Sentry from "@sentry/react";
import ReactPlayer from "react-player"
export class SolutionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    try {
      const attemptId = this.props.attemptId;
      let token = localStorage.getItem("token");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      if (nextProps && this.props.id !== nextProps.id && nextProps.id !== null) {
        axios
          .get(
            `${apiBaseUrl}/CategoryGroupExams/Attempts/${attemptId}/DetailedScorecard`,
            {
              headers,
            }
          )
          .then((response) => {
            debugger;
            let questions = response.data.data.questions;
            let questionId = questions.filter(
              (question) => question.id === nextProps.id
            );
            console.log("test",questionId);
            this.setState({ details: questionId });
          })
          .catch((error) => {
            
            Sentry.captureException(error);
          });
      }
    } catch (err) {
      Sentry.captureException(err);
    }
    return true;
  }


  onError = (e) => {
    Sentry.captureException('An error occured while playing the video ', e, e.target.error);
  }


  render() {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "40%",
        height: "auto",
        borderWidth: 0,
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2,
        zIndex: 20,
      },
    };
    const { isSolutionOpen, closeSolution } = this.props;

    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={isSolutionOpen}
          onRequestClose={closeSolution}
          closeSolution={closeSolution}
        >
          <div className="container pt-4 pb-3">
            <div className="row">
              <div className="col-md-12 col-12">
                <span className="badge red-bg text-white mb-3 hint-badge">
                  طريقة الحل
                </span>

                <div className="box-layout p-3 d-flex align-items-center">
                  {this.state.details[0] &&
                    this.state.details[0].solutionExplanation &&
                    this.state.details[0].solutionExplanation.type === "Text" ? (
                      <div
                        className="encoded-text"
                        dangerouslySetInnerHTML={{
                          __html:
                            this.state.details[0] &&
                            this.state.details[0].encodedSolutionExplanation,
                        }}
                      ></div>
                    ) : this.state.details[0] &&
                      this.state.details[0].solutionExplanation &&
                      this.state.details[0].solutionExplanation.type ===
                      "Video" ? (
                        <ReactPlayer
                          width="100%"
                          height="240"
                          url={
                            this.state.details[0] &&
                            this.state.details[0].solutionExplanation &&
                            this.state.details[0].solutionExplanation.value
                          }
                          controls="true"
                          playing="true"
                          onError={(e) => this.onError(e)}
                        />
                      ) : this.state.details[0] &&
                        this.state.details[0].solutionExplanation &&
                        this.state.details[0].solutionExplanation.type ===
                        "Image" ? (
                          <image
                            width="100%"
                            height="240"
                            src={
                              this.state.details[0] &&
                              this.state.details[0].solutionExplanation &&
                              this.state.details[0].solutionExplanation.value
                            }
                          ></image>
                        ) : (
                          <p className="dark-text mb-0 text-center">
                           {/* لا يوجد طريقة حل متوفرة*/}
                          </p>
                        )}
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <button
                    className="btn light-btn unset-height w-25 mt-4"
                    onClick={closeSolution}
                  >
                    العودة للسؤال
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
