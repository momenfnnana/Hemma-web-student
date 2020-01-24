import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../shared/card/card";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import SliderDes from "../features-slider/slider-des";
import data from "../features-slider/data";
import { apiBaseUrl } from "../../api/helpers";
import "./styles.sass";

var moment = require("moment");
moment().format();

const images = [
  {
    thumbnail: process.env.PUBLIC_URL + "/assets/images/live-stream.png",
    description: <SliderDes data={data.features[0]} />
  },
  {
    thumbnail: process.env.PUBLIC_URL + "/assets/images/recorded.png",
    description: <SliderDes data={data.features[1]} />
  },
  {
    thumbnail: process.env.PUBLIC_URL + "/assets/images/challenge.png",
    description: <SliderDes data={data.features[2]} />
  },
  {
    thumbnail: process.env.PUBLIC_URL + "/assets/images/discussions.png",
    description: <SliderDes data={data.features[3]} />
  }
  // {
  //   thumbnail: process.env.PUBLIC_URL + "/assets/images/challenges.png",
  //   description: <SliderDes data={data.features[4]} />
  // },
  // {
  //   thumbnail: process.env.PUBLIC_URL + "/assets/images/go.png",
  //   description: <SliderDes data={data.features[5]} />
  // }
];

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], courses: [], testimonials: [] };
  }

  componentDidMount() {
    axios
      .get(`${apiBaseUrl}/categories`)
      .then(response => {
        this.setState({ categories: response.data.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`${apiBaseUrl}/courses/recent`)
      .then(response => {
        this.setState({ courses: response.data.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`${apiBaseUrl}/ratings/testimonials`)
      .then(response => {
        this.setState({ testimonials: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderCourses() {
    return this.state.courses.map(course => (
      <Card key={course.id} course={course} />
    ));
  }

  renderCategories() {
    const cats = this.state.categories;
    return (
      <React.Fragment>
        <div className="row w-75 mx-auto d-flex justify-content-center align-items-center">
          {cats.map((cat, i) => {
            return (
              <div className="mt-5 mb-3 col-lg-3 col-6" key={cat.id}>
                <Link to={`/categories/details/${cat.slug}`} key={cat.id}>
                  <div
                    key={cat.id}
                    className="half-circle-border d-flex flex-column align-items-center mx-auto"
                  >
                    <img
                      key={cat.id}
                      src={cat.icon}
                      height="45"
                      className="mt-3 mb-2"
                    />
                    <h6 className="dark-text small text-center">
                      {cat.nameAr}
                    </h6>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }

  renderTestimonials() {
    return this.state.testimonials.map(testimonial => {
      let currentDate = new Date();
      let getCurrentDate =
        currentDate.getFullYear() +
        "-" +
        (currentDate.getMonth() + 1) +
        "-" +
        currentDate.getDate();
      let testimonialDate = new Date(testimonial.createdAt);
      let getTestimonialDate =
        testimonialDate.getFullYear() +
        "-" +
        (testimonialDate.getMonth() + 1) +
        "-" +
        testimonialDate.getDate();
      let currentDay = moment(getCurrentDate);
      let testimonialDay = moment(getTestimonialDate);
      let diff = moment.duration(currentDay.diff(testimonialDay));
      let weeks = Math.floor(diff.asWeeks());
      let days = diff.days() % 7;
      return (
        <div className="testimonial-slide" dir="rtl">
          <div className="row">
            <div className="col-md-12 mb-3">
              <p className="light-font-text small mid-text mb-0">
                {testimonial.feedBack}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 d-flex align-items-center justify-content-between">
              <div>
                <h6 className="mid-text small mb-1">
                  - {testimonial.studentName}
                </h6>
                <p className="light-font-text smaller mid-text mb-0">
                  {testimonial.courseName}
                </p>
              </div>
              <p className="light-font-text small dark-silver-text mb-0">
                {weeks == "0" ? (
                  <React.Fragment>
                    قبل <span className="en-text">{days}</span> أيام
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    قبل <span className="en-text">{weeks}</span> أسابيع
                  </React.Fragment>
                )}
              </p>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const settings = {
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 2000,
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
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    const testimonialsSettings = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      fade: true,
      dots: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <React.Fragment>
        <section className="hero-section">
          <div className="container">
            <div className="row h-100 d-flex align-items-center">
              <div className="col-md-4" />
              <div className="col-md-8 d-flex align-items-center justify-content-center">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/home-artwork.png"
                  }
                  width="100%"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="categories-section">
          <div className="container">{this.renderCategories()}</div>
        </section>

        <section className="journey-section section-padder">
          <div className="container">
            <div className="row d-flex h-100 align-items-center">
              <div className="col-md-12">
                <div className="featureSlider" id="featureSection">
                  <div className="featureDesWrapper">
                    <ImageGallery
                      items={images}
                      originalClass="feature-img"
                      showPlayButton={false}
                      showFullscreenButton={false}
                      showNav={true}
                      isRTL={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="courses-section pt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Slider {...settings}>{this.renderCourses()}</Slider>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h4 className="dark-text">قالوا عنا..</h4>
              </div>
            </div>
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-6 order-2">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/quotes.png"}
                  className="contain-img"
                  height="50"
                  className="quotes-img"
                />
                <Slider {...testimonialsSettings}>
                  {this.renderTestimonials()}
                </Slider>
              </div>
              <div className="col-md-6 order-1 order-md-3">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/testimonials.png"
                  }
                  className="contain-img"
                  width="100%"
                  height="250"
                />
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
