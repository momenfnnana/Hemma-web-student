import React, { Component } from "react";
import axios from "axios";
import "./styles.sass";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import { MdEventNote } from "react-icons/md";
import { inputField } from "../shared/inputs/inputField";
import { phoneField } from "../shared/inputs/phoneField";
import { withRouter } from "react-router-dom";

class CheckoutComponent extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <section className="cart-section">
          <div className="container">
            <div className="row pt-5">
              <div className="col-12">
                <h3 className="dark-text">تأكيد الإشتراك</h3>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-4">
                <div className="off-white-bg box-layout w-100  radius-bottom-0">
                  <div className="silver-bg p-3">
                    <h6 className="dark-text mb-0">قائمة الدورات</h6>
                  </div>
                  <div className="p-4">
                    <div className="media">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/course2.png"
                        }
                        className="contain-img mr-2 rounded"
                        height="60"
                      />
                      <div className="media-body mt-1">
                        <h6 className="dark-text small mb-0">
                          دورة القدرات للجامعيين
                        </h6>
                        <p className="dark-silver-text smaller mt-1 mb-1 align-items-center d-flex">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/check-mark.png"
                            }
                            className="contain-img mr-1"
                            height="12"
                          />
                          طباعة الملزمة
                        </p>
                        <div className="mt-0 d-inline-flex flex-row justify-content-between align-items-center float-right">
                          <p className="dark-text small mr-2 mb-0">
                            قيمة الدفع
                          </p>
                          <p className="light-text mb-0">
                            <span className="en-text">180 </span>ريال
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="media">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/course2.png"
                        }
                        className="contain-img mr-2 rounded"
                        height="60"
                      />
                      <div className="media-body mt-1">
                        <h6 className="dark-text small mb-0">
                          دورة القدرات للجامعيين
                        </h6>
                        <p className="dark-silver-text smaller mt-1 mb-1 align-items-center d-flex">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/check-mark.png"
                            }
                            className="contain-img mr-1"
                            height="12"
                          />
                          طباعة الملزمة
                        </p>
                        <div className="mt-0 d-inline-flex flex-row justify-content-between align-items-center float-right">
                          <p className="dark-text small mr-2 mb-0">
                            قيمة الدفع
                          </p>
                          <p className="light-text mb-0">
                            <span className="en-text">180 </span>ريال
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="off-white-bg box-layout w-100 border-top-0 radius-top-0">
                  <div className="silver-bg p-3 d-flex flex-row align-items-center ">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/box.png"}
                      className="contain-img mr-2"
                      height="30"
                    />
                    <h6 className="dark-text small mb-0">بيانات التوصيل</h6>
                  </div>
                  <div className="pt-4 pb-4">
                    <ul className="list-unstyled pl-4 pr-4">
                      <li className="dark-silver-text small">
                        الرياض، شارع السعادة
                      </li>
                      <li className="dark-silver-text small en-text">
                        93235556667+
                      </li>
                      <li className="dark-silver-text small">
                        عمارة 4 الطابق الخامس{" "}
                      </li>
                    </ul>
                    <hr />
                    <div className="pl-4 pr-4 pt-2 pb-1 d-flex flex-row align-items-center">
                      <h6 className="mid-text mb-0 mt-0 mr-3">المبلغ الكلي</h6>
                      <h4 className="dark-text mb-0 mt-0">
                        <span className="en-text">1100</span> ريال
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 mt-3">
                <div className="row">
                  <div className="col-12">
                    <Nav tabs className="w-50 mx-auto">
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "1"
                          })}
                          onClick={() => {
                            this.toggle("1");
                          }}
                        >
                          تحويل بنكي{" "}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeTab === "2"
                          })}
                          onClick={() => {
                            this.toggle("2");
                          }}
                        >
                          بطاقة إئتمانية{" "}
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <div className="row mt-5">
                          <div className="col-12 text-center">
                            <ul className="list-inline">
                              <li className="list-inline-item mr-3">
                                <a href="">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/ncb.png"
                                    }
                                    height="25"
                                    alt="Bank"
                                  />
                                </a>
                              </li>
                              <li className="list-inline-item mr-3">
                                <a href="">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/rajhi.png"
                                    }
                                    height="25"
                                    alt="Bank"
                                  />
                                </a>
                              </li>
                              <li className="list-inline-item mr-3">
                                <a href="">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/aljazera.png"
                                    }
                                    height="25"
                                    alt="Bank"
                                  />
                                </a>
                              </li>
                              <li className="list-inline-item mr-3">
                                <a href="">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/sabb.png"
                                    }
                                    height="25"
                                    alt="Bank"
                                  />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-12">
                            <div className="silver-bg pt-3 pb-3 pl-4 pr-4 rounded">
                              <div className="row">
                                <div className="col-md-6">
                                  <h6 className="small dark-text mb-1">
                                    رقم حسابنا البنكي (آيبان)
                                  </h6>
                                  <p className="small dark-silver-text en-text">
                                    SA85 8000 0296 6080 1000 8459
                                  </p>

                                  <h6 className="small dark-text mb-1">
                                    رقم حسابنا البنكي{" "}
                                  </h6>
                                  <p className="small dark-silver-text en-text">
                                    296608010008459
                                  </p>

                                  <h6 className="small dark-text mb-1">
                                    حسابنا باسم
                                  </h6>
                                  <p className="small dark-silver-text mb-0">
                                    منصة همة التعليمية
                                  </p>
                                </div>
                                <div className="col-md-6 text-center align-self-center">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/sabb.png"
                                    }
                                    className="contain-img"
                                    height="30"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-12 text-center">
                            <h5 className="light-font-text dark-text">
                              بعد إتمام التحويل ادخل رقم الحوالة
                            </h5>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-6 ">
                            <form>
                              <Field
                                name="bankName"
                                type="text"
                                component={inputField}
                                className="form-control border-left-0 pl-0"
                                placeholder="اسم البنك"
                              />
                              <Field
                                name="bankAccount"
                                type="text"
                                component={inputField}
                                className="form-control border-left-0 pl-0"
                                placeholder="اسم الحساب البنكي"
                              />

                              <label className="dark-text small mb-2">
                                وقت وتاريخ الحوالة
                              </label>

                              <Field
                                name="transferDate"
                                type="date"
                                component={inputField}
                                className="form-control border-left-0 pl-0 en-text"
                              >
                                <MdEventNote />
                              </Field>
                            </form>
                            <h6 className="dark-silver-text smaller">
                              ملاحظة: يرجى التأكد من تاريخ ووقت الحوالة
                            </h6>
                          </div>
                          <div className="col-md-6">
                            <div
                              className="silver-bg pt-3 pb-3 pl-4 pr-4 rounded align-items-center justify-content-center d-flex flex-column"
                              style={{ height: 200 }}
                            >
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/camera.png"
                                }
                                className="contain-img"
                                height="40"
                              />
                              <p className="dark-silver-text light-font-text mt-3 small">
                                أرفق صورة للحوالة
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Col sm="12">
                            <h4>Tab 2 Contents</h4>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    <button className="btn light-outline-btn mt-5 w-25">
                      إتمام الدفع
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

function mapStateToProps(state) {
  return {
    formValues: state.form.Checkout && state.form.Checkout.values
  };
}

CheckoutComponent = reduxForm({
  form: "Checkout"
  //   validate
})(CheckoutComponent);

CheckoutComponent = connect(mapStateToProps)(CheckoutComponent);

export const Checkout = withRouter(CheckoutComponent);
