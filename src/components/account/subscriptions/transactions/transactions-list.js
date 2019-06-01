import React, { Component } from "react";
import { Table } from "reactstrap";
import { RefundComponent } from "./refund/RefundForm";
import "./styles.sass";
import { WrongTransactionComponent } from "./wrong-transaction/WrongTransaction";
import { NewInstallmentComponent } from "./installment/NewInstallment";

export class TransactionsList extends Component {
  state = {
    isInstallmentOpen: false,
    isRefundOpen: false,
    isWrongTransactionOpen: false
  };

  openRefundModal = () => {
    this.setState({ isRefundOpen: true });
  };
  closeRefundModal = () => {
    this.setState({ isRefundOpen: false });
  };

  openInstallmentModal = () => {
    this.setState({ isInstallmentOpen: true });
  };
  closeInstallmentModal = () => {
    this.setState({ isInstallmentOpen: false });
  };

  openWrongTransactionModal = () => {
    this.setState({ isWrongTransactionOpen: true });
  };
  closeWrongTransactionModal = () => {
    this.setState({ isWrongTransactionOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row mb-4 no-gutters">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center responsive-col">
              <h6 className="dark-text small mb-0 mt-0">
                المدفوعات واسترجاع الرسوم
              </h6>
              <div>
                <button
                  type="button"
                  className="btn border mid-text smaller mr-2"
                  onClick={this.openRefundModal}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/course-payments.png"
                    }
                    height="20"
                    width="20"
                    className="mr-2 contain-img"
                  />
                  استرجاع الرسوم
                </button>
                <RefundComponent isRefundOpen={this.state.isRefundOpen} />
                <button
                  type="button"
                  className="btn border mid-text smaller mr-2"
                  onClick={this.openWrongTransactionModal}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/wrong-transaction.png"
                    }
                    height="20"
                    width="20"
                    className="mr-2 contain-img"
                  />
                  تحويل بنكي خاطيء
                </button>
                <WrongTransactionComponent
                  isWrongTransactionOpen={this.state.isWrongTransactionOpen}
                />
                <button
                  type="button"
                  className="btn border mid-text smaller"
                  onClick={this.openInstallmentModal}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/installment.png"
                    }
                    height="20"
                    width="20"
                    className="mr-2 contain-img"
                  />
                  طلب سداد قسط
                </button>
                <NewInstallmentComponent
                  isInstallmentOpen={this.state.isInstallmentOpen}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row no-gutters">
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
                      طلب استرجاع رسوم
                    </td>
                    <td className="en-text dark-silver-text small">200</td>
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
                      سداد قسط
                    </td>
                    <td className="en-text dark-silver-text small">400</td>
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
                      تحويل مبلغ خاطيء
                    </td>
                    <td className="en-text dark-silver-text small">200</td>
                    <td className="dark-silver-text small">
                      <span className="light-font-text">السبت</span>{" "}
                      <span className="en-text">20-01-2019</span>
                    </td>
                    <td className="light-font-text dark-silver-text small">
                      تمت
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
