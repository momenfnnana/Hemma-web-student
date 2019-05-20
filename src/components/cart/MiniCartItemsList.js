import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MiniCartItem } from './MiniCartItem';

class MiniCartItemsListComponent extends Component {
    render() {
        const items = this.props.cart && this.props.cart.items;

        if (!items) return null;

        return (
            <div className="off-white-bg box-layout w-100 radius-bottom-0">
                <div className="silver-bg p-3">
                    <h6 className="dark-text mb-0">قائمة الدورات</h6>
                </div>
                <div className="p-4 pb-0">
                    {items.map(item =>
                        <MiniCartItem key={item.id} item={item} />
                    )}
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

export const MiniCartItemsList = connect(mapStateToProps)(MiniCartItemsListComponent);