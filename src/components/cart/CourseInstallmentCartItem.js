import React, { Component, Fragment } from "react";
import { MdClose } from "react-icons/md";
import { formatPrice } from "./helpers";
import { Api } from "../../api";

export class CourseInstallmentCartItem extends Component {
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
    const mandatory = !item.removable;

    return (
      <Fragment>
        <div className="bg-white box-layout w-100 p-3 d-flex align-items-center mb-4 mt-3 responsive-item position-relative">
          {!mandatory && <span
            className="badge red-bg text-white smaller light-font-text clickable close-btn cursor-pointer"
            onClick={this.onRemoveItem}
          >
            إزالة
          </span>}
          <div className="media w-75">
            <img
              className="mr-3 rounded cover-img"
              src={item.imageUrl}
              height="100"
              width="100"
              alt="icon"
            />
            <div className="media-body mt-2">
              <h6 className="mt-0 dark-text">
                قسط {item.nameAr} 
              </h6>
                {!mandatory && 
                  <>
                    <span
                      className="badge blue-status light-font-text clickable cursor-pointer"
                      onClick={this.onToggleEditInstallment}
                      disabled={!item.canBePaidInInstallments}
                    >
                      {this.state.editingInstallment
                        ? "اعتمد القسط"
                        : "تعديل القسط"}
                    </span>
                    {item.installment && (
                      <span
                        className="badge blue-status light-font-text clickable ml-1 cursor-pointer"
                        onClick={this.onPayFullAmount}
                      >
                        تسديد بالكامل
                      </span>
                    )}
                  </>}
            </div>
          </div>
          <div className="w-25">
            <form className="mb-2 d-flex flex-row align-items-center">
                    <div className="flex-column">
                      <label className="dark-text smaller mb-0">
                        قيمة القسط
                      </label>
                      {this.state.editingInstallment && (
                        <p className="red-text smaller light-font-text mb-0">
                          {item.canBePaidInInstallments === true &&
                          this.state.installmentValdation === false &&
                          this.state.priceValdation === false
                            ? " حدد قيمة القسط"
                            : null}
                        </p>
                      )}
                      {this.state.editingInstallment && (
                        <p className="red-text smaller light-font-text mb-0">
                          {this.state.installmentValdation === true
                            ? "القيمة أقل من الحد المسموح به"
                            : null}
                        </p>
                      )}{" "}
                      {this.state.editingInstallment && (
                        <p className="red-text smaller light-font-text mb-0">
                          {this.state.priceValdation === true
                            ? "القيمة أعلى من الحد المسموح به"
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

            {!mandatory &&
              <>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <label className="dark-text smaller mb-0">سعر الدورة</label>
                  <div className="d-flex flex-column mx-auto">
                    <h6 className="light-text text-center mb-0">
                      <span className="en-text">{formatPrice(item.total)}</span>{" "}
                      ريال
                    </h6>
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-between align-items-center">
                  <label className="dark-text smaller mb-0">غير المدفوع</label>
                  <div className="d-flex flex-column mx-auto">
                    <h6 className="light-text text-center mb-0">
                      <span className="en-text">{formatPrice(item.outstanding)}</span>{" "}
                      ريال
                    </h6>
                  </div>
                </div>
              </>}
          </div>
        </div>
      </Fragment>
    );
  }
}
