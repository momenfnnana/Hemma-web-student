import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addCoupon, removeCoupon, getCart } from "../../actions";
import swal from "@sweetalert/with-react";
import { formatPrice } from "./helpers";

class CartSummaryComponent extends Component {
  state = {
    couponInputValue: ""
  };

  constructor(props) {
    super(props);
    this.onCouponInputChange = this.onCouponInputChange.bind(this);
    this.onAddCoupon = this.onAddCoupon.bind(this);
    this.onRemoveCoupon = this.onRemoveCoupon.bind(this);
  }

  /**
   * Helper to render the financial details
   */
  renderDetails() {
    const { cart, busy } = this.props;

    return (
      <Fragment>
        <div className="pb-0 p-4">
          <h6 className="dark-text small">السعر الكلي</h6>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <h4 className="light-text mt-2">
              <span className="en-text">
                {cart ? formatPrice(cart.total) : "-"}
              </span>{" "}
              ريال
            </h4>

            {cart && cart.totalBeforeDiscount && (
              <h4 className="dark-silver-text mt-2 mx-auto line-through-text align-items-center d-flex">
                <span className="en-text">
                  {formatPrice(cart.totalBeforeDiscount)}
                </span>{" "}
                ريال
              </h4>
            )}
          </div>

          <h6 className="dark-silver-text smaller mt-2">
            ملاحظة: السعر شامل الضريبة
          </h6>
        </div>

        {cart && cart.payingInInstallments && (
          <div className="pb-0 p-4">
            <h6 className="dark-text smaller">المبلغ المسدد</h6>
            <h5 className="dark-text mt-2">
              <span className="en-text">{formatPrice(cart.installment)}</span>{" "}
              ريال
            </h5>

            <h6 className="dark-text smaller">القيمة المتبقية</h6>
            <h5 className="dark-text mt-2">
              <span className="en-text">
                {formatPrice(cart.amountRemaining)}
              </span>{" "}
              ريال
            </h5>
          </div>
        )}
      </Fragment>
    );
  }

  /**
   * Handle changing the value of the coupon input
   */
  onCouponInputChange(event) {
    this.setState({
      couponInputValue: event.target.value.toUpperCase()
    });
  }

  /**
   * Handle adding a coupon
   */
  onAddCoupon() {
    this.props
      .addCoupon(this.state.couponInputValue)
      .catch(async error => {
        if (error.response && error.response.status === 401) {
          return await this.props.getCart();
        } else {
          throw error;
        }
      })
      .catch(e => {
        const error = e.response && e.response.data && e.response.data.error;
        if (error === "CouponAlreadyAdded") {
          swal("عفواً", "الكوبون المدخل مضاف مسبقا", "error", {
            button: "متابعة"
          });
        } else if (error === "CouponExpired") {
          swal("عفواً", "هذا الكوبون منتهي الصلاحية", "error", {
            button: "متابعة"
          });
        } else {
          swal("عفواً", "يرجى التحقق من صحة الكوبون المدخل", "error", {
            button: "متابعة"
          });
        }
      })
      .then(() => this.props.getCart())
      .then(() => {
        this.setState({
          couponInputValue: ""
        });
      });
  }

  /**
   * Handle removing a coupon
   */
  onRemoveCoupon(couponId) {
    this.props.removeCoupon(couponId)
      .then(() => this.props.getCart());
  }

  /**
   * Helper to render the coupon input section
   */
  renderCouponSection() {
    return (
      <div className="pl-4 pr-4 pb-3 pt-2">
        <form>
          <h6 className="dark-text mb-3">لديك كوبون؟</h6>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control small ltr-input br-left-0"
              placeholder="أدخل الرمز"
              onChange={this.onCouponInputChange}
              value={this.state.couponInputValue}
            />
            <div className="input-group-append w-25">
              {this.state.couponInputValue.length > 0 ? (
                <button
                  className="btn text-white light-bg small light-font-text w-100"
                  type="button"
                  onClick={() => this.onAddCoupon()}
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
          {this.renderCouponsList()}
        </form>
      </div>
    );
  }

  /**
   * Helper to render the coupons list
   */
  renderCouponsList() {
    const coupons = (this.props.cart && this.props.cart.coupons) || [];

    return coupons.map(coupon => (
      <div
        className="d-flex flex-row justify-content-between align-items-center mb-2"
        key={coupon.key}
      >
        <label
          className="red-text smaller mb-0 clickable"
          onClick={() => this.onRemoveCoupon(coupon.id)}
        >
          إزالة الكوبون{" "}
        </label>
        <h6 className="dark-silver-text mb-0 d-flex align-items-center">
          <span className="en-text mr-1">{coupon.key.toUpperCase()}</span>{" "}
          <img
            src={process.env.PUBLIC_URL + "/assets/images/check-mark.png"}
            className="contain-img"
            height="15"
          />
        </h6>
      </div>
    ));
  }

  render() {
    const { cart, busy } = this.props;

    return (
      <Fragment>
        <div className="light-silver-bg box-layout w-100 mt-3 radius-bottom-0">
          {this.renderDetails()}
          <hr />
          {this.renderCouponSection()}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

const actionCreators = {
  addCoupon,
  removeCoupon,
  getCart
};

export const CartSummary = connect(
  mapStateToProps,
  actionCreators
)(CartSummaryComponent);
