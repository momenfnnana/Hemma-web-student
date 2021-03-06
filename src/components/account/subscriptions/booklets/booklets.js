import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import { apiBaseUrl } from "../../../../api/helpers";
import swal from "@sweetalert/with-react";
import { getUser } from "../../../../actions/user.actions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import "../styles.sass";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";
import Loader from "react-loaders";
import { Api } from "../../../../api";

export class BookletsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booklets: [],
      booklet: {},
      isPageLoading: false,
      showOrderBooklet: true,
      tracking: "",
      purchased: false,
      canBePurchased: false,
      cumulativePaymentStatus: "",
      printingStatus: "",
      status: "",
    };
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  toggleTooltip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

  componentDidMount() {
    this.setState({ isPageLoading: true });
    if (this.props.authenticated) {
      this.props.getUser();
    }
    const courseId = this.props.match.params.id;
    const bookletId = this.props.m;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios.get(`${apiBaseUrl}/GeneralSettings`, { headers }).then((response) => {
      this.setState({
        tracking: response.data.data,
      });
    });
    axios
      .get(`${apiBaseUrl}/content/${courseId}/booklet`, { headers })
      .then((response) => {
        this.setState({
          booklets: response.data.data.parts,
          isPageLoading: false,
          booklet: response.data.data,
          purchased: response.data?.data?.purchased,
          canBePurchased: response.data?.data?.canBePurchased,
        });
        if (this.state.purchased === true) {
          axios
            .get(
              `${apiBaseUrl}/content/${this.state.booklet.id}/bookletDetailes`,
              { headers }
            )
            .then((response) => {
              console.log({
                response: response.data?.data,
              });
              this.setState({
                cumulativePaymentStatus:
                  response.data?.data?.cumulativePaymentStatus,
                printingStatus: response.data?.data?.printingStatus,
                status: response.data?.data?.status,
              });
            });
        }
        axios
          .get(
            `${apiBaseUrl}/cart_v2/Check_Booklet_Exist/${this.state.booklet.id}`,
            { headers }
          )
          .then((response) => {
            this.setState({
              showOrderBooklet: response.data.data,
            });
          })
          .catch((error) => {
            // this.setState({ isPageLoading: false });
            console.log({ error });
          });
      })
      .catch((error) => {
        this.setState({ isPageLoading: false });
        if (error?.response.status === 404) {
          this.setState({ showOrderBooklet: false });
        }
        console.log({ error });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.authenticated && this.props.authenticated) {
      this.props.getUser();
    }
  }

  onSubmit(type) {
    swal("?????????????? ?????????? ?????? ?????????????? ???? ????????????????", "", {
      button: "????????????",
    }).then((res) => {
      this.props.history.push("/cart");
    });
    Api.cart
      .addBooklet(this.state.booklet.id, type)
      .then((response) => {})
      .catch((error) => {
        switch (error.response.data && error.response.data.error) {
          case "Duplicate":
            swal("??????????", "?????? ?????????????? ?????????? ???????????? ?????? ????????????????", "error", {
              button: "????????????",
            });
            break;
          case "BadRequest":
            swal("??????????", "?????? ?????????????? ?????????? ???????????? ?????? ????????????????", "error", {
              button: "????????????",
            });
            break;
          case "ItemAlreadyPurchased":
            swal("??????????", "?????? ?????????????? ???????????? ?????? ?????????? ????????????", "error", {
              button: "????????????",
            });
            break;
          case "ItemAlreadyAdded":
            // this.props.history.push("/cart");
            break;

          default:
            swal("??????????", "???????? ?????????? ???????????? ???????????? ???????? ????????????", "error", {
              button: "????????????",
            });
            break;
        }
      });
  }
  // confirmationPopup = (type) =>{
  //   swal(
  //       `???? ???????? ???????????????? ???? ???????????? ?????? ?????? ??????????????`,
  //       {
  //         buttons: {
  //           ok: "??????????",
  //           cancel:'??????????'
  //         },
  //       }
  //   ).then((value) => {
  //     switch (value) {
  //       case "ok":
  //         this.onSubmit(type);
  //
  //       case "cancel":
  //
  //       default:
  //         break;
  //     }
  //   });
  // }

  renderBooklets() {
    const booklets = this.state.booklets;
    const courseId = this.props.match.params.id;

    return booklets.map((booklet) => {
      return (
        <div
          to={`/course/content/${courseId}/booklets/${booklet.id}`}
          onClick={() =>
            this.props.history.push(
              `/course/content/${courseId}/booklets/${booklet.id}`,
              {
                name: booklet.name,
                url: booklet.url,
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

                  <div>
                    {/* {this.state.booklet.agency == "Printsa" ? (
                      <a
                        className="btn blue-border-btn mr-2"
                        href={`https://www.aramex.com/sa/ar/track/track-shipments/track-results?mode=0&ShipmentNumber=${this.state.booklet.trackingId}`}
                        target="_blank"
                      >
                        ????????
                      </a>
                    ) : this.state.booklet.agency == "SMSA" ? (
                      <a
                        className="btn blue-border-btn mr-2"
                        href={`http://www.smsaexpress.com/Track.aspx?tracknumbers=${this.state.booklet.trackingId}`}
                        target="_blank"
                      >
                        ????????//
                      </a>
                    ) : null} */}
                    {/* {this.state.purchased &&
                    !this.state.canBePurchased &&
                    this.state.tracking != "" ? (
                      <a
                        className="btn blue-border-btn mr-2"
                        href={`${this.state.tracking}`}
                        target="_blank"
                      >
                        ????????
                      </a>
                    ) : null} */}
                    {(this.state.printingStatus === "Printed" &&
                    this.state.purchased &&
                    this.state.tracking !== "" &&
                    this.state.status === "Shipped") ||(
                      this.state.printingStatus === "Printed" &&
                    this.state.purchased &&
                    this.state.tracking !== "" &&
                    this.state.status === "None") ? (
                      <a
                        className="btn blue-border-btn mr-2"
                        href={`${this.state.tracking}`}
                        target="_blank"
                      >
                        ????????
                      </a>
                    ) : null}
                    {this.state.cumulativePaymentStatus === "Pending" ? (
                      <div className="btn blue-border-btn mr-2">
                        <a aria-disabled="true">?????? ????????????????</a>
                      </div>
                    ) : this.state.cumulativePaymentStatus ===
                      "PartiallyPaid" ? (
                      <div className="btn blue-border-btn mr-2">
                        <a aria-disabled="true">?????????? ??????????</a>
                      </div>
                    ) : this.state.cumulativePaymentStatus === "Refunded" ? (
                      <div className="btn blue-border-btn mr-2">
                        <a aria-disabled="true">????????????</a>
                      </div>
                    ) : null}
                    {this.state.showOrderBooklet ? (
                      <NavLink to="/cart">
                        <div className="btn blue-border-btn mr-1">
                          ?????????????? ???????????? ???? ????????????????
                        </div>
                      </NavLink>
                    ) : null}
                    {this.state.canBePurchased &&
                    !this.state.purchased &&
                    !this.state.showOrderBooklet ? (
                      <React.Fragment>
                        {this.state.booklet &&
                        this.state.booklet.canBePurchased &&
                        this.state.booklet.availableInPrint ? (
                          <>
                            {this.state.booklet.availableInColor && (
                              <button
                                type="submit"
                                className="btn blue-border-btn mr-1"
                                onClick={() => this.onSubmit("Colored")}
                              >
                                ?????? ?????????????? ?????????????? ????????????
                              </button>
                            )}
                            {this.state.booklet.availableInBlackAndWhite && (
                              <button
                                type="submit"
                                className="btn blue-border-btn"
                                onClick={() => this.onSubmit("BlackAndWhite")}
                              >
                                ?????? ?????????????? ???????????? ?? ???????????? ????????????
                              </button>
                            )}
                          </>
                        ) : null}
                      </React.Fragment>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="box-layout silver-bg shadow-sm d-flex flex-column w-100 rounded p-4 pb-0">
                {(this.state.booklets == undefined ||
                this.state.booklets.length == 0)&&
                (this.state.booklet.availableInColor||
                  this.state.booklet.availableInBlackAndWhite) ? (
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
                        <h5 className="dark-text mt-0">???? ???????? ???????????? ?????????? ??????????????</h5>
                      </div>
                    </div>
                  </React.Fragment>
                ) : (this.state.booklets == undefined ||
                  this.state.booklets.length == 0)? (
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
                      <h5 className="dark-text mt-0">???? ???????? ?????????? ??????????</h5>
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
    user: state.user,
  };
}

BookletsComponent = connect(mapStateToProps, { getUser })(BookletsComponent);

export const Booklets = withRouter(BookletsComponent);
