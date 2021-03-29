import React from "react";

class MessagesHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="chat-title border-bottom h-55 d-flex align-items-center justify-content-center">
        <h6 className="dark-text small mb-0">دردشة للجميع</h6>
      </div>
    );
  }
}

export default MessagesHeader;
