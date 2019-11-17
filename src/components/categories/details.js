import React, { Component } from "react";
import axios from "axios";
import { FaGraduationCap } from "react-icons/fa";
import Slider from "react-slick";
import { Card } from "../shared/card/card";
import { CardsList } from "../shared/cardsList/cardsList";
import { PublicationDetails } from "../publication/publication";
import { apiBaseUrl } from "../../api/helpers";
import { Helmet } from "react-helmet";
import swal from "@sweetalert/with-react";
import "./styles.sass";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

export class CategoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      lectures: [],
      content: [],
      publications: [],
      courses: [],
      selectedPublicationId: null,
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(id) {
    this.setState({ modalIsOpen: true, selectedPublicationId: id });
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    axios
      .get(`${apiBaseUrl}/categories/${params.slug}`)
      .then(response => {
        this.setState({ details: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`${apiBaseUrl}/FreeLectures?categoryIdOrSlug=${params.slug}`)
      .then(response => {
        this.setState({ lectures: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`${apiBaseUrl}/categories/${params.slug}/publications`)
      .then(response => {
        this.setState({ publications: response.data.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(
        `${apiBaseUrl}/categories/` + params.slug + "/courses?featuredOnly=true"
      )
      .then(response => {
        this.setState({ courses: response.data.data.data });
        setTimeout(
          function() {
            this.setState({ loading: false });
          }.bind(this),
          800
        );
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderPublications() {
    return this.state.publications.map(publication => (
      <React.Fragment>
        <div
          className="publication-img"
          key={publication.id}
          onClick={() => this.openModal(publication.id)}
        >
          <img
            src={publication.thumbnailUrl}
            width="100%"
            alt={publication.id}
          />
          <div className="publication-overlay">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/eye.png"}
              alt={publication.id}
            />
          </div>
        </div>
      </React.Fragment>
    ));
  }

  renderCards() {
    return this.state.courses.map(course => (
      <React.Fragment>
        <div className="col-md-4" key={course.id}>
          <Card key={course.id} course={course} />
        </div>
      </React.Fragment>
    ));
  }

  openFreeLecture(lecture) {
    let token = localStorage.getItem("token");
    if (token) {
      window.open(lecture.broadcastUrl, "_blank");
    } else {
      swal(
        "عفواً",
        "يجب عليك تسجيل الدخول/تسجيل حساب حتى تتمكن من القيام بهذه الخطوة",
        "error",
        {
          button: "متابعة"
        }
      );
    }
  }

  renderLectures() {
    const sortedLectures = this.state.lectures.sort(
      (b, a) => a.scheduledAt - b.scheduledAt
    );

    return sortedLectures.map(lecture => {
      const scheduledAt = new Date(lecture.scheduledAt);
      //Date
      var day = scheduledAt.getDate();
      var month = scheduledAt.getMonth() + 1;
      var year = scheduledAt.getFullYear();
      var scheduledDate = year + "-" + month + "-" + day;
      var hijriDate = moment(scheduledDate).format("iYYYY/iM/iD");
      //Time
      var lectureTime = scheduledAt.getTime();
      const hours = `0${new Date(lectureTime).getHours()}`.slice(-2);
      const minutes = `0${new Date(lectureTime).getMinutes()}`.slice(-2);
      const time = `${hours}:${minutes}`;
      var ampm = hours < 12 || hours === 24 ? "AM" : "PM";

      return (
        <li
          key={lecture.id}
          className="list-group-item d-flex justify-content-between align-items-center"
          dir="rtl"
        >
          <div className="media d-flex align-items-center">
            <div className="gradient-bg mr-4 d-flex align-items-center justify-content-center">
              <FaGraduationCap className="text-white" size="34" />
            </div>
            <div className="media-body">
              <h6 className="dark-text">{lecture.nameAr}</h6>
              <div className="d-flex align-items-center">
                <h5 className="mid-text small en-text d-flex align-items-center">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/calendar.png"}
                    height="12"
                    width="12"
                    className="mr-1"
                  />
                  {hijriDate}
                </h5>

                <h5 className="mid-text small en-text d-flex align-items-center">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/clock.png"}
                    className="mr-1 ml-3"
                    height="15"
                    alt="Time"
                  />
                  <span dir="ltr">
                    {time} {ampm}
                  </span>
                </h5>
              </div>
              {lecture.instructor && (
                <p className="light-text small mb-0">
                  {lecture.instructor && lecture.instructor.name}
                </p>
              )}
            </div>
          </div>
          {lecture.broadcastUrl && (
            <button
              className="btn light-outline-btn unset-height"
              onClick={() => this.openFreeLecture(lecture)}
            >
              انضم
            </button>
          )}
        </li>
      );
    });
  }

  render() {
    var settings = {
      dots: true,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    };

    var verticalCarousel = {
      infinite: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000,
      arrows: true,
      vertical: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true
          }
        }
      ]
    };

    const {
      match: { params }
    } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{`${this.state.details.nameAr} | منصّة همّة التعليمية`}</title>
          <meta name="description" content={this.state.details.descriptionAr} />
        </Helmet>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="half-circle-border d-flex justify-content-center align-items-center mx-auto">
                  <img
                    src={this.state.details.icon}
                    height="50"
                    width="50"
                    className="mt-3"
                    alt={this.state.details.nameAr}
                  />
                </div>
                <h5 className="dark-text mt-3">{this.state.details.nameAr}</h5>
                <p className="dark-text mt-2 small w-40 mx-auto">
                  {this.state.details.descriptionAr}
                </p>
              </div>
            </div>

            {this.state.lectures && this.state.lectures.length > 0 ? (
              <div className="row pt-5 pb-4">
                <div className="col-md-4">
                  <h4 className="dark-text mt-3">
                    لأننا حابين نفيدكم قدمنا لكم
                  </h4>
                  <h4 className="light-text">محاضرات مجانية</h4>
                  <p className="dark-silver-text small text-break">
                    نقدم مجموعة من المحاضرات المجانية كل أسبوعتابعونا لتعرفوا
                    المزيد
                  </p>
                </div>
                <div className="col-md-8">
                  <Slider {...verticalCarousel}>{this.renderLectures()}</Slider>
                </div>
              </div>
            ) : null}

            <div className="row">
              <div className="col-12 pt-4">
                <h5 className="dark-text">الدورات المتاحة</h5>
              </div>
            </div>
            <div className="row pt-2 pb-5">{this.renderCards()}</div>

            {this.state.publications && this.state.publications.length > 0 ? (
              <div className="row pt-5">
                <div className="col-12 text-center">
                  <h3 className="dark-text">إصداراتنا</h3>
                  <p className="dark-silver-text">
                    احصل على آخر إصداراتنا في القدرات والتحصيلي
                  </p>
                </div>

                <div className="col-12">
                  <Slider {...settings}>{this.renderPublications()}</Slider>
                  <PublicationDetails
                    id={this.state.selectedPublicationId}
                    modalIsOpen={this.state.modalIsOpen}
                    onClose={this.closeModal}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </React.Fragment>
    );
  }
}
