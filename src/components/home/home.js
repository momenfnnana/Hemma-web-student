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
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import SliderDes from "../features-slider/slider-des";
import data from "../features-slider/data";
import { apiBaseUrl } from "../../api/helpers";

const items = [
  {
    id: 1,
    altText: "Slide 1",
    caption:
      "كل الشكر لسلسلة بالبيد التعليمية سلسلة تعتني بالمشتركين وتهتم لحل كل عقبة تعترضهم فشكراً لكم."
  },
  {
    id: 2,
    altText: "Slide 2",
    caption: "تستاهلون كل خير فعلاً دورة متكاملة وقوية"
  },
  {
    id: 3,
    altText: "Slide 3",
    caption: "سلسلة بالبيد ما شاء الله مجهود رائع وتنظيم مرتب والملزمة كنز عظيم"
  },
  {
    id: 4,
    altText: "Slide 4",
    caption: "شكراً سلسلة بالبيد الله يوفق جميع القائمين عليها يا رب"
  },
  {
    id: 5,
    altText: "Slide 5",
    caption:
      "أولا الشكر لله ثم لسلسلة بالبيد المعطاة المتميزة شكرا لكم من القلب شكراً لثقتنا التي لم تخيب بالله ثم جهودكم شكرا لكل ما قدمتوه الحمدالله نجحنا وصنعنا الفرق و القادم أفضل"
  }
];

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
              <div className="mt-5 mb-3 col-lg-3 col-6">
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
            className="dark-text small light-font-text d-block mt-0 d-flex align-items-center justify-content-center"
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

        <section className="features-section">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-2 d-none d-md-block order-md-1">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/quotes.png"}
                  className="contain-img"
                  width="100%"
                />
              </div>
              <div className="col-md-5 order-2">
                <h4 className="dark-text mb-3">قالوا عنا..</h4>

                <div>
                  <style>
                    {`.custom-tag {
                    width: 100%;
                    height: 180px;
                    border-radius: 11px;
                    background-color: #dff1f5;}`}
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
              <div className="col-md-5 order-1 order-md-3">
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
