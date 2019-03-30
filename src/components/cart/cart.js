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
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { inputField } from "../shared/inputs/inputField";
import { selectField } from "../shared/inputs/selectField";
import { withRouter } from "react-router-dom";
import { textareaField } from "../shared/inputs/textareaField";
import { Agreement } from "../agreement/agreement";

class CartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      courses: [],
      checked: [],
      showAddressInfo: false,
      validCoupon: null,
      installmentInput: null,
      cities: [],
      isVisible: false,
      isInputDisabled: [],
      price: false,
      minimum: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(id) {
    this.setState({ modalIsOpen: true });
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
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

    axios
      .get("https://api.staging.hemma.sa/api/v1/cart/shipping_cities")
      .then(response => {
        this.setState({ cities: response.data.data });
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
    const item = this.state.cart.items.find(x => x.id === id);
    let data = {
      packageOption: !item.packageOption
    };
    axios
      .put(`https://api.staging.hemma.sa/api/v1/cart/items/${id}`, data, {
        headers
      })
      .then(response => {
        const checked = this.state.checked.filter(val => val !== id);
        if (item.packageOption) {
          checked.push(id);
        }
        this.setState({
          checked,
          cart: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  confirmInstallment(id) {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      installment: "5000"
    };
    axios
      .put(`https://api.staging.hemma.sa/api/v1/cart/items/${id}`, data, {
        headers
      })
      .then(response => {
        console.log(response);
        this.setState({
          cart: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = (id, event) => {
    this.setState({ itemPrice: event.target.value });
    const item = this.state.cart.items.find(x => x.id === id);
    const itemPrice = item.price;
    const minimumInstallment = item.minimumInstallment;
    if (event.target.value > itemPrice) {
      this.setState({ price: true });
    } else if (event.target.value > minimumInstallment) {
      this.setState({ minimum: true });
    }
  };

  changeDisableState = (id, i) => {
    const item = this.state.cart.items.find(x => x.id === id);
    let isInputDisabled = this.state.isInputDisabled;
    isInputDisabled[i] = !isInputDisabled[i];
    // if (item.canBePaidInInstallments == true) {
    this.setState({ isInputDisabled });
    // }
  };

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

  renderCities() {
    return this.state.cities.map(city => (
      <option key={city.id} value={city.nameAr}>
        {city.nameAr}
      </option>
    ));
  }

  renderItems() {
    const items = this.state.cart.items || [];

    return items.map((item, i) => (
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
              <h6 className="mt-0 dark-text">
                {item.nameAr}{" "}
                {item.packageOption ? (
                  <span className="smaller red-text">
                    ( سعر الملزمة:{" "}
                    <span className="en-text">{item.packageOptionPrice}</span>{" "}
                    ر.س. )
                  </span>
                ) : null}
              </h6>

              {item.packageOption == undefined ? null : (
                <div className="form-check mb-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    onClick={() => this.updateCart(item.id)}
                    checked={item.packageOption}
                  />
                  <label className="form-check-label smaller dark-silver-text">
                    أرغب في الحصول على ملزمة مطبوعة
                  </label>
                </div>
              )}

              {/* <div className="form-check mb-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  onClick={() => this.changeDisableState(item.id, i)}
                />
                <label className="form-check-label smaller dark-silver-text">
                  سداد بالأقساط
                </label>
              </div> */}

              {!this.state.isInputDisabled[i] ? (
                <span
                  className="badge blue-status light-font-text clickable"
                  onClick={() => this.changeDisableState(item.id, i)}
                >
                  سداد بالأقساط؟
                </span>
              ) : (
                <span
                  className="badge blue-status light-font-text clickable"
                  onClick={() => this.confirmInstallment(item.id)}
                >
                  اعتمد القسط
                </span>
              )}

              {this.state.minimum ? (
                <p className="red-text smaller light-font-text mt-1">
                  القيمة أكبر من الحد الأقصى المسموح
                </p>
              ) : null}

              {this.state.isVisible == true ? (
                <p className="red-text smaller light-font-text mt-1">
                  {item.canBePaidInInstallments == true
                    ? "قم بتحديد القيمة التي ترغب في سدادها"
                    : "نعتذر لا يمكن سدادها بالأقساط"}
                </p>
              ) : null}
            </div>
          </div>
          <div className="w-25">
            <form className="mb-2 d-flex flex-row align-items-center">
              <label className="dark-text smaller mb-0">قيمة القسط</label>
              <input
                disabled={!this.state.isInputDisabled[i]}
                type="text"
                className="form-control form-control-sm mx-auto unset-height text-center en-text w-50"
                value={item.price}
                name="itemPrice"
                onChange={event => this.handleChange(item.id, event)}
              />
            </form>
            <div className="d-flex flex-row justify-content-between align-items-center">
              <label className="dark-text smaller mb-0">سعر الاشتراك</label>
              <div className="d-flex flex-column mx-auto">
                <h6 className="light-text text-center mb-0">
                  <span className="en-text">{item.price}</span> ريال
                </h6>
                {item.priceBeforeDiscount == undefined ? null : (
                  <h6 className="mb-0 dark-silver-text line-through-text align-items-center d-flex">
                    <span className="en-text">{item.priceBeforeDiscount}</span>{" "}
                    ريال
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

  myFormHandler = values => {
    let shippingInfo = {
      recipient: values.recipient,
      // city: values.city,
      address: values.address
    };
    // this.openModal();
    this.props.history.push({
      pathname: "/cart/checkout",
      cartInfo: this.state.cart,
      shippingInfo: shippingInfo
    });
  };

  render() {
    const { handleSubmit } = this.props;

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
                  <div className="pb-0 p-4">
                    <h6 className="dark-text small">السعر الكلي</h6>
                    <div className="d-flex flex-row align-items-center justify-content-between">
                      <h4 className="light-text mt-2">
                        <span className="en-text">{this.state.cart.total}</span>{" "}
                        ريال
                      </h4>

                      {this.state.cart.totalBeforeDiscount ==
                      undefined ? null : (
                        <h4 className="dark-silver-text mt-2 mx-auto line-through-text align-items-center d-flex">
                          <span className="en-text">
                            {this.state.cart.totalBeforeDiscount / 100}
                          </span>{" "}
                          ريال
                        </h4>
                      )}
                    </div>

                    <h6 className="dark-silver-text smaller mt-2">
                      ملاحظة: السعر شامل الضريبة
                    </h6>
                  </div>
                  {this.state.cart.payingInInstallments == true ? (
                    <div className="pb-0 p-4">
                      <h6 className="dark-text smaller">
                        المبلغ المطلوب سداده
                      </h6>
                      <h5 className="dark-text mt-2">
                        <span className="en-text">
                          {this.state.cart.installment}
                        </span>{" "}
                        ريال
                      </h5>

                      <h6 className="dark-text smaller">القيمة المتبقية</h6>
                      <h5 className="dark-text mt-2">
                        <span className="en-text">
                          {this.state.cart.amountRemaining}
                        </span>{" "}
                        ريال
                      </h5>
                    </div>
                  ) : null}
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
                          {this.state.cart.items &&
                          this.state.cart.items.length > 0 ? (
                            <button
                              className="btn text-white light-bg small light-font-text w-100"
                              type="button"
                              onClick={() => this.addCoupon()}
                            >
                              تفعيل
                            </button>
                          ) : (
                            <button
                              className="btn text-white light-bg small light-font-text w-100"
                              type="button"
                              disabled={true}
                            >
                              تفعيل
                            </button>
                          )}
                        </div>
                      </div>
                      {this.renderCoupons()}
                    </form>
                  </div>
                </div>

                <form onSubmit={handleSubmit(this.myFormHandler)}>
                  {this.state.cart.requireShippingAddress == true ? (
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
                          <h6 className="dark-text small mb-0">
                            بيانات التوصيل
                          </h6>
                        </div>
                        <div className="form-group">
                          <Field
                            name="recipient"
                            type="text"
                            component={inputField}
                            className="form-control border-left-0 pl-0"
                            placeholder="اسم المستلم"
                          />
                        </div>
                        <div className="form-group">
                          <select
                            name="city"
                            // component={selectField}
                            className="form-control"
                          >
                            <option selected disabled>
                              اختر المدينة
                            </option>
                            {this.renderCities()}
                          </select>
                        </div>
                        <div className="form-group mb-0">
                          <Field
                            className="form-control small"
                            placeholder="عنوان التوصيل"
                            rows="6"
                            name="address"
                            component={textareaField}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {this.state.cart.items && this.state.cart.items.length > 0 ? (
                    <button className="btn light-outline-btn mt-4 w-100">
                      متابعة
                    </button>
                  ) : (
                    <button
                      className="btn light-outline-btn mt-4 w-100"
                      disabled={true}
                    >
                      متابعة
                    </button>
                  )}
                  <Agreement
                    modalIsOpen={this.state.modalIsOpen}
                    onClose={this.closeModal}
                  />
                </form>
              </div>
              <div className="col-md-8 mt-3">
                {this.state.cart.items && this.state.cart.items.length > 0 ? (
                  <div className="row">
                    <div className="col-12">
                      <h6 className="dark-text">قائمة الدورات</h6>
                      {this.renderItems()}
                    </div>
                  </div>
                ) : (
                  <div className="row">
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
                  </div>
                )}
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

function mapStateToProps(state) {
  return {
    formValues: state.form.Cart && state.form.Cart.values
  };
}

CartComponent = reduxForm({
  form: "Cart"
  // validate
})(CartComponent);

CartComponent = connect(mapStateToProps)(CartComponent);

export const Cart = withRouter(CartComponent);
