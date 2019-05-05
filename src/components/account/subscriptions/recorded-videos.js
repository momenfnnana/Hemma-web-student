import React, { Component } from "react";
import "./styles.sass";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import ReactPlayer from "react-player";

export class RecordedVideos extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12 mb-4">
            <div className="d-flex justify-content-between">
              <h6 className="dark-text small mb-0 mt-0">المحاضرات المسجلة </h6>
            </div>
          </div>
        </div>

        <div className="row no-gutters">
          <div className="col-12 mb-4">
            <div className="dark-bg rounded shadow-sm">
              <div className="row no-gutters">
                <div className="col-3 pt-3 pb-4">
                  <div className="chapter pl-3">
                    <h6 className="smaller light-purple-text">الفصل الأول</h6>
                    <h6 className="text-white">النسبة والتناسب</h6>
                    <div className="custom-control custom-radio mt-3">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="radio-stacked"
                        required
                      />
                      <div className="d-flex flex-column">
                        <label className="custom-control-label light-purple-text small">
                          الدرس الأول
                        </label>
                        <span className="smaller light-purple-text">
                          <span className="en-text">45</span> دقيقة
                        </span>
                      </div>
                    </div>
                    <div className="custom-control custom-radio mt-3">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="radio-stacked"
                        required
                      />
                      <div className="d-flex flex-column">
                        <label className="custom-control-label light-purple-text small">
                          الدرس الثاني
                        </label>
                        <span className="smaller light-purple-text">
                          <span className="en-text">45</span> دقيقة
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr className="light-hr" />
                  <div className="chapter pl-3">
                    <h6 className="smaller light-purple-text">الفصل الثاني</h6>
                    <h6 className="text-white">النسبة والتناسب</h6>
                    <div className="custom-control custom-radio mt-3">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="radio-stacked"
                        required
                      />
                      <div className="d-flex flex-column">
                        <label className="custom-control-label light-purple-text small">
                          الدرس الأول
                        </label>
                        <span className="smaller light-purple-text">
                          <span className="en-text">45</span> دقيقة
                        </span>
                      </div>
                    </div>
                    <div className="custom-control custom-radio mt-3">
                      <input
                        type="radio"
                        className="custom-control-input"
                        name="radio-stacked"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-9">
                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                    height="100%"
                    width="100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
