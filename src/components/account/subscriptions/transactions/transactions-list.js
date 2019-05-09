import React, { Component } from "react";
import { Table } from "reactstrap";
import { RefundComponent } from "./refund/RefundForm";
import "./styles.sass";
import { WrongTransactionComponent } from "./wrong-transaction/WrongTransaction";
import { NewInstallmentComponent } from "./installment/NewInstallment";

export class TransactionsList extends Component {
  state = {
    modalIsOpen: false
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
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
                  modalIsOpen={this.state.modalIsOpen}
                  onClose={this.closeModal}
                />
                <button
                  type="button"
                  className="btn border mid-text smaller mr-2"
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
                  modalIsOpen={this.state.modalIsOpen}
                  onClose={this.closeModal}
                />
                <button
                  type="button"
                  className="btn border mid-text smaller"
                  onClick={() => this.openModal()}
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
                  modalIsOpen={this.state.modalIsOpen}
                  onClose={this.closeModal}
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
