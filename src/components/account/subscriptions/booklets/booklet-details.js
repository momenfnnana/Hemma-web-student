import React, { Component } from "react";
import { getUser } from "../../../../actions/user.actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../styles.sass";
import { Page, pdfjs } from 'react-pdf';
import { Document } from 'react-pdf/dist/entry.webpack';
import ReactToPrint from "react-to-print";
pdfjs.GlobalWorkerOptions.workerSrc =
  "//mozilla.github.io/pdf.js/build/pdf.worker.js";


export class BookletDetailsComponent extends Component {
  state = {
    numPages: null,
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  downloadPdf = () => {
    fetch(this.props.location.state.url, {
      method: "GET",
      headers: {
        Accept: "application/pdf",
        "Content-Type": "application/pdf"
      }
    })
      .then(response => response.blob())
      .then(response => {
        var blob = response;
        var reader = new window.FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          var base64data = reader.result;
          window.open(base64data);
        };
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    const url = this.props.location.state.url;
    const name = this.props.location.state.name;
    const user = this.props && this.props.user;
    const options = {
      chunkWidth: 150,
      chunkHeight: 60,
      textAlign: 'left',
      textBaseline: 'bottom',
      globalAlpha: 0.20,
      font: '14px Microsoft Yahei',
      rotateAngle: -0.26,
      fillStyle: '#666'
    }
    const { numPages } = this.state;
    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="dark-text small mb-0 mt-0">{name}</h6>
            </div>
          </div>
          <div className="col-12">
            <div className="box-layout shadow-sm w-100 gray-box-border scrollable-box">
              <div className="pdf-wrapper d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <ReactToPrint
                    trigger={() => (
                      <div className="white-border bg-transparent rounded d-flex align-items-center justify-content-center p-1 clickable ml-3">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/printer.png"
                          }
                          height="25"
                          className="contain-img clickable"
                        />
                      </div>
                    )}
                    content={() => this.componentRef}
                  />
                </div>
              </div>
              <div className="m-4">
                <Document
                  file={`${url}`}
                  onLoadSuccess={this.onDocumentLoadSuccess}
                  ref={el => (this.componentRef = el)}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <React.Fragment>
                      <Page key={`page_${index + 1}`} pageNumber={index + 1}>
                        <div className="watermark w-100 d-flex align-items-center justify-content-between">
                          <h6 className="mb-0">{user && user.name}</h6>

                          <h6 className="en-text mb-0">
                            0{user && user.phoneNumber}
                          </h6>
                        </div>
                      </Page>
                    </React.Fragment>
                  ))}
                </Document>
              </div>
            </div>
          </div></div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user
  };
}

BookletDetailsComponent = connect(
  mapStateToProps,
  { getUser }
)(BookletDetailsComponent);

export const BookletDetails = withRouter(BookletDetailsComponent);
