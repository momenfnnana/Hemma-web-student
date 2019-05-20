import React, { Component } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Page, pdfjs, Document } from "react-pdf";
import "./styles.sass";
import { apiBaseUrl } from "../../api/helpers";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

export class PublicationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publication: {},
      numPages: null,
      pageNumber: 1
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps && this.props.id !== nextProps.id && nextProps.id !== null) {
      axios
        .get(`${apiBaseUrl}/publications/${nextProps.id}`)
        .then(response => {
          this.setState({ publication: response.data.data });
        })
        .catch(error => {
          console.log(error);
        });
    }
    return true;
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

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
        height: "50%",
        borderWidth: 0
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2
      }
    };

    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.onClose}
        >
          {/* <button onClick={this.props.onClose}>close</button> */}
          <div className="container pt-3">
            <div className="row">
              <div className="col-6">
                <h5 className="dark-text small">
                  {this.state.publication.nameAr}
                </h5>
                <div className="d-flex flex-row">
                  <h5 className="dark-text small"> السعر: </h5>
                  <h5 className="mid-text small">
                    <span className="en-text mid-text">
                      {this.state.publication.price}
                    </span>{" "}
                    ريال
                  </h5>
                </div>
              </div>
              <div className="col-6">
                <button
                  onClick={() =>
                    window.open(
                      `${this.state.publication.purchaseUrl}`,
                      "_blank"
                    )
                  }
                  className="btn light-outline-btn w-50 float-right"
                >
                  شراء الكتاب
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Document
                  file="https://hemma.ams3.cdn.digitaloceanspaces.com/pdf/demo.pdf"
                  onLoadSuccess={this.onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} />
                </Document>
              </div>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
