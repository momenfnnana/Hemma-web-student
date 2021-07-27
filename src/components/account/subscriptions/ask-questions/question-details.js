import React, { Component } from "react";
import "react-sweet-progress/lib/style.css";
import { CommentsList } from "./comments/comments-list";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { apiBaseUrl } from "../../../../api/helpers";
import { connect } from "react-redux";
import { getUser } from "../../../../actions/user.actions";
import { reduxForm } from "redux-form";

class AskQuestionDetailsComponent extends Component {
  state = {
    details: [],
    showEditQuestionForm: false,
    questionValue: "",
    questionType: "",
  };

  componentDidMount() {
    this.props.getUser();
    let token = localStorage.getItem("token");
    const questionId = this.props.id;
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${apiBaseUrl}/AskQuestions/${questionId}`, {
        headers,
      })
      .then((response) => {
        this.setState({
          details: response.data.data,
          questionValue: response.data.data.content,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleEditQuestionForm() {
    this.setState({
      showEditQuestionForm: !this.state.showEditQuestionForm,
      questionValue: this.state.details && this.state.details.content,
      questionType: this.state.details && this.state.details.type,
    });
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handleEditQuestionSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = {
      type: "Text",
      content: this.state.questionValue,
    };
    axios
      .put(`${apiBaseUrl}/AskQuestions?id=${this.state.details.id}`, data, {
        headers,
      })
      .then((response) => {
        const question = response.data.data;
        this.state.details.content = question.content;
        this.state.details.type = question.type;
        this.setState({
          showEditQuestionForm: false,
          questionValue: question.content,
          questionType: question.type,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onDelete(id) {
    let courseId = this.props.match.params.courseId;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .delete(`${apiBaseUrl}/AskQuestions?id=${id}`, {
        headers,
      })
      .then(() => {
        this.props.history.push(
          `/course/content/${courseId}/askQuestions/list`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let myIdentity = this.props.user && this.props.user.id;
    let userId = this.state.details && this.state.details.studentId;
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
                    <div className=" align-items-center justify-content-between mb-3">
                      <div className="d-flex align-items-center justify-content-end">
                        {myIdentity == userId &&
                          this.state.details.type == "Text" && (
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/edit.png"
                              }
                              width="20"
                              className="contain-img mr-2 clickable"
                              onClick={() => this.toggleEditQuestionForm()}
                            />
                          )}
                        {myIdentity == userId && (
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/remove.png"
                            }
                            width="20"
                            className="contain-img clickable"
                            onClick={() => this.onDelete(this.state.details.id)}
                          />
                        )}
                      </div>
                    </div>
                    {this.state.showEditQuestionForm ? (
                      <div style={{ minHeight: 140 }}>
                        <form onSubmit={this.handleEditQuestionSubmit}>
                          <textarea
                            type="text"
                            name="questionValue"
                            onChange={this.handleChange}
                            value={this.state.questionValue}
                            rows="4"
                            className="form-control small dark-text shadow-sm mb-3"
                          />
                          <button
                            type="submit"
                            className="btn light-outline-btn btn-sm unset-height pl-5 pr-5 float-right"
                          >
                            ارسال
                          </button>
                        </form>
                      </div>
                    ) : (
                      <>
                        {this.state.details.type == "Image" ? (
                          <img
                            src={this.state.details.content}
                            width="600"
                            height="400"
                            className="contain-img"
                          />
                        ) : (
                          <p className="ar-text">{this.state.questionValue}</p>
                        )}
                      </>
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
function mapStateToProps(state) {
  return {
    formValues: state.form.CommentsList && state.form.CommentsList.values,
    user: state.user,
  };
}

AskQuestionDetailsComponent = reduxForm({
  form: "AskQuestionDetails",
})(AskQuestionDetailsComponent);

AskQuestionDetailsComponent = connect(mapStateToProps, { getUser })(
  AskQuestionDetailsComponent
);

export const AskQuestionDetails = withRouter(AskQuestionDetailsComponent);
