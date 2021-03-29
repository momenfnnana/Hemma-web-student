import React from "react";

var moment = require("moment-hijri");

class Message extends React.Component {
  isImage = (message) => {
    return (
      message.hasOwnProperty("image") &&
      (!message.hasOwnProperty("content") || !message.hasOwnProperty("audio"))
    );
  };

  isAudio = (message) => {
    return (
      message.hasOwnProperty("audio") &&
      (!message.hasOwnProperty("content") || !message.hasOwnProperty("image"))
    );
  };

  getMessageDate = (message) => {
    const date = new Date(message.timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const msgDate = day + "/" + month + "/" + year;
    return moment(msgDate, "DD/MM/YYYY").format("iD/iM/iYYYY");
  };

  displayMessage = (message) => {
    return (
      <>
        {this.isImage(message) ? (
          <img
            src={message.image}
            alt="Chat img"
            height="200"
            className="contain-img"
          />
        ) : this.isAudio(message) ? (
          <audio controls className="w-100">
            <source src={message.audio} />
          </audio>
        ) : (
              <>{message.content}</>
            )}
        <span className="en-text small timestamp">
          {this.getMessageDate(message)}
        </span>
      </>
    );
  };

  render() {
    const { message, user } = this.props;
    return (
      <React.Fragment>
        {message.user.id === user.id ? (
          <li className="mb-3">
            <div className="message light-font-text text-white my-message">
              {this.displayMessage(message)}
            </div>
          </li>
        ) : (
            <li className="clearfix mb-3">
              <div className="message-data">
                <span className="message-data-name small">
                  {message.user.name}
                </span>
              </div>
              <div className="d-flex justify-content-end">
                <div className="message other-message dark-text light-font-text">
                  {this.displayMessage(message)}
                </div>
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/user-circle.png"}
                  alt="Chat img"
                  height="27"
                  className="contain-img ml-2 align-self-start"
                />
              </div>
            </li>
          )}
      </React.Fragment>
    );
  }
}

export default Message;
