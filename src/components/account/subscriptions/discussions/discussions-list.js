import React, { Component } from "react";
import "./styles.sass";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";

export class DiscussionsList extends Component {
  state = {
    discussions: []
  };

  componentDidMount() {
    const courseId = this.props.match.params.id;

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/discussions?courseId=${courseId}`, { headers })
      .then(response => {
        this.setState({ discussions: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderDiscussions() {
    const discussions = this.state.discussions;
    const courseId = this.props.match.params.id;

    if (discussions) {
      return discussions.map(discussion => {
        const startsAt = new Date(discussion.startsAt);
        const startDate = startsAt.toLocaleString();
        const endsAt = new Date(discussion.endsAt);
        const endDate = endsAt.toLocaleString();
        return (
          <Link to={`/subscriptions/${courseId}/discussions/${discussion.id}`}>
            <div className="discussion-item d-flex align-items-center">
              <div className="media w-90 d-flex align-items-center justify-content-between">
                <div className="media-body">
                  <h6 className="dark-text">{discussion.title}</h6>
                  <div className="d-flex align-items-center">
                    <h6 className="dark-silver-text smaller mb-0 mr-3">
                      من:{" "}
                      <span className="en-text" dir="ltr">
                        {startDate}
                      </span>
                    </h6>
                    <h6 className="dark-silver-text smaller mb-0">
                      إلى:{" "}
                      <span className="en-text" dir="ltr">
                        {endDate}
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="w-10 d-flex flex-column align-items-center justify-content-center">
                {discussion.active == true ? (
                  <span className="badge light-bg text-white">مفتوح</span>
                ) : (
                  <span className="badge red-bg text-white">مغلق</span>
                )}
              </div>
            </div>
          </Link>
        );
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="row mb-4 no-gutters">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center responsive-col">
              <h6 className="dark-text small mb-0 mt-0">المناقشات</h6>
            </div>
          </div>
        </div>

        <div className="row no-gutters">
          <div className="col-12">
            <div className="box-layout shadow-sm">
              {this.renderDiscussions()}
            </div>
          </div>
        </div>
        {/* 
        <div className="row no-gutters mt-3">
          <div className="col-12 d-flex justify-content-end">
            <Pagination
              className="en-text small"
              aria-label="Page navigation example"
            >
              <PaginationItem>
                <PaginationLink previous href="#" />
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next href="#" />
              </PaginationItem>
            </Pagination>
          </div>
        </div> */}
      </React.Fragment>
    );
  }
}
