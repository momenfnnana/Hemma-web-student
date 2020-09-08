import React, { Component } from "react";
import { Link } from "react-router-dom";

export class TrainingExamFail extends Component {
  render() {
    const slug = this.props.slug;
    const categoryGroupId = this.props.categoryGroupId;
    const attemptId = this.props.attemptId;
    const scoreDetails = this.props.scoreDetails;

    const examTime = scoreDetails.timeSpent;
    const totalTime = Number(examTime);

    var h = Math.floor(totalTime / 3600);
    var m = Math.floor((totalTime % 3600) / 60);
    var s = Math.floor((totalTime % 3600) % 60);
    var time =
      ("0" + h).slice(-2) +
      ":" +
      ("0" + m).slice(-2) +
      ":" +
      ("0" + s).slice(-2);

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
            <p className="dark-silver-text small en-text">{time}</p>
            <Link
              className="dark-text smaller mb-4"
              to={`/categories/details/${slug}/quick-questions/${categoryGroupId}`}
            >
              <u>الرجوع الى القائمة</u>
            </Link>

            <Link
              className="btn light-btn unset-height unset-line-height"
              to={`/categories/quick-questions/${categoryGroupId}/training/${attemptId}/result`}
            >
              التأكد من الإجابات
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
