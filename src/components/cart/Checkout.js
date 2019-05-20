import "./checkout.styles.sass";

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getCart } from "../../actions";
import { RecentCoursesSlider } from "./RecentCoursesSlider";
import { MiniCartItemsList } from "./MiniCartItemsList";
import { ShippingAddressDisplay } from "./ShippingAddressDisplay";
import { formatPrice } from "./helpers";
import { PaymentTabs } from "./PaymentTabs";
import { ShippingAddressForm } from "./ShippingAddressForm";

class CheckoutComponent extends Component {
  state = {
    busy: true
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props
      .getCart()
      .then(result => {
        this.setState({
          busy: false
        });
      })
      .catch(err => {
        console.error("Error while fetching the cart");
        this.setState({
          busy: false
        });
      });
  }

  render() {
    const cart = this.props.cart;
    const items = cart && cart.items;
    const { busy } = this.state;

    return (
      <Fragment>
        <section className="cart-section">
          <div className="container">
            <div className="row pt-5">
              <div className="col-12">
                <h3 className="dark-text">تأكيد الإشتراك</h3>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-4">
                <MiniCartItemsList />

                <div className="off-white-bg box-layout w-100 border-top-0 radius-top-0">
                  {cart && cart.requireShippingAddress && (
                    <ShippingAddressForm />
                  )}

                  <div className="pt-2 pb-3">
                    <div className="pl-4 pr-4 pt-2 pb-1 d-flex flex-row align-items-center">
                      <h6 className="mid-text mb-0 mt-0 mr-3">المبلغ الكلي</h6>
                      <h4 className="dark-text mb-0 mt-0">
                        <span className="en-text">
                          {formatPrice(
                            cart && (cart.installment || cart.total)
                          )}
                        </span>{" "}
                        ريال
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-8 mt-3">
                <PaymentTabs />
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
                <RecentCoursesSlider />
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { cart: state.cart };
}

const actionCreators = {
  getCart
};

export const Checkout = connect(
  mapStateToProps,
  actionCreators
)(CheckoutComponent);
