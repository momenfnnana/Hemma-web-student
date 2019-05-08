import React, { Component } from "react";
import { Table } from "reactstrap";

export class TransactionsList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row mb-4 no-gutters">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
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
                <button type="button" className="btn border mid-text smaller">
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
              </div>
            </div>
          </div>
        </div>

        <div className="row no-gutters">
          <div className="col-12">
            <div className="box-layout shadow-sm box-height">
              <Table>
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
