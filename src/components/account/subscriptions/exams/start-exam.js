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
      })
      .catch(error => {
        console.log(error);
      });
  };

  startExam = () => {
    const examId = this.props.match.params.examId;
    const courseId = this.props.match.params.id;

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      examId: examId
    };
    axios
      .post(`${apiBaseUrl}/Exams/Attempts`, data, { headers })
      .then(response => {
        this.props.history.push(
          `/course/content/${courseId}/exam/${response.data.data.id}/details`
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const courseId = this.props.match.params.id;
    const examTime = this.state.examDetails.totalTime;
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
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12">
            <div className="box-layout shadow-sm h-100 d-flex align-items-center justify-content-center flex-column pt-5 pb-5">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/exams.png"}
                height="120"
                className="contain-img mb-3"
              />
              <h6 className="mid-text mb-3 text-center w-75">
                {this.state.examDetails.title}:{" "}
                {this.state.examDetails.description}
              </h6>
              <h6 className="dark-text small">
                ?????? ??????????????:{" "}
                <span className="en-text red-text">
                  {this.state.examDetails.totalQuestions}
                </span>{" "}
                ??????????
              </h6>
              <h6 className="dark-text small mb-3">
                ?????? ????????????????: <span className="en-text red-text">{time}</span>{" "}
                ??????????
              </h6>
              <p className="dark-text w-50 mx-auto text-center text-break">
                ?????? ???????????????? ?????? ???????????????? ???? ???????????? ?????????????? ???????? ?????? ?????? ???????? ????
                ?????????????????? ?????? ?????????? ????????????
              </p>
              <button
                className="btn light-outline-btn w-25 mb-1"
                onClick={this.startExam}
              >
                ???????? ????????????????
              </button>
              <Link
                className="dark-text smaller"
                to={`/course/content/${courseId}/exams/list`}
              >
                <u>???????????? ?????? ??????????????</u>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
