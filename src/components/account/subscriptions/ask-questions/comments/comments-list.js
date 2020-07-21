import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { apiBaseUrl } from "../../../../../api/helpers";
import { getUser } from "../../../../../actions/user.actions";
import "loaders.css/src/animations/ball-beat.scss";
import { Comment } from "./comments";

var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

export class CommentsListComponent extends Component {

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
       
      </div>
    );
  }
}


export const CommentsList = withRouter(CommentsListComponent);
