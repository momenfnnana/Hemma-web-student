import React, { Component } from "react";
import "./styles.sass";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

export class ChallengeDetails extends Component {
  render() {
    return (
      <section>
        <div className="container">
          <div className="row">
            <div className="col-1 d-flex align-items-center flex-column">
              <div className="mid-bg circle-div d-flex align-items-center justify-content-center">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/light-instructors.png"
                  }
                  height="15"
                  width="15"
                  className="contain-img"
                />
              </div>
              <div className="mid-bg circle-div d-flex align-items-center justify-content-center">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/light-trophy.png"
                  }
                  height="15"
                  width="15"
                  className="contain-img"
                />
              </div>
              <div className="light-bg circle-div d-flex align-items-center justify-content-center">
                <h6 className="text-white en-text mb-0 small">25</h6>
              </div>
            </div>
            <div className="col-11">
              <div className="row route-map">
                <div className="col-md-3 d-flex align-items-center">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/route.png"}
                    height="40"
                    width="40"
                    className="contain-img mr-2"
                  />
                  <div className="mid-bg circle-div d-flex align-items-center justify-content-center">
                    <h6 className="text-white en-text mb-0">1</h6>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mid-bg circle-div d-flex align-items-center justify-content-center">
                    <h6 className="text-white en-text mb-0">2</h6>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mid-bg circle-div d-flex align-items-center justify-content-center">
                    <h6 className="text-white en-text mb-0">3</h6>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mid-bg circle-div d-flex align-items-center justify-content-center">
                    <h6 className="text-white en-text mb-0">4</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
