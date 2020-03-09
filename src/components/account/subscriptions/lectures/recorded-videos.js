import React, { Component } from "react";
import { apiBaseUrl } from "../../../../api/helpers";
import axios from "axios";
import "../styles.sass";
import { CommentsList } from "./comments/comments-list";

export class LectureDetails extends Component {
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
            (window.location = `/course/content/${courseId}/lecture/${lecture.id}`)
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
    const lectureId = this.props.match.params.lectureId;

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

                <CommentsList lectureId={lectureId} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
