import React, { Component } from "react";
import "./styles.sass";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Vimeo from "@u-wave/react-vimeo";
import axios from "axios";
import { apiBaseUrl } from "../../../api/helpers";

export class RecordedVideos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoIndex: 0,
      volume: 1,
      paused: false,
      details: []
    };

    this.handlePause = this.handlePause.bind(this);
    this.handlePlayerPause = this.handlePlayerPause.bind(this);
    this.handlePlayerPlay = this.handlePlayerPlay.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
  }

  componentDidMount() {
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
    const { paused, volume } = this.state;
    const videoId = this.state.details.recordingUrl;
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
                {/* <div className="col-3 pt-3 pb-4">
                  <div className="chapter pl-3">
                    <h6 className="smaller light-purple-text">الفصل الأول</h6>
                    <h6 className="text-white">النسبة والتناسب</h6>

                    {videos.map((choice, index) => (
                      <div className="custom-control custom-radio mt-3">
                        <a
                          href={`#!/video/${index}`}
                          className={`collection-item ${
                            video === choice ? "active" : ""
                          }`}
                          onClick={() => this.selectVideo(index)}
                        >
                          <div className="d-flex flex-column">
                            <label className="custom-control-label light-purple-text small">
                              {choice.name}
                            </label>
                            <span className="smaller light-purple-text">
                              <span className="en-text">45</span> دقيقة
                            </span>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                  <hr className="light-hr" />
                </div> */}
                <div className="col-12">
                  {this.state.details && this.state.details.recordingUrl && (
                    <Vimeo
                      video={videoId}
                      className="recorded-video"
                      volume={volume}
                      paused={paused}
                      onPause={this.handlePlayerPause}
                      onPlay={this.handlePlayerPlay}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
