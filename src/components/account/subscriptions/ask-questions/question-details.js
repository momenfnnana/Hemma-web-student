import React, { Component } from "react";
import "react-sweet-progress/lib/style.css";
import { CommentsList } from "./comments/comments-list";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { apiBaseUrl } from "../../../../api/helpers";
import { connect } from "react-redux";
import { getUser } from "../../../../actions/user.actions";
import { reduxForm } from "redux-form";
import Loader from "react-loaders";
import Breadcrumbs from "./breadCrumbs";

class AskQuestionDetailsComponent extends Component {
  constructor(props) {
    super(props);
    const questionId = this.props.match.params.id;
    this.courseId = this.props.match.params.courseId;
    this.state = {
      details: [],
      showEditQuestionForm: false,
      questionValue: "",
      questionType: "",
      questionId,
      loadingCount: 0,
    };
    this.addLoadingCount = this.addLoadingCount.bind(this);
  }

  addLoadingCount() {
    this.setState({ loadingCount: this.state.loadingCount + 1 });
  }

  componentDidMount() {
    this.props.getUser();
    let token = localStorage.getItem("token");
    const { questionId } = this.state;

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
        this.addLoadingCount();
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
      ...this.state.details,
      content: this.state.questionValue,
    };
    console.log("data", data);
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

    if (!this.state.loadingCount)
      return (
        <div className="row justify-content-center mt-5">
          <Loader type="ball-spin-fade-loader" className="dark-loader" />
        </div>
      );
    return (
      <React.Fragment>
        <section className="pb-5">
          <div>
            <React.Fragment>
              <div className="row">
                <div className="col-12">
                  <>
                  
                  <Breadcrumbs isMine={myIdentity == userId} courseId={this.courseId} />
                    <div>
                      <h6 className="dark-text">السؤال</h6>
                    </div>
                    <div className="box-layout box-border shadow-sm p-3">
                      <div className=" align-items-center justify-content-between mb-3">
                        <div className="d-flex align-items-center justify-content-end">
                          {myIdentity == userId &&
                            (this.state.details.type == "Text" ||  this.state.details.type == "Both") ? (
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/images/edit.png"
                                }
                                alt="edit"
                                width="20"
                                className="contain-img mr-2 clickable"
                                onClick={() => this.toggleEditQuestionForm()}
                              />
                              ): null}
                          {myIdentity == userId && (
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/remove.png"
                              }
                              alt="remove"
                              width="20"
                              className="contain-img clickable"
                              onClick={() =>
                                this.onDelete(this.state.details.id)
                              }
                            />
                          )}
                        </div>
                      </div>
                      {this.state.showEditQuestionForm ? (
                        <div style={{ minHeight: this.state.details.imageUrl ? 520 :  140 }}>
                        {this.state.details.type === "Both" && this.state.details.imageUrl&&
                          <img
                            src={this.state.details.imageUrl}
                            width="400"
                            height="200"
                            className="contain-img w-100 h-auto mb-2"
                            alt="questionImage"
                          />}
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
                          {this.state.details.type === "Both"?
                          <div>
                            <img
                              src={this.state.details.imageUrl}
                              width="600"
                              height="400"
                              className="contain-img  w-100 h-auto mb-2"
                              alt="questionImage"
                            />
                            <div />
                            <p className="ar-text dark-silver-text">
                              {this.state.questionValue}
                            </p>
                          </div>:
                          this.state.details.type === "Image" ? (
                            <img
                              src={this.state.details.imageUrl}
                              width="600"
                              height="400"
                              className="contain-img  w-100 h-auto"
                              alt="questionImage"
                            />
                          ) : (
                            <p className="ar-text dark-silver-text">
                              {this.state.questionValue}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </>
                </div>
              </div>
            </React.Fragment>
            <div className="row">
              <div className="col-md-12">
                <hr />
              </div>
            </div>
            <div className="row">
              <CommentsList
              courseId={this.courseId}
                userId={this.state.details.studentId}
                id={this.state.questionId}
              />
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
