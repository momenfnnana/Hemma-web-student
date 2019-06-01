import React, { Component } from "react";
import "./styles.sass";
import { Link } from "react-router-dom";

export class SpeedUp extends Component {
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
                  <Link
                    className="dark-text small"
                    to="/subscriptions/details/recorded-videos"
                  >
                    <div className="card card-sm custom-height shadow-sm border-0">
                      <header className="card-thumb">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/course1.png"
                          }
                          alt="Course image"
                        />
                      </header>
                      <div className="card-body d-flex justify-content-end align-items-center">
                        <h6 className="card-title small en-text mb-0 p-0">
                          page.pdf
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-4">
                  <Link
                    className="dark-text small"
                    to="/subscriptions/details/recorded-videos"
                  >
                    <div className="card card-sm custom-height shadow-sm border-0">
                      <header className="card-thumb">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/course1.png"
                          }
                          alt="Course image"
                        />
                      </header>
                      <div className="card-body d-flex justify-content-end align-items-center">
                        <h6 className="card-title small en-text mb-0 p-0">
                          page.png
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
