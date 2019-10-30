import React, { Component } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";

export class ExamsList extends Component {
  state = {
    exams: []
  };

  componentDidMount = () => {
    const courseId = this.props.match.params.id;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/Exams?courseId=${courseId}`, { headers })
      .then(response => {
        this.setState({ exams: response.data.data });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderExams() {
    const exams = this.state.exams || [];
    const courseId = this.props.match.params.id;

    return exams.map(exam => (
      <React.Fragment>
        <tr>
          <td
            scope="row"
            className="d-flex justify-content-between align-items-center"
          >
            <Link
              to={`/subscriptions/${courseId}/exams/start`}
              className="light-font-text dark-silver-text small"
            >
              {exam.title}
            </Link>
          </td>
          <td className="dark-silver-text small text-center">
            <span className="en-text">{exam.totalTime}</span> دقيقة
          </td>
          <td className="en-text dark-silver-text small text-center">
            {exam.totalQuestions}
          </td>
          <td className="en-text dark-silver-text small text-center">
            {exam.totalAttempts}
          </td>
        </tr>
      </React.Fragment>
    ));
  }

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
            {this.state.exams == undefined || this.state.exams.length == 0 ? (
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
            ) : (
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
                        عدد الأسئلة
                      </th>
                      <th className="w-15 dark-silver-text small border-0 text-center">
                        عدد المحاولات
                      </th>
                    </tr>
                  </thead>
                  <tbody>{this.renderExams()}</tbody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
