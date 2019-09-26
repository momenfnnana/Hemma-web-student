import React, { Component } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../api/helpers";
import "@lottiefiles/lottie-player";

export class Transaction extends Component {
  state = {
    paymentDetails: []
  };

  componentDidMount() {
    let paymentId = this.props.match.params.id;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/payments/${paymentId}`, { headers })
      .then(response => this.setState({ paymentDetails: response.data.data }))
      .catch(error => console.log(error));
  }
  render() {
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
                        loop
                        mode="normal"
                        src="https://assets9.lottiefiles.com/datafiles/jXqHQIXI6oO6V47/data.json"
                        style={{ width: 320 }}
                      ></lottie-player>
                      <h5 className="dark-text">تمت عملية الدفع بنجاح</h5>
                    </React.Fragment>
                  )}

                {!this.state.paymentDetails &&
                  !this.state.paymentDetails.paymentStatus === "Successful" && (
                    <React.Fragment>
                      <lottie-player
                        src="https://assets2.lottiefiles.com/packages/lf20_vCEhKC.json"
                        background="transparent"
                        speed="1"
                        style={{ width: 320 }}
                        loop
                        autoplay
                      ></lottie-player>
                      <h5 className="dark-text">حدث خطأ ما</h5>
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
