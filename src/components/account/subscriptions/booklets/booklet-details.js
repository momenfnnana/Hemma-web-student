import React, { Component } from "react";
import { getUser } from "../../../../actions/user.actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../styles.sass";

export class BookletDetailsComponent extends Component {
  render() {
    const url = this.props.location.state.url;
    const name = this.props.location.state.name;
    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="dark-text small mb-0 mt-0">{name}</h6>
            </div>
          </div>
          <div className="col-12">
            <embed
              src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
              type="application/pdf"
              width="100%"
              height="1000"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user
  };
}

BookletDetailsComponent = connect(
  mapStateToProps,
  { getUser }
)(BookletDetailsComponent);

export const BookletDetails = withRouter(BookletDetailsComponent);
