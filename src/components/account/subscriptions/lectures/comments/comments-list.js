import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { apiBaseUrl } from "../../../../../api/helpers";
import { getUser } from "../../../../../actions/user.actions";
import axios from "axios";
import { Comment } from "./comment";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-beat.scss";

var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

export class CommentsListComponent extends Component {
  page = 1;
  limit = 10;
  endOfResults = false;
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      comment: "",
      file: "",
      commentType: "",
      disabled: false,
      hideBtn: false,
      nextPageUrl: `${apiBaseUrl}/RecordedLectureComments?lectureId=${this.props.lectureId}&page=${this.page}&limit=${this.limit}`
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);

    window.onscroll = () => {
       if (
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight
       ) {
        this.loadMore();
       }
    }
  }

  handleFileChange = event => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("type", "Comments");
    axios
      .post(`${apiBaseUrl}/RecordedLectureComments/Uploads`, data, {
        headers
      })
      .then(response => {
        this.setState({ file: response.data.data.url, commentType: "Image" });
        if (this.state.file) {
          const lectureId = this.props.lectureId;
          let token = localStorage.getItem("token");
          let headers = {
            Authorization: `Bearer ${token}`
          };
          let data = {
            type: "Image",
            value: this.state.file
          };
          this.setState({ disabled: true });
          axios
            .post(
              `${apiBaseUrl}/RecordedLectureComments?lectureId=${lectureId}`,
              data,
              {
                headers
              }
            )
            .then(response => {
              const comment = response.data.data;
              this.setState(prevState => {
                return {
                  comments: [ comment, ...prevState.comments]
                };
              });
              this.commentInput.value = "";
              this.setState({ file: "", disabled: false });
            })
            .catch(error => {
              this.setState({ disabled: false });
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
 

  loadMore = async () => {
    const lectureId = this.props.lectureId;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    this.setState({ loading: true, disabled: true });
    if (!this.endOfResults) {
      axios
        .get(this.state.nextPageUrl, { headers })
        .then(response => {
          this.setState({ loading: false, disabled: false });
          const newComments = [
            ...this.state.comments,
            ...response.data.data.data
          ];
          this.endOfResults = response.data.data.itemCount < this.limit;
          this.page++;
          const nextUrl = `${apiBaseUrl}/RecordedLectureComments?lectureId=${lectureId}&page=${this.page}&limit=${this.limit}`;
          this.setState({
            comments: newComments,
            nextPageUrl: nextUrl
          });
          if (newComments.length == response.data.data.itemCount) {
            this.setState({ hideBtn: true });
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading: false, disabled: false });
        });
    }
  };

  async componentDidMount() {
    this.props.getUser();
    await this.loadMore();
  }

  renderComments = () => {
    return this.state.comments.map(comment => (
      <Comment
        comment={comment}
        user={this.props.user}
        onDelete={() => this.deleteComment(comment.id)}
      />
    ));
  };

  deleteComment(id) {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .delete(`${apiBaseUrl}/RecordedLectureComments/${id}`, {
        headers
      })
      .then(response => {
        let oldComments = this.state.comments.slice();
        const commentIndex = oldComments.findIndex(c => c.id === id);
        oldComments.splice(commentIndex, 1);
        this.setState({
          comments: oldComments
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit(event) {
    event.preventDefault();
    if (this.commentInput.value !== "") {
      const lectureId = this.props.lectureId;
      let token = localStorage.getItem("token");
      let headers = {
        Authorization: `Bearer ${token}`
      };
      let data = {
        type: "Text",
        value: this.state.comment
      };
      this.setState({ disabled: true });
      axios
        .post(
          `${apiBaseUrl}/RecordedLectureComments?lectureId=${lectureId}`,
          data,
          {
            headers
          }
        )
        .then(response => {
          const comment = response.data.data;
          this.setState(prevState => {
            return {
              comments: [ comment, ...prevState.comments]
            };
          });
          this.commentInput.value = "";
          this.setState({ file: "", disabled: false });
        })
        .catch(error => {
          this.setState({ disabled: false });
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div className="col-12 silver-bg p-4">
        <h6 className="dark-text mb-3">???????? ????????????</h6>
        <form onSubmit={this.handleSubmit}>
          <div className="position-relative">
            <textarea
              id="commentInput"
              type="text"
              name="comment"
              onChange={this.handleChange}
              placeholder="?????? ?????? ???????? ???????? ???????????? ???????? ????????????"
              rows="6"
              className="form-control small dark-text shadow-sm mb-3"
              ref={ref => (this.commentInput = ref)}
            />
            <div className="textarea-icon d-flex align-items-center">
              <label htmlFor="uploadImage" className="mb-0">
                <input
                  className="d-none"
                  id="uploadImage"
                  type="file"
                  onChange={this.handleFileChange}
                />
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/dark-attachment.png"
                  }
                  height="30"
                  width="30"
                  className="contain-img clickable"
                />
              </label>
            </div>
          </div>
          <button
            className="btn light-outline-btn btn-sm unset-height pl-5 pr-5 float-right"
            disabled={this.state.disabled}
            loading={this.state.loading}
          >
            ??????????
          </button>
        </form>
        <div className="clearfix" />

        <div className="d-flex justify-content-between align-items-center responsive-col mt-4">
          <h6 className="dark-text small mb-0 mt-0">??????????????????</h6>

          <div className="d-flex align-items-center">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/comments.png"}
              height="15"
              width="20"
              className="contain-img mr-1"
            />
            <h6 className="mid-text en-text mb-0">
              {this.state.comments.length}
            </h6>
          </div>
        </div>
        {this.renderComments()}
        {!this.state.hideBtn && (
          <div className="d-flex align-items-center justify-content-center">
            <button
              className="btn dark-btn unset-height unset-line-height br-5 mt-3 w-25"
              onClick={this.loadMore}
              disabled={this.state.disabled}
            >
              {this.state.loading == true ? (
                <Loader type="ball-beat" className="dark-loader" />
              ) : (
                "?????????? ????????????"
              )}
            </button>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.CommentsList && state.form.CommentsList.values,
    user: state.user
  };
}

CommentsListComponent = reduxForm({
  form: "CommentsList"
})(CommentsListComponent);

CommentsListComponent = connect(
  mapStateToProps,
  { getUser }
)(CommentsListComponent);

export const CommentsList = withRouter(CommentsListComponent);
