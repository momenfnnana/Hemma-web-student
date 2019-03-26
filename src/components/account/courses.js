import React, { Component } from "react";
import axios from "axios";
import "./styles.sass";
import { Tooltip } from "reactstrap";
import { Link } from "react-router-dom";

export class Courses extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false,
      details: [],
      courses: []
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get("https://api.staging.hemma.sa/api/v1/users/me", { headers })
      .then(response => {
        this.setState({ details: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("https://api.staging.hemma.sa/api/v1/courses/purchased", { headers })
      .then(response => {
        this.setState({ courses: response.data.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderCourses() {
    const courses = this.state.courses || [];
    return courses.map(course => (
      <React.Fragment>
        <div className="silver-bg box-layout w-100 pb-0 p-4 mt-4">
          <div className="bg-white box-layout w-100 p-3 d-flex align-items-center mb-4">
            <div className="media w-75">
              <img
                className="mr-3 rounded cover-img"
                src={course.bannerUrl}
                height="100"
                width="100"
              />
              <div className="media-body mt-2">
                <h6 className="mt-0 dark-text">{course.nameAr} </h6>
                <span className="badge blue-status light-font-text">سارية</span>
              </div>
            </div>
            <div className="seperator" />
            <div className="">
              <h6 className="dark-text mb-0 small">الحالة المالية</h6>
              <p className="dark-silver-text small mb-0">مسددة </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    ));
  }

  render() {
    const classes = "tooltip-inner";

    return (
      <React.Fragment>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="white-bg box-layout w-100 p-4 d-flex align-items-center justify-content-center flex-column">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/profile-img.png"
                    }
                    height="110"
                    className="mb-3"
                  />
                  <h6 className="dark-text mb-1">{this.state.details.name}</h6>
                  <p className="dark-text en-text small mb-0">
                    {this.state.details.email}
                  </p>
                  <p className="dark-text en-text small mb-1" dir="ltr">
                    0{this.state.details.phoneNumber}
                  </p>
                  <Link
                    to="/account/edit"
                    className="light-text text-underline small"
                  >
                    تعديل الملف الشخصي
                  </Link>
                </div>
              </div>
              <div className="col-md-8">
                <h3 className="dark-text">قائمة دوراتي</h3>
                {/* <div className="silver-bg box-layout w-100 pb-0 p-4 mt-4"> */}
                {/* <p className="dark-text">
                    لسا ما سجلت بدوره معانا؟ يشرفنا انضمامك لنا!
                  </p>
                  <button type="button" className="btn light-outline-btn w-25">
                    أختر دورتك الآن
                  </button> */}

                {this.renderCourses()}

                {/* <div className="bg-white box-layout w-100 p-3 d-flex align-items-center mb-4">
                    <div className="media w-75">
                      <img
                        className="mr-3 rounded cover-img"
                        src={
                          process.env.PUBLIC_URL + "/assets/images/course2.png"
                        }
                        height="100"
                        width="100"
                      />
                      <div className="media-body mt-2">
                        <h6 className="mt-0 dark-text">
                          دورة القدرات للجامعيين
                        </h6>

                        <span
                          className="badge yellow-status light-font-text tooltip-on-hover"
                          id="status-tooltip"
                        >
                          قيد المراجعة
                        </span>

                        <Tooltip
                          placement="right"
                          isOpen={this.state.tooltipOpen}
                          target="status-tooltip"
                          toggle={this.toggle}
                          placement="bottom"
                          style={{
                            backgroundColor: "#f2fdfe",
                            color: "#4b3a85"
                          }}
                        >
                          <p className="light-font-text small mb-1 mt-2">
                            حقك علينا لسه ما تم تأكيد طلبك إذا تجاوز طلبك 48
                            ساعة ياريت تراسلنا
                          </p>
                          <p
                            className="small en-text mb-2 d-inline-flex align-items-center"
                            dir="ltr"
                          >
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/whatsapp.png"
                              }
                              height="20"
                              width="20"
                              className="ml-1"
                            />
                            +9660539412412{" "}
                          </p>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="seperator" />
                    <div className="">
                      <h6 className="dark-text mb-0 small">الحالة المالية</h6>
                      <p className="dark-silver-text small mb-0">
                        مسددة جزئيا{" "}
                      </p>
                    </div>
                  </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
