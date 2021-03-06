import React, { Component } from "react";
import axios from "axios";
import { Reply } from "./reply";
import { apiBaseUrl } from "../../../../../api/helpers";
import * as Sentry from "@sentry/react";

var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

export class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullReplies: false,
      showAddReplyForm: false,
      showEditCommentForm: false,
      replies: [],
      reply: "",
      file: "",
      replyType: "",
      commentValue: props.comment.value,
      commentType: props.comment.type,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleEditCommentSubmit = this.handleEditCommentSubmit.bind(this);
  }

  toggleEditCommentForm() {
    this.setState({
      showEditCommentForm: !this.state.showEditCommentForm,
      commentValue: this.props.comment.value,
      commentType: this.props.comment.type,
    });
  }

  handleFileChange = (event) => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = new FormData();
    data.append("File", event.target.files[0]);
    data.append("Type", "Replies");
    axios
      .post(`${apiBaseUrl}/AskQuestionComments/Uploads`, data, {
        headers,
      })
      .then((response) => {
        this.setState({ file: response.data.data.url, replyType: "Image" });
        let token = localStorage.getItem("token");
        let headers = {
          Authorization: `Bearer ${token}`,
        };
        let data = {
          type: "Image",
          value: this.state.file,
        };
        axios
          .post(
            `${apiBaseUrl}/AskQuestionComments/${this.props.comment.id}/Replies`,
            data,
            {
              headers,
            }
          )
          .then((response) => {
            this.setState({
              showAddReplyForm: !this.state.showAddReplyForm,
            });
            const reply = response.data.data;
            this.props.comment.latestReply = reply;
            this.setState((prevState) => {
              return {
                replies: prevState.replies.concat(reply),
              };
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getReplies = () => {
    const latest = this.props.comment.latestReply;
    const all = this.state.replies;

    if (this.state.showFullReplies) {
      return all;
    }

    return latest ? [latest] : [];
  };

  deleteReply(id) {
    const comment = this.props.comment;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .delete(`${apiBaseUrl}/AskQuestionComments/Replies/${id}`, {
        headers,
      })
      .then((response) => {
        let oldReplies = this.state.replies;
        const replyIndex = oldReplies.findIndex((r) => r.id === id);
        oldReplies.splice(replyIndex, 1);

        // Check if the delete reply is the latest one
        if (comment.latestReply && comment.latestReply.id === id) {
          comment.latestReply = null;
        }

        this.setState({ replies: oldReplies });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleFullReplies() {
    const showFullReplies = this.state.showFullReplies;

    if (!showFullReplies) {
      const commentId = this.props.comment.id;
      let token = localStorage.getItem("token");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${apiBaseUrl}/AskQuestionComments/${commentId}/Replies`, {
          headers,
        })
        .then((response) => {
          this.setState({ replies: response.data.data, showFullReplies: true });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({ showFullReplies: false });
    }
  }

  toggleRepliesForm() {
    this.setState({ showAddReplyForm: !this.state.showAddReplyForm });
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handleEditCommentSubmit(event) {
    event.preventDefault();
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = {
      type: this.state.commentType,
      value: this.state.commentValue,
    };
    axios
      .put(`${apiBaseUrl}/AskQuestionComments/${this.props.comment.id}`, data, {
        headers,
      })
      .then((response) => {
        const comment = response.data.data;
        this.props.comment.value = comment.value;
        this.props.comment.type = comment.type;
        this.setState({
          showEditCommentForm: false,
          commentValue: comment.value,
          commentValue: comment.type,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = {
      type: "Text",
      value: this.state.reply,
    };
    axios
      .post(
        `${apiBaseUrl}/AskQuestionComments/${this.props.comment.id}/Replies`,
        data,
        {
          headers,
        }
      )
      .then((response) => {
        this.setState({
          showAddReplyForm: !this.state.showAddReplyForm,
        });
        const reply = response.data.data;
        this.props.comment.latestReply = reply;
        this.setState((prevState) => {
          return {
            replies: prevState.replies.concat(reply),
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderReplies() {
    const replies = this.getReplies();

    return replies.map((reply) => {
      return (
        <Reply
          reply={reply}
          user={this.props.user}
          onDelete={() => this.deleteReply(reply.id)}
        />
      );
    });
  }

  onError = (e) => {
    Sentry.captureException('An error occured while playing the video ', e);
  }

  render() {
    const comment = this.props.comment;
    let myIdentity = this.props.user && this.props.user.id;
    let userId = this.props && this.props.userId;
    // Comment date
    const createdAt = new Date(comment.createdAt);
    let day = createdAt.getDate();
    let month = createdAt.getMonth() + 1;
    let year = createdAt.getFullYear();
    let fullDate = year + "-" + month + "-" + day;
    let hijriDate = moment(fullDate, "YYYY-MM-DD").format("iYYYY/iM/iD");

    const commenterId = comment.user && comment.user.id;

    return (
      <React.Fragment>
        <div className="box-layout shadow-sm bg-white mt-3">
          <div className="p-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/blue-user.png"}
                  width="25"
                  className="contain-img mr-2"
                />
                <div>
                  <h6 className="light-text small mb-1 mr-3">
                    {comment.user && comment.user.name}
                  </h6>
                  <h6 className="dark-silver-text smaller en-text mb-0">
                    {hijriDate}
                  </h6>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-end">
                {comment.correct && (
                  <h6 className="light-text smaller mb-0 mr-3">
                    <img
                      src={
                        process.env.PUBLIC_URL + "/assets/images/check-mark.png"
                      }
                      width="12"
                      className="contain-img mr-1"
                    />
                    ?????????? ????????????{" "}
                  </h6>
                )}
                {myIdentity == commenterId && comment.type == "Text" && (
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/edit.png"}
                    width="20"
                    className="contain-img mr-2 clickable"
                    onClick={() => this.toggleEditCommentForm()}
                  />
                )}
                {myIdentity == commenterId && (
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/remove.png"}
                    width="20"
                    className="contain-img clickable"
                    onClick={() => this.props.onDelete()}
                  />
                )}
              </div>
            </div>

            {this.state.showEditCommentForm ? (
              <div style={{ minHeight: 140 }}>
                <form onSubmit={this.handleEditCommentSubmit}>
                  <textarea
                    type="text"
                    name="commentValue"
                    onChange={this.handleChange}
                    value={this.state.commentValue}
                    rows="4"
                    className="form-control small dark-text shadow-sm mb-3"
                  />
                  <button
                    type="submit"
                    className="btn light-outline-btn btn-sm unset-height pl-5 pr-5 float-right"
                  >
                    ??????????
                  </button>
                </form>
              </div>
            ) : (
                <React.Fragment>
                  {comment.type == "Text" ? (
                    <p className="dark-text smaller word-break mb-2">
                      {comment.value}
                    </p>
                  ) : comment.type == "Voice" ? (
                    <audio controls className="w-100">
                      <source src={comment.value} />
                    </audio>
                  ) : comment.type == "Image" ? (
                    <img
                      src={comment.value}
                      height="200"
                      width="400"
                      className="contain-img"
                    />
                  ) : (
                          <video
                            height="200"
                            width="400"
                            className="video-container video-container-overlay"
                            autoPlay=""
                            controls
                            onError={(e) => this.onError(e)}
                          >
                            <source
                              type="video/mp4"
                              data-reactid=".0.1.0.0.0"
                              src={comment.value}
                            />
                          </video>
                        )}
                </React.Fragment>
              )}

            <div className="d-flex justify-content-end align-items-center">
              <h6
                className="badge dark-bg text-white smaller mb-0 mr-3 clickable"
                onClick={() => this.toggleFullReplies()}
              >
                <span className="en-text">{comment.replyCount}</span> ????????
              </h6>
              {myIdentity === userId ? (
                <h6
                  className="light-text smaller d-flex align-items-center mb-0 clickable"
                  onClick={() => this.toggleRepliesForm()}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/reply.png"}
                    width="15"
                    className="contain-img mr-2"
                  />
                  ?????? ???? ?????? ??????????????
                </h6>
              ) : null}
            </div>
          </div>

          {this.renderReplies()}

          {this.state.showAddReplyForm && (
            <div className="silver-bg py-3 px-3">
              <form onSubmit={this.handleSubmit}>
                <div className="position-relative">
                  <textarea
                    id="commentInput"
                    type="text"
                    name="reply"
                    onChange={this.handleChange}
                    placeholder="???????? ???? ?????? ??????????????"
                    rows="6"
                    className="form-control small dark-text shadow-sm mb-3"
                  />
                  <div className="textarea-icon d-flex align-items-center">
                    <label htmlFor="uploadReplyImage" className="mb-0">
                      <input
                        className="d-none"
                        id="uploadReplyImage"
                        type="file"
                        onChange={this.handleFileChange}
                      />
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/picture.png"
                        }
                        height="30"
                        width="30"
                        className="contain-img clickable"
                      />
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn light-outline-btn btn-sm unset-height pl-5 pr-5 float-right"
                >
                  ??????????
                </button>
              </form>

              <div className="clearfix" />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
