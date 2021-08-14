import React, { Component } from "react";
import { Table, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { Refund } from "./refund/RefundForm";
import { NewInstallment } from "./installment/NewInstallment";
import axios from "axios";
import { apiBaseUrl } from "../../../api/helpers";
import { connect } from "react-redux";
import { getSubscription } from "../../../actions";
import { withRouter } from "react-router-dom";
import "./styles.sass";
import classnames from "classnames";

var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

class BillingListComponent extends Component {
  state = {
    isInstallmentOpen: false,
    isRefundOpen: false,
    isWrongTransactionOpen: false,
    details: [],
    withdraws: [],
    remainingAmount: null,
    activeTab: "transactions",
    studentGroup : false,
    subscription : {}
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

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
    this.props.getSubscription(courseId).then(() => {
     // this.createChannel();
    });
    // this.props.getSubscription(courseId).payload.then(response => {
    //   debugger;
    //   this.setState({ subscription: response.data });
   
    // })
    // .catch(error => {
    //   console.log(error);
    // });
   
    
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/content/${courseId}/transaction_history`, { headers })
      .then(response => {
        this.setState({
          details: response.data.data.transactions,
          remainingAmount: response.data.data.remainingAmount,
          studentGroup:response.data.data.studentGroup
        });
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get(`${apiBaseUrl}/content/${courseId}/withdraw_history`, { headers })
      .then(response => {
        this.setState({ withdraws: response.data.data.refundRequests });
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
        var hijriDate = moment(transactionDate, "YYYY-MM-DD").format(
          "iYYYY/iM/iD"
        );

        return (
          <tr className="text-center" key={transaction.id}>
            <td className="en-text dark-silver-text small">
              {transaction.amount}
            </td>
            <td className="dark-silver-text small">
              {/* <span className="light-font-text">السبت</span>{" "} */}
              <span className="en-text">{hijriDate}</span>
            </td>
            <td className="light-font-text dark-silver-text small">
              {transaction.status == "Pending"
                ? "قيد المراجعة"
                : transaction.status == "Successful"
                ? " ناجحة"
                : transaction.status == "Failed"
                ? "مرفوضة"
                : null}
            </td>
          </tr>
        );
      });
    }
  }

  renderwithdraw() {
    const withdraws = this.state.withdraws;

    if (withdraws) {
      return withdraws.map(withdraw => {
        const date = new Date(withdraw.createdAt);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var withdrawsDate = year + "-" + month + "-" + day;
        var hijriDate = moment(withdrawsDate, "YYYY-MM-DD").format(
          "iYYYY/iM/iD"
        );

        return (
          <tr className="text-center" key={withdraw.id}>
            <td className="dark-silver-text small">
              <span className="en-text">{hijriDate}</span>
            </td>
            <td scope="row" className="light-font-text dark-silver-text small">
              {withdraw.bankName}
            </td>
            <td className="en-text dark-silver-text small">
              {withdraw.accountOwnerName}
            </td>
            <td className="light-font-text dark-silver-text small">
              {withdraw.status == "Pending"
                ? "قيد المراجعة"
                : withdraw.status == "Approved"
                ? "تم قبول طلب الاسترداد وسيتم تحويل المبلغ على حسابكم خلال أسبوع"
                : withdraw.status == "Transferred"
                ? "تم استرداد المبلغ إلى حسابكم بنجاح"
                : withdraw.status == "Rejected"
                ? "تم رفض طلب الاسترداد وإعادتك للدورة"
                : null}
            </td>
            <td className="light-font-text dark-silver-text small">
              {withdraw.adminNotes}
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
    return (
      <React.Fragment>
        <div className="container pb-5 pt-4">
          <div className="row">
            <div className="col-md-6">
              <Nav tabs className="border-bottom-0">
                <NavItem>
                  <NavLink
                    className={`${classnames({
                      active: this.state.activeTab === "transactions"
                    })} ${"clickable"}`}
                    onClick={() => {
                      this.toggle("transactions");
                    }}
                  >
                    <h6 className="dark-text small mb-0 mt-0">
                      الحركات المالية{" "}
                    </h6>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={`${classnames({
                      active: this.state.activeTab === "withdraw"
                    })} ${"clickable"}`}
                    onClick={() => {
                      this.toggle("withdraw");
                    }}
                  >
                    <h6 className="dark-text small mb-0 mt-0">
                      طلبات الانسحاب{" "}
                    </h6>
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              {this.state.studentGroup == false ? ( 
              <button
                className="btn border mid-text smaller"
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
                  alt="refund"
                />
                استرجاع الرسوم
              </button>):null}
             
              <Refund
                isRefundOpen={this.state.isRefundOpen}
                closeRefundModal={this.closeRefundModal}
                courseId={courseId}
              />
              {this.state.remainingAmount !== "0" && (
                <button
                  className="btn border mid-text smaller ml-2"
                  onClick={this.openInstallmentModal}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/installment.png"
                    }
                    height="20"
                    width="20"
                    className="mr-2 contain-img"
                    alt="installment"
                  />
                  طلب سداد قسط
                </button>
              )}
              <NewInstallment
                isInstallmentOpen={this.state.isInstallmentOpen}
                closeInstallmentModal={this.closeInstallmentModal}
                courseId={courseId}
                subscription={subscription}
              />
            </div>
          </div>
          <TabContent className="pt-3" activeTab={this.state.activeTab}>
            <TabPane tabId="transactions">
              <div className="row no-gutters">
                {this.state.details && this.state.details.length > 0 ? (
                  <div className="col-12">
                    <div className="box-layout shadow-sm">
                      <Table className="mb-0">
                        <thead className="silver-bg">
                          <tr className="text-center">
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
                ) : (
                  <React.Fragment>
                    <div
                      className="silver-bg box-layout shadow-sm d-flex flex-column w-100 rounded p-4 justify-content-center align-items-center mb-3"
                      style={{ height: 300 }}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/no-transactions.png"
                        }
                        height="80"
                        className="contain-img mb-3"
                        alt="transactions"
                      />
                      <h5 className="dark-silver-text mt-0">
                        لا يوجد حركات مالية
                      </h5>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </TabPane>
            <TabPane tabId="withdraw">
              <div className="row no-gutters">
                {this.state.withdraws && this.state.withdraws.length > 0 ? (
                  <div className="col-12">
                    <div className="box-layout shadow-sm">
                      <Table className="mb-0">
                        <thead className="silver-bg">
                          <tr className="text-center">
                            <th className="w-20 dark-silver-text small border-0">
                              تاريخ إرسال الطلب
                            </th>
                            <th className="w-20 dark-silver-text small border-0">
                              إسم البنك
                            </th>
                            <th className="w-20 dark-silver-text small border-0">
                              مالك الحساب
                            </th>
                            <th className="w-20 dark-silver-text small border-0">
                              الحالة
                            </th>
                            <th className="w-20 dark-silver-text small border-0">
                              ملاحظات الادارة
                            </th>
                          </tr>
                        </thead>
                        <tbody>{this.renderwithdraw()}</tbody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <React.Fragment>
                    <div
                      className="silver-bg box-layout shadow-sm d-flex flex-column w-100 rounded p-4 justify-content-center align-items-center mb-3"
                      style={{ height: 300 }}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/no-withdraw.png"
                        }
                        height="80"
                        className="contain-img mb-3"
                        alt="withdraw"
                      />
                      <h5 className="dark-silver-text mt-0">
                        لا يوجد طلبات انسحاب
                      </h5>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </TabPane>
          </TabContent>
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

BillingListComponent = connect(
  mapStateToProps,
  { getSubscription }
)(BillingListComponent);

export const BillingList = withRouter(BillingListComponent);
