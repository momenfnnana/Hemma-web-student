import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../shared/card/card";
import { apiBaseUrl } from "../../api/helpers";
import "./styles.sass";

var moment = require("moment");
moment().format();

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
                      alt={cat.nameAr}
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
                <h2 className="purple-text">سلسلة بالبيد التعليمية</h2>
                <h2 className="purple-text">٢٥ عاماً في خدمة</h2>
                <h2 className="blue-text"> الطلاب و الطالبات</h2>
              </div>
              <div className="col-md-8 d-flex align-items-center justify-content-center">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/home-artwork.png"
                  }
                  width="100%"
                  className="contain-img"
                  alt="artwork"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="categories-section">
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

        <section className="journey-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h4 className="dark-text mb-1">مميزاتنا</h4>
                <p className="dark-text">
                  تتمتع منصتنا بمجموعة من المميزات التي تجعلها في المقدمة
                </p>
                <div className="row">
                  <div className="col-md-12">
                    <div className="circle-desc active circle-desc1">
                      <h6 className="dark-text">الاختبارات الإلكترونية</h6>
                      <p className="dark-text light-font-text small text-break">
                        اختبارات الكترونية لكل دورة يتم تحديثها من قبل الفريق
                        بشكل مستمر قارن نتائجك مرة بعد مرة خلك مستعد واختبر نفسك{" "}
                      </p>
                    </div>
                    <div className="circle-desc circle-desc2">
                      <h6 className="dark-text">المناقشات</h6>
                      <p className="dark-text light-font-text small text-break">
                        جلسات مناقشات محدده مسبقا تجمع المدربين والفريق وكل
                        المشاركين! أرسل استفسارك وشاركهم بالمناقشة بشكل حي، كل
                        المناقشات تحفظ للرجوع إليها في أي وقت!
                      </p>
                    </div>
                    <div className="circle-desc circle-desc3">
                      <h6 className="dark-text">المحاضرات المسجلة</h6>
                      <p className="dark-text light-font-text small text-break">
                        لو ما قدرت تحضر البث لا تشيل هم كل المحاضرات يتم تسجيلها
                        وتنزل بعد البث، من خلال المحاضرات المسجلة ممكن تضيف
                        استفساراتك وتشارك بالإجابة على استفسارات الطلبة الآخرين،
                        الفريق التدريبي موجود على مدار الساعة للتحقق من صحة
                        الإجابات والمساعدة
                      </p>
                    </div>

                    <div className="circle-desc circle-desc4">
                      <h6 className="dark-text">اختصر وقتك</h6>
                      <p className="dark-text light-font-text small text-break">
                        كل الملفات المتعلقة بالدورة في مكان واحد بشكل سهل ومبسط
                        للتحميل
                      </p>
                    </div>

                    <div className="circle-desc circle-desc5">
                      <h6 className="dark-text">الدردشة الجماعية</h6>
                      <p className="dark-text light-font-text small text-break">
                        كن على تواصل مع جميع الطلبة المشتركين في الدورة من خلال
                        الدردشة الجماعية اطرح اسئلتك وتابع كل الاخبار المتعلقة
                        بالدورة
                      </p>
                    </div>

                    <div className="circle-desc circle-desc6">
                      <h6 className="dark-text">الملازم</h6>
                      <p className="dark-text light-font-text small text-break">
                        أفضل الملازم المعدة من قبل أفضل المدربين، تسهل عليك
                        المشوار وتتابع من خلالها المادة، أيضا ممكن تطلب النسخة
                        المطلوبة منها لتوصلك لباب البيت
                      </p>
                    </div>

                    <div className="circle-desc circle-desc7">
                      <h6 className="dark-text">المحتوى المجاني</h6>
                      <p className="dark-text light-font-text small text-break">
                        اطلع على جزء بسيط من الخدمات المقدمة في منصة همة قبل
                        الاشتراك من خلال المحتوى المجاني المتاح في المنصات
                      </p>
                    </div>

                    <div className="circle-desc circle-desc8">
                      <h6 className="dark-text">البث المباشر</h6>
                      <p className="dark-text light-font-text small text-break">
                        من أي مكان ممكن تحضر محاضراتك مع أفضل المدرسين تدخل
                        الموقع في الوقت المحدد وتشاركنا البث
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-end">
                <div className="circles-wrapper d-md-block d-lg-block d-none">
                  <div className="dotCircle">
                    <span className="item-dot active item-dot1" data-tab="1">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/features/exams.png"
                        }
                        height="40"
                        className="contain-img"
                        alt="exams"
                      />
                      <span className="active-item"></span>
                    </span>
                    <span className="item-dot item-dot2" data-tab="2">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/features/discussions.png"
                        }
                        height="40"
                        className="contain-img"
                        alt="discussions"
                      />
                      <span className="active-item"></span>
                    </span>
                    <span className="item-dot item-dot3" data-tab="3">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/features/recorded_videos.png"
                        }
                        height="40"
                        className="contain-img"
                        alt="recorded-videos"
                      />
                      <span className="active-item"></span>
                    </span>
                    <span className="item-dot item-dot4" data-tab="4">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/features/speed-up.png"
                        }
                        height="40"
                        className="contain-img"
                        alt="speed-up"
                      />
                      <span className="active-item"></span>
                    </span>
                    <span className="item-dot item-dot5" data-tab="5">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/features/chat.png"
                        }
                        height="40"
                        className="contain-img"
                        alt="chat"
                      />
                      <span className="active-item"></span>
                    </span>
                    <span className="item-dot item-dot6" data-tab="6">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/features/malzama.png"
                        }
                        height="40"
                        className="contain-img"
                        alt="malzama"
                      />
                      <span className="active-item"></span>
                    </span>
                    <span className="item-dot item-dot7" data-tab="7">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/features/free-content.png"
                        }
                        height="40"
                        className="contain-img"
                        alt="free-content"
                      />
                      <span className="active-item"></span>
                    </span>
                    <span className="item-dot item-dot8" data-tab="8">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/features/live-streaming.png"
                        }
                        height="40"
                        className="contain-img"
                        alt="live-streaming"
                      />
                      <span className="active-item"></span>
                    </span>
                  </div>

                  <div className="circle-content">
                    <div className="circle-item active circle-item1">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/features/exams.png"
                        }
                        height="70"
                        className="contain-img mb-3"
                        alt="exams"
                      />
                      <h6 className="dark-text">الاختبارات الإلكترونية</h6>
                    </div>
                    <div className="circle-item circle-item2">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/features/discussions.png"
                        }
                        height="70"
                        className="contain-img mb-3"
                        alt="discussions"
                      />
                      <h6 className="dark-text">المناقشات</h6>
                    </div>
                    <div className="circle-item circle-item3">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/features/recorded_videos.png"
                        }
                        height="40"
                        className="contain-img mb-3"
                        alt="recorded-videos"
                      />
                      <h6 className="dark-text">المحاضرات المسجلة</h6>
                    </div>
                    <div className="circle-item circle-item4">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/features/speed-up.png"
                        }
                        height="40"
                        className="contain-img mb-3"
                        alt="speed-up"
                      />
                      <h6 className="dark-text">اختصر وقتك</h6>
                    </div>
                    <div className="circle-item circle-item5">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/features/chat.png"
                        }
                        height="40"
                        className="contain-img mb-3"
                        alt="chat"
                      />
                      <h6 className="dark-text">الدردشة الجماعية</h6>
                    </div>
                    <div className="circle-item circle-item6">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/features/malzama.png"
                        }
                        height="40"
                        className="contain-img mb-3"
                        alt="malzama"
                      />
                      <h6 className="dark-text">الملازم</h6>
                    </div>
                    <div className="circle-item circle-item7">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/features/free-content.png"
                        }
                        height="40"
                        className="contain-img mb-3"
                        alt="free-content"
                      />
                      <h6 className="dark-text">المحتوى المجاني</h6>
                    </div>
                    <div className="circle-item circle-item8">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/features/live-streaming.png"
                        }
                        height="40"
                        className="contain-img mb-3"
                        alt="live-streaming"
                      />
                      <h6 className="dark-text">البث المباشر</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="courses-section">
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
        <section className="steps-section">
          <div className="container">
            <div className="row mb-3">
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
                <h4 className="dark-text mb-1">خطوات الإشتراك بالدورة</h4>
                <p className="dark-text mb-5">
                  يمكنك الان التسجيل بأحد دوراتنا باتباعك للخطوات التالية
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div class="steps">
                  <div class="step step-one">
                    <div class="step-content one">
                      <h6 className="dark-text small">
                        تسجيل حساب جديد، أو تسجيل دخول
                      </h6>
                      <p className="mid-text smaller text-break">
                        في حال كان لديك حساب من قبل، يمكنك تسجيل الدخول والبدء
                        بعملية الاشتراك، أما في حال ما عندك حساب ممكن تسجل حساب
                        جديد من "إنشاء حساب" في أعلى الصفحة وتدخل المعلومات
                        المطلوبة
                      </p>
                    </div>
                  </div>
                  <div class="step step-two minimized">
                    <div class="step-content two">
                      <h6 className="dark-text small">
                        ابحث عن الدورة التي تحتاجها من خلال المنصات المتاحة
                      </h6>
                      <p className="mid-text smaller text-break">
                        يمكنك ايجاد قائمة المنصات في الصفحة الرئيسية، وفي الشريط
                        العلوي من الدورات الحالية، اختر المنصة التابعة للدورة
                        الستعراض قائمة الدورات المتاحة.
                      </p>
                    </div>
                  </div>
                  <div class="step step-three minimized">
                    <div class="step-content three">
                      <h6 className="dark-text small">
                        راجع تفاصيل الدورة قبل الاشتراك
                      </h6>
                      <p className="mid-text smaller text-break">
                        في داخل صفحة الدورة ستجد بعض التفاصيل مثل (أهداف الدورة،
                        أساليب وطرق شرح المادة، جدول المحاضرات، معلومات المدرسين
                        وبيانات الاشتراك) للاشتراك بالدورة، من خلال الضغط على
                        "اشترك الآن" للانتقال الى مرحلة تأكيد مقعدك.
                      </p>
                    </div>
                  </div>
                  <div class="step step-four minimized">
                    <div class="step-content four">
                      <h6 className="dark-text small">سلة الشراء</h6>
                      <p className="mid-text smaller text-break">
                        في صفحة "سلة الشراء" سيظهر لك تفاصيل الدورات المختارة،
                        يمكنك مراجعة الطلب وإضافة كوبون في حال توفّره، والانتقال
                        لمرحلة الدفع من خلال الضغط على "متابعة". أيضا يمكنك
                        إضافة أي دورات أخرى ترغب في الاشتراك بها قبل المتابعة
                        إلى السداد.
                      </p>
                    </div>
                  </div>
                  <div class="step step-five minimized">
                    <div class="step-content five">
                      <h6 className="dark-text small">السداد</h6>
                      <p className="mid-text smaller text-break">
                        في صفحة "تأكيد الاشتراك" يمكنك اختيار طريقة الدفع وتعبئة
                        المعلومات المطلوبة لتتمكن من تفعيل الدورة المحجوزة، بعد
                        الانتهاء اضغط على "إتمام الدفع" ليتم نقلك الى صفحة
                        التأكيد النهائي.
                      </p>
                    </div>
                  </div>
                  <div class="step step-six minimized">
                    <div class="step-content six">
                      <h6 className="dark-text small">قائمة دوراتي</h6>
                      <p className="mid-text smaller text-break">
                        تعرض قائمة دوراتي جميع الدورات التي قمت بالاشتراك بها
                        وحالة الاشتراك لكل منها، يمكنك تصفح تفاصيل الدورة
                        بالدخول إليها للوصول إلى المحاضرات المسجلة، الملزمة،
                        المناقشات والكثير من الميزات التي ستساعدك في المادة.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {!this.state.testimonials === undefined ||
          (!this.state.testimonials.length === 0 && (
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
                      className="contain-img quotes-img"
                      height="50"
                      alt="quotes"
                    />
                    <Slider {...testimonialsSettings}>
                      {this.renderTestimonials()}
                    </Slider>
                  </div>
                  <div className="col-md-6 order-1 order-md-3">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/testimonials.png"
                      }
                      className="contain-img"
                      width="100%"
                      height="250"
                      alt="testimonials"
                    />
                  </div>
                </div>
              </div>
            </section>
          ))}
      </React.Fragment>
    );
  }
}
