import React, { Component } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Page, pdfjs, Document } from "react-pdf";
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
        .get(`https://api.staging.hemma.sa/api/v1/publications/${nextProps.id}`)
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
                <h6 className="light-text">تفاصيل الكتاب</h6>
                <h5 className="dark-text">{this.state.publication.nameAr}</h5>
                <ul className="mb-2 mt-2 list-unstyled">
                  <li className="small light-font-text mb-0">
                    <span className="mid-text">المؤلف: </span>
                    {this.state.publication.publisherNameAr}
                  </li>
                  <li className="small light-font-text mb-0">
                    <span className="mid-text">عدد الصفحات: </span>
                    <span>{this.state.publication.pageCount} صفحة</span>
                  </li>
                  <li className="small light-font-text mb-0">
                    <span className="mid-text">السعر: </span>
                    {this.state.publication.price} ريال
                  </li>
                </ul>
                <p className="light-font-text small mb-5">
                  {this.state.publication.descriptionAr}
                </p>
                <button className="btn light-outline-btn w-50">
                  شراء الكتاب
                </button>
              </div>
              <div className="col-6">
                <Document
                  file={this.state.publication.previewUrl}
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
