import React, { Component, Fragment } from "react";
import { MdClose } from "react-icons/md";
import { formatPrice } from "./helpers";

export class BookletCartItem extends Component {
  state = {
    tooltipOpen: false,
    priceValdation: false
  };

  constructor(props) {
    super(props);
    this.onRemoveItem = this.onRemoveItem.bind(this);
  }

  /**
   * Handle remove the current item from the cart
   */
  onRemoveItem = () => {
    this.props.onRemoveItem();
  }
  
  /**
   * Handle selecting the booklet color
   * @param {string} type 
   */
  onSetBookletType = type => {
    // Determine if this type is already selected
    const selected = this.props.item.bookletType === type;
    if (!selected) {
      this.props.onSetBookletType(type);
    }
  };

  render() {
    const item = this.props.item;
    if (!item) {
      return null;
    }
    return (
      <Fragment>
        <div className="bg-white box-layout w-100 p-3 d-flex align-items-center mb-4 mt-3 responsive-item position-relative">
          <span
            className="badge red-bg text-white smaller light-font-text clickable close-btn"
            onClick={this.onRemoveItem}
          >
            إزالة
          </span>
          <div className="media w-75">

            <div
              className="light-silver-bg rounded border d-flex align-items-center justify-content-center mr-3"
              style={{ width: 100, height: 100 }}
            >
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/images/course-booklet.png"
                }
                height="40"
                width="40"
                className="contain-img"
                alt="icon"
              />
            </div>

            <div className="media-body mt-2">
              <h6 className="mt-0 dark-text">
                {item.bookletType === "Colored" ?
                  item.nameAr +" - ملونة" : 
                  item.nameAr + " - أبيض و أسود"
                }
              </h6>
                {item.availableInBlackAndWhite && (
                  <div className="form-check mb-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      onClick={() => this.onSetBookletType("BlackAndWhite")}
                      checked={item.bookletType === "BlackAndWhite"}
                    />
                    <label className="form-check-label smaller dark-silver-text">
                      أرغب في الحصول على ملزمة أبيض و أسود مطبوعة
                    </label>
                  </div>
                )}

                {item.availableInColor && (
                  <div className="form-check mb-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      onClick={() => this.onSetBookletType("Colored")}
                      checked={item.bookletType === "Colored"}
                    />
                    <label className="form-check-label smaller dark-silver-text">
                      أرغب في الحصول على ملزمة ملونة مطبوعة
                    </label>
                  </div>
                )}
            </div>
          </div>
          <div className="w-25">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <label className="dark-text smaller mb-0">سعر الملزمة</label>
              <div className="d-flex flex-column mx-auto">
                <h6 className="light-text text-center mb-0">
                  <span className="en-text">{formatPrice(item.subtotal)}</span>{" "}
                  ريال
                </h6>
                {item.subtotalBeforeDiscount && (
                  <h6 className="mb-0 dark-silver-text line-through-text align-items-center d-flex">
                    <span className="en-text">
                      {formatPrice(item.subtotalBeforeDiscount)}
                    </span>{" "}
                    ريال
                  </h6>
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
