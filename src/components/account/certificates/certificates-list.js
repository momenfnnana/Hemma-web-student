import React, { Component } from "react";
import axios from "axios";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";
import { withRouter, Link } from "react-router-dom";
import { apiBaseUrl } from "../../../api/helpers";
import { Table } from "reactstrap";

var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

class CertificatesListComponent extends Component {
  state = {
    certificates: []
  };
  componentDidMount() {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/certificates`, { headers })
      .then(response => {
        this.setState({
          certificates: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderCertificates() {
    const certificates = this.state.certificates;
    if (certificates) {
      return certificates.map(certificate => {
        const date = new Date(certificate.date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var certificateDate = year + "-" + month + "-" + day;
        var hijriDate = moment(certificateDate, "YYYY-MM-DD").format(
          "iYYYY/iM/iD"
        );
        return (
          <tr className="text-center" key={certificate.id}>
            <td
              className="light-font-text dark-silver-text small clickable"
              onClick={() => {
                this.props.history.push(`/certificate/${certificate.id}`);
              }}
            >
              {certificate.courseOrLectureName}
            </td>
            <td className="dark-silver-text small">
              <span className="en-text">{hijriDate}</span>
            </td>
          </tr>
        );
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="container pt-5 pb-5">
          <div className="row">
            <div className="col-12">
              <h3 className="ar-text dark-text">الشهادات</h3>
            </div>
            {this.state.certificates && this.state.certificates.length > 0 ? (
              <div className="col-12">
                <div className="box-layout shadow-sm">
                  <Table className="mb-0">
                    <thead className="silver-bg">
                      <tr className="text-center">
                        <th className="w-25 dark-silver-text small border-0">
                          اسم المحاضرة
                        </th>
                        <th className="w-25 dark-silver-text small border-0">
                          التاريخ
                        </th>
                      </tr>
                    </thead>
                    <tbody>{this.renderCertificates()}</tbody>
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
                      process.env.PUBLIC_URL + "/assets/images/certificate.png"
                    }
                    height="80"
                    className="contain-img mb-3"
                    alt="transactions"
                  />
                  <h5 className="dark-silver-text mt-0">لا يوجد شهادات</h5>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export const CertificatesList = withRouter(CertificatesListComponent);
