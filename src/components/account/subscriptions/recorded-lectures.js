import React, { Component } from "react";
import "./styles.sass";

export class RecordedLectures extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12 mb-4">
            <div className="d-flex justify-content-between">
              <h6 className="dark-text small mb-0 mt-0">المحاضرات المسجلة </h6>
            </div>
          </div>
          <div className="col-12">
            <div className="box-layout shadow-sm d-flex flex-column w-100 rounded p-4">
              <div className="row">
                <div className="col-12 mb-3">
                  <h6 className="dark-text mb-0 mt-0">النسبة والتناسب</h6>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-4">
                  <div className="card card-sm shadow-sm border-0">
                    <header className="card-thumb">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/course1.png"
                        }
                        alt="Course image"
                      />
                    </header>
                    <div className="card-body d-flex justify-content-center flex-column">
                      <h6 className="card-title small mid-text pb-2">
                        المحاضرة الأولى
                      </h6>
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li className="list-inline-item light-font-text smaller dark-text d-inline-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/calendar.png"
                            }
                            height="12"
                            width="12"
                            className="mr-1"
                          />
                          <span className="en-text mr-1">2:30</span>
                          ساعة
                        </li>
                        <li className="list-inline-item light-font-text smaller dark-text en-text d-inline-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/quarters.png"
                            }
                            height="12"
                            width="12"
                            className="mr-1"
                          />
                          <span className="en-text">13-12-2018</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card card-sm shadow-sm border-0">
                    <header className="card-thumb">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/course1.png"
                        }
                        alt="Course image"
                      />
                    </header>
                    <div className="card-body d-flex justify-content-center flex-column">
                      <h6 className="card-title small mid-text pb-2">
                        المحاضرة الأولى
                      </h6>
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li className="list-inline-item light-font-text smaller dark-text d-inline-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/calendar.png"
                            }
                            height="12"
                            width="12"
                            className="mr-1"
                          />
                          <span className="en-text mr-1">2:30</span>
                          ساعة
                        </li>
                        <li className="list-inline-item light-font-text smaller dark-text en-text d-inline-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/quarters.png"
                            }
                            height="12"
                            width="12"
                            className="mr-1"
                          />
                          <span className="en-text">13-12-2018</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card card-sm shadow-sm border-0">
                    <header className="card-thumb">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/course1.png"
                        }
                        alt="Course image"
                      />
                    </header>
                    <div className="card-body d-flex justify-content-center flex-column">
                      <h6 className="card-title small mid-text pb-2">
                        المحاضرة الأولى
                      </h6>
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li className="list-inline-item light-font-text smaller dark-text d-inline-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/calendar.png"
                            }
                            height="12"
                            width="12"
                            className="mr-1"
                          />
                          <span className="en-text mr-1">2:30</span>
                          ساعة
                        </li>
                        <li className="list-inline-item light-font-text smaller dark-text en-text d-inline-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/quarters.png"
                            }
                            height="12"
                            width="12"
                            className="mr-1"
                          />
                          <span className="en-text">13-12-2018</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card card-sm shadow-sm border-0">
                    <header className="card-thumb">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/course1.png"
                        }
                        alt="Course image"
                      />
                    </header>
                    <div className="card-body d-flex justify-content-center flex-column">
                      <h6 className="card-title small mid-text pb-2">
                        المحاضرة الأولى
                      </h6>
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li className="list-inline-item light-font-text smaller dark-text d-inline-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/calendar.png"
                            }
                            height="12"
                            width="12"
                            className="mr-1"
                          />
                          <span className="en-text mr-1">2:30</span>
                          ساعة
                        </li>
                        <li className="list-inline-item light-font-text smaller dark-text en-text d-inline-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/quarters.png"
                            }
                            height="12"
                            width="12"
                            className="mr-1"
                          />
                          <span className="en-text">13-12-2018</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card card-sm shadow-sm border-0">
                    <header className="card-thumb">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/course1.png"
                        }
                        alt="Course image"
                      />
                    </header>
                    <div className="card-body d-flex justify-content-center flex-column">
                      <h6 className="card-title small mid-text pb-2">
                        المحاضرة الأولى
                      </h6>
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li className="list-inline-item light-font-text smaller dark-text d-inline-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/calendar.png"
                            }
                            height="12"
                            width="12"
                            className="mr-1"
                          />
                          <span className="en-text mr-1">2:30</span>
                          ساعة
                        </li>
                        <li className="list-inline-item light-font-text smaller dark-text en-text d-inline-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/quarters.png"
                            }
                            height="12"
                            width="12"
                            className="mr-1"
                          />
                          <span className="en-text">13-12-2018</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 mb-3">
                  <h6 className="dark-text mb-0 mt-0">النسبة والتناسب</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="card card-sm shadow-sm border-0">
                    <header className="card-thumb">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/course1.png"
                        }
                        alt="Course image"
                      />
                    </header>
                    <div className="card-body d-flex justify-content-center flex-column">
                      <h6 className="card-title small mid-text pb-2">
                        المحاضرة الأولى
                      </h6>
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li className="list-inline-item light-font-text smaller dark-text d-inline-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/calendar.png"
                            }
                            height="12"
                            width="12"
                            className="mr-1"
                          />
                          <span className="en-text mr-1">2:30</span>
                          ساعة
                        </li>
                        <li className="list-inline-item light-font-text smaller dark-text en-text d-inline-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/quarters.png"
                            }
                            height="12"
                            width="12"
                            className="mr-1"
                          />
                          <span className="en-text">13-12-2018</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card card-sm shadow-sm border-0">
                    <header className="card-thumb">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/course1.png"
                        }
                        alt="Course image"
                      />
                    </header>
                    <div className="card-body d-flex justify-content-center flex-column">
                      <h6 className="card-title small mid-text pb-2">
                        المحاضرة الأولى
                      </h6>
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li className="list-inline-item light-font-text smaller dark-text d-inline-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/calendar.png"
                            }
                            height="12"
                            width="12"
                            className="mr-1"
                          />
                          <span className="en-text mr-1">2:30</span>
                          ساعة
                        </li>
                        <li className="list-inline-item light-font-text smaller dark-text en-text d-inline-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/quarters.png"
                            }
                            height="12"
                            width="12"
                            className="mr-1"
                          />
                          <span className="en-text">13-12-2018</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
