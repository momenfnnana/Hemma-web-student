import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from "react-accessible-accordion";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import { Link } from "react-router-dom";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";
import ScheduleHeader from "./schedual-header/index";
import { ScheduleSection } from "./section";
import { Lecture } from "../../shared/lecture/lecture";

var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

export class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = { details: [], isPageLoading: false };
  }

  componentDidMount() {
    this.setState({ isPageLoading: true });
    const courseId = this.props.match.params.id;

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${apiBaseUrl}/content/${courseId}/content`, { headers })
      .then((response) => {
        this.setState({ details: response.data.data, isPageLoading: false });
      })
      .catch((error) => {
        this.setState({ isPageLoading: false });
        console.log(error);
      });
  }

  renderChallenges() {
    return (
      <React.Fragment>
        <div className="box-layout shadow-sm d-flex flex-column justify-content-center align-items-center w-100 rounded p-3">
          <h6 className="small mid-text">التحدي الأول</h6>
          <h6 className="smaller mid-text pb-2">أحمد علي</h6>
          <button
            type="submit"
            className="btn light-outline-btn unset-height btn-sm w-50"
          >
            انضم
          </button>
        </div>
      </React.Fragment>
    );
  }

  renderSections() {
    const sections = this.state.details.sections;

    if (sections) {
      return sections.map((section) => (
        <div className="row mt-3" key={section.id}>
          <div className="col-12">
            <div className="card section-card" key={section.id}>
              <div className="card-header border-bottom-0">
                <h6 className="text-white small mb-0 ">{section.nameAr}</h6>
              </div>
              {this.renderChapters(section.chapters)}
            </div>
          </div>
        </div>
      ));
    }
  }

  renderChapters(chapters) {
    const sortedChapters = chapters.sort((a, b) =>
      a.order > b.order ? 1 : -1
    );
    if (sortedChapters) {
      return sortedChapters.map((chapter) => (
        <Accordion key={chapter.id}>
          <AccordionItem expanded={true}>
            <AccordionItemTitle>
              <h6 className="dark-text mb-0 small dark-text">
                {chapter.nameAr}
              </h6>
            </AccordionItemTitle>
            <AccordionItemBody>
              <ul className="list-group list-group-flush flex-fill">
                {this.renderLectures(chapter.lectures)}
              </ul>
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      ));
    }
  }

  renderMessages() {
    const messages = this.state.messages;
    return messages.map((message) => {
      const user = this.getUser(message.author);
      return (
        <React.Fragment>
          <div
            className="chat-message"
            ref={this.newMessageAdded}
            key={message.id}
          >
            <div className="d-flex align-items-center">
              {user && (
                <h6 className="mid-text smaller mt-0 mb-0">{user.name}</h6>
              )}
            </div>

            <div className="speech-bubble">
              <p className="light-font-text mt-0 mb-0">{message.body}</p>
            </div>
          </div>
        </React.Fragment>
      );
    });
  }

  renderLectures(lectures) {
    const courseId = this.props.match.params.id;
    const sortedLectures = lectures.sort((a, b) =>
      a.order > b.order ? 1 : -1
    );

    if (sortedLectures) {
      return sortedLectures.map((lecture) => {
        return (
          <React.Fragment key={lecture.id}>
            {lecture.status == "Recorded" ? (
              <Link
                to={`/course/content/${courseId}/lecture/${lecture.id}`}
                className="list-group-item bg-transparent small dark-silver-text light-font-text"
              >
                {this.renderLecture(lecture)}
              </Link>
            ) : (
              <div className="list-group-item bg-transparent small dark-silver-text light-font-text">
                {this.renderLecture(lecture)}
              </div>
            )}
          </React.Fragment>
        );
      });
    }
  }

  renderLecture(lecture) {
    const scheduledAt = new Date(lecture.scheduledAt);
    var day = scheduledAt.getDate();
    var month = scheduledAt.getMonth() + 1;
    var year = scheduledAt.getFullYear();
    var scheduledDate = year + "-" + month + "-" + day;
    var hijriDate = moment(scheduledDate, "YYYY-MM-DD").format("iYYYY/iM/iD");
    return (
      <div className="row" key={lecture.id}>
        <div className="col-6">
          {lecture.status == "Recorded" && (
            <img
              src={process.env.PUBLIC_URL + "/assets/images/play.png"}
              className="mr-2"
              height="15"
            />
          )}
          {lecture.nameAr}
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center">
          {lecture.status == "Live" ? (
            <div className="small mb-0 d-flex align-items-center">
              <span className="en-text">{hijriDate}</span>{" "}
              <span className="badge light-bg ml-2 text-white">مباشرة</span>
            </div>
          ) : lecture.status == "Scheduled" ? (
            <div className="small mb-0 d-flex align-items-center">
              <span className="en-text">{hijriDate}</span>{" "}
              <span className="badge mid-bg ml-2 text-white">مجدولة</span>
            </div>
          ) : lecture.status == "Recorded" ? (
            <div className="small mb-0 d-flex align-items-center">
              <span className="en-text">{hijriDate}</span>{" "}
              <span className="badge red-bg ml-2 text-white">مسجلة</span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  render() {
    // var settings = {
    //   infinite: false,
    //   slidesToShow: 3,
    //   slidesToScroll: 1,
    //   autoplay: true,
    //   autoplaySpeed: 2000,
    //   responsive: [
    //     {
    //       breakpoint: 1024,
    //       settings: {
    //         slidesToShow: 3,
    //         slidesToScroll: 3,
    //         infinite: false
    //       }
    //     },
    //     {
    //       breakpoint: 600,
    //       settings: {
    //         slidesToShow: 2,
    //         slidesToScroll: 2,
    //         initialSlide: 2
    //       }
    //     },
    //     {
    //       breakpoint: 480,
    //       settings: {
    //         slidesToShow: 1,
    //         slidesToScroll: 1
    //       }
    //     }
    //   ]
    // };
    const { subscription, courseId } = this.props;
    const liveStatus = 'Live'

    const allLectures  = this.state.details?.sections?.map(section => section.chapters)?.flat()?.map(chap => chap.lectures).flat()
    const liveLecture = allLectures?.find(lecture => lecture.status === liveStatus)

   

    return (
      <>
        <div className="row no-gutters">
          <div className="col-12">
            {subscription && subscription.chatChannelSid && (
              <>
                <p className="mb-3 mt-3 mt-md-0">{subscription.nameAr}</p>
               {liveLecture &&  <Lecture
               details={liveLecture}
                  subscription={subscription}
                  id={courseId}
                  chatChannelSid={subscription.chatChannelSid}
                />}
              </>
            )}
          </div>
        </div>
        {this.props.designType == 0 ? (
          <>{this.props.children}</>
        ) : (
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
                <div className="row no-gutters">
                  {/* <div className="col-12 mb-4">
            <div className="d-flex justify-content-between">
              <h6 className="dark-text small mb-0 mt-0">
                آخر التحديات المضافة
              </h6>
              <h6 className="dark-silver-text smaller mb-0 mt-0">
                مشاهدة الجميع
              </h6>
            </div>
          </div>
          <div className="col-12 mb-4">
            <Slider {...settings}>{this.renderChallenges()}</Slider>
          </div> */}
                  <div className="col-12">
                    {/* <h6 className="dark-text small mb-0 mt-0">
              {this.props.courseName}
            </h6> */}

                    {this.state.details?.sections?.map((section) => (
                      <ScheduleSection
                        section={section}
                        title={this.props.courseName}
                        courses={this.props.courseName}
                        {...this.props}
                      />
                    ))}
                  </div>
                  {/* 
              {this.state.details.sections == undefined ||
              this.state.details.sections == 0 ? (
                <div className="col-12">
                  <div
                    className="silver-bg box-layout w-100 pb-0 p-4 mt-4 d-flex flex-column align-items-center justify-content-center"
                    style={{ height: 250 }}
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/event.png"}
                      className="mb-3"
                      height="60"
                    />{" "}
                    <p className="silver-text">
                      سيتم عرض جدول الدورة فور توفره{" "}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                <div className="col-12">{this.renderSections()}</div>
                </>
              )} */}
                </div>
              </React.Fragment>
            )}
          </>
        )}
      </>
    );
  }
}
