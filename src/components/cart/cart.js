import "./cart.styles.sass";

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getCart, addCoupon, removeCoupon } from "../../actions";
import { CartSummary } from "./CartSummary";
import { CartItemsList } from "./CartItemsList";
import { RecentCoursesSlider } from "./RecentCoursesSlider";
import { EmptyCartPrompt } from "./EmptyCartPrompt";
import { AgreementForm } from "./Agreement";
import { formatPrice } from "./helpers";
import swal from "@sweetalert/with-react";
import { apiBaseUrl } from "../../api/helpers";
import axios from "axios";

class CartComponent extends Component {
  state = {
    busy: true,
    modalIsOpen: false
  };

  openModal(id) {
    this.setState({ modalIsOpen: true });
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  nextPopup(){
    swal("نفيدك أنه تم اشتراكك في الدورة لمزيد من المعلومات أدخل على أيقونة (مرفقات الدورة) ستجد ملف يحتوي أهم التفاصيل عن الدورة", {
      buttons: {
        ok:"موافق"
      },
    })
    .then((value) => {
    this.handleCartCheckout()
    });
  }

  componentDidMount() {
    // Fetch the cart again every time the user access the cart page
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
  
  handleCartCheckout() {
    const cart = this.props.cart;
    const cartAmount = cart && cart.total;

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    if (cartAmount == 0) {
      let data = {
        url: "No_PAYMENT",
        originBankName: "No_PAYMENT",
        destinationBankName: "No_PAYMENT",
        accountHolderName: "No_PAYMENT",
        accountNumber: "No_PAYMENT",
        amount: 0,
        date: new Date()
      };
      axios
        .post(`${apiBaseUrl}/cart/checkout_with_bank_transfer`, data, {
          headers
        })
        .then(response => {
          this.props.history.push("/course/content");
        })
        .catch(error => {
          swal("عفواً", "خدث خطأ ما", "error", {
            button: "متابعة"
          });
        });
    } else {
      this.props.history.push("/cart/checkout");
    }
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
                <h3 className="dark-text">سلة الشراء</h3>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <CartSummary />
                <button
                  className="btn light-outline-btn mt-4 w-100"
                  disabled={!items || items.length === 0}
                  onClick={() => formatPrice(cart.total) ? this.openModal() : this.nextPopup()}
                >
                  متابعة
                </button>
              </div>
              <div className="col-md-8 mt-3">
                {items && items.length === 0 ? (
                  <EmptyCartPrompt />
                ) : (
                  <CartItemsList />
                )}
              </div>
            </div>
            <AgreementForm
              modalIsOpen={this.state.modalIsOpen}
              onClose={this.closeModal}
            />
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
  getCart,
  addCoupon,
  removeCoupon
};

export const Cart = connect(
  mapStateToProps,
  actionCreators
)(CartComponent);
