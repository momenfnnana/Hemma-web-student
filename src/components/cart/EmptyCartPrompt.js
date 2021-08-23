import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class EmptyCartPrompt extends Component {
    render() {
        return <div className="row">
            <div className="col-12 justify-content-center align-items-center d-flex flex-column">
                <img
                    src={
                        process.env.PUBLIC_URL +
                        "/assets/images/shopping-cart.png"
                    }
                    className="contain-img"
                    height="150"
                />
                <p className="dark-silver-text mt-3">مختاراتي فارغة</p>
                <Link
                    to="/categories"
                    className="btn dark-outline-btn circle w-25 float-right pl-4 pr-4"
                >
                    احجز دورتك
                </Link>
            </div>
        </div>
    }
}