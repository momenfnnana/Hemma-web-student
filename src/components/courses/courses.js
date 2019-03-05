import React, { Component } from "react";
import axios from "axios";

export class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  //   componentDidMount() {
  //     axios
  //       .get("https://api.staging.hemma.sa/api/v1/categories")
  //       .then(response => {
  //         this.setState({ categories: response.data.data });
  //         console.log(this.state.categories);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }

  render() {
    return (
      <React.Fragment>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-12 d-inline-flex align-items-center">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/brain.png"}
                  height="50"
                  className="mr-2"
                />
                <h5 className="dark-text mb-0">القدرات و التحصيلي</h5>
              </div>
            </div>
            <div className="row pt-4">
              <div className="col-md-3 col-12">
                <div className="card w-100">
                  <img
                    className="card-img-top"
                    src={process.env.PUBLIC_URL + "/assets/images/course1.png"}
                    alt="Course image"
                  />
                  <div className="card-body">
                    <h6 className="card-title dark-text">
                      دورة القدرات للجامعين{" "}
                    </h6>
                    <ul className="list-inline mb-2">
                      <li className="list-inline-item light-font-text small dark-text mr-4">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/calendar.png"
                          }
                          height="12"
                          width="12"
                          className="mr-1"
                        />
                        <span className="en-text">50</span> ساعة
                      </li>
                      <li className="list-inline-item light-font-text small dark-text en-text">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/quarters.png"
                          }
                          height="12"
                          width="12"
                          className="mr-1"
                        />
                        13-12-2018
                      </li>
                    </ul>

                    <h6 className="dark-text float-right mt-0 mb-0">
                      <span className="en-text">500</span> ريال
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
