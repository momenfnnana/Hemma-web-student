import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../shared/card/card";
import { apiBaseUrl } from "../../api/helpers";
import "./styles.sass";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import { loginWithTwitter } from "../auth/firebase";
import { Button } from "reactstrap";

var moment = require("moment");
moment().format();

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], courses: [], testimonials: [] };
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
        console.log(response);
        this.setState({ testimonials: response.data.data });
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
      deviceId: deviceId && deviceId != "undefined" ? deviceId : null,
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
        <div className="row w-75 mx-auto d-flex justify-content-center align-items-center">
          {cats.map((cat, i) => {
            return (
              <div className="col-lg-3 col-6" key={cat.id}>
                <Link
                  to={{
                    pathname: `/categories/details/${cat.slug}`,
                    state: {
                      catId: cat.id,
                    },
                  }}
                  key={cat.id}
                >
                  <div
                    key={cat.id}
                    className="categories-box-layout custom-height d-flex flex-column align-items-center justify-content-center clickable mb-2"
                  >
                    <img
                      key={cat.id}
                      src={cat.icon}
                      height="50%"
                      width="50%"
                      className="contain-img mb-2"
                      alt={cat.nameAr}
                    />
                    <h6 className="dark-text text-center mb-0">{cat.nameAr}</h6>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
  renderCategoriesGroup() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <Link to="">
              <div className="categories-group-layout d-flex clickable mb-2">
                <div className="col-lg-4 p-0 ml-2">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/competitions.png"
                    }
                    height="100%"
                    width="100%"
                    className="contain-img mb-2"
                    alt=""
                  />
                </div>
                <div className="col-lg-8 p-0 ml-2">
                  <h5 className="text-center mb-2 mt-4">مجموعة الرياضيات</h5>
                  <h6>وصف المجموعة</h6>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 col-md-6">
            <Link to="">
              <div className="categories-group-layout d-flex clickable mb-2">
                <div className="col-lg-4 p-0 ml-2">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/competitions.png"
                    }
                    height="100%"
                    width="100%"
                    className="contain-img mb-2"
                    alt=""
                  />
                </div>
                <div className="col-lg-8 p-0 ml-2">
                  <h5 className="text-center mb-2 mt-4">مجموعة الرياضيات</h5>
                  <h6>وصف المجموعة</h6>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 col-md-6">
            <Link to="">
              <div className="categories-group-layout d-flex clickable mb-2">
                <div className="col-lg-4 p-0 ml-2">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/competitions.png"
                    }
                    height="100%"
                    width="100%"
                    className="contain-img mb-2"
                    alt=""
                  />
                </div>
                <div className="col-lg-8 p-0 ml-2">
                  <h5 className="text-center mb-2 mt-4">مجموعة الرياضيات</h5>
                  <h6>وصف المجموعة</h6>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderTestimonials() {
    return this.state.testimonials.map((testimonial) => {
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
        <section className="hero-section">
          <div className="container">
            <div className="row h-100 d-flex align-items-center">
              <div className="col-md-8">
                <h2 className="dark-text">تحتاج تدريب مكثف لاجتياز اختبارك؟</h2>
                <h5>
                  همه تقدم لك
                  <span className="blue-text"> تدريب مكثف عن بعد </span>
                  يأهلك لاجتياز الاختبار بأعلى الدرجات
                </h5>
                <h5> خبرة أكثر من 25 سنة في خدمة الطلاب والمعلمين</h5>
                <div className="mt-4">
                  <Button className="btn w-20 yellow-btn justify-content-center d-flex light-text align-items-center">
                    اشترك الان
                  </Button>
                </div>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-center">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/home-artwork.png"
                  }
                  width="100%"
                  className="contain-img d-md-block d-none d-sm-none"
                  alt="artwork"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="categories-section pt-0">
          <div className="container">
            <div className="row mb-3">
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
                <h2 className="dark-text mb-1">مجالاتنا</h2>
              </div>
            </div>
            {this.renderCategories()}
          </div>
        </section>

        <section className="pt-1">
          <div className="container">
            <div className="row w-75 mx-auto d-flex justify-content-center align-items-center">
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center ar-text title-groups blue-btn p-5">
                <Link
                  to="/initiative/list"
                  className="btn blue-btn justify-content-center d-flex align-items-center"
                >
                  <h2 className="m-2">مبادرات همه للتعريف بالائحة التعليمية</h2>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-4">
          <div className="container">
            <div className="row w-75 mx-auto d-flex justify-content-center align-items-center">
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
                <h2 className="dark-text mb-1">مميزاتنا</h2>
                <p>تتمتع منصتنا بمجموعة من المميزات التي تجعلها في المقدمة</p>
              </div>
              <div className="row h-100 d-flex align-items-center">
                <div className="col-md-5">
                  <h2 className="dark-text">
                    حملنا على عاتقنا أمانة الوصول بالمشتركين الى اعلى الدرجات
                  </h2>
                  <h6> وهذا ما حققناه طيلة السنوات الماضية</h6>
                </div>
                <div className="col-md-5 white-bg box-layout w-100 p-2 pb-0 mb-4 d-flex flex-column">
                  <div className="m-3">
                    <h6> اختبار المعلمين - الكيمياء</h6>
                  </div>
                  <div>
                    <h4 className="dark-text">
                      تاريخ الاختبار:
                      <span className="dark-text en-text"> 1441/03/30 </span>
                    </h4>
                    <h4 className="dark-text ">
                      درجة التخصص:
                      <span className="dark-text en-text"> 100 </span>
                    </h4>
                    <Button className="btn light-blue-btn justify-content-center d-flex align-items-center">
                      التفاصيل
                    </Button>
                  </div>
                </div>
                <div className="col-md-2 w-100 p-2 pb-0 mb-4 d-flex flex-column">
                  <img
                    height="100%"
                    width="100%"
                    src={process.env.PUBLIC_URL + "/assets/images/trophy.png"}
                    alt="trophy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="hero-section">
          <div className="container">
            <div className="row w-75 mx-auto d-flex justify-content-center align-items-center">
              <div className="col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/home-artwork.png"
                  }
                  width="100%"
                  className="contain-img d-md-block d-none d-sm-none"
                  alt="artwork"
                />
              </div>
              <div className="col-md-6">
                <h2 className="dark-text">تدريب مكثف وأنت ببيتك</h2>
                <h5>محتوى شامل يغنيك عن مختلف المراجع</h5>
                <h5> محاضرات مباشرة تسجل لمتايعتها في اي وقت</h5>
              </div>
            </div>
          </div>
        </section>
        <section className="hero-section">
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
                    process.env.PUBLIC_URL + "/assets/images/home-artwork.png"
                  }
                  width="100%"
                  className="contain-img d-md-block d-none d-sm-none"
                  alt="artwork"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="pt-0">
          <div className="container">
            <div className="row mb-3">
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center mt-4">
                <h2 className="dark-text mb-4">المجموعات المجانية</h2>
              </div>
            </div>
            {this.renderCategoriesGroup()}
          </div>
        </section>
        {!this.state.testimonials === undefined ||
          (this.state.testimonials.length != 0 && (
            <section className="testimonials-section">
              <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-md-6">
                    <h6 className="dark-text">قالوا عنا</h6>
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/quotes.png"}
                      className="contain-img"
                      width="100%"
                      height="100"
                      alt="testimonials"
                    />
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
