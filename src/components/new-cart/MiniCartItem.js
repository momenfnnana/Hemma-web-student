import React, { Component, Fragment } from 'react';
import { formatPrice } from './helpers';

export class MiniCartItem extends Component {
    render() {
        const item = this.props.item;

        if (!item)
            return null;

        return (<Fragment>
            <div className="media" key={item.itemId}>
                <img src={item.imageUrl} className="cover-img mr-2 rounded" height="60" width="60" />
                <div className="media-body mt-1">
                    <h6 className="dark-text small mb-0">{item.nameAr}</h6>
                    {item.packageOption ? (<p className="dark-silver-text smaller mt-1 mb-1 align-items-center d-flex">
                        <img src={process.env.PUBLIC_URL + "/assets/images/check-mark.png"} className="contain-img mr-1" height="12" />
                        طباعة الملزمة
                    </p>) : null}

                    <div className="mt-0 d-inline-flex flex-row justify-content-between align-items-center float-right">
                        <p className="dark-text small mr-2 mb-0">قيمة الدفع</p>
                        <p className="light-text mb-0">
                            <span className="en-text">{formatPrice(item.installment || item.price)} </span>ريال
                    </p>
                    </div>
                </div>
            </div>
            <hr />
        </Fragment>);
    }
}
