import React, { Component } from "react";
import { connect } from "react-redux";
import { MiniCartItem } from "./MiniCartItem";
import { removeCartItem, getCart } from "../../actions";

class MiniCartItemsListComponent extends Component {
  constructor(props) {
    super(props);
    this.onRemoveItem = this.onRemoveItem.bind(this);
  }

  /**
   * Handle removing a cart item
   */
  onRemoveItem(itemId) {
    this.props.removeCartItem(itemId)
      .then(() => this.props.getCart());
  }
  render() {
    const items = this.props.cart && this.props.cart.items;

    if (!items) return null;

    return (
      <div className="off-white-bg box-layout w-100 radius-bottom-0">
        <div className="silver-bg p-3">
          <h6 className="dark-text mb-0">قائمة الدورات</h6>
        </div>
        <div className="p-4 pb-0">
          {items.map(item => (
            <MiniCartItem
              key={item.id}
              item={item}
              onRemoveItem={() => this.onRemoveItem(item.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

const actionCreators = {
  removeCartItem,
  getCart
};

export const MiniCartItemsList = connect(
  mapStateToProps,
  actionCreators
)(MiniCartItemsListComponent);
