import React, { Component } from "react";
import "../styles.sass";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";

var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

export class RecordedLectures extends Component {
  constructor(props) {
    super(props);
    this.state = { details: [],
      isPageLoading: false
     };
  }

  componentDidMount() {
    this.setState({ isPageLoading: true });
    const courseId = this.props.match.params.id;

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/content/${courseId}/recorded_lectures`, { headers })
      .then(response => {
        this.setState({ details: response.data.data, isPageLoading: false });
      })
      .catch(error => {
        this.setState({ isPageLoading: false });
        console.log(error);
      });
  }

  renderSections() {
    const sections = this.state.details.sections;
    sections.sort((a, b) => {
      return a.order - b.order;
  });
    if (sections) {
      return sections.map(section => (
        <React.Fragment>
          <div className="row no-gutters" key={section.id}>
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
    const sortedChapters = chapters.sort((a, b) =>
      a.order > b.order ? 1 : -1
    );
    if (sortedChapters) {
      return sortedChapters.map(chapter => (
        <React.Fragment key={chapter.id}>
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
    if (sortedLectures) {
      return sortedLectures.map(lecture => {
        const scheduledAt = new Date(lecture.scheduledAt);
        var day = scheduledAt.getDate();
        var month = scheduledAt.getMonth() + 1;
        var year = scheduledAt.getFullYear();
        var scheduledDate = year + "-" + month + "-" + day;
        var hijriDate = moment(scheduledDate, "YYYY-MM-DD").format("iYYYY/iM/iD");
        return (
          <div className="col-md-4" key={lecture.id}>
            <Link
              className="dark-text small"
              to={`/course/content/${courseId}/lecture/${lecture.id}`}
            >
              <div className="card card-sm shadow-sm border-0">
                <header className="card-thumb">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/course1.png"}
                    alt={lecture.nameAr}
                    className="w-100"
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
                      ????????
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
      <>
      {this.state.isPageLoading ? (
        <div
        className="silver-bg box-layout w-100 pb-0 p-3 mt-4 d-flex justify-content-center align-items-center"
        style={{ minHeight: 350 }}
      >
        <Loader type="ball-spin-fade-loader" className="dark-loader" />
      </div>
      ) : (
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
              <p className="dark-text mt-0 mb-0">???? ???????? ?????????????? ?????????? ??????????</p>
            </div>
          </React.Fragment>
        ) : (
          this.renderSections()
        )}
        {/* <React.Fragment>
          <div
            className="box-layout shadow-sm d-flex flex-column w-100 rounded p-4 justify-content-center align-items-center"
            style={{ height: 350 }}
          >
            <img
              src={process.env.PUBLIC_URL + "/assets/images/repair.png"}
              height="90"
              className="contain-img mb-3"
            />
            <p className="dark-text mt-0 mb-1">???????????? ?????? ??????????????</p>
            <p className="dark-text mt-0 mb-0">
              ???????? ?????? ???????????????????? ???????? ???????? ?????? ???????? ????????
            </p>
          </div>
        </React.Fragment> */}
      </React.Fragment>
      )}
      </>
    );
  }
}
