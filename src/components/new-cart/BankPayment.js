import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import swal from '@sweetalert/with-react';
import { inputField } from "../shared/inputs/inputField";
import { withRouter } from "react-router-dom";
import { dateTimeField } from "../shared/inputs/dateTimeField";
import { checkoutWithBankTransfer } from '../../actions';

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInput = ({
    input: { value: omitValue, onChange, onBlur, ...inputProps },
    meta: omitMeta,
    ...props
}) => (
    <input
        onChange={adaptFileEventToValue(onChange)}
        onBlur={adaptFileEventToValue(onBlur)}
        type="file"
        {...inputProps}
        {...props}
    />
);


class BankPaymentComponent extends Component {
    state = {
        file: null
    };

    constructor(props) {
        super(props);
        this.onFileInputChange = this.onFileInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * Handle selecting a bank slip image
     * @param {string} fileUrl
     */
    onFileInputChange(file) {
        this.setState({
            file: URL.createObjectURL(file)
        });
    }

    /**
     * Handle submitting bank transfer payment form
     */
    onSubmit(event) {
        event.preventDefault();
        const values = this.props.formValues;

        const data = {
            bankName: values.bankName,
            accountName: values.accountName,
            amount: values.amount,
            date: values.date,
            shippingRecipient: values.recipient,
            // shippingCityId: this.state.shippingInfo.city,
            shippingAddress: values.address
        };

        this.props.checkoutWithBankTransfer(values.bankDoc, data)
            .then(() => {
                swal("تنبيه", "تمت عملية الدفع بنجاح", "success", {
                    button: "متابعة"
                });
                this.props.history.push("/account/courses");
            })
            .catch(error => {
                switch (error.response && error.response.data && error.response.data.error) {
                    case "Duplicate":
                        swal("عفواً", "تم الشراء سابقاً", "error", {
                            button: "متابعة"
                        });
                        break;

                    default:
                        swal("عفواً", "حدث خطأ ما", "error", {
                            button: "متابعة"
                        });
                        break;
                }
            });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>

                <div className="row mt-4">
                    <div className="col-md-1" />
                    <div className="col-md-5">
                        <div className="box-layout green-box">
                            <div className="box-header p-3 text-center bg-white">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/assets/images/ncb.png"
                                    }
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
                                    SA171 00000 10172 38800 0105
                                </p>

                                <h6 className="small dark-text mb-1">
                                    رقم حسابنا البنكي{" "}
                                </h6>
                                <p className="small dark-silver-text en-text">
                                    10172388000105
                                </p>

                                <h6 className="small dark-text mb-1">
                                    حسابنا باسم
                                </h6>
                                <p className="small dark-silver-text mb-0">
                                    سعيد عبدالله سعيد بالبيد
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="box-layout blue-box">
                            <div className="box-header p-3 text-center">
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/assets/images/rajhi.png"
                                    }
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
                                    SA728 00005 10608 01002 4183
                  </p>

                                <h6 className="small dark-text mb-1">
                                    رقم حسابنا البنكي{" "}
                                </h6>
                                <p className="small dark-silver-text en-text">
                                    510608010024183
                  </p>

                                <h6 className="small dark-text mb-1">
                                    حسابنا باسم
                  </h6>
                                <p className="small dark-silver-text mb-0">
                                    سعيد عبدالله سعيد بالبيد
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
                    <div className="col-md-6 ">
                        <Field
                            name="bankName"
                            type="text"
                            component={inputField}
                            className="form-control border-left-0 pl-0"
                            placeholder="اسم البنك المحول منه"
                        />

                        <div className="form-group">
                            <select
                                // component={selectField}
                                className="form-control"
                            >
                                <option selected disabled>
                                    البنك المحول إليه
                                </option>
                            </select>
                        </div>

                        <Field
                            name="accountName"
                            type="text"
                            component={inputField}
                            className="form-control border-left-0 pl-0"
                            placeholder="اسم الحساب البنكي"
                        />
                        <Field
                            name="amount"
                            type="text"
                            component={inputField}
                            className="form-control border-left-0 pl-0"
                            placeholder="القيمة المحولة"
                        />
                        <label className="dark-text small mb-2">
                            وقت وتاريخ الحوالة
                        </label>
                        <Field
                            component={dateTimeField}
                            name="date"
                            defaultValue={new Date()}
                        />
                        <h6 className="dark-silver-text smaller mt-2">
                            ملاحظة: يرجى التأكد من تاريخ ووقت الحوالة
                        </h6>

                        <Field
                            component={FileInput}
                            name="bankDoc"
                            className="d-none"
                            id="uploadImage"
                            onChange={this.onFileInputChange}
                        />
                        <label
                            htmlFor="uploadImage"
                            className="clickable w-100"
                        >
                            <div
                                className="silver-bg pt-3 pb-3 pl-4 pr-4 rounded align-items-center justify-content-center d-flex flex-column"
                                style={{ minHeight: 200 }}
                            >
                                {this.state.file ? (
                                    <img
                                        src={
                                            this.state.file ||
                                            process.env.PUBLIC_URL +
                                            "/assets/images/camera.png"
                                        }
                                        className="contain-img"
                                        width="100%"
                                    />
                                ) : (
                                        <React.Fragment>
                                            <img
                                                src={
                                                    process.env.PUBLIC_URL +
                                                    "/assets/images/camera.png"
                                                }
                                                className="contain-img"
                                                height="40"
                                            />

                                            <p className="dark-silver-text light-font-text mt-3 small">
                                                أرفق صورة للحوالة
                      </p>
                                        </React.Fragment>
                                    )}
                            </div>
                        </label>
                    </div>

                    <div className="col-md-6 text-center">
                        <img
                            src={
                                process.env.PUBLIC_URL +
                                "/assets/images/transfer.png"
                            }
                            className="contain-img"
                            height="400"
                        />
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-12 text-center">
                        <button className="btn light-outline-btn mt-5 w-25">
                            إتمام الدفع
                      </button>
                    </div>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        formValues: state.form.cart && state.form.cart.values
    };
}

const actionCreators = {
    checkoutWithBankTransfer
};

export const BankPayment = connect(
    mapStateToProps,
    actionCreators
)(reduxForm({
    form: 'cart',
    destroyOnUnmount: false
})(withRouter(
    BankPaymentComponent
)));