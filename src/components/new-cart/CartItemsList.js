import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../actions';
import { CartItem } from './CartItem';

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

    /**
     * Handle removing a cart item
     */
    onRemoveItem(item) {
        this.props.removeCartItem(item);
    }

    /**
     * Helper to render the list of cart items
     */
    renderItems(items) {
        return (
            <div className="row">
                <div className="col-12">
                <h6 className="dark-text">قائمة الدورات</h6>
                    {items && items.map((item, i) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onUpdateItem={data => this.onUpdateItem(item, data)}
                            onRemoveItem={() => this.onRemoveItem(item)} />
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

        return (
            <Fragment>
                {this.renderItems(items)}
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
    removeCartItem,
    updateCartItem
};

export const CartItemsList = connect(mapStateToProps, actionCreators)(CartItemsListComponent);