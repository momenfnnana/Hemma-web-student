import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerElem: null,
    };
    this.findHeaderElem = this.findHeaderElem.bind(this);
  }

  findHeaderElem() {
    const _headerEleme = document.getElementById("header-nav");
    this.setState({ ...this.state, headerElem: _headerEleme });
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    setTimeout(() => {
    this.findHeaderElem();
    }, 500);
  }

  render() {
    console.log({state : this.state});
    return (
      <div style={{ paddingTop: `${this.state.headerElem?.offsetHeight || 0}px` }}>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(ScrollToTop);
