import React, { Component } from "react";
import "./styles.sass";
import StarRatingComponent from "react-star-rating-component";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  CardText,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from "reactstrap";
import classnames from "classnames";

export class LiveStream extends Component {
  constructor(props) {
    super(props);

    this.state = { rating: 3, collapse: true, activeTab: "1" };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
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

    return (
      <React.Fragment>
        <section className="header pt-3 pb-3 h-80 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-12 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/female-circle.png"
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
                <div>
                  <h5 className="dark-text mt-0 mb-0">النسبة والتناسب</h5>
                </div>
                <div>
                  <ul className="list-inline mb-0 d-flex align-items-center">
                    <li className="list-inline-item small mt-0 dark-text">
                      <span className="en-text">250</span>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/user-circle.png"
                        }
                        className="ml-2"
                        height="20"
                      />
                    </li>
                    <li className="list-inline-item small ml-2 red-text">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/logout.png"
                        }
                        className="mr-2"
                        height="15"
                      />
                      خروج
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-content pt-3 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-3">
                <div className="w-100 rounded h-45 mid-bg clickable mb-2 d-flex align-items-center pr-2 pl-3">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/light-chat.png"
                    }
                    className="mr-2 contain-img"
                    height="20"
                  />
                  <h6 className="light-silver-text small mt-0 mb-0">دردشة</h6>
                </div>
                <Collapse
                  className="chat-collapse"
                  isOpen={this.state.collapse}
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
                      <div className="pl-3 pr-3 pt-2">
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
                </Collapse>

                <div className="w-100 rounded h-45 mid-bg clickable mb-2 d-flex align-items-center pr-2 pl-3">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/trophy.png"}
                    className="mr-2 contain-img"
                    height="20"
                  />
                  <h6 className="light-silver-text small mt-0 mb-0">
                    لوحة الشرف
                  </h6>
                </div>

                <Collapse
                  className="chat-collapse"
                  isOpen={this.state.collapse}
                >
                  <div className="pt-3 pb-3">
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
                            process.env.PUBLIC_URL + "/assets/images/coins.png"
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
                            process.env.PUBLIC_URL + "/assets/images/coins.png"
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
                            process.env.PUBLIC_URL + "/assets/images/coins.png"
                          }
                          height="15"
                          className="ml-2"
                        />
                      </div>
                    </div>
                  </div>
                </Collapse>

                <div className="w-100 rounded h-45 mid-bg clickable mb-2 d-flex align-items-center pr-2 pl-3">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/trophy.png"}
                    className="mr-2 contain-img"
                    height="20"
                  />
                  <h6 className="light-silver-text small mt-0 mb-0">الأسئلة</h6>
                </div>
              </div>
              <div className="col-9">
                <div className="box-layout p-4 mb-3">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/capture.png"}
                    className="cover-img"
                    width="100%"
                    height="100%"
                  />
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
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
                          process.env.PUBLIC_URL +
                          "/assets/images/microphone.png"
                        }
                        className="contain-img"
                        height="18"
                      />
                    </button>
                  </div>

                  <div>
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
