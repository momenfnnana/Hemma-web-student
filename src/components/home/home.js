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
  },
  {
    thumbnail: process.env.PUBLIC_URL + "/assets/images/challenges.png",
    description: <SliderDes data={data.features[4]} />
  }
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
              <div className="col-lg-3 col-6" key={cat.id}>
                <Link
                  to={{
                    pathname: `/categories/details/${cat.slug}`,
                    state: {
                      catId: cat.id
                    }
                  }}
                  key={cat.id}
                >
                  <div
                    key={cat.id}
                    className="shadow-box custom-height d-flex flex-column align-items-center justify-content-center clickable"
                  >
                    <img
                      key={cat.id}
                      src={cat.icon}
                      height="30"
                      width="30"
                      className="contain-img mb-2"
                    />
                    <h6 className="dark-text small text-center mb-0">
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
              <div className="col-md-4">
                <h3 className="dark-text">سلسلة بالبيد التعليمية</h3>
                <h3 className="dark-text">٢٥ عاماً في خدمة</h3>
                <h3 className="light-text"> الطلاب و الطالبات</h3>
              </div>
              <div className="col-md-8 d-flex align-items-center justify-content-center">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/home-artwork.png"
                  }
                  width="100%"
                  className="contain-img"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="categories-section mt-4">
          <div className="container">
            <div className="row mb-3">
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
                <h4 className="dark-text mb-1">منصاتنا</h4>
                <p className="dark-text">
                  تعرف على ابرز منصاتنا التعليمية القيمة{" "}
                </p>
              </div>
            </div>
            {this.renderCategories()}
          </div>
        </section>

        <section className="journey-section section-padder">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h4 className="dark-text mb-1">مميزاتنا</h4>
                <p className="dark-text">
                  تتمتع منصتنا بمجموعة من المميزات التي تجعلها في المقدمة
                </p>
              </div>
            </div>
            <div className="row">
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
            <div className="row mb-3">
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
                <h4 className="dark-text mb-1">ابرز الدورات</h4>
                <p className="dark-text">
                  تعرف على ابرز الدورات التعليمية القيمة
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Slider {...settings}>{this.renderCourses()}</Slider>
              </div>
            </div>
          </div>
        </section>
        {/* <section>
          <div className="container">
            <div className="row mb-3">
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
                <h4 className="dark-text mb-1">خطوات الإشتراك بالدورة</h4>
                <p className="dark-text">
                  يمكنك الان التسجيل بأحد دوراتنا باتباعك للخطوات التالية
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12"></div>
            </div>
          </div>
        </section> */}
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
