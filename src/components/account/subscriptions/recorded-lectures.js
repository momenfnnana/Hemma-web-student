import React, { Component } from "react";
import "./styles.sass";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../../api/helpers";
var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

export class RecordedLectures extends Component {
  constructor(props) {
    super(props);
    this.state = { details: [] };
  }

  componentDidMount() {
    const courseId = this.props.match.params.id;

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/content/${courseId}/recorded_lectures`, { headers })
      .then(response => {
        this.setState({ details: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderSections() {
    const sections = this.state.details.sections;
    if (sections) {
      return sections.map(section => (
        <React.Fragment>
          <div className="row no-gutters">
            <div className="col-12">
              <h6 className="dark-text small mb-3 mt-0">{section.nameAr}</h6>
              <div className="box-layout shadow-sm d-flex flex-column w-100 rounded p-4 mb-4">
                {this.renderChapters(section.chapters)}
              </div>
            </div>
          </div>
        </React.Fragment>
      ));
    }
  }

  renderChapters(chapters) {
    if (chapters) {
      return chapters.map(chapter => (
        <React.Fragment>
          <h6 className="dark-text small mb-3 mt-0">{chapter.nameAr}</h6>
          <div className="row">{this.renderLectures(chapter.lectures)}</div>
        </React.Fragment>
      ));
    }
  }

  renderLectures(lectures) {
    const courseId = this.props.match.params.id;
    const sortedLectures = lectures.sort((a, b) =>
      a.order > b.order ? 1 : -1
    );
    if (lectures) {
      return sortedLectures.map(lecture => {
        const scheduledAt = new Date(lecture.scheduledAt);
        var day = scheduledAt.getDate();
        var month = scheduledAt.getMonth() + 1;
        var year = scheduledAt.getFullYear();
        var scheduledDate = year + "-" + month + "-" + day;
        var hijriDate = moment(scheduledDate).format("iYYYY/iM/iD");
        return (
          <div className="col-md-4">
            <Link
              className="dark-text small"
              to={`/subscriptions/${courseId}/recorded-videos/${lecture.id}`}
            >
              <div className="card card-sm shadow-sm border-0">
                <header className="card-thumb">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/course1.png"}
                    alt="Course image"
                  />
                </header>
                <div className="card-body d-flex justify-content-center flex-column">
                  <h6 className="card-title small mid-text pb-2">
                    {lecture.nameAr}
                  </h6>
                  <ul className="list-inline mb-0 d-flex align-items-center">
                    <li className="list-inline-item light-font-text smaller dark-text d-inline-flex align-items-center">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/calendar.png"
                        }
                        height="12"
                        width="12"
                        className="mr-1"
                      />
                      <span className="en-text mr-1">{lecture.duration}</span>
                      ساعة
                    </li>
                    <li className="list-inline-item light-font-text smaller dark-text en-text d-inline-flex align-items-center">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/quarters.png"
                        }
                        height="12"
                        width="12"
                        className="mr-1"
                      />
                      <span className="en-text">{hijriDate}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Link>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.details.sections == undefined ||
        this.state.details.sections.length == 0 ? (
          <React.Fragment>
            <div
              className="box-layout shadow-sm d-flex flex-column w-100 rounded p-4 justify-content-center align-items-center"
              style={{ height: 300 }}
            >
              <img
                src={process.env.PUBLIC_URL + "/assets/images/empty-videos.png"}
                height="90"
                className="contain-img mb-3"
              />
              <p className="dark-text mt-0 mb-0">لا يوجد محضارات مسجلة متاحة</p>
            </div>
          </React.Fragment>
        ) : (
          this.renderSections()
        )}
      </React.Fragment>
    );
  }
}
