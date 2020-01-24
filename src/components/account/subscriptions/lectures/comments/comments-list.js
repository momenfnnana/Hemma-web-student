import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { textareaField } from "../../../../shared/inputs/textareaField";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { apiBaseUrl } from "../../../../../api/helpers";
import { getUser } from "../../../../../actions/user.actions";
import axios from "axios";
import { Comment } from "./comment";

var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

export class CommentsListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      comment: "",
      file: "",
      commentType: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
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
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.props.getUser();

    const lectureId = this.props.lectureId;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };

    axios
      .get(`${apiBaseUrl}/RecordedLectureComments?lectureId=${lectureId}`, {
        headers
      })
      .then(response => {
        const comments = response.data.data.data;
        this.setState({ comments });
      })
      .catch(error => {
        console.log(error);
      });
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
    const lectureId = this.props.lectureId;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      type: this.state.file ? "Image" : "Text",
      value: this.state.file ? this.state.file : this.state.comment
    };
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
            comments: prevState.comments.concat(comment)
          };
        });
        this.commentInput.value = "";
        this.setState({ file: "" });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="col-12 silver-bg p-4">
        <h6 className="dark-text mb-3">لديك تعليق؟</h6>
        <form onSubmit={this.handleSubmit}>
          <div className="position-relative">
            <textarea
              id="commentInput"
              type="text"
              name="comment"
              onChange={this.handleChange}
              placeholder="اذا كنت تعرف جواب السؤال اترك تعليقا"
              rows="6"
              className="form-control small dark-text shadow-sm mb-3"
              ref={ref => (this.commentInput = ref)}
            />
            <div className="textarea-icon d-flex align-items-center">
              {this.state.file && (
                <h6 className="light-text smaller mb-0 mr-3">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/check-mark.png"
                    }
                    width="12"
                    className="contain-img mr-1"
                  />
                  تم إرفاق الملف بنجاح
                </h6>
              )}
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
          <button className="btn light-outline-btn btn-sm unset-height pl-5 pr-5 float-right">
            ارسال
          </button>
        </form>
        <div className="clearfix" />

        <div className="d-flex justify-content-between align-items-center responsive-col mt-4">
          <h6 className="dark-text small mb-0 mt-0">التعليقات</h6>

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