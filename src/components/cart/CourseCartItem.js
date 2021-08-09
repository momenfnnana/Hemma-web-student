import React, { Component, Fragment } from "react";
import { MdClose } from "react-icons/md";
import { formatPrice } from "./helpers";
import { Api } from "../../api";
const pricesKeys = ['blackAndWhiteBookletPrice','coloredBookletPrice']
const colorKeys = ['BlackAndWhite','Colored']

export class CourseCartItem extends Component {
  state = {
    // Idicates whether the installment value is in edit mode
    editingInstallment: false,
    // Holds the temporary installment value
    tempInstallment: null,
    tooltipOpen: false,
    installmentValdation: false,
    priceValdation: false,
  };

  constructor(props) {
    super(props);
    this.onSetInstallment = this.onSetInstallment.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onToggleEditInstallment = this.onToggleEditInstallment.bind(this);
    this.onUpdateInstallmentInput = this.onUpdateInstallmentInput.bind(this);
    this.getInstallmentInputValue = this.getInstallmentInputValue.bind(this);
    this.onPayFullAmount = this.onPayFullAmount.bind(this);
    this.handleTwoZeroPriceCase = this.handleTwoZeroPriceCase.bind(this)
    this.validateClick = this.validateClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.item &&
      !props.item.canBePaidInInstallments &&
      state.editingInstallment
    ) {
      return {
        editingInstallment: false,
        tempInstallment: null,
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

  onSetBookletColor = (color) => {
    // Determine if a color is already selected
    const selected = this.props.item.bookletType;

    if (selected === undefined) {
      // No booklet was selected before, we should turn on the package option
      this.props.onSetPackageOption(true, color);
    } else if (selected === color) {
      // clicked on the already selected option, remove the package option
      this.props.onSetPackageOption(false);
    } else {
      // Changed the selected color
      this.props.onSetBookletType(color);
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
          this.props.item.minimumInstallment || this.props.item.subtotal || 0,
      });
    } else {
      // disable input and submit installment
      this.onSetInstallment(this.state.tempInstallment);

      this.setState({
        editingInstallment: false,
        tempInstallment: null,
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

    if (newValue > this.props.item.subtotal) {
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

  componentDidUpdate(){
  }

  handleTwoZeroPriceCase(){
    setTimeout(() => {
      this.onSetBookletColor(colorKeys[0])
    }, 500);
  }

  componentDidMount(){
    const {item : currentItem} = this.props
    
    let hasTwoZeroPrice = []
    pricesKeys.forEach(key =>{
      if (Number.isInteger(currentItem?.[key]) && currentItem?.[key] === 0) {
        hasTwoZeroPrice.push(key);
      }
    })
    if(pricesKeys.length === hasTwoZeroPrice.length){
      this.setState({ ...this.state, hasTwoZeroPrice: true, inputsType : 'radio'});
      if(currentItem.bookletType)
      return
      this.handleTwoZeroPriceCase()
    }
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
    return formatPrice(this.props.item.subtotal);
  }

  validateClick(color){
    //prevent toggle in case of two zeros
    if(this.state.hasTwoZeroPrice && this.props.item.bookletType === color)return false
    return true
  }

  handleClick({target:{value}}){
    const canToggle = this.validateClick(value)
    if(!canToggle) return
    this.onSetBookletColor(value)
  }

  render() {
    const item = this.props.item;
    if (!item) {
      return null;
    }
    return (
      <Fragment>
        <div className="bg-white box-layout w-100 px-1 py-4 d-flex align-items-center mb-4 mt-3 responsive-item position-relative">
          <span
            className="badge red-bg text-white smaller light-font-text clickable close-btn cursor-pointer"
            onClick={this.onRemoveItem}
          >
            إزالة
          </span>
          <div className="media w-75">
            <img
              className="mr-3 rounded cover-img"
              src={item.imageUrl}
              height="100"
              width="100"
              alt="icon"
            />
            <div className="media-body mt-2">
              <h6 className="mt-0 dark-text">{item.nameAr}</h6>
              {item.bookletAvailable && (
                <>
                  {item.bookletAvailableInBlackAndWhite && (
                    <div className="form-check mb-1">
                      <input
                        name="packageOption"
                        className="form-check-input"
                        type={this.state.inputsType || 'checkbox'}
                        value="BlackAndWhite"
                        onClick={this.handleClick}
                        checked={item.bookletType === "BlackAndWhite"}
                      />
                      <label className="form-check-label smaller dark-silver-text">
                        أرغب في الحصول على ملزمة أبيض و أسود مطبوعة <span className="light-text mx-2">
                          {item?.blackAndWhiteBookletPrice && `${item?.blackAndWhiteBookletPrice} +`}
                        </span>
                      </label>
                    </div>
                  )}

                  {item.bookletAvailableInColor && (
                    <div className="form-check mb-1">
                      <input
                        name="packageOption"
                        className="form-check-input"
                        type={this.state.inputsType || 'checkbox'}
                        value="Colored"
                        onClick={this.handleClick}
                        checked={item.bookletType === "Colored"}
                      />
                      <label className="form-check-label smaller dark-silver-text">
                        أرغب في الحصول على ملزمة ملونة مطبوعة
                        <span className="light-text mx-2">
                          {item?.coloredBookletPrice && `${item?.coloredBookletPrice} +`}
                        </span>
                      </label>
                    </div>
                  )}
                </>
              )}

            
            </div>
          </div>
          <div className="w-25">
            {item.canBePaidInInstallments && (
              <form className="my-2 d-lg-block d-flex " style={{gridTemplateColumns:"1fr 1fr 1fr",gridGap:'0.5rem'}}>
                <div className="d-flex flex-row align-items-center flex-wrap">
                <div className="align-items-center d-flex  flex-root">
                  <label className="dark-text smaller mb-0">قيمة القسط</label>
                  {this.state.editingInstallment && (
                    <p className="mx-2 red-text smaller light-font-text mb-0 normal-line-height">
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
                  className="form-control flex-root form-control-sm mx-auto unset-height text-center en-text"
                  value={this.getInstallmentInputValue()}
                  name="itemPrice"
                  onChange={this.onUpdateInstallmentInput}
                />
                </div>
                  {item.canBePaidInInstallments ? (
                <div
                  className="flex-root py-2 my-2 h-100 d-flex align-items-center badge blue-status light-font-text clickable cursor-pointer"
                  onClick={this.onToggleEditInstallment}
                  disabled={!item.canBePaidInInstallments}
                >
                  <span className="text-center w-100">
                  {this.state.editingInstallment
                    ? "اعتمد القسط"
                    : item.installment
                    ? "تعديل القسط"
                    : "سداد بالأقساط؟"}
                  </span>
                </div>
              ) : null}
              {item.installment && (
                <span
                  className="badge  blue-status light-font-text clickable ml-1 cursor-pointer"
                  onClick={this.onPayFullAmount}
                >
                  تسديد بالكامل
                </span>
              )}
              </form>
            )}
            <div className="d-flex flex-row justify-content-between align-items-center">
              <label className="dark-text smaller mb-0">سعر الاشتراك</label>
              <div className="d-flex flex-column mx-auto">
                {item.originalPrice ? (
                  <>
                    <h6 className="light-text text-center mb-0 crossed-line">
                      <span className="en-text">
                        {formatPrice(item.originalPrice)}
                      </span>{" "}
                      ريال
                    </h6>
                    <h6 className="light-text text-center mb-0 red-text">
                      <span className="en-text">
                        {formatPrice(item.subtotal)}
                      </span>{" "}
                      ريال
                    </h6>
                  </>
                ) : (
                  <h6 className="light-text text-center mb-0">
                    <span className="en-text">
                      {formatPrice(item.subtotal)}
                    </span>{" "}
                    ريال
                  </h6>
                )}
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
