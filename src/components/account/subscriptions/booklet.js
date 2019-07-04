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
import swal from "@sweetalert/with-react";
import { getUser } from "../../../actions/user.actions";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Page, pdfjs, Document } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc =
  "//mozilla.github.io/pdf.js/build/pdf.worker.js";

export class BookletComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      popoverOpen: false,
      booklet: []
    };
    this.togglePopover = this.togglePopover.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changePageNumber = this.changePageNumber.bind(this);
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
    if (this.props.authenticated) {
      this.props.getUser();
    }
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

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.authenticated && this.props.authenticated) {
      this.props.getUser();
    }
  }

  onSubmit() {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      type: "Booklet",
      itemId: this.state.booklet && this.state.booklet.id
    };
    axios
      .post(`${apiBaseUrl}/cart/items`, data, { headers })
      .then(response => {
        this.props.history.push("/cart");
      })
      .catch(error => {
        switch (error.response.data && error.response.data.error) {
          case "Duplicate":
            swal("عفواً", "هذه الملزمة مضافة سابقاً إلى سلة التسوق", "error", {
              button: "متابعة"
            });
            break;
          case "BadRequest":
            swal("عفواً", "هذه الملزمة مضافة سابقًا إلى سلة التسوق", "error", {
              button: "متابعة"
            });
            break;
          case "ItemAlreadyPurchased":
            swal("عفواً", "هذه الملزمة موجودة ضمن قائمة دوراتك", "error", {
              button: "متابعة"
            });
            break;

          default:
            swal("عفواً", "عليك تسجيل الدخول للقيام بهذه الخطوة", "error", {
              button: "متابعة"
            });
            break;
        }
      });
  }

  changePageNumber(event) {
    this.setState({
      pageNumber: event.target.value
    });
  }

  render() {
    const { pageNumber, numPages } = this.state;
    const user = this.props && this.props.user;
    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12 mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="dark-text small mb-0 mt-0">
                {this.state.booklet && this.state.booklet.nameAr}
              </h6>

              <div>
                {this.state.booklet && this.state.booklet.canBePurchased && (
                  <button
                    type="submit"
                    className="btn blue-border-btn"
                    id="booklet-popover"
                    onClick={this.onSubmit}
                  >
                    طلب الملزمة مطبوعة
                  </button>
                )}

                {/* <Popover
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
                </Popover>*/}
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="box-layout shadow-sm w-100 gray-box-border scrollable-box">
              <div className="pdf-wrapper d-flex align-items-center justify-content-between">
                <p className="text-white en-text mb-0 d-flex align-items-center">
                  {numPages} /{" "}
                  <input
                    type="text"
                    className="form-control ml-1"
                    value={pageNumber}
                    onChange={this.changePageNumber}
                    style={{ width: 40, height: 25, textAlign: "center" }}
                  />
                </p>
                {this.state.booklet && this.state.booklet.availableInPrint && (
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
                )}
              </div>
              <div className="m-4">
                <Document
                  file={this.state.booklet.url}
                  onLoadSuccess={this.onDocumentLoadSuccess}
                  ref={el => (this.componentRef = el)}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <React.Fragment>
                      <Page key={`page_${index + 1}`} pageNumber={index + 1}>
                        <div className="watermark w-100 d-flex align-items-center justify-content-between">
                          <h6 className="en-text mb-0">{user && user.id}</h6>

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
          </div>
        </div>
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

BookletComponent = connect(
  mapStateToProps,
  { getUser }
)(BookletComponent);

export const Booklet = withRouter(BookletComponent);
