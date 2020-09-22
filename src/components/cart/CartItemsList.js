import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { removeCartItem, updateCartItem, getCart } from "../../actions";
import { Api } from "../../api";
import { BookletCartItem } from "./BookletCartItem";
import { CourseCartItem } from "./CourseCartItem";
import { CourseInstallmentCartItem } from "./CourseInstallmentCartItem";

class CartItemsListComponent extends Component {
  constructor(props) {
    super(props);
    this.onUpdateItem = this.onUpdateItem.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
  }

  /**
   * Handle updating a cart item
   */
  onUpdateItem(item, data) {
    this.props.updateCartItem(item, data);
  }

  onSetPackageOption = (itemId, value, type = null) => {
    if (value) {
      Api.cart
        .setPackageOption(itemId, value)
        .then(() => Api.cart.setBookletType(itemId, type))
        .then(this.props.getCart);
    } else {
      Api.cart.setPackageOption(itemId, value).then(this.props.getCart);
    }
  };

  onSetInstallment = (itemId, installment) => {
    Api.cart.setInstallment(itemId, installment).then(this.props.getCart);
  };

  onSetBookletType = (itemId, type) => {
    Api.cart.setBookletType(itemId, type).then(this.props.getCart);
  };

  /**
   * Handle removing a cart item
   */
  onRemoveItem(itemId) {
    this.props.removeCartItem(itemId).then(() => this.props.getCart());
  }

  /**
   * Helper to render the list of cart items
   */
  renderItems(items) {
    return (
      <div className="row">
        <div className="col-12">
          <h6 className="dark-text">قائمة الدورات</h6>
          {items &&
            items.map((item, i) => (
              <>
                {item.type === "Course" && (
                  <CourseCartItem
                    key={item.id}
                    item={item}
                    onSetPackageOption={(value, type) =>
                      this.onSetPackageOption(item.id, value, type)
                    }
                    onSetBookletType={(type) =>
                      this.onSetBookletType(item.id, type)
                    }
                    onSetInstallment={(installment) =>
                      this.onSetInstallment(item.id, installment)
                    }
                    onRemoveItem={() => this.onRemoveItem(item.id)}
                  />
                )}

                {item.type === "Booklet" && (
                  <BookletCartItem
                    key={item.id}
                    item={item}
                    onSetBookletType={(type) =>
                      this.onSetBookletType(item.id, type)
                    }
                    onRemoveItem={() => this.onRemoveItem(item.id)}
                  />
                )}

                {item.type === "Installment" && (
                  <CourseInstallmentCartItem
                    key={item.id}
                    item={item}
                    onSetInstallment={(installment) =>
                      this.onSetInstallment(item.id, installment)
                    }
                    onRemoveItem={() => this.onRemoveItem(item.id)}
                  />
                )}
              </>
            ))}
        </div>
      </div>
    );
  }

  render() {
    const items = this.props.cart && this.props.cart.items;
    if (!items) {
      return null;
    }

    return <Fragment>{this.renderItems(items)}</Fragment>;
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

const actionCreators = {
  removeCartItem,
  updateCartItem,
  getCart,
};

export const CartItemsList = connect(
  mapStateToProps,
  actionCreators
)(CartItemsListComponent);
