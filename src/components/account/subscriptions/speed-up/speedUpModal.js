import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import { Page, pdfjs, Document } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

export class SpeedUpModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      numPages: null,
      pageNumber: 1
    };
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };
  shouldComponentUpdate(nextProps, nextState) {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    if (nextProps && this.props.id !== nextProps.id && nextProps.id !== null) {
      axios
        .get(`${apiBaseUrl}/content/speedups/${nextProps.id}`, { headers })
        .then(response => {
          this.setState({ file: response.data.data });
        })
        .catch(error => {
          console.log(error);
        });
    }
    return true;
  }

  render() {
    const { pageNumber, numPages } = this.state;

    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        height: "auto",
        borderWidth: 0,
        padding: 0
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2
      }
    };
    const {
      isSpeedUpOpen,
      closeSpeedUpModal,
      handleSubmit,
      submitting
    } = this.props;
    const file = this.state.file;
    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={isSpeedUpOpen}
          onRequestClose={closeSpeedUpModal}
          closeRefundModal={closeSpeedUpModal}
        >
          {file.type == "Image" ? (
            <img src={file.url} alt="File" width="100%" height="auto" />
          ) : file.type == "Pdf" ? (
            <React.Fragment>
              <div className="d-flex align-items-center flex-column pt-5 pb-5">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/pdf.png"}
                  alt="File"
                  className="contain-img custom-img mx-auto"
                  height="80"
                />
                <h6 className="light-text mt-3">{file.title}</h6>
                <a
                  className="btn light-btn btn-sm pl-4 pr-4"
                  href={file.url}
                  target="_blank"
                >
                  تحميل
                </a>
              </div>
            </React.Fragment>
          ) : file.type == "Video" ? (
            <ReactPlayer
              url={file.url}
              playing={true}
              controls={true}
              width="100%"
              height="100%"
            />
          ) : (
            <React.Fragment>
              <div className="d-flex align-items-center flex-column pt-5 pb-5">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/file-outline.png"
                  }
                  alt="File"
                  className="contain-img custom-img mx-auto"
                  height="80"
                />
                <h6 className="light-text mt-3">{file.title}</h6>
                <a
                  className="btn light-btn btn-sm pl-4 pr-4"
                  href={file.url}
                  target="_blank"
                >
                  تحميل
                </a>
              </div>
            </React.Fragment>
          )}
        </Modal>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.SpeedUpModal && state.form.SpeedUpModal.values
  };
}

SpeedUpModalComponent = reduxForm({
  form: "SpeedUp"
  // validate
})(SpeedUpModalComponent);

SpeedUpModalComponent = connect(mapStateToProps)(SpeedUpModalComponent);

export const SpeedUpModal = withRouter(SpeedUpModalComponent);
