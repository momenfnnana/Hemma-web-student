import React, { Component } from "react";
import "./styles.sass";
import { Tooltip } from "reactstrap";
import ReactToPrint from "react-to-print";
import { Page, pdfjs, Document } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

export class Booklet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      tooltipOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };
  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12 mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="dark-text small mb-0 mt-0">الملزمة</h6>
              <div>
                <button
                  type="submit"
                  className="btn blue-border-btn mr-2"
                  id="booklet-tooltip"
                >
                  طلب الملزمة مطبوعة
                </button>
                <ReactToPrint
                  trigger={() => (
                    <button className="btn blue-border-btn">
                      طباعة الملزمة
                    </button>
                  )}
                  content={() => this.componentRef}
                />

                <Tooltip
                  placement="top"
                  isOpen={this.state.tooltipOpen}
                  target="booklet-tooltip"
                  toggle={this.toggle}
                  style={{
                    backgroundColor: "#f2fdfe",
                    color: "#4b3a85"
                  }}
                >
                  <p className="light-font-text small mb-1 mt-2">
                    لا يمكنك شراء الملزمة دون تسديد كامل الأقساط
                  </p>
                  <p className="small light-font-text mb-2 d-inline-flex align-items-center">
                    <u> اكمل سداد الأقساط</u>
                  </p>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="box-layout shadow-sm d-flex flex-column align-items-center w-100 rounded p-4">
              <Document
                file="https://hemma.ams3.cdn.digitaloceanspaces.com/pdf/demo.pdf"
                onLoadSuccess={this.onDocumentLoadSuccess}
                ref={el => (this.componentRef = el)}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
