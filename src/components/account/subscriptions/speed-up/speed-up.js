import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SpeedUpModal } from "./speedUpModal";
import ReactPlayer from "react-player";
import "../styles.sass";

export class SpeedUp extends Component {
  state = {
    isSpeedUpOpen: false
  };

  openSpeedUpModal = () => {
    this.setState({ isSpeedUpOpen: true });
  };
  closeSpeedUpModal = () => {
    this.setState({ isSpeedUpOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12 mb-4">
            <div className="d-flex justify-content-between">
              <h6 className="dark-text small mb-0 mt-0">اختصر وقتك</h6>
            </div>
          </div>
          <div className="col-12">
            <div className="box-layout shadow-sm d-flex flex-column w-100 rounded p-4">
              <div className="row mb-4">
                <div className="col-md-4">
                  <div
                    className="card card-sm custom-height shadow-sm border-0 clickable"
                    onClick={this.openSpeedUpModal}
                  >
                    <header className="card-thumb">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/course1.png"
                        }
                        alt="Speed up image"
                      />
                    </header>
                    <div className="card-body d-flex justify-content-end align-items-center">
                      <h6 className="card-title small en-text mb-0 p-0 dark-text">
                        page.png
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card card-sm custom-height shadow-sm border-0">
                    <header className="card-thumb">
                      <ReactPlayer
                        url="https://hemma.ams3.cdn.digitaloceanspaces.com/videos/videos/20a57d73-a232-417b-bcdd-e5bdef18cca0.mp4"
                        playing={false}
                        controls={false}
                        width="100%"
                        height="100%"
                      />
                    </header>
                    <div className="card-body d-flex justify-content-end align-items-center">
                      <h6 className="card-title small en-text mb-0 p-0 dark-text">
                        page.mp4
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card card-sm custom-height shadow-sm border-0">
                    <header className="card-thumb d-flex align-items-center justify-content-center">
                      <img
                        src={process.env.PUBLIC_URL + "/assets/images/pdf.png"}
                        alt="Speed up image"
                        className="contain-img custom-img mx-auto"
                      />
                    </header>
                    <div className="card-body d-flex justify-content-end align-items-center">
                      <h6 className="card-title small en-text mb-0 p-0 dark-text">
                        page.pdf
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SpeedUpModal
          isSpeedUpOpen={this.state.isSpeedUpOpen}
          closeSpeedUpModal={this.closeSpeedUpModal}
        />
      </React.Fragment>
    );
  }
}
