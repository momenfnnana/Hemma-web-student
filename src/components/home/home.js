import React, { Component } from "react";
import "./styles.sass";
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../shared/card/card";

const items = [
  {
    id: 1,
    altText: "Slide 1",
    caption:
      "اللغة العربية من اللغات العالمية الأكثر انتشاراً في العالم، وتعتبرُ من إحدى اللغات المُعتمدة في الأمم المُتحدة، كما إنها تشكل اللغة الأولى في مناطق بلاد الشّام، وشبه الجزيرة العربية، وشمال أفريقيا، وساهم هذا الانتشار الواسعُ للغة العربية في تصنيفها كواحدة من اللّغاتِ التي يسعى."
  }
];

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0, categories: [], courses: [] };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  componentDidMount() {
    axios
      .get("https://api.staging.hemma.sa/api/v1/categories")
      .then(response => {
        this.setState({ categories: response.data.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("https://api.staging.hemma.sa/api/v1/courses/recent")
      .then(response => {
        this.setState({ courses: response.data.data.data });
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
        <div className="row">
          {cats.map((cat, i) => {
            const mod = i % 5;
            const col =
              mod === 0 || mod === 1 ? "col-lg-6 col-6" : "col-lg-4 col-6";
            return (
              <div className={`mt-5 mb-3 ${col}`}>
                <Link to={`/categories/details/${cat.id}`} key={cat.id}>
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

  render() {
    const { activeIndex } = this.state;
    var settings = {
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

    const slides = items.map(item => {
      return (
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={item.id}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
          <CarouselCaption
            className="dark-text small light-font-text"
            captionText={item.caption}
          />
        </CarouselItem>
      );
    });

    return (
      <React.Fragment>
        <section className="hero-section">
          <div className="container">
            <div className="row h-100 d-flex align-items-center">
              <div className="col-md-4">
                <h2 className="dark-text">
                  <span className="light-text">هدفنا،</span> درجات عالية مو
                  إجتياز وبس!
                </h2>
              </div>
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

        <section className="categories-section pt-5 pb-5">
          <div className="container">{this.renderCategories()}</div>
        </section>

        <section className="journey-section section-padder">
          <div className="container">
            <div className="row d-flex h-100 align-items-center">
              <div className="col-md-6 d-flex flex-column">
                <div>
                  <h5 className="dark-text mt-0">بث مباشر</h5>
                  <p className="dark-text light-font-text small w-75">
                    لصفحة وليس مقاطع النشر دليل المقروء صار. ألدوس توزيعاَ قرون
                    إصدار ليتراسيت. أيضاً للنص ما الشكل وليس مقاطع مقاطع هذا هذا
                    بل مستخدماً. لصفحة وليس مقاطع النشر دليل المقروء صار. ألدوس
                    توزيعاَ قرون إصدارليتراسيت. أيضاً للنص ما الشكل وليس مقاطع
                    مقاطع هذا هذا بل مستخدماً.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/features.png"}
                  width="100%"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="courses-section">
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
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-2">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/quotes.png"}
                  className="contain-img"
                  width="100%"
                />
              </div>
              <div className="col-md-5">
                <h4 className="dark-text mb-3">قالوا عنا..</h4>

                <div>
                  <style>
                    {`.custom-tag {
                    width: 100%;
                    height: 180px;
                    border-radius: 11px;
                    background-color: #dff1f5;
                      }`}
                  </style>
                  <Carousel
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                  >
                    <CarouselIndicators
                      items={items}
                      activeIndex={activeIndex}
                      onClickHandler={this.goToIndex}
                    />
                    {slides}
                  </Carousel>
                </div>
              </div>
              <div className="col-md-5">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/faq.png"}
                  className="contain-img w-75 float-right"
                />
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
