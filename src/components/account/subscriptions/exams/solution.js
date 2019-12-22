import React, { Component } from "react";
import Modal from "react-modal";
import { inputField } from "../../../shared/inputs/inputField";
import { Field, reduxForm, Fields } from "redux-form";
import { apiBaseUrl } from "../../../../api/helpers";
import axios from "axios";

export class SolutionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: []
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const attemptId = this.props.attemptId;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    if (nextProps && this.props.id !== nextProps.id && nextProps.id !== null) {
      axios
        .get(`${apiBaseUrl}/Exams/Attempts/${attemptId}/DetailedScorecard`, {
          headers
        })
        .then(response => {
          let questions = response.data.data.questions;
          let questionId = questions.filter(
            question => question.id == nextProps.id
          );
          this.setState({ details: questionId });
        })
        .catch(error => {
          console.log(error);
        });
    }
    return true;
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
        borderWidth: 0
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2,
        zIndex: 20
      }
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
                  مساعدة
                </span>

                <div className="box-layout p-3">
                  <img
                    src={
                      this.state.details[0] &&
                      this.state.details[0].solutionExplanation &&
                      this.state.details[0].solutionExplanation.renderedValue
                    }
                    width="30%"
                    height="80"
                    className="contain-img"
                  />
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
