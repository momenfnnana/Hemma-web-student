import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "loaders.css/src/animations/ball-beat.scss";
import { apiBaseUrl } from "../../../../../api/helpers";
import axios from "axios";
import Loader from "react-loaders";

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
      nextPageUrl: `${apiBaseUrl}/AskQuestionComments?askQuestionId=${this.props.match.params.id}&page=${this.page}&limit=${this.limit}`,
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleFileChange = this.handleFileChange.bind(this);
  }
  loadMore = async () => {
    const questionId = this.props.match.params.id;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    this.setState({ loading: true, disabled: true });
    if (!this.endOfResults) {
      axios
        .get(this.state.nextPageUrl, { headers })
        .then((response) => {
          console.log(response);
          this.setState({ loading: false, disabled: false });
          const newComments = [
            ...this.state.comments,
            ...response.data.data.data,
          ];
          this.endOfResults = response.data.data.itemCount < this.limit;
          this.page++;
          const nextUrl = `${apiBaseUrl}/AskQuestionComments?askQuestionId=${questionId}&page=${this.page}&limit=${this.limit}`;
          this.setState({
            comments: newComments,
            nextPageUrl: nextUrl,
          });
          if (newComments.length == response.data.data.itemCount) {
            this.setState({ hideBtn: true });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ loading: false, disabled: false });
        });
    }
  };
  async componentDidMount() {
    await this.loadMore();
  }
  //   renderComments = () => {
  //       <Comment/>
  //   };
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
              ref={(ref) => (this.commentInput = ref)}
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
                  src={process.env.PUBLIC_URL + "/assets/images/picture.png"}
                  height="30"
                  width="30"
                  className="contain-img clickable"
                />
              </label>
            </div>
          </div>
          <button
            className="btn light-outline-btn btn-sm unset-height pl-5 pr-5 float-right"
            // disabled={this.state.disabled}
            // loading={this.state.loading}
          >
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
              {/* {this.state.comments.length} */}
            </h6>
          </div>
        </div>
        {/* {this.renderComments()} */}
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
                "تحميل المزيد"
              )}
            </button>
          </div>
        )}
      </div>
    );
  }
}

export const CommentsList = withRouter(CommentsListComponent);
