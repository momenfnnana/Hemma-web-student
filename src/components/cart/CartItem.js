import React, { Component, Fragment } from "react";
import { MdClose } from "react-icons/md";
import { formatPrice } from "./helpers";
import { Api } from "../../api";

export class CartItem extends Component {
  state = {
    // Idicates whether the installment value is in edit mode
    editingInstallment: false,
    // Holds the temporary installment value
    tempInstallment: null,
    tooltipOpen: false,
    installmentValdation: false,
    priceValdation: false
  };

  constructor(props) {
    super(props);
    this.onSetInstallment = this.onSetInstallment.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onToggleEditInstallment = this.onToggleEditInstallment.bind(this);
    this.onUpdateInstallmentInput = this.onUpdateInstallmentInput.bind(this);
    this.getInstallmentInputValue = this.getInstallmentInputValue.bind(this);
    this.onPayFullAmount = this.onPayFullAmount.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.item &&
      !props.item.canBePaidInInstallments &&
      state.editingInstallment
    ) {
      return {
        editingInstallment: false,
        tempInstallment: null
      };
    }
    return null;
  }

  /**
   * Set the installment value for the current item
   *
   * @param {number} installment
   */
  onSetInstallment(installment) {
    this.props.onSetInstallment(installment);
  }

  onSetBookletColor = color => {
    // Determine if this color is already selected
    const selected = this.props.item.bookletType === color;
    if (!selected) {
      // Turn off package option
      this.props.onUpdateItem({
        packageOption: true,
        bookletType: color
      });
    } else {
      // Turn on package option and select this color
      this.props.onUpdateItem({
        packageOption: false
      });
    }
  };

  /**
   * Toggle installment editing mode
   */
  onToggleEditInstallment() {
    const editing = !this.state.editingInstallment;

    if (editing) {
      this.setState({
        editingInstallment: true,
        tempInstallment:
          this.props.item.minimumInstallment || this.props.item.price || 0
      });
    } else {
      // disable input and submit installment
      this.onSetInstallment(this.state.tempInstallment);

      this.setState({
        editingInstallment: false,
        tempInstallment: null
      });
    }
  }

  /**
   * Handle updating the value of the installment input
   */
  onUpdateInstallmentInput(event) {
    const newValue = Number.parseInt(event.target.value);
    this.setState({ tempInstallment: newValue });
    if (newValue < this.props.item.minimumInstallment) {
      this.setState({ installmentValdation: true });
    } else {
      this.setState({ installmentValdation: false });
    }

    if (newValue > this.props.item.price) {
      this.setState({ priceValdation: true });
    } else {
      this.setState({ priceValdation: false });
    }
  }

  /**
   * Remove the entered installment for the current item in order to pay in full
   */
  onPayFullAmount() {
    this.setState({ editingInstallment: false, tempInstallment: null });
    this.onSetInstallment(null);
  }

  /**
   * Handle remove the current item from the cart
   */
  onRemoveItem() {
    this.props.onRemoveItem();
  }

  /**
   * Helper to get the value to be put in the installment input
   */
  getInstallmentInputValue() {
    // If editing the installment, use the temp value
    if (this.state.editingInstallment) return this.state.tempInstallment;

    // If paying in installmentes, use the installment value
    if (this.props.item.installment)
      return formatPrice(this.props.item.installment);

    // use the actual price
    return formatPrice(this.props.item.price);
  }

  render() {
    const item = this.props.item;
    if (!item) {
      return null;
    }
    return (
      <Fragment>
        <div className="bg-white box-layout w-100 p-3 d-flex align-items-center mb-4 mt-3 responsive-item position-relative">
          <span
            className="badge red-bg text-white smaller light-font-text clickable close-btn cursor-pointer"
            onClick={this.onRemoveItem}
          >
            ??????????
          </span>
          <div className="media w-75">
            {item.itemType === "Booklet" ? (
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
            ) : (
              <img
                className="mr-3 rounded cover-img"
                src={item.imageUrl}
                height="100"
                width="100"
                alt="icon"
              />
            )}
            <div className="media-body mt-2">
              <h6 className="mt-0 dark-text">
                {item.itemType == "Booklet" && (
                  item.bookletType == "Colored" ?
                  item.nameAr +" - ??????????" : item.nameAr + " - ???????? ?? ????????"
                )}
                {item.itemType == "Course" &&(
                  item.nameAr
                )}
                {item.packageOption && (
                  <span className="smaller red-text">
                    ( ?????? ??????????????:{" "}
                    <span className="en-text">
                      {formatPrice(item.packageOptionPrice)}
                    </span>{" "}
                    ??.??. )
                  </span>
                )}
              </h6>
              {item.packageOption !== undefined && (
                <>
                  {item.availableInBlackAndWhite && (
                    <div className="form-check mb-1">
                      <input
                        name="packageOption"
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        onClick={() => this.onSetBookletColor("BlackAndWhite")}
                        checked={
                          item.packageOption &&
                          item.bookletType === "BlackAndWhite"
                        }
                      />
                      <label className="form-check-label smaller dark-silver-text">
                        ???????? ???? ???????????? ?????? ?????????? ???????? ?? ???????? ????????????
                      </label>
                    </div>
                  )}

                  {item.availableInColor && (
                    <div className="form-check mb-1">
                      <input
                        name="packageOption"
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        onClick={() => this.onSetBookletColor("Colored")}
                        checked={
                          item.packageOption && item.bookletType === "Colored"
                        }
                      />
                      <label className="form-check-label smaller dark-silver-text">
                        ???????? ???? ???????????? ?????? ?????????? ?????????? ????????????
                      </label>
                    </div>
                  )}
                </>
              )}
              {item.itemType === "Course" ? (
                <React.Fragment>
                  {item.canBePaidInInstallments ? (
                    <span
                      className="badge blue-status light-font-text clickable cursor-pointer"
                      
                      onClick={this.onToggleEditInstallment}
                      disabled={!item.canBePaidInInstallments}
                    >
                      {this.state.editingInstallment
                        ? "?????????? ??????????"
                        : item.installment
                        ? "?????????? ??????????"
                        : "???????? ??????????????????"}
                    </span>
                  ) : null}
                  {item.installment && (
                    <span
                      className="badge blue-status light-font-text clickable ml-1 cursor-pointer"
                      onClick={this.onPayFullAmount}
                    >
                      ?????????? ??????????????
                    </span>
                  )}
                </React.Fragment>
              ) : null}
            </div>
          </div>
          <div className="w-25">
            {item.itemType === "Booklet" ? (
              <React.Fragment>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <label className="dark-text smaller mb-0">?????? ??????????????</label>
                  <div className="d-flex flex-column mx-auto">
                    <h6 className="light-text text-center mb-0">
                      <span className="en-text">{formatPrice(item.price)}</span>{" "}
                      ????????
                    </h6>
                    {item.priceBeforeDiscount && (
                      <h6 className="mb-0 dark-silver-text line-through-text align-items-center d-flex">
                        <span className="en-text">
                          {formatPrice(item.priceBeforeDiscount)}
                        </span>{" "}
                        ????????
                      </h6>
                    )}
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {item.canBePaidInInstallments && (
                  <form className="mb-2 d-flex flex-row align-items-center">
                    <div className="flex-column">
                      <label className="dark-text smaller mb-0">
                        ???????? ??????????
                      </label>
                      {this.state.editingInstallment && (
                        <p className="red-text smaller light-font-text mb-0">
                          {item.canBePaidInInstallments === true &&
                          this.state.installmentValdation === false &&
                          this.state.priceValdation === false
                            ? " ?????? ???????? ??????????"
                            : null}
                        </p>
                      )}
                      {this.state.editingInstallment && (
                        <p className="red-text smaller light-font-text mb-0">
                          {this.state.installmentValdation === true
                            ? "???????????? ?????? ???? ???????? ?????????????? ????"
                            : null}
                        </p>
                      )}{" "}
                      {this.state.editingInstallment && (
                        <p className="red-text smaller light-font-text mb-0">
                          {this.state.priceValdation === true
                            ? "???????????? ???????? ???? ???????? ?????????????? ????"
                            : null}
                        </p>
                      )}
                    </div>
                    <input
                      disabled={!this.state.editingInstallment}
                      type="number"
                      className="form-control form-control-sm mx-auto unset-height text-center en-text w-50"
                      value={this.getInstallmentInputValue()}
                      name="itemPrice"
                      onChange={this.onUpdateInstallmentInput}
                    />
                  </form>
                )}
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <label className="dark-text smaller mb-0">?????? ????????????????</label>
                  <div className="d-flex flex-column mx-auto">
                    <h6 className="light-text text-center mb-0">
                      <span className="en-text">{formatPrice(item.price)}</span>{" "}
                      ????????
                    </h6>
                    {item.priceBeforeDiscount && (
                      <h6 className="mb-0 dark-silver-text line-through-text align-items-center d-flex">
                        <span className="en-text">
                          {formatPrice(item.priceBeforeDiscount)}
                        </span>{" "}
                        ????????
                      </h6>
                    )}
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
