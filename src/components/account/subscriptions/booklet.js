import React, { Component } from "react";
import "./styles.sass";
import {
  Tooltip,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import axios from "axios";
import { apiBaseUrl } from "../../../api/helpers";
import ReactToPrint from "react-to-print";
import { Page, pdfjs, Document } from "react-pdf";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

export class Booklet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      popoverOpen: false,
      booklet: []
    };
    this.togglePopover = this.togglePopover.bind(this);
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };
  togglePopover() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  componentDidMount() {
    const courseId = this.props.match.params.id;

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/content/${courseId}/booklet`, { headers })
      .then(response => {
        this.setState({ booklet: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12 mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="dark-text small mb-0 mt-0">
                {this.state.booklet && this.state.booklet.nameAr}
              </h6>
              <ReactToPrint
                trigger={() => (
                  <button className="btn blue-border-btn">طباعة الملزمة</button>
                )}
                content={() => this.componentRef}
              />
              {/* <div>
                <button
                  type="submit"
                  className="btn blue-border-btn mr-2"
                  id="booklet-popover"
                >
                  طلب الملزمة مطبوعة
                </button>


                <Popover
                  placement="bottom"
                  isOpen={this.state.popoverOpen}
                  target="booklet-popover"
                  toggle={this.togglePopover}
                  style={{
                    backgroundColor: "#f2fdfe",
                    color: "#4b3a85"
                  }}
                >
                  <PopoverBody className="d-flex flex-column align-items-center justify-content-center">
                    <p className="light-font-text small mb-1 mt-2 dark-text">
                      لا يمكنك شراء الملزمة دون تسديد كامل الأقساط
                    </p>
                    <p className="small light-font-text mb-2 d-inline-flex align-items-center dark-text">
                      <u> اكمل سداد الأقساط</u>
                    </p>
                  </PopoverBody>
                </Popover>
              </div> */}
            </div>
          </div>
          <div className="col-12">
            <div className="box-layout shadow-sm w-100 rounded p-4">
              <Document
                file={this.state.booklet.url}
                onLoadSuccess={this.onDocumentLoadSuccess}
                ref={el => (this.componentRef = el)}
              >
                <Page pageNumber={pageNumber} />
              </Document>

              <div className="d-flex align-items-center">
                <button
                  className="btn light-btn btn-sm mr-2 d-flex align-items-center"
                  onClick={() =>
                    this.setState(prevState => ({
                      pageNumber: prevState.pageNumber + 1
                    }))
                  }
                >
                  <FaChevronRight className="mr-1" />
                  التالي
                </button>
                <button
                  className="btn light-btn btn-sm d-flex align-items-center"
                  onClick={() =>
                    this.setState(prevState => ({
                      pageNumber: prevState.pageNumber - 1
                    }))
                  }
                >
                  السابق
                  <FaChevronLeft className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
