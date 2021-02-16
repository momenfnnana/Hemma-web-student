import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Card } from "../shared/card/card";
import { apiBaseUrl } from "../../api/helpers";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import { loginWithTwitter } from "../auth/firebase";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.sass";

var moment = require("moment");
moment().format();

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      courses: [],
      testimonials: [],
      initiatives: [],
      categoryGroups: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${apiBaseUrl}/categories`)
      .then((response) => {
        this.setState({ categories: response.data.data.data });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${apiBaseUrl}/courses/recent`)
      .then((response) => {
        this.setState({ courses: response.data.data.data });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${apiBaseUrl}/ratings/testimonials`)
      .then((response) => {
        this.setState({ testimonials: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${apiBaseUrl}/Initiatives/singleInitiative`)
      .then((response) => {
        this.setState({ initiatives: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${apiBaseUrl}/CategoryGroups/random`)
      .then((response) => {
        this.setState({ categoryGroups: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderCourses() {
    return this.state.courses.map((course) => (
      <Card key={course.id} course={course} />
    ));
  }
  responseGoogle = (response) => {
    let deviceId = localStorage.getItem("deviceId");
    let data = {
      accessToken: response.accessToken,
      deviceId: deviceId && deviceId != "undefined" ? deviceId : null,
    };
    if (!response.accessToken) return;
    axios
      .post(`${apiBaseUrl}/auth/login_with_google`, data)
      .then((response) => {
        localStorage.setItem("token", response.data.data.token);
        window.location = "/";
      })
      .catch((error) => {
        swal("عفواً", "هذا المستخدم غير موجود", "error", {
          button: "متابعة",
        });

        this.props.history.push("/auth/register");
      });
  };

  responseFacebook = (response) => {
    let deviceId = localStorage.getItem("deviceId");
    let data = {
      accessToken: response.accessToken,
      deviceId: deviceId && deviceId !== "undefined" ? deviceId : null,
    };
    if (!response.accessToken) return;
    axios
      .post(`${apiBaseUrl}/auth/login_with_facebook`, data)
      .then((response) => {
        localStorage.setItem("token", response.data.data.token);
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
        swal("عفواً", "هذا المستخدم غير موجود", "error", {
          button: "متابعة",
        });
        this.props.history.push("/auth/register");
      });
  };
  twitterLogin = async () => {
    loginWithTwitter()
      .then((token) => {
        localStorage.setItem("token", token);
        window.location = "/";
      })
      .catch((error) => {
        swal("عفواً", "هذا المستخدم غير موجود", "error", {
          button: "متابعة",
        });
        this.props.history.push("/auth/register");
      });
  };

  renderCategories() {
    const cats = this.state.categories;
    return (
      <React.Fragment>
        <div className="row d-flex justify-content-center align-items-center">
          {cats.map((cat) => {
            return (
              <div className="col-lg-3 col-6" key={cat.id}>
                <Link to={{
                  pathname: `/categories/details/${cat.slug}`,
                  state: {
                    catId: cat.id,
                  },
                }}>
                  <div className="categories-box d-flex flex-column align-items-center justify-content-center clickable shadow-sm">
                    <img src={cat.icon} alt={cat.nameAr} />
                    <h6 className="dark-text text-center word-break mb-0">{cat.nameAr}</h6>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }

  categoryGroupRedirection(CategoryGroup, slug) {
    let token = localStorage.getItem("token");
    if (token) {
      this.props.history.push(
        `/categories/details/${slug}/quick-questions/${CategoryGroup}`
      );
    } else {
      swal(
        "عفواً",
        "يجب عليك تسجيل الدخول/تسجيل حساب حتى تتمكن من القيام بهذه الخطوة",
        "error",
        {
          button: "متابعة",
        }
      );
    }
  }
  renderCategoriesGroup() {
    const categoryGroups = this.state.categoryGroups;
    return (
      <React.Fragment>
        <div className="row">
          {categoryGroups.map((categoryGroup) => {
            return (
              <div className="col-lg-4 col-md-6" key={categoryGroup.id}>
                <div
                  className="category-group-box clickable shadow-sm d-flex align-items-center"
                  onClick={() =>
                    this.categoryGroupRedirection(
                      categoryGroup.id,
                      categoryGroup.category.slug)}>
                  <div className="row">
                    <div className="col-lg-4">
                      <img
                        key={categoryGroup.id}
                        src={categoryGroup.icon}
                        className="contain-img"
                        alt={categoryGroup.name}
                      />
                    </div>
                    <div className="col-lg-8 d-flex flex-column justify-content-center">
                      <h5 className="text-white">{categoryGroup.name}</h5>
                      <p className="text-white mb-0 word-break">{categoryGroup.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }

  renderTestimonials() {
    return this.state.testimonials.map((testimonial, index) => {
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
        <div key={index} className="testimonial-slide" dir="rtl">
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
                {weeks === "0" ? (
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
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    const testimonialsSettings = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      dots: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <React.Fragment>
        <section className="section-padding">
          <div className="container">
            <div className="row h-100 d-flex align-items-center">
              <div className="col-md-7">
                <h2 className="dark-text mb-3">
                  تحتاج تدريب مكثف لاجتياز اختبارك؟
                </h2>
                <p className="mid-text word-break lead mb-1">
                  همّة تقدم لك
                  تدريب مكثف عن بعد
                  يؤهلك لاجتياز الاختبار بأعلى الدرجات
                </p>
                <p className="mid-text word-break lead"> خبرة أكثر من 25 سنة في خدمة الطلاب والمعلمين</p>
                <Link
                  className="btn yellow-btn btn-width mt-4"
                  to="/categories">
                  اشترك الان
                  </Link>
              </div>
              <div className="col-md-5 d-flex align-items-center justify-content-center">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/home-image-1.png"}
                  width="100%"
                  className="contain-img d-md-block d-none d-sm-none"
                  alt="artwork"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="section-padding">
          <div className="container">
            <div className="row mb-3">
              <div className="col-md-12 text-center">
                <h2 className="dark-text">مجالاتنا</h2>
              </div>
            </div>
            {this.renderCategories()}
          </div>
        </section>
        {/* TODO hide initiative */}
        { <section className="pt-1">
          <div className="container">
            <div className="row mx-auto d-flex justify-content-center align-items-center w-50">
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center ar-text title-groups blue-btn mb-3">
                <Link
                  to={`/initiative/details/${this.state.initiatives &&
                    this.state.initiatives.id}`}
                  className="btn blue-btn justify-content-center d-flex align-items-center"
                >
                  <h2 className="m-2">مبادرات همة </h2>
                </Link>
              </div>
            </div>
          </div>
        </section> }
        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h2 className="dark-text">مميزاتنا</h2>
                <p className="mid-text lead">تتمتع منصتنا بمجموعة من المميزات التي تجعلها في المقدمة</p>
              </div>
            </div>
            <div className="row d-flex align-items-center mt-4">
              <div className="col-md-8 col-12">
                <h3 className="dark-text">
                  حملنا على عاتقنا أمانة الوصول بالمشتركين الى اعلى الدرجات
                  </h3>
                <h6 className="mid-text lead mb-0"> وهذا ما حققناه طيلة السنوات الماضية</h6>
              </div>
              <div className="col-md-4 col-12 slider-box shadow-sm bg-white">
                <Slider {...settings}>
                  <div>
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/slider1.jpg"}
                      width="100%"
                      className="contain-img"
                      alt="artwork" />
                  </div>
                  <div>
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/slider2.jpg"}
                      width="100%"
                      className="contain-img"
                      alt="artwork" />
                  </div>
                  <div>
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/slider3.jpg"}
                      width="100%"
                      className="contain-img"
                      alt="artwork" />
                  </div>
                  <div>
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/slider4.jpg"}
                      width="100%"
                      className="contain-img"
                      alt="artwork" />
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </section>
        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/home-image-2.png"}
                  width="100%"
                  className="contain-img d-md-block d-none d-sm-none"
                  alt="artwork"
                />
              </div>
              <div className="col-md-6 d-flex justify-content-center flex-column text-center">
                <h2 className="dark-text mb-3">تدريب مكثف وأنت ببيتك</h2>
                <p className="mid-text lead mb-1">محتوى شامل يغنيك عن مختلف المراجع</p>
                <p className="mid-text lead mb-0">محاضرات مباشرة تسجل لمتايعتها في اي وقت</p>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="hero-section">
          <div className="container">
            <div className="row w-75 mx-auto d-flex justify-content-center align-items-center">
              <div className="col-md-6">
                <h2 className="dark-text">مناقشات</h2>
                <h5>
                  محدده مسبقا تجمع المدربين والفريق وكل المشاركين ،أرسل
                  استفساراتك وشاركهم بالمناقشة بشكل حي ،كل الماقشات تحفظ للرجوع
                  اليها في أي وقت!
                </h5>
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/home-image-3.png"
                  }
                  width="100%"
                  className="contain-img d-md-block d-none d-sm-none"
                  alt="artwork"
                />
              </div>
            </div>
          </div>
        </section> */}
        {this.state.categoryGroups && this.state.categoryGroups.length > 0 && (
          <section className="section-padding">
            <div className="container">
              <div className="row mb-3">
                <div className="col-md-12 text-center">
                  <h2 className="dark-text">المجموعات المجانية</h2>
                </div>
              </div>
              {this.renderCategoriesGroup()}
            </div>
          </section>
        )}
        {!this.state.testimonials === undefined ||
          (this.state.testimonials.length !== 0 && (
            <section className="section-padding testimonials-section">
              <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-md-6">
                    <div className="quotes">
                      <h1 className="dark-text mb-0">قالوا عنا</h1>
                      <img
                        src={process.env.PUBLIC_URL + "/assets/images/quotes.png"}
                        alt="testimonials"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Slider {...testimonialsSettings}>
                      {this.renderTestimonials()}
                    </Slider>
                  </div>
                </div>
              </div>
            </section>
          ))}
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

HomeComponent = connect(mapStateToProps)(HomeComponent);

export const Home = HomeComponent;
