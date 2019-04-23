import React, { Component } from "react";
import axios from "axios";
import "./styles.sass";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
import swal from "@sweetalert/with-react";
import ReactPlayer from "react-player";
import StarRatingComponent from "react-star-rating-component";
import Modal from "react-modal";

export class CourseDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { details: [], checked: false, rating: 3, modalIsOpen: false };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    axios
      .get(`https://api.staging.hemma.sa/api/v1/courses/${params.id}`)
      .then(response => {
        this.setState({ details: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  addToCart(id) {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      type: "Course",
      itemId: id,
      installment: 0
    };
    axios
      .post("https://api.staging.hemma.sa/api/v1/cart/items", data, { headers })
      .then(response => {
        swal("تنبيه", "تم إضافة الدورة إلى سلة التسوق بنجاح", "success", {
          button: "متابعة"
        });
        this.props.history.push("/cart");
      })
      .catch(error => {
        switch (error.response.data && error.response.data.error) {
          case "Duplicate":
            swal("عفواً", "هذه الدورة مضافة سابقاً إلى سلة التسوق", "error", {
              button: "متابعة"
            });
            break;
          case "BadRequest":
            swal("عفواً", "هذه الدورة مضافة سابقًا إلى سلة التسوق", "error", {
              button: "متابعة"
            });
            break;
          case "ItemAlreadyPurchased":
            swal("عفواً", "هذه الدورة موجودة ضمن قائمة دوراتك", "error", {
              button: "متابعة"
            });
            break;

          default:
            swal("عفواً", "عليك تسجيل الدخول للقيام بهذه الخطوة", "error", {
              button: "متابعة"
            });
            break;
        }
      });
  }

  renderFeatures() {
    const features = this.state.details.features;
    if (features) {
      return features.map(feature => (
        <React.Fragment>
          <div className="col-6 align-items-center pb-2" key={feature.id}>
            <p className="small dark-text mb-0 w-75">
              <img
                src={feature.icon}
                className="mr-2 contain-img"
                height="25"
                width="25"
              />
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
      return sections.map(section => (
        <div className="row mt-3">
          <div className="col-12">
            <div className="card section-card" key={section.id}>
              <div className="card-header border-bottom-0">
                <h6 className="text-white small mb-0 ">{section.nameAr}</h6>
              </div>
              {this.renderChapters(section.chapters)}
            </div>
          </div>
        </div>
      ));
    }
  }

  renderChapters(chapters) {
    if (chapters) {
      return chapters.map(chapter => (
        <Accordion>
          <AccordionItem>
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
    const { rating } = this.state;
    const instructors = this.state.details.instructors;

    if (instructors) {
      return instructors.map(instructor => (
        <div className="silver-bg border-bottom d-flex align-items-center h-55 pl-3 pr-3">
          <div>
            <img
              src={process.env.PUBLIC_URL + "/assets/images/female-circle.png"}
              className="mr-2"
              height="25"
            />
          </div>

          <div className="d-flex align-items-center flex-column">
            <h6 className="mid-text smaller mb-0 mt-0">{instructor.name}</h6>
            <StarRatingComponent
              starCount={5}
              value={rating}
              starColor={"#ffe552"}
              emptyStarColor={"#a9acb4"}
              editing={false}
            />
          </div>

          <div className="d-flex justify-content-end flex-fill align-items-center">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/diary.png"}
              className="mr-2"
              height="18"
            />
            <h6 className="dark-text smaller mb-1 mt-0">مدرس مادة الأحياء</h6>
          </div>
        </div>
      ));
    }
  }

  renderLectures(lectures) {
    if (lectures) {
      return lectures.map(lecture => (
        <li className="list-group-item bg-transparent small dark-silver-text light-font-text">
          <div className="row">
            <div className="col-6">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/play.png"}
                className="mr-2"
                height="15"
              />
              {lecture.nameAr}
            </div>
            <div className="col-6 d-flex justify-content-end">
              {lecture.scheduledAt}

              {lectures.status == "Live" || "Scheduled" || "Recorded" ? (
                <img
                  src={
                    this.state.checked
                      ? process.env.PUBLIC_URL + "/assets/images/blue-check.png"
                      : process.env.PUBLIC_URL + "/assets/images/check.png"
                  }
                  className="ml-2"
                  height="15"
                  onClick={() => this.setState({ checked: true })}
                />
              ) : (
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/check.png"}
                  className="ml-2"
                  height="15"
                />
              )}
            </div>
          </div>
        </li>
      ));
    }
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
        borderWidth: 0
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2
      }
    };
    return (
      <React.Fragment>
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
                        />
                      </React.Fragment>
                    ) : (
                      <img
                        src={this.state.details.bannerUrl}
                        height="180"
                        width="100%"
                        className="mb-3 rounded cover-img"
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
                      <h6 className="dark-text small mr-3">سعر الاشتراك</h6>
                      <h4 className="mid-text">
                        <span className="en-text">
                          {this.state.details.price}
                        </span>{" "}
                        ريال
                      </h4>
                    </div>
                    <button
                      type="button"
                      className="btn light-outline-btn w-100 align-self-center mt-2 mb-3"
                      onClick={() => this.addToCart(this.state.details.id)}
                    >
                      اشترك الآن
                    </button>
                    <h6 className="dark-text mr-3 mb-3">تتضمن:</h6>
                    <ul className="list-unstyled">
                      <li className="smaller dark-text mb-2">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/assets/images/clock.png"
                          }
                          className="mr-2"
                          height="15"
                        />
                        {this.state.details.durationTextAr} تدريبية
                      </li>
                      <li className="smaller dark-text mb-2">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/quarters.png"
                          }
                          className="mr-2"
                          height="15"
                        />{" "}
                        مدة صلاحية الدورة {this.state.details.validityTextAr}
                      </li>
                      <li className="smaller dark-text mb-2">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/calendar.png"
                          }
                          className="mr-2"
                          height="15"
                        />{" "}
                        تبدأ في تاريخ {this.state.details.startsAt}
                      </li>
                      <li className="smaller dark-text mb-2">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/calendar.png"
                          }
                          className="mr-2"
                          height="15"
                        />{" "}
                        يومي {this.state.details.scheduleTextAr}
                      </li>
                      {this.state.details &&
                      this.state.details.companionBook ? (
                        <li className="smaller dark-text mb-2">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/diary.png"
                            }
                            className="mr-2"
                            height="20"
                          />{" "}
                          سعر الملزمة{" "}
                          <span className="en-text">
                            {this.state.details &&
                              this.state.details.companionBook &&
                              this.state.details.companionBook.price / 100}
                          </span>{" "}
                          ريال
                        </li>
                      ) : null}
                    </ul>
                  </div>
                </div>
                <div
                  className="light-bg border-0 box-layout mb-4 w-100 p-3 d-inline-flex align-items-center justify-content-center clickable"
                  onClick={() =>
                    window.open(
                      `${this.state.details.schedulePosterUrl}`,
                      "_blank"
                    )
                  }
                >
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/file-white.png"
                    }
                    className="mr-2"
                    height="25"
                  />{" "}
                  <h6 className="text-white mb-0 mt-0 light-font-text">
                    تنزيل جدول الدورة
                  </h6>
                </div>

                {this.state.details.instructors == undefined ||
                this.state.details.instructors == 0 ? null : (
                  <div class="white-bg box-layout w-100 radius-bottom-0 border-bottom-0">
                    <div class="d-flex align-items-center p-3">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/instructors.png"
                        }
                        className="mr-2"
                        height="20"
                      />
                      <h6 class="dark-text small mb-0">المدربين</h6>
                    </div>
                    <hr className="mt-0 mb-0" />

                    <div>{this.renderInstructors()}</div>
                  </div>
                )}
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-12">
                    <h3 className="mid-text">{this.state.details.nameAr}</h3>
                    <p className="small dark-text light-font-text w-75 mt-3">
                      {this.state.details.descriptionAr}
                    </p>
                  </div>
                </div>

                <div className="row">{this.renderFeatures()}</div>
                {this.state.details.sections == undefined ||
                this.state.details.sections == 0 ? (
                  <React.Fragment>
                    <div
                      className="silver-bg box-layout w-100 pb-0 p-4 mt-4 d-flex flex-column align-items-center justify-content-center"
                      style={{ height: 250 }}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/event.png"
                        }
                        className="mb-3"
                        height="60"
                      />{" "}
                      <p className="silver-text">
                        سيتم عرض جدول الدورة فور توفره{" "}
                      </p>
                    </div>
                  </React.Fragment>
                ) : (
                  this.renderSections()
                )}
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
