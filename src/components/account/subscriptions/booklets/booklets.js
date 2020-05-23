import React, { Component } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import swal from "@sweetalert/with-react";
import { getUser } from "../../../../actions/user.actions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import "../styles.sass";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";
import Loader from "react-loaders";

export class BookletsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booklets: [],
      isPageLoading: false
    };
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  toggleTooltip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  componentDidMount() {
    this.setState({ isPageLoading: true });
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
        this.setState({
          booklets: response.data.data.parts,
          isPageLoading: false
        });
      })
      .catch(error => {
        this.setState({ isPageLoading: false });
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

  renderBooklets() {
    const booklets = this.state.booklets;
    const courseId = this.props.match.params.id;

    return booklets.map(booklet => {
      return (
        <div
          to={`/course/content/${courseId}/booklets/${booklet.id}`}
          onClick={() =>
            this.props.history.push(
              `/course/content/${courseId}/booklets/${booklet.id}`,
              {
                name: booklet.name,
                url: booklet.url
              }
            )
          }
          className="col-md-4"
          key={booklet.id}
        >
          <div className="card card-sm custom-height shadow-sm border-0 clickable">
            <header className="card-thumb d-flex align-items-center justify-content-center">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/pdf.png"}
                alt="File"
                className="contain-img custom-img mx-auto"
              />
            </header>
            <div className="card-body d-flex justify-content-start align-items-center">
              <h6 className="card-title small mb-0 p-0 dark-text">
                {booklet.name}
              </h6>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <>
        {this.state.isPageLoading ? (
          <div
            className="silver-bg box-layout w-100 pb-0 p-3 mt-4 d-flex justify-content-center align-items-center"
            style={{ minHeight: 350 }}
          >
            <Loader type="ball-spin-fade-loader" className="dark-loader" />
          </div>
        ) : (
            <React.Fragment>
              <div className="row no-gutters">
                <div className="col-12 mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="dark-text mb-0 mt-0"></h6>

                    {/* <div>
                {this.state.booklet &&
                  this.state.booklet.canBePurchased &&
                  this.state.booklet.availableInPrint && (
                    <button
                      type="submit"
                      className="btn blue-border-btn"
                      onClick={this.onSubmit}
                    >
                      طلب الملزمة مطبوعة
                    </button>
                  )}
              </div> */}
                  </div>
                </div>
                <div className="box-layout silver-bg shadow-sm d-flex flex-column w-100 rounded p-4 pb-0">
                  {this.state.booklets == undefined ||
                    this.state.booklets.length == 0 ? (
                      <React.Fragment>
                        <div className="col-12">
                          <div
                            className="d-flex flex-column align-items-center justify-content-center"
                            style={{ height: 200 }}
                          >
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/empty-files.png"
                              }
                              className="mb-1"
                              height="80"
                            />
                            <h5 className="dark-text mt-0">لا يوجد ملازم متاحة</h5>
                          </div>
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div className="row">{this.renderBooklets()}</div>
                      </React.Fragment>
                    )}
                </div>
              </div>
            </React.Fragment>
          )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user
  };
}

BookletsComponent = connect(
  mapStateToProps,
  { getUser }
)(BookletsComponent);

export const Booklets = withRouter(BookletsComponent);
