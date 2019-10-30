import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";

export class StartExam extends Component {
  state = {
    examDetails: []
  };

  componentDidMount = () => {
    const examId = this.props.match.params.examId;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/Exams/${examId}`, { headers })
      .then(response => {
        this.setState({ examDetails: response.data.data });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

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
                {this.state.examDetails.title}:{" "}
                {this.state.examDetails.description}
              </h6>
              <h6 className="dark-text small">
                عدد الأسئلة:{" "}
                <span className="en-text red-text">
                  {this.state.examDetails.totalQuestions}
                </span>{" "}
                أسئلة
              </h6>
              <h6 className="dark-text small mb-3">
                مدة الامتحان:{" "}
                <span className="en-text red-text">
                  {this.state.examDetails.totalTime}
                </span>{" "}
                دقيقة
              </h6>
              <p className="dark-text w-50 mx-auto text-center text-break">
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
