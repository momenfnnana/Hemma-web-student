import React, { Component } from "react";
import axios from "axios";
import "./styles.sass";
import { MdClose } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../shared/card/card";
import swal from "@sweetalert/with-react";
import { Link } from "react-router-dom";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      courses: [],
      isInputDisabled: true,
      checked: false,
      showAddressInfo: false,
      validCoupon: null
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get("https://api.staging.hemma.sa/api/v1/cart", { headers })
      .then(response => {
        this.setState({ cart: response.data.data });
        console.log(this.state.cart);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("https://api.staging.hemma.sa/api/v1/courses/recent")
      .then(response => {
        this.setState({ courses: response.data.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteItem(id) {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .delete(`https://api.staging.hemma.sa/api/v1/cart/items/${id}`, {
        headers
      })
      .then(response => {
        this.setState({ cart: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateCart(id) {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      installment: 0,
      packageOption: this.state.checked
    };
    axios
      .put(`https://api.staging.hemma.sa/api/v1/cart/items/${id}`, data, {
        headers
      })
      .then(response => {
        this.setState({ checked: true, cart: response.data.data });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeText(event) {
    this.setState({ validCoupon: event.target.value });
  }

  addCoupon() {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      coupon: this.state.validCoupon
    };
    axios
      .post("https://api.staging.hemma.sa/api/v1/cart/coupons", data, {
        headers
      })
      .then(response => {
        this.setState({ cart: response.data.data });
      })
      .catch(error => {
        swal("عفواً", "يرجى التحقق من صحة الكوبون المدخل", "error", {
          button: "متابعة"
        });
      });
  }

  deleteCoupon(key) {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .delete(`https://api.staging.hemma.sa/api/v1/cart/coupons/${key}`, {
        headers
      })
      .then(response => {
        this.setState({ cart: response.data.data });
        console.log(response);
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

  renderItems() {
    const items = this.state.cart.items || [];

    return items.map(item => (
      <React.Fragment>
        <div
          className="bg-white box-layout w-100 p-3 d-flex align-items-center mb-4 mt-3"
          key={item.itemId}
        >
          <div className="media w-75 position-relative">
            <MdClose
              color="#dbdbdb"
              className="close-btn clickable"
              onClick={() => this.deleteItem(item.id)}
            />
            <img
              className="mr-3 rounded cover-img"
              src={item.imageUrl}
              height="100"
              width="100"
            />
            <div className="media-body mt-2">
              <h6 className="mt-0 dark-text">{item.nameAr}</h6>

              {item.packageOption == undefined ? null : (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    onClick={() => this.updateCart(item.id)}
                  />
                  <label className="form-check-label smaller dark-silver-text">
                    أرغب في الحصول على ملزمة مطبوعة
                  </label>
                </div>
              )}
            </div>
          </div>
          <div>
            <form className="form-inline mb-3">
              <div className="form-group">
                <label className="dark-text smaller">قيمة القسط</label>
                <input
                  disabled={this.state.isInputDisabled}
                  type="text"
                  className="form-control form-control-sm mx-auto unset-height text-center en-text w-50"
                  value={item.price}
                />
              </div>
            </form>
            <div className="d-flex flex-row justify-content-between">
              <label className="dark-text smaller mb-0">سعر الاشتراك</label>
              <div className="d-flex flex-column mx-auto">
                <h6 className="light-text text-center mb-0">
                  <span className="en-text">{item.price}</span> ريال
                </h6>
                {item.discountedPrice == undefined ? null : (
                  <h6 className="mb-0 dark-silver-text line-through-text">
                    <span className="en-text">{item.discountedPrice}</span> ريال
                  </h6>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ));
  }

  renderCoupons() {
    const coupons = this.state.cart.coupons || [];
    return coupons.map(coupon => (
      <React.Fragment>
        <div
          className="d-flex flex-row justify-content-between align-items-center mb-2"
          key={coupon.id}
        >
          <label
            className="red-text smaller mb-0 clickable"
            onClick={() => this.deleteCoupon(coupon.key)}
          >
            إزالة الكوبون{" "}
          </label>
          <h6 className="dark-silver-text mb-0 d-flex align-items-center">
            <span className="en-text mr-1">{coupon.key}</span>{" "}
            <img
              src={process.env.PUBLIC_URL + "/assets/images/check-mark.png"}
              className="contain-img"
              height="15"
            />
          </h6>
        </div>
      </React.Fragment>
    ));
  }

  render() {
    var settings = {
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
    return (
      <React.Fragment>
        <section className="cart-section">
          <div className="container">
            <div className="row pt-5">
              <div className="col-12">
                <h3 className="dark-text">سلة الشراء</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="silver-bg box-layout w-100 mt-3 radius-bottom-0">
                  <div className="pb-0 p-4 ">
                    <h6 className="dark-text small">السعر الكلي</h6>
                    <div className="d-flex flex-row align-items-center justify-content-between">
                      <h4 className="light-text mt-2">
                        <span className="en-text">{this.state.cart.total}</span>{" "}
                        ريال
                      </h4>

                      {this.state.cart.totalAfterDiscount ==
                      undefined ? null : (
                        <h4 className="dark-silver-text mt-2 mx-auto line-through-text">
                          <span className="en-text">
                            {this.state.cart.totalAfterDiscount}
                          </span>{" "}
                          ريال
                        </h4>
                      )}
                    </div>

                    <h6 className="dark-silver-text smaller mt-2">
                      ملاحظة: السعر شامل الضريبة
                    </h6>
                  </div>
                  <hr />
                  <div className="pl-4 pr-4 pb-3 pt-2">
                    <form>
                      <h6 className="dark-text mb-3">لديك كوبون؟</h6>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control small ltr-input br-left-0"
                          placeholder="أدخل الرمز"
                          onChange={this.onChangeText.bind(this)}
                          value={this.state.validCoupon}
                        />
                        <div className="input-group-append w-25">
                          <button
                            className="btn text-white light-bg small light-font-text w-100"
                            type="button"
                            onClick={() => this.addCoupon()}
                          >
                            تفعيل
                          </button>
                        </div>
                      </div>
                      {this.renderCoupons()}
                    </form>
                  </div>
                </div>

                {this.state.cart.requireShippingAddress == false ? null : (
                  <div className="off-white-bg box-layout w-100 border-top-0 radius-top-0">
                    <div className="p-4">
                      <div className="d-flex flex-row align-items-center mb-3">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/assets/images/box.png"
                          }
                          className="contain-img mr-2"
                          height="30"
                        />
                        <h6 className="dark-text small mb-0">بيانات التوصيل</h6>
                      </div>
                      <form>
                        <div className="form-group">
                          <input
                            className="form-control small"
                            placeholder="اسم المستلم"
                          />
                        </div>
                        <div className="form-group">
                          <select className="form-control">
                            <option selected disabled>
                              اختر المدينة
                            </option>
                          </select>
                        </div>
                        <div className="form-group mb-0">
                          <textarea
                            className="form-control small"
                            placeholder="عنوان التوصيل"
                            rows="6"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                <Link
                  to="/cart/checkout"
                  className="btn light-outline-btn mt-4 w-100 "
                >
                  متابعة
                </Link>
              </div>
              <div className="col-md-8 mt-3">
                {/* {this.state.cart && this.state.cart.length > 0 ? ( */}
                <div className="row">
                  <div className="col-12">
                    <h6 className="dark-text">قائمة الدورات</h6>
                    {this.renderItems()}
                    <button
                      className="btn dark-btn circle float-right pl-4 pr-4"
                      onClick={() => this.setState({ isInputDisabled: false })}
                    >
                      تسديد بالأقساط؟
                    </button>
                  </div>
                </div>
                {/* ) : ( */}
                {/* <div className="row">
                    <div className="col-12 justify-content-center align-items-center d-flex flex-column">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/shopping-cart.png"
                        }
                        className="contain-img"
                        height="150"
                      />
                      <p className="dark-silver-text mt-3">سلة التسوق فارغة</p>
                      <Link
                        to="/categories"
                        className="btn dark-outline-btn circle w-25 float-right pl-4 pr-4"
                      >
                        احجز دورتك
                      </Link>
                    </div>
                  </div> */}
                {/* )} */}
              </div>
            </div>
          </div>
        </section>

        <section className="courses-section section-padder">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h4 className="dark-text pb-3">اشترك بدورات أخرى؟</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Slider {...settings}>{this.renderCourses()}</Slider>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
