import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { inputField } from "../../../../shared/inputs/inputField";
import { textareaField } from "../../../../shared/inputs/textareaField";
import { withRouter } from "react-router-dom";
import { Table } from "reactstrap";
import { RadioField } from "../../../../shared/inputs/RadioFeild";

export class WrongTransactionComponent extends Component {
  state = { showContent: false };
  myFormHandler = values => {
    console.log(values);
  };
  render() {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        height: "65%",
        borderWidth: 0
      },
      overlay: {
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 2
      }
    };
    const {
      isWrongTransactionOpen,
      closeWrongTransactionModal,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <React.Fragment>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={isWrongTransactionOpen}
          onRequestClose={this.props.onClose}
        >
          {this.state.showContent == false ? (
            <div className="container h-100 d-flex align-items-center">
              <div className="row">
                <div className="col-12 text-center">
                  <h6 className="light-text mb-4">
                    طلب استرجاع مبلغ محول بالخطأ
                  </h6>
                  <h6 className="dark-text smaller mb-2">
                    يرجى تحديد الحوالة التي جرى فيها الخطأ
                  </h6>
                </div>

                <div className="col-12">
                  <div className="box-layout shadow-sm">
                    <Table className="mb-0">
                      <thead className="silver-bg">
                        <tr className="text-center">
                          <th className="w-25 dark-silver-text small border-0">
                            العملية
                          </th>
                          <th className="w-25 dark-silver-text small border-0">
                            المبلغ
                          </th>
                          <th className="w-25 dark-silver-text small border-0">
                            التاريخ
                          </th>
                          <th className="w-25 dark-silver-text small border-0">
                            الحالة
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-center">
                          <td
                            scope="row"
                            className="light-font-text dark-silver-text small"
                          >
                            <div className="form-check form-check-inline">
                              <label className="form-check-label">
                                <input type="radio" className="mr-2" />
                                سداد قسط
                              </label>
                            </div>
                          </td>
                          <td className="en-text dark-silver-text small">
                            200
                          </td>
                          <td className="dark-silver-text small">
                            <span className="light-font-text">السبت</span>{" "}
                            <span className="en-text">20-01-2019</span>
                          </td>
                          <td className="light-font-text dark-silver-text small">
                            قيد المراجعة
                          </td>
                        </tr>
                        <tr className="text-center">
                          <td
                            scope="row"
                            className="light-font-text dark-silver-text small"
                          >
                            <div className="form-check form-check-inline">
                              <label className="form-check-label">
                                <input type="radio" className="mr-2" />
                                سداد قسط
                              </label>
                            </div>
                          </td>
                          <td className="en-text dark-silver-text small">
                            400
                          </td>
                          <td className="dark-silver-text small">
                            <span className="light-font-text">السبت</span>{" "}
                            <span className="en-text">20-01-2019</span>
                          </td>
                          <td className="light-font-text dark-silver-text small">
                            مرفوض
                          </td>
                        </tr>
                        <tr className="text-center">
                          <td
                            scope="row"
                            className="light-font-text dark-silver-text small"
                          >
                            <div className="form-check form-check-inline">
                              <label className="form-check-label">
                                <input type="radio" className="mr-2" />
                                سداد قسط
                              </label>
                            </div>
                          </td>
                          <td className="en-text dark-silver-text small">
                            200
                          </td>
                          <td className="dark-silver-text small">
                            <span className="light-font-text">السبت</span>{" "}
                            <span className="en-text">20-01-2019</span>
                          </td>
                          <td className="light-font-text dark-silver-text small">
                            تمت
                          </td>
                        </tr>
                        <tr className="text-center">
                          <td
                            scope="row"
                            className="light-font-text dark-silver-text small"
                          >
                            <div className="form-check form-check-inline">
                              <label className="form-check-label">
                                <input type="radio" className="mr-2" />
                                سداد قسط
                              </label>
                            </div>
                          </td>
                          <td className="en-text dark-silver-text small">
                            400
                          </td>
                          <td className="dark-silver-text small">
                            <span className="light-font-text">السبت</span>{" "}
                            <span className="en-text">20-01-2019</span>
                          </td>
                          <td className="light-font-text dark-silver-text small">
                            مرفوض
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>

                <div className="col-12 mt-5 d-flex align-items-center justify-content-center flex-column">
                  <form>
                    <div className="form-group d-flex align-items-center justify-content-center">
                      <label className="smaller dark-text mt-0 mb-0 mr-3">
                        قيمة المبلغ المحول بالخطأ
                      </label>
                      <input
                        type="number"
                        className="form-control en-text w-25 mt-0 mb-0 mr-3 text-center"
                        placeholder="0"
                      />
                      <label className="small dark-text mt-0 mb-0">ريال</label>
                    </div>
                  </form>
                  <button
                    className="btn light-outline-btn mt-2 w-50"
                    onClick={() => this.setState({ showContent: true })}
                  >
                    متابعة
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {this.state.showContent == true ? (
            <div className="container h-100 d-flex align-items-center">
              <div className="row">
                <div className="col-md-6 col-12 text-center">
                  <h6 className="light-text mb-4">
                    طلب استرجاع مبلغ محول بالخطأ
                  </h6>

                  <h6 className="dark-text smaller mb-2">
                    يرجى تعبئة المعلومات التالية لاتمام العملية
                  </h6>
                  <form onSubmit={handleSubmit(this.myFormHandler)}>
                    <Field
                      name="accountNumber"
                      type="text"
                      component={inputField}
                      className="form-control border-left-0 pl-0"
                      placeholder="رقم الحساب"
                    />
                    <Field
                      name="bankName"
                      type="text"
                      component={inputField}
                      className="form-control border-left-0 pl-0"
                      placeholder="اسم البنك"
                    />
                    <Field
                      name="accountNumber"
                      type="text"
                      component={inputField}
                      className="form-control border-left-0 pl-0"
                      placeholder="اسم صاحب الحساب"
                    />
                    <button className="btn light-outline-btn mt-4 w-100">
                      استرجاع الرسوم
                    </button>
                  </form>
                </div>
                <div className="col-md-6 col-12 text-center d-flex align-items-center justify-content-center flex-column">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/wrong-transaction-art.png"
                    }
                    width="70%"
                    className="contain-img"
                  />
                  <div className="box-layout light-silver-bg h-55 d-flex align-items-center justify-content-center flex-column w-100 mt-4">
                    <h6 className="dark-text small mb-1 mt-0 w-75 mx-auto">
                      قيمة المبلغ المحول بالخطأ:{" "}
                      <span className="light-text en-text">150</span>{" "}
                      <span className="light-text"> ريال </span>
                    </h6>
                    <h6 className="light-text mb-0 smaller">
                      <u>تعديل البيانات</u>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </Modal>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues:
      state.form.WrongTransaction && state.form.WrongTransaction.values
  };
}

WrongTransactionComponent = reduxForm({
  form: "WrongTransaction"
  // validate
})(WrongTransactionComponent);

WrongTransactionComponent = connect(mapStateToProps)(WrongTransactionComponent);

export const Checkout = withRouter(WrongTransactionComponent);
