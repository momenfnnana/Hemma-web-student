import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";

export default class StartTrainingExam extends Component {
  state = {
    trainingDetails: [],
  };

  componentDidMount = () => {
    const examId = this.props.match.params.id;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${apiBaseUrl}/CategoryGroupExams/${examId}`, { headers })
      .then((response) => {
        this.setState({ trainingDetails: response.data.data });
      })
      .catch((error) => {
        console.log(error);
        if(error?.response?.status===401){
          this.props.history.push("/auth/login")
        }
      });
  };

  startTraining = () => {
    const examId = this.props.match.params.id;
    const slug = this.props.match.params.slug;
    const categoryId = this.props.match.params.categoryGroupId;

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = {
      examId: examId,
    };
    axios
      .post(`${apiBaseUrl}/CategoryGroupExams/Attempts`, data, { headers })
      .then((response) => {
        this.props.history.push(
          `/categories/${slug}/${categoryId}/training/details/${response.data.data.id}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const slug = this.props.match.params.slug;
    const categoryId = this.props.match.params.categoryGroupId;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row no-gutters">
            <div className="col-12 mb-3">
              <div className="box-layout shadow-sm h-100 d-flex align-items-center justify-content-center flex-column pt-5 pb-5">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/exams.png"}
                  height="120"
                  className="contain-img mb-3"
                />
                <h6 className="mid-text mb-3 text-center w-75">
                  {this.state.trainingDetails.title}:{" "}
                  {this.state.trainingDetails.description}
                </h6>
                <h6 className="dark-text small">
                  ?????? ??????????????:{" "}
                  <span className="en-text red-text">
                    {this.state.trainingDetails.totalQuestions}
                  </span>{" "}
                  ??????????
                </h6>
                <p className="dark-text w-50 mx-auto text-center text-break">
                  ?????? ???????????????? ?????? ???????????????? ???? ???????????? ?????????????? ???????? ?????? ?????? ????????
                  ???? ?????????????????? ?????? ?????????? ????????????
                </p>
                <button
                  className="btn light-outline-btn w-25 mb-1"
                  onClick={this.startTraining}
                >
                  ???????? ??????????????
                </button>
                <Link
                  className="dark-text smaller"
                  to={`/categories/details/${slug}/quick-questions/${categoryId}`}
                >
                  <u>???????????? ?????? ??????????????</u>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
