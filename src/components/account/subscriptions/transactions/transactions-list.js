import React, { Component } from "react";
import { Table } from "reactstrap";
import { RefundComponent } from "./refund/RefundForm";
import "./styles.sass";
import { WrongTransactionComponent } from "./wrong-transaction/WrongTransaction";
import { NewInstallment } from "./installment/NewInstallment";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import { connect } from "react-redux";
var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

class TransactionsList extends Component {
  state = {
    isInstallmentOpen: false,
    isRefundOpen: false,
    isWrongTransactionOpen: false,
    details: []
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

  componentDidMount() {
    const courseId = this.props.match.params.id;

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/content/${courseId}/transaction_history`, { headers })
      .then(response => {
        this.setState({ details: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderTransaction() {
    const transactions = this.state.details;

    if (transactions) {
      return transactions.map(transaction => {
        const date = new Date(transaction.date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var transactionDate = year + "-" + month + "-" + day;
        var hijriDate = moment(transactionDate).format("iYYYY/iM/iD");

        return (
          <tr className="text-center" key={transaction.id}>
            <td scope="row" className="light-font-text dark-silver-text small">
              {transaction.type}
            </td>
            <td className="en-text dark-silver-text small">
              {transaction.amount}
            </td>
            <td className="dark-silver-text small">
              {/* <span className="light-font-text">السبت</span>{" "} */}
              <span className="en-text">{hijriDate}</span>
            </td>
            <td className="light-font-text dark-silver-text small">
              {transaction.status}
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    const courseId = this.props.match.params.id;
    const subscription =
      this.props &&
      this.props.subscription &&
      this.props.subscription.subscription;
    const remainingAmount = subscription && subscription.remainingAmount;

    return (
      <React.Fragment>
        <div className="row mb-3 no-gutters">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center responsive-col">
              <h6 className="dark-text small mb-0 mt-0">
                المدفوعات واسترجاع الرسوم
              </h6>
              <div>
                <button
                  type="button"
                  className="btn border mid-text smaller ml-2"
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
                <RefundComponent
                  isRefundOpen={this.state.isRefundOpen}
                  closeRefundModal={this.closeRefundModal}
                  courseId={courseId}
                />
                {/*  <button
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
                  closeWrongTransactionModal={this.closeWrongTransactionModal}
                /> */}

                {!remainingAmount == "0" && (
                  <button
                    type="button"
                    className="btn border mid-text smaller"
                    onClick={this.openInstallmentModal}
                  >
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/installment.png"
                      }
                      height="20"
                      width="20"
                      className="mr-2 contain-img"
                    />
                    طلب سداد قسط
                  </button>
                )}

                <NewInstallment
                  isInstallmentOpen={this.state.isInstallmentOpen}
                  closeInstallmentModal={this.closeInstallmentModal}
                  courseId={courseId}
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
                <tbody>{this.renderTransaction()}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    subscription: state.subscription
  };
}

export default TransactionsList = connect(mapStateToProps)(TransactionsList);
