import React, { Component } from "react";
import { FaGraduationCap } from "react-icons/fa";
import "./styles.sass";
import { Link } from "react-router-dom";
import Countdown from "react-countdown-now";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return null;
  } else {
    return (
      <span>
        {days}:{hours}:{minutes}:{seconds}
      </span>
    );
  }
};

export class Lecture extends Component {
  constructor(props) {
    super(props);
    this.state = { details: undefined };
  }
  componentDidMount() {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/content/${this.props.id}/upcoming_lecture`, {
        headers
      })
      .then(response => {
        this.setState({ details: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const lectureID = this.state.details && this.state.details.id;
    const channelID = this.props.chatChannelSid;
    const liveID = this.state.details && this.state.details.broadcastUrl;
    const scheduledAt = new Date(
      this.state.details && this.state.details.scheduledAt
    );
    var day = scheduledAt.getDate();
    var month = scheduledAt.getMonth() + 1;
    var year = scheduledAt.getFullYear();
    var scheduledDate = year + "-" + month + "-" + day;
    var hijriDate = moment(scheduledDate).format("iYYYY/iM/iD");
    return (
      <React.Fragment>
        {this.state.details && (
          <div className="lecture-item w-100 d-flex align-items-center mb-4">
            <div className="media w-75">
              <div className="silver-box-bg mr-4 d-flex align-items-center justify-content-center">
                <FaGraduationCap className="dark-text" size="34" />
              </div>
              <div className="media-body mt-2">
                <h6 className="text-white light-font-text mb-0">
                  {this.state.details.nameAr}
                </h6>
                <ul className="list-inline mt-2">
                  <li className="list-inline-item small mt-0">
                    <p className="text-white light-font-text mb-0">
                      {this.state.details &&
                        this.state.details.instructor &&
                        this.state.details.instructor.name}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            {this.state.details && this.state.details.status == "Live" ? (
              <React.Fragment>
                {liveID && (
                  <div className="w-25 d-flex justify-content-end">
                    {liveID.startsWith("http") ? (
                      <button
                        onClick={() => window.open(liveID, "_blank")}
                        className="btn silver-outline-btn unset-height w-50"
                      >
                        انضم
                      </button>
                    ) : (
                      <Link
                        to={`/subscriptions/${
                          this.props.id
                        }/live-stream/${lectureID}`}
                        className="btn silver-outline-btn unset-height w-50"
                      >
                        انضم
                      </Link>
                    )}
                  </div>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {this.state.details.scheduledAt && (
                  <div className="w-25 d-flex justify-content-end">
                    <h6 className="text-white small">
                      وقت المحاضرة:{" "}
                      <span className="en-text">
                        {hijriDate}
                        {/* <Countdown
                          date={Date.now() + scheduledAt.getTime()}
                          renderer={renderer}
                        /> */}
                      </span>
                    </h6>
                  </div>
                )}
              </React.Fragment>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}
