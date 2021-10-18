import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import swal from "@sweetalert/with-react";
import { inputField } from "../shared/inputs/inputField";
import { selectField } from "../shared/inputs/selectField";
import { withRouter } from "react-router-dom";
import { dateTimeField } from "../shared/inputs/dateTimeField";
import { checkoutWithBankTransfer, uploadBankSlip } from "../../actions";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-clip-rotate.scss";
import moment  from 'moment';

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const required = value => (value ? undefined : "يجب تعبئة هذه الخانة");

const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => (
  <>
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...inputProps}
      {...props}
    />
    {omitMeta.touched && omitMeta.error && (
      <small className="w-100 smaller">{omitMeta.error}</small>
    )}
  </>
);

class BankPaymentComponent extends Component {
  state = {
    file: null,
    loading: false,
    disabled: false,
    bankSlip: null,
    imageLoader: false
  };

  constructor(props) {
    super(props);
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    const {deliveryData} = props
    this.deliveryData = deliveryData
  }
    componentDidUpdate(prevProps, prevState,){
        // if(this.props.isShippingAddressFilled !== nextprops.isShippingAddressFilled){
          // this.setState({disabled:!nextprops.isShippingAddressFilled})
        // }
    }

  /**
   * Handle selecting a bank slip image
   * @param {string} fileUrl
   */
  onFileInputChange(file) {
    this.setState({
      file: URL.createObjectURL(file),
      imageLoader: true
    });
    this.props
      .uploadBankSlip(file)
      .then(response => {
        this.setState({ bankSlip: response.payload.url, imageLoader: false });
      })
      .catch(error => {
        this.setState({ file: null, imageLoader: false });

        swal("عفواً", "حدث خطأ عند رفع الصورة", "error", {
          button: "متابعة"
        });
      });
  }

  /**
   * Handle submitting bank transfer payment form
   */
  myFormHandler = values => {
    const cart = this.props.cart;
    console.log(cart);
    debugger;

    if(cart.items.filter(c=>c.type=="Course"||c.type=="Installment").length == 0)
    {

        if(cart.total > values.amount  )
        {
          swal(
            "عفواً",
            "المبلغ المحول أقل من ثمن الملزمة",
            "error",
            {
              button: "متابعة"
            }
          );
          return null;
        }
        if(cart.total < values.amount  )
        {
          swal(
            "عفواً",
            "المبلغ المحول أكبر من ثمن الملزمة",
            "error",
            {
              button: "متابعة"
            }
          );
          return null;
        }
      
    }

    const itemsThatRequireShippingAddress = cart.items.filter(
      i => i.requiresShippingAddress
    );
    const itemDetails = itemsThatRequireShippingAddress.map(obj => ({
      id: obj.id,
      shippingRecipient: this.deliveryData.shippingRecipient,
      shippingCityId: this.deliveryData.shippingCityId,
      shippingAddress: this.deliveryData.shippingAddress,
      shippingPhone: this.deliveryData.shippingPhone
    }));
    const data = {
      url: this.state.bankSlip,
      originBankName: values.originBankName,
      destinationBankName: values.destinationBankName,
      accountHolderName: values.accountHolderName,
      accountNumber: values.accountNumber,
      amount: values.amount,
      date: values.date
        ? values.date.utc().toISOString()
        : new Date(Date.UTC()),
      checkoutItemDetails: itemDetails
    };
    debugger
    this.setState({ loading: true, disabled: true });
    this.props
      .checkoutWithBankTransfer(data)
      .then(() => {
        this.setState({ loading: false, disabled: false });
        this.props.history.push("/course/content");
      })
      .catch(error => {
        this.setState({ loading: false, disabled: false });

        switch (error.response.data && error.response.data.error) {
          case "HasPaymentUnderProcessing":
            swal(
              "عفواً",
              "يرجى الانتظار حتى تتمكن من القيام بحركة أخرى",
              "error",
              {
                button: "متابعة"
              }
            );
            break;
          case "Duplicate":
            swal("عفواً", "تم شراء هذه الدورة سابقاً", "error", {
              button: "متابعة"
            });
            break;
          case "ServerError":
            swal("عفواً", "حدث خطأ ما", "error", {
              button: "متابعة"
            });
            break;

          default:
            swal(
              "عفواً",
              "حدث خطأ خلال عملية الشراء، يرجى المحاولة لاحقاً",
              "error",
              {
                button: "متابعة"
              }
            );
            break;
        }
      });
  };

  onInputChange(e,dateFormat,defaultName) {
    try {
      const value = !dateFormat?   e?.target?.value :  moment(e).format(dateFormat)
      const name = e?.target?.name || defaultName
      const inputData ={
        [name]: value
      }
      
      this.setState({...inputData})
      
    } catch (error) {
      
    }
  }
  componentDidMount()
  {
    var list = document.getElementsByClassName("form-control");
    for (var item of list) {
      item.value ="";
    }
  }
  render() {
    const { handleSubmit } = this.props;
    const cart = this.props.cart;
    const items = cart && cart.items;
    return (
      <form onSubmit={handleSubmit(this.myFormHandler)}>
        <div className="row mt-4">
          <div className="col-md-1" />
          <div className="col-md-5">
            <div className="box-layout green-box">
              <div className="box-header p-3 text-center bg-white">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/ncb.png"}
                  height="40"
                  className="contain-img"
                  alt="NCB Bank"
                />
              </div>
              <div className="box-body silver-bg text-center p-3">
                <h6 className="small dark-text mb-1">
                  رقم حسابنا البنكي (آيبان)
                </h6>
                <p className="small dark-silver-text en-text">
                  SA821 00000 22300 00011 6300
                </p>

                <h6 className="small dark-text mb-1">رقم حسابنا البنكي </h6>
                <p className="small dark-silver-text en-text">22300000116300</p>

                <h6 className="small dark-text mb-1">حسابنا باسم</h6>
                <p className="small dark-silver-text mb-0">
                  مؤسسة همة التعليمية لتقنية المعلومات
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="box-layout blue-box">
              <div className="box-header p-3 text-center">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/rajhi.png"}
                  height="40"
                  className="contain-img"
                  alt="Rajhi Bank"
                />
              </div>
              <div className="box-body silver-bg text-center p-3">
                <h6 className="small dark-text mb-1">
                  رقم حسابنا البنكي (آيبان)
                </h6>
                <p className="small dark-silver-text en-text">
                  SA04 8000 0510 6080 1058 8880
                </p>

                <h6 className="small dark-text mb-1">رقم حسابنا البنكي </h6>
                <p className="small dark-silver-text en-text">
                  510608010588880
                </p>

                <h6 className="small dark-text mb-1">حسابنا باسم</h6>
                <p className="small dark-silver-text mb-0">
                  مؤسسة همة التعليمية لتقنية المعلومات
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-1" />
        </div>

        <div className="row mt-4">
          <div className="col-12 text-center">
            <h5 className="light-font-text dark-text mt-2">
              بعد إتمام التحويل ادخل رقم الحوالة
            </h5>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <h6 className="dark-silver-text smaller mt-2">
              يرجى التأكد من إرفاق صورة الحوالة
            </h6>
            <label htmlFor="uploadImage" className="clickable w-100 mb-0">
              <div
                className="silver-bg pt-3 pb-3 pl-4 pr-4 rounded align-items-center justify-content-center d-flex flex-column"
                style={{ minHeight: 200 }}
              >
                {this.state.file ? (
                  <React.Fragment>
                    {!this.state.imageLoader && (
                      <img
                        src={
                          this.state.file ||
                          process.env.PUBLIC_URL + "/assets/images/camera.png"
                        }
                        className="contain-img"
                        width="100%"
                        alt="camera"
                      />
                    )}
                    {this.state.imageLoader && (
                      <Loader type="ball-clip-rotate" />
                    )}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/camera.png"}
                      className="contain-img"
                      height="40"
                      alt="camera"
                    />

                    <p className="dark-silver-text light-font-text mt-3 small">
                      أرفق صورة للحوالة
                    </p>
                  </React.Fragment>
                )}
              </div>
            </label>
            <Field
              component={FileInput}
              name="bankDoc"
              className="d-none"
              id="uploadImage"
              onChange={this.onFileInputChange}
              validate={required}
            />
            <Field
              component={selectField}
              className="form-control mt-3"
              validate={required}
              name="originBankName"
            >
              <option value="" selected disabled hidden>
                البنك المحول منه
              </option>
              <option value="الراجحي">من بنك الراجحي</option>
              <option value="الأهلي">من البنك الأهلي</option>
              <option value="بنك اخر">من بنك آخر</option>
            </Field>
            <Field
              name="accountHolderName"
              type="text"
              component={inputField}
              className="form-control border-left-0 pl-0"
              placeholder="اسم صاحب الحساب المحول منه"
              validate={required}
            />
            <Field
              name="accountNumber"
              type="number"
              component={inputField}
              className="form-control border-left-0 pl-0 ltr-input"
              placeholder="رقم الحساب المحول منه"
              validate={required}
            />
            <Field
              component={selectField}
              className="form-control"
              validate={required}
              name="destinationBankName"
            >
              <option value="" selected disabled hidden>
                البنك المحول إليه
              </option>
              <option value="الراجحي">إلى بنك الراجحي</option>
              <option value="الأهلي">إلى البنك الأهلي</option>
            </Field>

            <Field
              name="amount"
              type="number"
              component={inputField}
              className="form-control border-left-0 pl-0 ltr-input"
              placeholder="القيمة المحولة"
              validate={required}
            />
            <label className="dark-text small mb-2">وقت وتاريخ الحوالة</label>
            <div className="d-inline-flex flex-row">
              <div className="mr-3">
                <Field
                  component={dateTimeField}
                  name="date"
                  dateFormat={false}
                  validate={required}
                  timeFormat="hh:mm a"
                />
              </div>
              <div>
                <Field
                  component={dateTimeField}
                  name="date"
                  timeFormat={false}
                  dateFormat="DD-MM-YYYY"
                  validate={required}
                />
              </div>
            </div>
            <h6 className="dark-silver-text smaller mt-2">
              ملاحظة: يرجى التأكد من تاريخ ووقت الحوالة
            </h6>
            <div>
                <button
                  className="btn light-outline-btn mt-5 w-100"
                  disabled={this.state.disabled || !items}
                >
                  {this.state.loading === true ? (
                    <Loader type="ball-clip-rotate" />
                  ) : (
                    "إتمام الدفع"
                  )}
                </button>
            </div>
          </div>

          <div className="col-md-6 text-center">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/transfer.png"}
              className="contain-img"
              height="400"
              alt="transfer"
            />
          </div>
        </div>
        {/* <button onClick={this.cancelCourse}>
          reset
        </button> */}
        {items && (
          <div className="row mb-5">
            {/* <div className="col-12 text-center">
              {items === undefined || items === 0 ? (
                <button
                  className="btn light-outline-btn mt-5 w-25"
                  disabled={true}
                >
                  إتمام الدفع
                </button>
              ) : (
                <button
                  className="btn light-outline-btn mt-5 w-25"
                  disabled={this.state.disabled}
                >
                  {this.state.loading === true ? (
                    <Loader type="ball-clip-rotate" />
                  ) : (
                    "إتمام الدفع"
                  )}
                </button>
              )}
            </div> */}
          </div>
        )}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    formValues: state.form.cart && state.form.cart.values
  };
}

const actionCreators = {
  checkoutWithBankTransfer,
  uploadBankSlip
};

export const BankPayment = connect(
  mapStateToProps,
  actionCreators
)(
  reduxForm({
    form: "cart",
    destroyOnUnmount: false
  })(withRouter(BankPaymentComponent))
);
