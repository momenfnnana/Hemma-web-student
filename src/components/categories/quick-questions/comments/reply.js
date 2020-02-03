import React, { Component } from "react";
import { apiBaseUrl } from "../../../../api/helpers";
import axios from "axios";
var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");
export class Reply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditReplyForm: false,
      replyValue: props.reply.value,
      replyType: props.reply.type
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleEditReplyForm() {
    this.setState({
      showEditReplyForm: !this.state.showEditReplyForm,
      replyValue: this.props.reply.value,
      replyType: this.props.reply.type
    });
  }

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit(event) {
    event.preventDefault();
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    let data = {
      type: this.state.replyType,
      value: this.state.replyValue
    };
    axios
      .put(
        `${apiBaseUrl}/QuickQuestionComments/Replies/${this.props.reply.id}`,
        data,
        {
          headers
        }
      )
      .then(response => {
        const reply = response.data.data;
        this.props.reply.value = reply.value;
        this.props.reply.type = reply.type;
        this.setState({
          showEditReplyForm: false,
          replyValue: reply.value,
          replyType: reply.type
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const reply = this.props.reply;
    let myIdentity = this.props.user && this.props.user.id;

    //Reply date
    const createdAt = new Date(reply.createdAt);
    let day = createdAt.getDate();
    let month = createdAt.getMonth() + 1;
    let year = createdAt.getFullYear();
    let fullDate = year + "-" + month + "-" + day;
    let hijriDate = moment(fullDate).format("iYYYY/iM/iD");
    //Commenter id
    const commenterId = reply.user && reply.user.id;
    return (
      <React.Fragment>
        <div className="silver-bg py-3 pr-3 pl-5">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/blue-user.png"}
                width="25"
                className="contain-img mr-2"
              />
              <div>
                <h6 className="light-text small mb-1 mr-3">
                  {reply.user && reply.user.name}
                </h6>
                <h6 className="dark-silver-text smaller en-text mb-0">
                  {hijriDate}
                </h6>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <div>
                {myIdentity == commenterId && reply.type == "Text" && (
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/edit.png"}
                    width="20"
                    className="contain-img mr-2 clickable"
                    onClick={() => this.toggleEditReplyForm()}
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
          </div>
          {this.state.showEditReplyForm ? (
            <div style={{ minHeight: 140 }}>
              <form onSubmit={this.handleSubmit}>
                <textarea
                  type="text"
                  name="replyValue"
                  onChange={this.handleChange}
                  value={this.state.replyValue}
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
            <React.Fragment>
              {reply.type == "Text" ? (
                <p className="dark-text smaller word-break mb-2">
                  {reply.value}
                </p>
              ) : reply.type == "Voice" ? (
                <audio controls className="w-100">
                  <source src={reply.value} />
                </audio>
              ) : (
                <img
                  src={reply.value}
                  height="200"
                  width="400"
                  className="contain-img"
                />
              )}
            </React.Fragment>
          )}
        </div>
        <hr className="mt-0 mb-0" />
      </React.Fragment>
    );
  }
}
