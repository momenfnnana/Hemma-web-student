import React, { Component } from "react";
import { Link } from "react-router-dom";

export class ExamFail extends Component {
  render() {
    const courseId = this.props.courseId;
    const attemptId = this.props.attemptId;

    const scoreDetails = this.props.scoreDetails;
    return (
      <div className="row no-gutters">
        <div className="col-12">
          <div className="box-layout shadow-sm h-100 pt-5 pb-5 d-flex align-items-center justify-content-center flex-column">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/failed.png"}
              height="100"
              className="contain-img mb-3"
            />
            <h6 className="mid-text mb-2">لا بأس عاود المحاولة ..</h6>
            <p className="dark-text w-50 mx-auto text-center">
              لقد حصلت على نتيجة{" "}
              <span className="en-text">{scoreDetails.correctAnswers}</span> في
              الامتحان
            </p>
            <p className="dark-silver-text small mb-1">
              الوقت المستغرق في حل الامتحان
            </p>
            <p className="dark-silver-text small en-text">
              {scoreDetails.timeSpent}
            </p>
            <Link
              className="dark-text smaller mb-4"
              to={`/subscriptions/${courseId}/exams/list`}
            >
              <u>الرجوع الى القائمة</u>
            </Link>

            <Link
              className="btn light-btn unset-height unset-line-height"
              to={`/subscriptions/${courseId}/exam/${attemptId}/result`}
            >
              التأكد من الإجابات
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
