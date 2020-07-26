import React, { Component } from "react";
import "react-sweet-progress/lib/style.css";
import { CommentsList } from "./comments/comments-list";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { apiBaseUrl } from "../../../../api/helpers";

class AskQuestionDetailsComponent extends Component {
  state = {
    details: [],
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    const quesionId = this.props.match.params.id;
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${apiBaseUrl}/AskQuestions/${this.props.match.params.id}`, {
        headers,
      })
      .then((response) => {
        this.setState({ details: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <React.Fragment>
        <section className="pb-5">
          <div>
            <React.Fragment>
              <div className="row">
                <div className="col-12">
                  <div>
                    <h6 className="dark-text">السؤال</h6>
                  </div>
                  <div className="box-layout box-border shadow-sm p-3">
                    {this.state.details.type == "Image" ? (
                      <img
                        src={this.state.details.content}
                        width="600"
                        height="400"
                        className="contain-img"
                      />
                    ) : (
                      <span className="ar-text">
                        {this.state.details.content}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </React.Fragment>
            <div className="row">
              <div className="col-md-12">
                <hr />
              </div>
            </div>
            <div className="row">
              <CommentsList userId={this.state.details.studentId} />
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export const AskQuestionDetails = withRouter(AskQuestionDetailsComponent);
