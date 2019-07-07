import React, { Component } from "react";
import { Link } from "react-router-dom";

export class StartExam extends Component {
  render() {
    const courseId = this.props.match.params.id;

    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12">
            <div className="box-layout shadow-sm h-100 d-flex align-items-center justify-content-center flex-column pt-5 pb-5">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/exams.png"}
                height="120"
                className="contain-img mb-3"
              />
              <h6 className="mid-text mb-3">
                الامتحان الأول: القطوع المخروطية
              </h6>
              <h6 className="dark-text small">
                عدد الأسئلة: <span className="en-text red-text">10</span> أسئلة
              </h6>
              <h6 className="dark-text small mb-3">
                مدة الامتحان: <span className="en-text red-text">30</span> دقيقة
              </h6>
              <p className="dark-text w-50 mx-auto text-center">
                هذا الامتحان وضع لمساعدتك في اختبار قدراتك، احرص على عدم الغش أو
                الاستعانة بأي مصادر خارجية
              </p>
              <Link
                className="btn light-outline-btn w-25 mb-1"
                to={`/subscriptions/${courseId}/exams/details`}
              >
                ابدأ الامتحان
              </Link>
              <Link
                className="dark-text smaller"
                to={`/subscriptions/${courseId}/exams/list`}
              >
                <u>الرجوع الى القائمة</u>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
