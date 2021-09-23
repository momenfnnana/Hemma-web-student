import React, { Component } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from "react-accessible-accordion";
import swal from "@sweetalert/with-react";
import ReactPlayer from "react-player";
import Modal from "react-modal";
import { apiBaseUrl } from "../../api/helpers";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Api } from "../../api";

import RecordingVideo from "./recording-video";
import "./styles.sass";
import { PageLoader } from "./page-loader";
import { getAuthenticatedAxios, getDataFromResponse } from "../../api/helpers";
var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

export default class CourseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      checked: false,
      modalIsOpen: false,
      recordingModalIsOpen: false,
      recordingUrl: null,
      selectedLecture: null,
      isPageLoading: false,
      confirm: false,
      discountcourse:{},
      discountprecentage:0,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleRecordingModal = this.toggleRecordingModal.bind(this);
    this.getCourseAfterdiscount=this.getCourseAfterdiscount.bind(this);
    this.gotoDetails=this.gotoDetails.bind(this);
  }

  confirmationPopup() {
    swal(
      `هل أنت متأكد أنك تريد الاشتراك في دورة (${this.state.details.nameAr})؟`,
      {
        buttons: {
          cancel: "الغاء",
          ok: "موافق",
        },
      }
    ).then((value) => {
      switch (value) {
        case "ok":
          this.addToCart(this.state.details.id);
        default:
          break;
      }
    });
  }
  gotoDetails(id){
    this.props.history.push(`/course/content/${id}`);
  }
  toggleRecordingModal(url, id) {
    this.setState({
      recordingModalIsOpen: !this.state.recordingModalIsOpen,
      recordingUrl: url,
      selectedLecture: id,
    });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  getCourseAfterdiscount(discountvalue,originalprice)
  {
    const result=(1-(discountvalue/100))*originalprice;
    return result;
  }
  componentDidMount() {
    this.setState({ isPageLoading: true });
    const {
      match: { params },
    } = this.props;
    
    getAuthenticatedAxios()
      .get(`${apiBaseUrl}/courses/${params.slug}`)
      .then((response) => {
        this.setState({ details: response.data.data, isPageLoading: false });

        getAuthenticatedAxios()
      .get(`${apiBaseUrl}/content/${this.state.details.id}/highdiscount`)
      .then((response) => {
        this.setState(
          { discountcourse: response.data.data,
            discountprecentage:response.data.data.discountPrecentage,
            isPageLoading: false });
       })
      .catch((error) => {
        this.setState({ isPageLoading: false });
        console.log(error);
      });
      })
      .catch((error) => {
        this.setState({ isPageLoading: false });
        console.log(error);
      });
      
  }
  

  addToCart(id) {
    Api.cart
      .addCourse(id)
      .then((response) => {
        this.props.history.push("/cart");
      })
      .catch((error) => {
        switch (error.response.data && error.response.data.error) {
          case "ItemAlreadyAdded":
            this.props.history.push("/cart");
            break;
          // "BadRequest" is no longer a valid error code, however, the error that was being shown should be for "ItemAlreadyAdded"
          // case "BadRequest":
          //   swal("عفواً", "هذه الدورة مضافة سابقًا إلى مختاراتي", "error", {
          //     button: "متابعة"
          //   });
          //   break;
          case "UserHasActiveSubscription":
            Api.subscription
              .getSubscription(id)
              .then((res) => {
                this.props.history.push(`/course/content`);
              })
              .catch((error) => {
                switch (error.response.data && error.response.data.error) {
                  case "UserNotSubscribed":
                    swal("عفواً", "لا يمكن شراء الدورة أكثر من مرة", "error", {
                      button: "متابعة",
                    });
                    break;
                  default:
                    console.log(error);
                    break;
                }
              });
            break;
          case "NotPurchasable":
            swal(
              "عفواً",
              "الدورة مغلقة، لا يمكنك شراؤها وبإمكانك التواصل مع الدعم الفني في حال أردت",
              "error",
              {
                button: "متابعة",
              }
            );
            break;
            case "UserNotConfirmed":
              swal(
                "عفواً",
                "برجاء تأكيد رقم الهاتف الخاص بك ",
                "error",
                {
                  button: "متابعة",
                }
              ).then((response) => {
                Api.user.getUser().then((res) => {
                  console.log(res);
                  let data = {
                    countryCode:res.countryCode,
                    phoneNumber: res.phoneNumber
                  };
                  this.props.history.push({
                    pathname: "/verify/identity",
                    userInfo: data
                  });
                })
               
      });
              break;
          default:
            swal("عفواً", "عليك تسجيل الدخول للقيام بهذه الخطوة", "error", {
              button: "متابعة",
            }).then((response) => {
                window.location = "/auth/login";
      });
            break;
        }
      });
  }

  renderFeatures() {
    const features = this.state.details.features;
    if (features) {
      return features.map((feature) => (
        <React.Fragment key={feature.id}>
          <div
            className="col-md-6 col-12 align-items-center pb-2"
            key={feature.id}
          >
            <p className="dark-text mb-0 w-75  d-flex align-items-center">
              <i className={`mr-2 font-16 fas fa-${feature.icon}`} />
              {feature.descriptionAr}
            </p>
          </div>
        </React.Fragment>
      ));
    }
  }

  renderSections() {
    const sections = this.state.details.sections;

    if (sections) {
      return sections.map((section) => (
        <div className="row mt-3" key={section.id}>
          <div className="col-12">
            <div className="card section-card" key={section.id}>
              <div className="card-header border-bottom-0">
                <h6 className="text-white  mb-0 section-name">{section.nameAr}</h6>
              </div>
              {this.renderChapters(section.chapters)}
            </div>
          </div>
        </div>
      ));
    }
  }

  renderChapters(chapters) {
    const sortedChapters = chapters.sort((a, b) =>
      a.order > b.order ? 1 : -1
    );
    if (sortedChapters) {
      return sortedChapters.map((chapter) => (
        <Accordion key={chapter.id}>
          <AccordionItem expanded={true}>
            <AccordionItemTitle>
              <h6 className="dark-text mb-0 small dark-text">
                {chapter.nameAr}
              </h6>
            </AccordionItemTitle>
            <AccordionItemBody>
              <ul className="list-group list-group-flush flex-fill">
                {this.renderLectures(chapter.lectures)}
              </ul>
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      ));
    }
  }
  renderInstructors() {
    const instructors = this.state.details && this.state.details.instructors;
    if (instructors) {
      return instructors.map((instructor) => (
        <div
          className="white-bg border-bottom d-flex align-items-center mh-55 p-3"
          key={instructor.id}
        >
          {/* <div>
            <img
              src={process.env.PUBLIC_URL + "/assets/images/female-circle.png"}
              className="mr-2"
              height="25"
            />
          </div> */}

          <div className="d-flex justify-content-center flex-column">
            <h6 className="mid-text small mb-1 mt-0">{instructor.name}</h6>

            {/* {instructor.sections.map(section => (
              <div className="d-flex align-items-center">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/diary.png"}
                  className="mr-2"
                  height="11"
                />
                <h6 className="dark-text smaller mt-0 mb-1">{section}</h6>
              </div>
            ))} */}
          </div>
          {/* <div className="d-flex justify-content-end flex-fill align-items-center">
            {instructor.rating == 0 ? null : (
              <StarRatingComponent
                starCount={5}
                value={instructor.rating}
                starColor={"#ffe552"}
                emptyStarColor={"#a9acb4"}
                editing={false}
                name="rate"
              />
            )}
          </div> */}
        </div>
      ));
    }
  }

  renderLectures(lectures) {
    const sortedLectures = lectures.sort((a, b) =>
      a.order > b.order ? 1 : -1
    );
    if (sortedLectures) {
      return sortedLectures.map((lecture) => {
        return (
          <React.Fragment key={lecture.id}>
            <div className="list-group-item bg-transparent small dark-silver-text light-font-text">
              {this.renderLecture(lecture)}
            </div>
          </React.Fragment>
        );
      });
    }
  }

  renderLecture(lecture) {
    const scheduledAt = new Date(lecture.scheduledAt);
    var day = scheduledAt.getDate();
    var month = scheduledAt.getMonth() + 1;
    var year = scheduledAt.getFullYear();
    var scheduledDate = year + "-" + month + "-" + day;
    var hijriDate = moment(scheduledDate, "YYYY-MM-DD").format("iYYYY/iM/iD");
    return (
      <div className="row">
        <div className="col-md-9 d-flex align-items-center">
          <div className="d-flex align-items-center">
            {lecture.status === "Recorded" && (
              <img
                src={process.env.PUBLIC_URL + "/assets/images/play.png"}
                className="mr-2"
                height="15"
                alt="Course video"
              />
            )}
            {lecture.nameAr}
          </div>
          {lecture.recordingUrl && (
            <div
              className="outline-label clickable"
              onClick={() =>
                this.toggleRecordingModal(lecture.recordingUrl, lecture.id)
              }
            >
              <img
                src={process.env.PUBLIC_URL + "/assets/images/blue-play.png"}
                className="mr-1"
                height="10"
                alt="Guest video"
              />
              <span>مشاهدة المحتوى المجاني</span>
            </div>
          )}
        </div>
        <div className="col-md-3 d-flex justify-content-end align-items-center">
          {lecture.status === "Live" ? (
            <div className="small mb-0 d-flex align-items-center">
              <span className="en-text">{hijriDate}</span>{" "}
              <span className="badge light-bg ml-2 text-white">مباشرة</span>
            </div>
          ) : lecture.status === "Scheduled" ? (
            <div className="small mb-0 d-flex align-items-center">
              <span className="en-text">{hijriDate}</span>{" "}
              <span className="badge mid-bg ml-2 text-white">مجدولة</span>
            </div>
          ) : lecture.status === "Recorded" ? (
            <div className="small mb-0 d-flex align-items-center">
              <span className="en-text">{hijriDate}</span>{" "}
              <span className="badge red-bg ml-2 text-white">مسجلة</span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  render() {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        height: "50%",
        borderWidth: 0,
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2,
      },
    };

    var date = new Date(this.state.details.startsAt);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var courseDate = year + "-" + month + "-" + day;
    var hijriDate = moment(courseDate, "YYYY-MM-DD").format("iYYYY/iM/iD");

    return (
      <>
        {this.state.isPageLoading ? (
          <PageLoader />
        ) : (
          <React.Fragment>
            <Helmet>
              <title>{`دورة ${this.state.details.nameAr} | منصّة همّة التعليمية`}</title>
              <meta
                name="description"
                content={this.state.details.descriptionAr}
              />
            </Helmet>
            <section className="pt-5 pb-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <div className="white-bg box-layout w-100 p-2 pb-0 mb-4 d-flex flex-column">
                      <div className="position-relative">
                        {this.state.details.videoUrl ? (
                          <React.Fragment>
                            <ReactPlayer
                              url={this.state.details.videoUrl}
                              playing={false}
                              controls={false}
                              width="100%"
                              height="100%"
                            />
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/play-button.png"
                              }
                              height="50"
                              className="position-absolute play-btn clickable"
                              onClick={this.openModal}
                              alt="Play"
                            />
                          </React.Fragment>
                        ) : (
                          <img
                            src={this.state.details.bannerUrl}
                            height="180"
                            width="100%"
                            className="mb-3 rounded cover-img"
                            alt={this.state.details.nameAr}
                          />
                        )}
                      </div>
                      <Modal
                        style={customStyles}
                        ariaHideApp={false}
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                      >
                        <ReactPlayer
                          url={this.state.details.videoUrl}
                          playing={true}
                          controls={true}
                          width="100%"
                          height="100%"
                        />
                      </Modal>

                      <div className="container">
                        <div className="d-inline-flex align-items-center">

                          {this.state.details.price == 0 ? 
                          <h4 className="mid-text">
                          دورة مجانية
                        </h4>
                          :
                          <>
                          <h6 className="dark-text small mr-3">سعر الاشتراك</h6>
                          {this.state.details.originalPrice ? (
                            <h5 className="mid-text">
                              <span className="en-text mr-1 crossed-line">
                                {this.state.details.originalPrice &&
                                  parseFloat(
                                    this.state.details.originalPrice.toFixed(2)
                                  )}{" "}
                                <span className="ar-text">ريال</span>
                              </span>
                              <span className="en-text red-text">
                                {this.state.details.price &&
                                  parseFloat(
                                    this.state.details.price.toFixed(2)
                                  )}{" "}
                                <span className="ar-text red-text">ريال</span>
                              </span>
                            </h5>
                          ) : (
                            <h4 className="mid-text">
                              <span className="en-text">
                                {this.state.details.price &&
                                  parseFloat(
                                    this.state.details.price.toFixed(2)
                                  )}
                              </span>{" "}
                              ريال
                            </h4>
                          )} </> }
                             
                        </div>
                        {this.state.discountprecentage>0 && (
                        <h5 className="small light-font-text dark-text">

                          نقدر لك ولاءك لهمة ورجوعك لنا مره اخرى، لهذا تم تقديم لك خصم خاص 
    
                          &nbsp;{this.state.discountcourse.discountPrecentage} %&nbsp;

                           بسبب أشتراكك فى  

                          &nbsp;{this.state.discountcourse.courseName} &nbsp;

                        </h5>

                        )}
                        
                        {this.state.details.paymentStatus==="FullyPaid" || this.state.details.paymentStatus=="PartiallyPaid"? 
                        (<button
                          type="button"
                          className="btn light-outline-btn w-100 align-self-center mt-2 mb-3"
                          onClick={() => this.gotoDetails(this.state.details.id)}
                          
                        >
                          اذهب لتفاصيل الدورة
                        </button>
                        ):this.state.details.paymentStatus=="Pending"?(
                          <button
                          type="button"
                          className="btn light-outline-btn w-100 align-self-center mt-2 mb-3" disabled
                        >
                          قيد المراجعه
                        </button>
                        ): (
                          this.state.details.purchasable && (
                          <button
                            type="button"
                            className="btn light-outline-btn w-100 align-self-center mt-2 mb-3"
                            onClick={() => this.confirmationPopup()}
                          >
                            اشترك الآن
                          </button>
                        ))
                      }
                       

                        <h6 className="dark-text mr-3 mb-3 list-title">تتضمن:</h6>
                        <ul className="list-unstyled">
                          {this.state.details &&
                          this.state.details.durationTextAr ? (
                            <li className=" dark-text mb-2">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/clock.png"
                                }
                                className="mr-2"
                                height="15"
                                alt="Duration"
                              />
                              {this.state.details.durationTextAr}
                            </li>
                          ) : null}

                          {this.state.details &&
                          this.state.details.validityTextAr ? (
                            <li className="small dark-text mb-2">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/quarters.png"
                                }
                                className="mr-2"
                                height="15"
                                alt="Quarters"
                              />{" "}
                              {this.state.details.validityTextAr}
                            </li>
                          ) : null}

                          {courseDate ? (
                            <li className="small dark-text mb-2">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/calendar.png"
                                }
                                className="mr-2"
                                height="15"
                                alt="Calendar"
                              />{" "}
                              <span className="en-text">{hijriDate}</span>
                            </li>
                          ) : null}

                          {this.state.details &&
                          this.state.details.scheduleTextAr ? (
                            <li className="small dark-text mb-2">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/calendar.png"
                                }
                                className="mr-2"
                                height="15"
                                alt="Calendar"
                              />{" "}
                              {this.state.details.scheduleTextAr}
                            </li>
                          ) : null}

                          {this.state.details &&
                          this.state.details.companionBook ? (
                            <li className="small dark-text mb-2">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/diary.png"
                                }
                                className="mr-2"
                                height="18"
                                alt="Diary"
                              />{" "}
                              <span className="en-text">
                                {this.state.details &&
                                  this.state.details.companionBook &&
                                  this.state.details.companionBook.price &&
                                  parseFloat(
                                    this.state.details.companionBook.price.toFixed(
                                      2
                                    )
                                  )}
                              </span>{" "}
                              ريال (الأبيض و الأسود)
                            </li>
                          ) : null}

                          {this.state.details &&
                          this.state.details.companionBook ? (
                            <li className="small dark-text mb-2">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/diary.png"
                                }
                                className="mr-2"
                                height="18"
                                alt="Diary"
                              />{" "}
                              <span className="en-text">
                                {this.state.details &&
                                  this.state.details.companionBook &&
                                  this.state.details.companionBook
                                    .coloredPrice &&
                                  parseFloat(
                                    this.state.details.companionBook.coloredPrice.toFixed(
                                      2
                                    )
                                  )}
                              </span>{" "}
                              ريال (ملونة)
                            </li>
                          ) : null}
                        </ul>
                      </div>
                    </div>
                    {this.state.details.schedulePosterUrl && (
                      <div
                        className="light-bg border-0 box-layout mb-4 w-100 p-3 d-inline-flex align-items-center justify-content-center clickable cursor-pointer"
                        onClick={() =>
                          window.open(
                            `${this.state.details.schedulePosterUrl}`,
                            "_blank"
                          )
                        }
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/file-white.png"
                          }
                          className="mr-2"
                          height="25"
                          alt="File"
                        />{" "}
                        <h6 className="text-white mb-0 mt-0 light-font-text ">
                          تنزيل جدول الدورة
                        </h6>
                      </div>
                    )}

                    {this.state.details.instructors === undefined ||
                    this.state.details.instructors === 0 ? null : (
                      <div className="box-layout w-100 radius-bottom-0 border-bottom-0">
                        <div className="silver-bg d-flex align-items-center p-3">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/instructors.png"
                            }
                            className="mr-2"
                            height="20"
                            alt="Instructors"
                          />
                          <h6 className="dark-text small mb-0">المدربين</h6>
                        </div>
                        <hr className="mt-0 mb-0" />

                        <div>{this.renderInstructors()}</div>
                      </div>
                    )}
                  </div>
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-12">
                        <h3 className="mid-text details-title">
                          {this.state.details.nameAr}
                        </h3>
                        <Link
                          className="dark-text details-link"
                          to={`/categories/details/${this.state.details &&
                            this.state.details.category &&
                            this.state.details.category.slug}`}
                        >
                          {this.state.details &&
                            this.state.details.category &&
                            this.state.details.category.nameAr}
                        </Link>
                        <p className="text-muted light-font-text w-75 mt-3 text-break details-para">
                          {this.state.details.descriptionAr}
                        </p>
                      </div>
                    </div>

                    <div className="row">{this.renderFeatures()}</div>
                    {this.state.details.sections === undefined ||
                    this.state.details.sections === 0 ? (
                      <React.Fragment>
                        <div
                          className="silver-bg box-layout w-100 pb-0 p-4 mt-4 d-flex flex-column align-items-center justify-content-center"
                          style={{ height: 250 }}
                        >
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/event.png"
                            }
                            className="mb-3"
                            height="60"
                            alt="Course schedule"
                          />{" "}
                          <p className="silver-text">
                            سيتم عرض جدول الدورة فور توفره{" "}
                          </p>
                        </div>
                      </React.Fragment>
                    ) : (
                      this.renderSections()
                    )}
                    {/* {this.state.details.price ? (
                      <div className="row mt-5">
                        <div className="col-12">
                          <h4 className="mid-text mb-2">الشروط والأحكام</h4>
                          <p className="light-font-text dark-text mb-1">
                            1- لا يمكن استرجاع رسوم الدورة بعد تفعيل حساب
                            المشترك في{" "}
                            <Link to="/" className="light-text">
                              منصّة همّة
                            </Link>
                          </p>
                          <p className="light-font-text dark-text mb-1">
                            2- لا تتحمل{" "}
                            <Link to="/" className="light-text">
                              منصّة همّة
                            </Link>{" "}
                            أي مشاكل تقنية تحصل للمتدرب أثناء حضوره الدورة
                            ومشاهدته لتسجيل المحاضرات{" "}
                          </p>
                          <p className="light-font-text dark-text mb-1">
                            3- تسجيل دروس الدورة سيبقى مفعل لكل مشترك حتى تاريخ
                            انتهاء الاشتراك
                          </p>
                        </div>
                      </div>
                    ) : null} */}
                  </div>
                </div>
              </div>
            </section>
            <RecordingVideo
              recordingUrl={this.state.recordingUrl}
              selectedLecture={this.state.selectedLecture}
              modalIsOpen={this.state.recordingModalIsOpen}
              toggleRecordingModal={this.toggleRecordingModal}
            />
          </React.Fragment>
        )}
      </>
    );
  }
}
