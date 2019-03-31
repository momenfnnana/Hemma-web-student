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
import { withRouter } from "react-router-dom";
import * as Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => (
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />
);

class CheckoutComponent extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      activeBank: "1",
      file: null,
      cart: [],
      shippingInfo: []
    };
  }

  componentDidMount() {
    const { cartInfo } = this.props.location;
    const { shippingInfo } = this.props.location;
    this.setState({ cart: cartInfo, shippingInfo: shippingInfo });
  }

  renderItems() {
    const items = this.state.cart.items || [];

    return items.map(item => (
      <React.Fragment>
        <div className="media" key={item.itemId}>
          <img
            src={item.imageUrl}
            className="cover-img mr-2 rounded"
            height="60"
            width="60"
          />
          <div className="media-body mt-1">
            <h6 className="dark-text small mb-0">{item.nameAr}</h6>
            {item.packageOption == true ? (
              <p className="dark-silver-text smaller mt-1 mb-1 align-items-center d-flex">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/check-mark.png"}
                  className="contain-img mr-1"
                  height="12"
                />
                طباعة الملزمة
              </p>
            ) : null}

            <div className="mt-0 d-inline-flex flex-row justify-content-between align-items-center float-right">
              <p className="dark-text small mr-2 mb-0">قيمة الدفع</p>
              <p className="light-text mb-0">
                <span className="en-text">{item.price} </span>ريال
              </p>
            </div>
          </div>
        </div>
        <hr />
      </React.Fragment>
    ));
  }

  onFileInputChange(file) {
    this.setState({
      file: URL.createObjectURL(file)
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggle(tab) {
    if (this.state.activeBank !== tab) {
      this.setState({
        activeBank: tab
      });
    }
  }

  myFormHandler = values => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };
    let data = new FormData();
    let imageFile = values.bankDoc;
    data.append("file", imageFile);

    axios
      .post(
        "https://api.staging.hemma.sa/api/v1/payments/bank_transfers/uploads",
        data,
        {
          headers
        }
      )
      .then(response => {
        let token = localStorage.getItem("token");
        let headers = {
          Authorization: `Bearer ${token}`
        };
        let data = {
          url: response.data.data.url,
          bankName: values.bankName,
          accountName: values.accountName,
          amount: values.amount,
          date: values.date,
          shippingRecipient: this.state.shippingInfo.recipient,
          // shippingCityId: this.state.shippingInfo.city,
          shippingAddress: this.state.shippingInfo.address
        };

        axios
          .post(
            "https://api.staging.hemma.sa/api/v1/cart/checkout_with_bank_transfer",
            data,
            {
              headers
            }
          )
          .then(response => {
            swal("تنبيه", "تمت عملية الدفع بنجاح", "success", {
              button: "متابعة"
            });
            this.props.history.push("/account/courses");
          })
          .catch(error => {
            switch (error.response.data && error.response.data.error) {
              case "Duplicate":
                swal("عفواً", "تم الدفع سابقاً", "error", {
                  button: "متابعة"
                });
                break;
              case "ServerError":
                swal("عفواً", "حدث خطأ ما", "error", {
                  button: "متابعة"
                });
                break;

              default:
                console.log("other error");
            }
          });
      })
      .catch(error => {
        switch (error.response.data && error.response.data.error) {
          case "ServerError":
            swal("عفواً", "حدث خطأ ما", "error", {
              button: "متابعة"
            });
            break;

          default:
            console.log("other error");
        }
      });
  };

  render() {
    const { handleSubmit, submitting } = this.props;
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
                <div className="off-white-bg box-layout w-100 radius-bottom-0">
                  <div className="silver-bg p-3">
                    <h6 className="dark-text mb-0">قائمة الدورات</h6>
                  </div>
                  <div className="p-4 pb-0">{this.renderItems()}</div>
                </div>
                <div className="off-white-bg box-layout w-100 border-top-0 radius-top-0">
                  <React.Fragment>
                    <div className="silver-bg p-3 d-flex flex-row align-items-center ">
                      <img
                        src={process.env.PUBLIC_URL + "/assets/images/box.png"}
                        className="contain-img mr-2"
                        height="30"
                      />
                      <h6 className="dark-text small mb-0">بيانات التوصيل</h6>
                    </div>
                    <div className="pt-4">
                      <ul className="list-unstyled pl-4 pr-4 mb-0">
                        <li className="dark-silver-text small">
                          اسم المستلم: {this.state.shippingInfo.recipient}
                        </li>
                        <li className="dark-silver-text small">
                          المدينة: {this.state.shippingInfo.city}
                        </li>
                        <li className="dark-silver-text small">
                          العنوان: {this.state.shippingInfo.address}
                        </li>
                      </ul>
                      <hr />
                    </div>
                  </React.Fragment>
                  <div className="pt-2 pb-3">
                    <div className="pl-4 pr-4 pt-2 pb-1 d-flex flex-row align-items-center">
                      <h6 className="mid-text mb-0 mt-0 mr-3">المبلغ الكلي</h6>
                      <h4 className="dark-text mb-0 mt-0">
                        <span className="en-text">{this.state.cart.total}</span>{" "}
                        ريال
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 mt-3">
                <form onSubmit={handleSubmit(this.myFormHandler)}>
                  <div className="row">
                    <div className="col-12">
                      <Nav tabs className="custom-tabs w-50 mx-auto">
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
                        <NavItem className="position-relative">
                          <NavLink disabled>بطاقة إئتمانية </NavLink>
                          <img
                            src={
                              process.env.PUBLIC_URL + "/assets/images/tag.png"
                            }
                            height="28"
                            alt="Soon"
                            className="position-absolute tag-img"
                          />
                          <h6 className="text-white light-font-text small text-position mb-0">
                            قريبًا..
                          </h6>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                          <div className="row mt-4">
                            <div className="col-md-1" />
                            <div className="col-md-5">
                              <div className="box-layout green-box">
                                <div className="box-header p-3 text-center bg-white">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/ncb.png"
                                    }
                                    height="40"
                                    className="contain-img"
                                    alt="NCB Bank"
                                  />
                                </div>
                                <div className="box-body silver-bg text-center p-3">
                                  <h6 className="small dark-text mb-1">
                                    رقم حسابنا البنكي (آيبان)
                                  </h6>
                                  <p className="small dark-silver-text en-text">
                                    SA171 00000 10172 38800 0105
                                  </p>

                                  <h6 className="small dark-text mb-1">
                                    رقم حسابنا البنكي{" "}
                                  </h6>
                                  <p className="small dark-silver-text en-text">
                                    10172388000105
                                  </p>

                                  <h6 className="small dark-text mb-1">
                                    حسابنا باسم
                                  </h6>
                                  <p className="small dark-silver-text mb-0">
                                    سعيد عبدالله سعيد بالبيد
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-5">
                              <div className="box-layout blue-box">
                                <div className="box-header p-3 text-center">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/rajhi.png"
                                    }
                                    height="40"
                                    className="contain-img"
                                    alt="Rajhi Bank"
                                  />
                                </div>
                                <div className="box-body silver-bg text-center p-3">
                                  <h6 className="small dark-text mb-1">
                                    رقم حسابنا البنكي (آيبان)
                                  </h6>
                                  <p className="small dark-silver-text en-text">
                                    SA728 00005 10608 01002 4183
                                  </p>

                                  <h6 className="small dark-text mb-1">
                                    رقم حسابنا البنكي{" "}
                                  </h6>
                                  <p className="small dark-silver-text en-text">
                                    510608010024183
                                  </p>

                                  <h6 className="small dark-text mb-1">
                                    حسابنا باسم
                                  </h6>
                                  <p className="small dark-silver-text mb-0">
                                    سعيد عبدالله سعيد بالبيد
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-1" />
                          </div>

                          <div className="row mt-4">
                            <div className="col-12 text-center">
                              <h5 className="light-font-text dark-text mt-2">
                                بعد إتمام التحويل ادخل رقم الحوالة
                              </h5>
                            </div>
                          </div>
                          <div className="row mt-4">
                            <div className="col-md-6 ">
                              <Field
                                name="bankName"
                                type="text"
                                component={inputField}
                                className="form-control border-left-0 pl-0"
                                placeholder="اسم البنك"
                              />
                              <Field
                                name="accountName"
                                type="text"
                                component={inputField}
                                className="form-control border-left-0 pl-0"
                                placeholder="اسم الحساب البنكي"
                              />
                              <Field
                                name="amount"
                                type="text"
                                component={inputField}
                                className="form-control border-left-0 pl-0"
                                placeholder="القيمة المحولة"
                              />
                              <label className="dark-text small mb-2">
                                وقت وتاريخ الحوالة
                              </label>
                              <Datetime value={new Date()} />
                              <h6 className="dark-silver-text smaller mt-2">
                                ملاحظة: يرجى التأكد من تاريخ ووقت الحوالة
                              </h6>

                              <Field
                                component={FileInput}
                                name="bankDoc"
                                className="d-none"
                                id="uploadImage"
                                onChange={this.onFileInputChange.bind(this)}
                              />
                              <label
                                for="uploadImage"
                                className="clickable w-100"
                              >
                                <div
                                  className="silver-bg pt-3 pb-3 pl-4 pr-4 rounded align-items-center justify-content-center d-flex flex-column"
                                  style={{ minHeight: 200 }}
                                >
                                  {this.state.file ? (
                                    <img
                                      src={
                                        this.state.file ||
                                        process.env.PUBLIC_URL +
                                          "/assets/images/camera.png"
                                      }
                                      className="contain-img"
                                      width="100%"
                                    />
                                  ) : (
                                    <React.Fragment>
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
                                    </React.Fragment>
                                  )}
                                </div>
                              </label>
                            </div>

                            <div className="col-md-6 text-center">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/transfer.png"
                                }
                                className="contain-img"
                                height="400"
                              />
                            </div>
                          </div>
                        </TabPane>
                        <TabPane tabId="2">
                          <Row>
                            <Col sm="12" />
                          </Row>
                        </TabPane>
                      </TabContent>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-12 text-center">
                      <button className="btn light-outline-btn mt-5 w-25">
                        إتمام الدفع
                      </button>
                    </div>
                  </div>
                </form>
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
