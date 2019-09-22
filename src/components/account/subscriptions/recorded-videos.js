import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Vimeo from "@u-wave/react-vimeo";
import axios from "axios";
import { apiBaseUrl } from "../../../api/helpers";
import { Field, reduxForm } from "redux-form";
import { textareaField } from "../../shared/inputs/textareaField";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import "./styles.sass";

export class RecordedVideosComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoIndex: 0,
      volume: 1,
      paused: false,
      details: [],
      courseDetails: []
    };

    this.handlePause = this.handlePause.bind(this);
    this.handlePlayerPause = this.handlePlayerPause.bind(this);
    this.handlePlayerPlay = this.handlePlayerPlay.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
  }

  async componentDidMount() {
    const lectureId = this.props.match.params.lectureId;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/content/lectures/${lectureId}`, { headers })
      .then(response => {
        this.setState({ details: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    await axios
      .get(`${apiBaseUrl}/content/lectures/${lectureId}/vdocipher_token`, {
        headers
      })
      .then(response => {
        const videoID = this.state.details && this.state.details.recordingUrl;
        if (videoID) {
          new window.VdoPlayer({
            otp: response.data.data.otp,
            playbackInfo: btoa(
              JSON.stringify({
                videoId: videoID
              })
            ),
            theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
            // the container can be any DOM element on website
            container: document.querySelector("#embedBox")
          });
        }
      })
      .catch(error => {
        console.log(error);
      });

    const courseId = this.props.match.params.id;
    axios
      .get(`${apiBaseUrl}/content/${courseId}/recorded_lectures`, { headers })
      .then(response => {
        this.setState({ courseDetails: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderSections() {
    const sections = this.state.courseDetails.sections;

    if (sections) {
      return sections.map(section => (
        <React.Fragment>
          <div className="chapter pl-3">
            <h6 className="smaller light-purple-text">{section.nameAr}</h6>
            {this.renderChapters(section.chapters)}
          </div>
          <hr className="light-hr" />
        </React.Fragment>
      ));
    }
  }

  renderChapters(chapters) {
    const sortedChapters = chapters.sort((a, b) =>
      a.order > b.order ? 1 : -1
    );
    if (sortedChapters) {
      return sortedChapters.map(chapter => (
        <React.Fragment>
          <h6 className="text-white">{chapter.nameAr}</h6>
          {this.renderLectures(chapter.lectures)}
        </React.Fragment>
      ));
    }
  }

  renderLectures(lectures) {
    const sortedLectures = lectures.sort((a, b) =>
      a.order > b.order ? 1 : -1
    );
    if (sortedLectures) {
      return sortedLectures.map(lecture => {
        return <React.Fragment>{this.renderLecture(lecture)}</React.Fragment>;
      });
    }
  }

  renderLecture(lecture) {
    const courseId = this.props.match.params.id;
    return (
      <div className="custom-control custom-radio mt-3">
        <div
          className="d-flex flex-column clickable"
          onClick={() =>
            (window.location = `/subscriptions/${courseId}/recorded-videos/${lecture.id}`)
          }
        >
          <label className="custom-control-label light-purple-text small">
            {lecture.nameAr}
          </label>
        </div>
      </div>
    );
  }

  selectVideo(index) {
    this.setState({ videoIndex: index });
  }

  handlePause(event) {
    this.setState({
      paused: event.target.checked
    });
  }

  handlePlayerPause() {
    this.setState({ paused: true });
  }

  handlePlayerPlay() {
    this.setState({ paused: false });
  }

  handleVolume(event) {
    this.setState({
      volume: parseFloat(event.target.value)
    });
  }

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
                <div className="col-3 pt-3 pb-4 col-height">
                  {this.renderSections()}
                </div>
                <div className="col-9">
                  {this.state.details && this.state.details.recordingUrl && (
                    <div
                      id="embedBox"
                      style={{ height: "100%", width: "100%" }}
                    ></div>
                  )}
                </div>

                {/* <div className="col-12 silver-bg p-4">
                  <h6 className="dark-text mb-3">لديك تعليق؟</h6>
                  <Field
                    component={textareaField}
                    className="form-control smaller silver-text shadow-sm"
                    name="desc"
                    placeholder="اذا كنت تعرف جواب السؤال اترك تعليقا"
                    rows="8"
                  />
                  <button className="btn light-outline-btn btn-sm unset-height pl-5 pr-5 float-right">
                    ارسال
                  </button>
                  <div className="clearfix" />

                  <div className="d-flex justify-content-between align-items-center responsive-col mt-4">
                    <h6 className="dark-text small mb-0 mt-0">التعليقات</h6>

                    <div className="d-flex align-items-center">
                      <img
                        src={process.env.PUBLIC_URL + "/assets/images/chat.png"}
                        height="15"
                        width="20"
                        className="contain-img mr-1"
                      />
                      <h6 className="mid-text en-text mb-0">1</h6>
                    </div>
                  </div>

                  <div className="box-layout shadow-sm bg-white mt-3">
                    <div className="p-3">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="d-flex align-items-center">
                          <h6 className="light-text smaller mb-0 mr-3">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/blue-user.png"
                              }
                              width="20"
                              className="contain-img mr-2"
                            />
                            محمد أحمد
                          </h6>
                        </div>
                        <div className="d-flex align-items-end justify-content-end">
                          <h6 className="light-text smaller mb-0 mr-3">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/check-mark.png"
                              }
                              width="15"
                              className="contain-img mr-1"
                            />
                            إجابة معتمدة{" "}
                          </h6>
                          <h6 className="dark-silver-text smaller en-text mb-0">
                            15 - 3 -2019
                          </h6>
                        </div>
                      </div>
                      <p className="light-font-text dark-text smaller">
                        اللغة العربية من اللغات العالمية الأكثر انتشاراً في
                        العالم، وتعتبرُ من إحدى اللغات المُعتمدة في الأمم
                        المُتحدة، كما إنها تشكل اللغة الأولى في مناطق بلاد
                        الشّام، وشبه الجزيرة العربية، وشمال أفريقيا، وساهم هذا
                        الانتشار الواسعُ للغة العربية في تصنيفها كواحدة من
                        اللّغاتِ التي يسعى.
                      </p>
                    </div>
                  </div>

                  <div className="box-layout shadow-sm bg-white mt-3">
                    <div className="p-3">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="d-flex align-items-center">
                          <h6 className="light-text smaller mb-0 mr-3">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/blue-user.png"
                              }
                              width="20"
                              className="contain-img mr-2"
                            />
                            محمد أحمد
                          </h6>
                        </div>
                        <div className="d-flex align-items-end justify-content-end">
                          <h6 className="dark-silver-text smaller en-text mb-0">
                            15 - 3 -2019
                          </h6>
                        </div>
                      </div>
                      <p className="light-font-text dark-text smaller">
                        وشمال أفريقيا، وساهم هذا الانتشار الواسعُ للّغة
                        العربيّة.
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.RecordedVideos && state.form.RecordedVideos.values
  };
}

RecordedVideosComponent = reduxForm({
  form: "RecordedVideos"
})(RecordedVideosComponent);

RecordedVideosComponent = connect(mapStateToProps)(RecordedVideosComponent);

export const RecordedVideos = withRouter(RecordedVideosComponent);
