import React, { Component } from "react";
import Modal from "react-modal";
import { inputField } from "../../../shared/inputs/inputField";
import { Field, reduxForm, Fields } from "redux-form";

export class HintModal extends Component {
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
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/graph.png"}
                    height="180"
                    width="100%"
                    className="contain-img"
                  />
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
