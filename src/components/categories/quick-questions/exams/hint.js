import React, { Component } from "react";
import Modal from "react-modal";
import { apiBaseUrl } from "../../../../api/helpers";
import axios from "axios";
import * as Sentry from "@sentry/react";


export class HintModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const attemptId = this.props.attemptId;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    if (nextProps && this.props.id !== nextProps.id && nextProps.id !== null) {
      axios
        .get(`${apiBaseUrl}/CategoryGroupExams/Attempts/${attemptId}/Sheet`, {
          headers,
        })
        .then((response) => {
          let questions = response.data.data.questions;
          let questionId = questions.filter(
            (question) => question.id === nextProps.id
          );
          this.setState({ details: questionId });
        })
        .catch((error) => {
          console.log(error);
        });
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
        zIndex: 20,
      },
    };
    const { isHintOpen, closeHint } = this.props;
    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={isHintOpen}
          onRequestClose={closeHint}
          closeHint={closeHint}
        >
          <div className="container pt-4 pb-3">
            <div className="row">
              <div className="col-md-12 col-12">
                <span className="badge red-bg text-white mb-3 hint-badge">
                  مساعدة
                </span>

                <div className="box-layout p-3">
                  {this.state.details[0] &&
                    this.state.details[0].explanation &&
                    this.state.details[0].explanation.type === "Text" ? (
                      <div
                        className="encoded-text"
                        dangerouslySetInnerHTML={{
                          __html:
                            this.state.details[0] &&
                            this.state.details[0].encodedExplanation,
                        }}
                      ></div>
                    ) : this.state.details[0] &&
                      this.state.details[0].explanation &&
                      this.state.details[0].explanation.type === "Video" ? (
                        <video
                          width="100%"
                          height="240"
                          src={
                            this.state.details[0] &&
                            this.state.details[0].explanation &&
                            this.state.details[0].explanation.value
                          }
                          controls
                          autoPlay
                          onError={(e) => this.onError(e)}
                        ></video>
                      ) : (
                        <p className="dark-text mb-0 text-center">
                          لا يوجد مساعدة متوفرة
                        </p>
                      )}
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <button
                    className="btn light-btn unset-height w-25 mt-4"
                    onClick={closeHint}
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
