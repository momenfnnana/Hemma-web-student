import React, { Component } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

export class ExamsList extends Component {
  render() {
    const courseId = this.props.match.params.id;
    return (
      <React.Fragment>
        <div className="row mb-4 no-gutters">
          <div className="col-12">
            <div className="d-flex align-items-center responsive-col">
              <h6 className="dark-text small mb-0 mt-0">
                الاختبارات الإلكترونية
              </h6>
            </div>
          </div>
        </div>

        <div className="row no-gutters">
          <div className="col-12">
            <React.Fragment>
              <div
                className="silver-bg box-layout shadow-sm d-flex flex-column w-100 rounded p-4 justify-content-center align-items-center mb-3"
                style={{ height: 300 }}
              >
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/empty-exams.png"
                  }
                  height="80"
                  className="contain-img mb-3"
                />
                <p className="dark-silver-text mt-0 mb-0">
                  لا يوجد اختبارات متاحة
                </p>
              </div>
            </React.Fragment>
            <div className="box-layout shadow-sm">
              <Table className="mb-0">
                <thead className="silver-bg">
                  <tr>
                    <th className="w-50 dark-silver-text small border-0">
                      الامتحان
                    </th>
                    <th className="w-15 dark-silver-text small border-0 text-center">
                      مدة الامتحان
                    </th>
                    <th className="w-15 dark-silver-text small border-0 text-center">
                      النقاط
                    </th>
                    <th className="w-15 dark-silver-text small border-0 text-center">
                      آفضل علامة
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      scope="row"
                      className="d-flex justify-content-between align-items-center"
                    >
                      <Link
                        to={`/subscriptions/${courseId}/exams/start`}
                        className="light-font-text dark-silver-text small"
                      >
                        الامتحان الأول{" "}
                      </Link>
                    </td>
                    <td className="dark-silver-text small text-center">
                      <span className="en-text">30</span> دقيقة
                    </td>
                    <td className="en-text dark-silver-text small text-center">
                      8/10
                    </td>
                    <td className="en-text dark-silver-text small text-center">
                      9/10
                    </td>
                  </tr>
                  <tr>
                    <td
                      scope="row"
                      className="light-font-text dark-silver-text small d-flex justify-content-between align-items-center"
                    >
                      الامتحان الأول{" "}
                    </td>
                    <td className="dark-silver-text small text-center">
                      <span className="en-text">30</span> دقيقة
                    </td>
                    <td className="en-text dark-silver-text small text-center">
                      8/10
                    </td>
                    <td className="en-text dark-silver-text small text-center">
                      9/10
                    </td>
                  </tr>
                  <tr>
                    <td
                      scope="row"
                      className="light-font-text dark-silver-text small d-flex justify-content-between align-items-center"
                    >
                      الامتحان الأول{" "}
                    </td>
                    <td className="dark-silver-text small text-center">
                      <span className="en-text">30</span> دقيقة
                    </td>
                    <td className="en-text dark-silver-text small text-center">
                      8/10
                    </td>
                    <td className="en-text dark-silver-text small text-center">
                      9/10
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
