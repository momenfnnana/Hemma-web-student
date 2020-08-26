import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { apiBaseUrl } from "../../../api/helpers";
import axios from "axios";
import swal from "@sweetalert/with-react";
import ReactToPrint from "react-to-print";

var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

class CertificateComponent extends Component {
  state = {
    details: {},
  };
  componentDidMount() {
    const id = this.props.match.params.id;

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${apiBaseUrl}/Certificates/${id}?Type=Initiative`, { headers })
      .then((response) => {
        this.setState({
          details: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const scheduledAt = new Date(this.state.details.date);
    var dayOnWeek = scheduledAt;
    var days = [
      "الأحد",
      "الأثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    var d = new Date(dayOnWeek);
    var dayName = days[d.getDay()];
    var day = scheduledAt.getDate();
    var month = scheduledAt.getMonth() + 1;
    var year = scheduledAt.getFullYear();
    var certificateDate = year + "-" + month + "-" + day;
    var hijriDate = moment(certificateDate, "YYYY-MM-DD").format("iYYYY/iM/iD");
    return (
      <React.Fragment>
        <section className="mb-3 d-sm-none">
          <div className="container px-5">
            <div className="row">
              <div className="col-12 mt-5 mb-5">
                <h5 className="dark-text">
                  لرؤية الشهادة يرجى استخدام من جهاز الكمبيوتر
                </h5>
              </div>
            </div>
          </div>
        </section>
        <section
          className=" mb-1 d-none d-lg-block
        d-none d-md-block"
        >
          <div className="d-flex align-items-center justify-content-center ">
            <div className="container px-5">
              <div className="row">
                <div className="col-12 mt-5 mb-1">
                  <ReactToPrint
                    trigger={() => (
                      <div className="white-border bg-transparent rounded d-flex align-items-center justify-content-end p-1 clickable ml-3">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/black-printer.png"
                          }
                          height="10%"
                          width="5%"
                          className="contain-img clickable"
                          alt="طباعة"
                        />
                      </div>
                    )}
                    content={() => this.componentRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className=" mb-3 d-none d-lg-block
        d-none d-md-block"
        >
          <div
            className="container px-5 certificate-box"
            ref={(el) => (this.componentRef = el)}
          >
            <div className="row p-5">
              <div className="col-md-12 col-sm-12 mt-5">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/edu-gov.jpg"}
                  width="31%"
                  height="55%"
                  className="contain-img "
                  alt="artwork"
                />
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/ertqa.jpg"}
                  width="31%"
                  height="55%"
                  className="contain-img "
                  alt="artwork"
                />
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/hemma.jpg"}
                  width="32%"
                  height="45%"
                  className="contain-img "
                  alt="artwork"
                />
              </div>
              <div className="col-md-12 col-sm-12 d-flex flex-column align-items-center justify-content-center mt-2">
                <h1 className="ultra-text">
                  <span className="dark-text"> شهادة الحضور </span>
                  Certificate
                </h1>
              </div>
              <div className="col-md-12 col-sm-12 mt-2">
                <h4 className="ultra-text">
                  تشهد الإدارة العام للتعليم بمنطقة الرياض الممثلة في وحدة
                  ارتقاء تعليم الرياض
                </h4>
              </div>
              <div className="col-md-6 col-sm-6 d-flex flex-column mt-2">
                <h5 className="dark-text">
                  بأن المتدرب/ <span>{this.state.details.name}</span>
                </h5>
              </div>
              <div className="col-md-6 col-sm-6 d-flex flex-column a mt-2">
                <h5 className="dark-text">
                  بموجب رقم الهوية/
                  <span>{this.state.details.nationalId}</span>
                </h5>
              </div>

              <div className="col-md-12 col-sm-12 d-flex flex-column align-items-center justify-content-center mt-2">
                <h3 className="ultra-text">
                  قد حضر دورة تدريبية عن بعد بعنوان
                </h3>
              </div>
              <div className="col-md-12 col-sm-12 mt-2">
                <h2 className="dark-text">
                  {this.state.details.courseOrLectureName}{" "}
                </h2>
              </div>
              <div className="col-md-12 col-sm-12 d-flex flex-column align-items-center justify-content-center mt-2">
                <h5>
                  في يوم {dayName} الموافق {hijriDate} بإجمالي ثلاث ساعات
                  تدريبية
                </h5>
              </div>
              <div className="col-md-12 col-sm-12 d-flex flex-column align-items-center justify-content-center mt-2">
                <h3 className="ultra-text">متمنين له التوفيق</h3>
              </div>
              <div className="col-md-12 col-sm-12 d-flex flex-column align-items-end justify-content-end mt-2">
                <h6>
                  مساعد المدير العام للشؤون التعليمية
                  <span className="col-md-12 col-sm-12 d-flex flex-column align-items-center justify-content-center mt-1">
                    أ/ عبدالله بن سعدالغانم
                  </span>
                </h6>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export const Certificate = withRouter(CertificateComponent);
