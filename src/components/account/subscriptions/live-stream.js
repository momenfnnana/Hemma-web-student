import React, { Component } from "react";
import "./styles.sass";
import StarRatingComponent from "react-star-rating-component";
import { TabContent, TabPane, Nav, NavItem, NavLink, Input } from "reactstrap";
import classnames from "classnames";
import {
  CollapsibleComponent,
  CollapsibleHead,
  CollapsibleContent
} from "react-collapsible-component";
import Modal from "react-modal";

export class LiveStream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 3,
      activeTab: "1",
      modalIsOpen: false,
      showRating: false
    };
    this.toggle = this.toggle.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { rating } = this.state;
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "35%",
        height: "20%",
        borderWidth: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2
      }
    };
    return (
      <React.Fragment>
        <section className="header pt-3 pb-3 h-80 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-6 d-flex align-items-center">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/female-circle.png"
                  }
                  className="mr-2"
                  height="25"
                />
                <div className="d-flex justify-content-center flex-column">
                  <h6 className="mid-text smaller mb-1 mt-0">طلال أحمد</h6>
                  <StarRatingComponent
                    starCount={5}
                    value={rating}
                    starColor={"#ffe552"}
                    emptyStarColor={"#a9acb4"}
                    editing={false}
                  />
                </div>
                <div className="light-bg rounded ml-2">
                  <p className="text-white small en-text mb-0 pt-1 pb-1 pl-2 pr-2">
                    10:54
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-6 d-flex align-items-center justify-content-center">
                <h5 className="dark-text mt-0 mb-0">النسبة والتناسب</h5>
              </div>
              <div className="col-md-4 col-12 d-flex align-items-center justify-content-end responsive-margin">
                <ul className="list-inline mb-0 d-flex align-items-center">
                  <li
                    className="list-inline-item small ml-2 red-text clickable"
                    onClick={this.openModal}
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/logout.png"}
                      className="mr-2"
                      height="15"
                    />
                    خروج
                  </li>
                </ul>

                <Modal
                  isOpen={this.state.modalIsOpen}
                  style={customStyles}
                  contentLabel="Logout Modal"
                >
                  {this.state.showRating == true ? null : (
                    <div className="container">
                      <div className="row">
                        <div className="col-12 text-center">
                          <h6 className="dark-text mb-4">
                            هل أنت متأكد من أنك تريد الخروج؟
                          </h6>
                          <button
                            type="button"
                            className="btn light-outline-btn w-25 mr-2 unset-height"
                            onClick={() => this.setState({ showRating: true })}
                          >
                            نعم
                          </button>
                          <button
                            type="button"
                            className="btn dark-outline-btn w-25 unset-height"
                            onClick={this.closeModal}
                          >
                            لا
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {this.state.showRating == true ? (
                    <div className="container">
                      <div className="row">
                        <div className="col-12 text-center">
                          <h6 className="dark-text">تقييم الحصة </h6>
                          <p className="dark-text light-font-text small mb-2">
                            كم تقييم الحصة من 5؟ (التقييم سري)
                          </p>
                          <div className="d-flex justify-content-center mb-3">
                            <StarRatingComponent
                              starCount={5}
                              value={rating}
                              starColor={"#ffe552"}
                              emptyStarColor={"#a9acb4"}
                            />
                          </div>
                          <button
                            type="button"
                            className="btn light-outline-btn w-40 mr-2 unset-height"
                            onClick={() =>
                              this.props.history.push(
                                "/subscriptions/details/schedule"
                              )
                            }
                          >
                            أرسل التقييم
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </Modal>
              </div>
            </div>
          </div>
        </section>

        <section className="page-content pt-3 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-12">
                <CollapsibleComponent>
                  <CollapsibleHead className="rounded h-45 d-flex align-items-center">
                    <img
                      src={
                        process.env.PUBLIC_URL + "/assets/images/light-chat.png"
                      }
                      className="mr-2 contain-img"
                      height="20"
                    />
                    <h6 className="light-silver-text small mt-0 mb-0">دردشة</h6>
                  </CollapsibleHead>
                  <CollapsibleContent
                    className="chat-collapse"
                    isExpanded={true}
                  >
                    <Nav tabs className="chat-tabs border-0">
                      <NavItem className="w-50 mb-0">
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "1"
                          })}
                          onClick={() => {
                            this.toggle("1");
                          }}
                        >
                          الطلاب
                        </NavLink>
                      </NavItem>
                      <NavItem className="w-50 mb-0">
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "2"
                          })}
                          onClick={() => {
                            this.toggle("2");
                          }}
                        >
                          المشرفين
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <div className="chat-box pl-3 pr-3 pt-2">
                          <div className="d-flex align-items-center">
                            <h6 className="mid-text smaller mt-0 mb-0">
                              محمد أحمد
                            </h6>
                          </div>

                          <div class="speech-bubble">
                            <p className="light-font-text mt-0 mb-0">
                              لصفحة وليس مقاطع النشر دليل المقروء صار. ألدوس
                              توزيعاَ قرون إصدار ليتراسيت. أيضاً للنص ما الشكل
                              وليس مقاطع مقاطع هذا هذا بل مستخدماً.
                            </p>
                          </div>
                          <div className="d-flex align-items-center">
                            <h6 className="mid-text smaller mt-0 mb-0">
                              محمد أحمد
                            </h6>
                          </div>

                          <div class="speech-bubble">
                            <p className="light-font-text mt-0 mb-0">
                              لصفحة وليس مقاطع النشر دليل المقروء صار. ألدوس
                              توزيعاَ قرون إصدار ليتراسيت. أيضاً للنص ما الشكل
                              وليس مقاطع مقاطع هذا هذا بل مستخدماً.
                            </p>
                          </div>
                          <div className="d-flex align-items-center">
                            <h6 className="mid-text smaller mt-0 mb-0">
                              محمد أحمد
                            </h6>
                          </div>

                          <div class="speech-bubble">
                            <p className="light-font-text mt-0 mb-0">
                              لصفحة وليس مقاطع النشر دليل المقروء صار. ألدوس
                              توزيعاَ قرون إصدار ليتراسيت. أيضاً للنص ما الشكل
                              وليس مقاطع مقاطع هذا هذا بل مستخدماً.
                            </p>
                          </div>
                          <div className="d-flex align-items-center">
                            <h6 className="mid-text smaller mt-0 mb-0">
                              محمد أحمد
                            </h6>
                          </div>

                          <div class="speech-bubble">
                            <p className="light-font-text mt-0 mb-0">
                              لصفحة وليس مقاطع النشر دليل المقروء صار. ألدوس
                              توزيعاَ قرون إصدار ليتراسيت. أيضاً للنص ما الشكل
                              وليس مقاطع مقاطع هذا هذا بل مستخدماً.
                            </p>
                          </div>
                          <div className="d-flex align-items-center">
                            <h6 className="mid-text smaller mt-0 mb-0">
                              محمد أحمد
                            </h6>
                          </div>

                          <div class="speech-bubble">
                            <p className="light-font-text mt-0 mb-0">
                              لصفحة وليس مقاطع النشر دليل المقروء صار. ألدوس
                              توزيعاَ قرون إصدار ليتراسيت. أيضاً للنص ما الشكل
                              وليس مقاطع مقاطع هذا هذا بل مستخدماً.
                            </p>
                          </div>
                          <div className="d-flex align-items-center">
                            <h6 className="mid-text smaller mt-0 mb-0">
                              محمد أحمد
                            </h6>
                          </div>

                          <div class="speech-bubble">
                            <p className="light-font-text mt-0 mb-0">
                              لصفحة وليس مقاطع النشر دليل المقروء صار. ألدوس
                              توزيعاَ قرون إصدار ليتراسيت. أيضاً للنص ما الشكل
                              وليس مقاطع مقاطع هذا هذا بل مستخدماً.
                            </p>
                          </div>
                        </div>

                        <div className="chat-input d-flex align-items-center justify-content-between">
                          <Input
                            placeholder="شارك أصدقاءك"
                            className="form-control border-0 bg-transparent light-font-text smaller dark-silver-text"
                          />
                          <button type="button" className="btn circle-btn mr-2">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/send-button.png"
                              }
                              height="12"
                              className="contain-img"
                            />
                          </button>
                        </div>
                      </TabPane>
                      <TabPane tabId="2">
                        <div className="d-flex align-items-center justify-content-between chat-item">
                          <div className="d-flex align-items-center">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/user-circle.png"
                              }
                              className="mr-2"
                              height="20"
                            />
                            <h6 className="mid-text smaller mt-0 mb-0">
                              محمد أحمد
                            </h6>
                          </div>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/dark-chat.png"
                            }
                            className="chat-img"
                            height="15"
                          />
                        </div>
                        <div className="d-flex align-items-center justify-content-between chat-item">
                          <div className="d-flex align-items-center">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/user-circle.png"
                              }
                              className="mr-2"
                              height="20"
                            />
                            <h6 className="mid-text smaller mt-0 mb-0">
                              رهام سعيد
                            </h6>
                          </div>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/dark-chat.png"
                            }
                            className="chat-img"
                            height="15"
                          />
                        </div>
                        <div className="d-flex align-items-center justify-content-between chat-item">
                          <div className="d-flex align-items-center">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/user-circle.png"
                              }
                              className="mr-2"
                              height="20"
                            />
                            <h6 className="mid-text smaller mt-0 mb-0">
                              إبتسام اسماعيل
                            </h6>
                          </div>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/dark-chat.png"
                            }
                            className="chat-img"
                            height="15"
                          />
                        </div>
                      </TabPane>
                    </TabContent>
                  </CollapsibleContent>

                  <CollapsibleHead className="rounded h-45 d-flex align-items-center">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/trophy.png"}
                      className="mr-2 contain-img"
                      height="20"
                    />
                    <h6 className="light-silver-text small mt-0 mb-0">
                      لوحة الشرف
                    </h6>
                  </CollapsibleHead>
                  <CollapsibleContent>
                    <div className="box-layout pt-3 pb-3">
                      <div className="d-flex align-items-center justify-content-between list-item">
                        <div className="d-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/user-circle.png"
                            }
                            className="mr-2"
                            height="20"
                          />
                          <h6 className="mid-text smaller mt-0 mb-0">
                            عمر الشريف
                          </h6>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="en-text dark-text small">20</span>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/coins.png"
                            }
                            height="15"
                            className="ml-2"
                          />
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between list-item">
                        <div className="d-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/user-circle.png"
                            }
                            className="mr-2"
                            height="20"
                          />
                          <h6 className="mid-text smaller mt-0 mb-0">
                            عمر الشريف
                          </h6>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="en-text dark-text small">20</span>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/coins.png"
                            }
                            height="15"
                            className="ml-2"
                          />
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between list-item">
                        <div className="d-flex align-items-center">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/user-circle.png"
                            }
                            className="mr-2"
                            height="20"
                          />
                          <h6 className="mid-text smaller mt-0 mb-0">
                            عمر الشريف
                          </h6>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="en-text dark-text small">20</span>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/coins.png"
                            }
                            height="15"
                            className="ml-2"
                          />
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </CollapsibleComponent>

                <CollapsibleHead className="rounded h-45 d-flex align-items-center">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/trophy.png"}
                    className="mr-2 contain-img"
                    height="20"
                  />
                  <h6 className="light-silver-text small mt-0 mb-0">الأسئلة</h6>
                </CollapsibleHead>
              </div>
              <div className="col-md-9 col-12">
                <div className="box-layout mb-3">
                  <iframe
                    src="http://staging.hemma.sa/webinar.html"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    className="mb-0 rounded"
                  />
                </div>

                <div className="row d-flex align-items-center justify-content-between">
                  <div className="col-md-6 col-12 d-flex align-items-center">
                    <div className="btn d-flex align-items-center light-silver-bg border mr-2 h-40 border">
                      <div className="d-flex align-items-center">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/user-circle.png"
                          }
                          className="mr-2"
                          height="20"
                        />
                        <h6 className="mid-text smaller mt-0 mb-0">
                          محمد أحمد
                        </h6>
                      </div>
                      <div className="vertical-separator" />
                      <div className="d-flex align-items-center">
                        <h6 className="en-text mid-text small mt-0 mb-0">20</h6>
                        <img
                          src={
                            process.env.PUBLIC_URL + "/assets/images/coins.png"
                          }
                          className="ml-2"
                          height="18"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn light-silver-bg border h-40"
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/sound-on.png"
                        }
                        className="contain-img"
                        height="18"
                      />
                    </button>
                  </div>

                  <div className="col-md-6 col-12 d-flex align-items-center justify-content-end responsive-margin">
                    <button type="button" className="btn blue-border-btn mr-2">
                      مفهوم
                    </button>
                    <button type="button" className="btn red-border-btn">
                      غير مفهوم
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
