import React, { Component } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../api/helpers";
import { Api } from "../../api";
import "@lottiefiles/lottie-player";
import { Link } from "react-router-dom";

export default class Transaction extends Component {
  state = {
    paymentDetails: [],
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      let paymentId = this.props.match.params.id;
      let token = localStorage.getItem("token");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${apiBaseUrl}/payments/${paymentId}`, { headers })
        .then((response) =>
          this.setState({ paymentDetails: response.data.data })
        )
        .catch((error) => console.log(error));
    } else {
      var tap_id = new URLSearchParams(this.props.location.search).get(
        "tap_id"
      );
      Api.cart
        .GetTapPaymentDetailsCheckout(tap_id)
        .then((response) =>
          this.setState({ paymentDetails: response })
        )
        .catch((error) => console.log(error));
    }
  }
  render() {
    const transactionDate = new Date(
      this.state.paymentDetails && this.state.paymentDetails.createdAt
    );
    var day = transactionDate.getDate();
    var month = transactionDate.getMonth() + 1;
    var year = transactionDate.getFullYear();
    var formattedDate = year + "-" + month + "-" + day;

    const transactionTime = new Date(
      this.state.paymentDetails && this.state.paymentDetails.createdAt
    );
    var hours = transactionTime.getHours() + 3;
    var minutes = transactionTime.getMinutes();
    var formattedTime = hours + ":" + minutes;
    return (
      <React.Fragment>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12 d-flex align-items-center justify-content-center flex-column">
                {this.state.paymentDetails &&
                  this.state.paymentDetails.paymentStatus === "Successful" && (
                    <React.Fragment>
                      <lottie-player
                        autoplay
                        mode="normal"
                        src="https://assets9.lottiefiles.com/datafiles/jXqHQIXI6oO6V47/data.json"
                        style={{ width: 320 }}
                      ></lottie-player>
                      <h5 className="dark-text">
                        {this.state.paymentDetails &&
                        this.state.paymentDetails.paymentStatus
                          ? " لقد تمت عملية الدفع بنجاح"
                          : " عفوًا لقد فشلت عملية الدفع"}
                      </h5>
                      <h5 className="dark-text mb-3">
                        رقم العملية{" "}
                        <span className="en-text">
                          {this.state.paymentDetails &&
                            this.state.paymentDetails.transactionId}
                        </span>{" "}
                      </h5>
                      <h5 className="dark-text mb-3">
                        المبلغ{" "}
                        <span className="en-text red-text">
                          {this.state.paymentDetails &&
                            this.state.paymentDetails.amount}{" "}
                        </span>{" "}
                        ر.س.
                      </h5>
                      {this.state.paymentDetails.createdAt && (
                        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
                          <h6 className="dark-text mb-0 mr-3">
                            وقت العملية:{" "}
                            <span className="en-text red-text">
                              {formattedTime}
                            </span>
                          </h6>
                          <h6 className="dark-text mb-0 ml-3">
                            تاريخ العملية:{" "}
                            <span className="en-text red-text">
                              {formattedDate}
                            </span>
                          </h6>
                        </div>
                      )}
                      <Link
                        className="btn light-btn mt-2 pl-4 pr-4 unset-height unset-line-height"
                        to="/course/content"
                      >
                        قائمة دوراتي
                      </Link>
                    </React.Fragment>
                  )}

                {this.state.paymentDetails &&
                  this.state.paymentDetails.paymentStatus === "Failed" && (
                    <React.Fragment>
                      <lottie-player
                        src="https://assets2.lottiefiles.com/packages/lf20_vCEhKC.json"
                        background="transparent"
                        speed="1"
                        style={{ width: 320 }}
                        autoplay
                      ></lottie-player>
                      <h5 className="dark-text">
                        {this.state.paymentDetails &&
                          this.state.paymentDetails
                            .stsResponseStatusDescription}
                      </h5>
                      <h5 className="dark-text mb-3">
                        رقم العملية{" "}
                        <span className="en-text">
                          {this.state.paymentDetails &&
                            this.state.paymentDetails.transactionId}
                        </span>{" "}
                      </h5>
                      <h5 className="dark-text mb-3">
                        المبلغ{" "}
                        <span className="en-text red-text">
                          {this.state.paymentDetails &&
                            this.state.paymentDetails.amount}{" "}
                        </span>{" "}
                        ر.س.
                      </h5>
                      {this.state.paymentDetails.createdAt && (
                        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
                          <h6 className="dark-text mb-0 mr-3">
                            وقت العملية:{" "}
                            <span className="en-text red-text">
                              {formattedTime}
                            </span>
                          </h6>
                          <h6 className="dark-text mb-0 ml-3">
                            تاريخ العملية:{" "}
                            <span className="en-text red-text">
                              {formattedDate}
                            </span>
                          </h6>
                        </div>
                      )}
                      <Link
                        className="btn light-btn mt-2 pl-4 pr-4 unset-height unset-line-height"
                        to="/cart"
                      >
                        الرجوع إلى مختاراتي
                      </Link>
                    </React.Fragment>
                  )}
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
