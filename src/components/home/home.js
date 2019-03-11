import React, { Component } from "react";
import "./styles.sass";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

const items = [
  {
    id: 1,
    altText: "Slide 1",
    caption:
      "اللغة العربية من اللغات العالمية الأكثر انتشاراً في العالم، وتعتبرُ من إحدى اللغات المُعتمدة في الأمم المُتحدة، كما إنها تشكل اللغة الأولى في مناطق بلاد الشّام، وشبه الجزيرة العربية، وشمال أفريقيا، وساهم هذا الانتشار الواسعُ للغة العربية في تصنيفها كواحدة من اللّغاتِ التي يسعى."
  }
  // {
  //   id: 2,
  //   altText: "Slide 2",
  //   caption:
  //     "اللغة العربية من اللغات العالمية الأكثر انتشاراً في العالم، وتعتبرُ من إحدى اللغات المُعتمدة في الأمم المُتحدة، كما إنها تشكل اللغة الأولى في مناطق بلاد الشّام، وشبه الجزيرة العربية، وشمال أفريقيا، وساهم هذا الانتشار الواسعُ للغة العربية في تصنيفها كواحدة من اللّغاتِ التي يسعى."
  // },
  // {
  //   id: 3,
  //   altText: "Slide 3",
  //   caption:
  //     "اللغة العربية من اللغات العالمية الأكثر انتشاراً في العالم، وتعتبرُ من إحدى اللغات المُعتمدة في الأمم المُتحدة، كما إنها تشكل اللغة الأولى في مناطق بلاد الشّام، وشبه الجزيرة العربية، وشمال أفريقيا، وساهم هذا الانتشار الواسعُ للغة العربية في تصنيفها كواحدة من اللّغاتِ التي يسعى."
  // }
];

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
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

  render() {
    const { activeIndex } = this.state;

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
        <section className="hero-section pb-5">
          <div className="container">
            <div className="row pt-5">
              <div className="col-md-12 d-inline-flex align-items-center pt-5">
                <h2 className="dark-text mb-0 w-25 pt-5 ml-5">
                  <span className="light-text">هدفنا،</span> درجات عالية مو
                  إجتياز وبس!
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section className="categories-section padder">
          <div className="container">
            <div className="row">
              <div className="col-md-6 pb-2">
                <div className="half-circle-border d-flex flex-column align-items-center mx-auto">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/brain.png"}
                    height="45"
                    width="45"
                    className="mt-3 mb-2"
                  />
                  <h6 className="dark-text small text-center">
                    كفايات المعلمين والمعلمات
                  </h6>
                </div>
              </div>
              <div className="col-md-6 pb-2">
                <div className="half-circle-border d-flex flex-column align-items-center mx-auto">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/brain.png"}
                    height="45"
                    width="45"
                    className="mt-3 mb-2"
                  />
                  <h6 className="dark-text small text-center">
                    كفايات المعلمين والمعلمات
                  </h6>
                </div>
              </div>
              <div className="col-md-4 pt-5 pb-2">
                <div className="half-circle-border d-flex flex-column align-items-center mx-auto">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/brain.png"}
                    height="45"
                    width="45"
                    className="mt-3 mb-2"
                  />
                  <h6 className="dark-text small text-center">
                    كفايات المعلمين والمعلمات
                  </h6>
                </div>
              </div>
              <div className="col-md-4 pt-5 pb-2">
                <div className="half-circle-border d-flex flex-column align-items-center mx-auto">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/brain.png"}
                    height="45"
                    width="45"
                    className="mt-3 mb-2"
                  />
                  <h6 className="dark-text small text-center">
                    كفايات المعلمين والمعلمات
                  </h6>
                </div>
              </div>
              <div className="col-md-4 pt-5 pb-2">
                <div className="half-circle-border d-flex flex-column align-items-center mx-auto">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/brain.png"}
                    height="45"
                    width="45"
                    className="mt-3 mb-2"
                  />
                  <h6 className="dark-text small text-center">
                    كفايات المعلمين والمعلمات
                  </h6>
                </div>
              </div>
              <div className="col-md-6 pt-5 pb-2">
                <div className="half-circle-border d-flex flex-column align-items-center mx-auto">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/brain.png"}
                    height="45"
                    width="45"
                    className="mt-3 mb-2"
                  />
                  <h6 className="dark-text small text-center">
                    كفايات المعلمين والمعلمات
                  </h6>
                </div>
              </div>
              <div className="col-md-6 pt-5 pb-2">
                <div className="half-circle-border d-flex flex-column align-items-center mx-auto">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/brain.png"}
                    height="45"
                    width="45"
                    className="mt-3 mb-2"
                  />
                  <h6 className="dark-text small text-center">
                    كفايات المعلمين والمعلمات
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="journey-section section-padder">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/map.svg"}
                  width="100%"
                />
              </div>
              <div className="col-md-4 d-flex flex-column">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/cloud.png"}
                  className="contain-img align-self-end w-75"
                />
                <h5 className="dark-text">بث مباشر</h5>
                <p className="dark-text light-font-text small w-75">
                  اللّغة العربيّة من اللّغات العالميّة الأكثر انتشاراً في
                  العالم، وتعتبرُ من إحدى اللّغات المُعتمدة في الأمم المُتّحدة،
                  كما إنها تشكّلُ اللّغة الأولى في مناطق بلاد الشّام، وشبه
                  الجزيرة العربيّة، وشمال أفريقيا، وساهم هذا الانتشار الواسعُ
                  للّغة العربيّة.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="courses-section pt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h4 className="dark-text">أحدث الدورات</h4>
                <p className="dark-silver-text">
                  لا تفوت فرصة الاشتراك بأحدث دوراتنا
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12" />
            </div>
          </div>
        </section>

        <section className="testimonials-section pt-5">
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
                  src={
                    process.env.PUBLIC_URL + "/assets/images/testimonials.svg"
                  }
                  className="contain-img w-50"
                />
                <h6 className="light-text mb-1">عندك استفسار؟</h6>
                <h6 className="dark-text small mt-0">
                  إحنا موجودين، نعين ونعاون
                </h6>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
