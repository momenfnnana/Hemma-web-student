import React, { Component } from "react";
import "./styles.sass";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";

export class DiscussionsList extends Component {
  state = {
    discussions: [],
    isPageLoading: false,
  };

  componentDidMount() {
    this.setState({ isPageLoading: true });
    const courseId = this.props.match.params.id;

    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${apiBaseUrl}/discussions?courseId=${courseId}`, { headers })
      .then((response) => {
        this.setState({
          discussions: response.data.data,
          isPageLoading: false,
        });
      })
      .catch((error) => {
        this.setState({ isPageLoading: false });
        console.log(error);
      });
  }

  renderDiscussions() {
    const discussions = this.state.discussions;
    const courseId = this.props.match.params.id;

    if (discussions) {
      return discussions.map((discussion) => {
        const startsAt = new Date(discussion.startsAt);
        const startDate = startsAt.toLocaleString();
        const endsAt = new Date(discussion.endsAt);
        const endDate = endsAt.toLocaleString();
        return (
          <Link
            to={`/course/content/${courseId}/discussions/${discussion.id}`}
            className="discussion-item d-flex align-items-center"
          >
            <div
              className="media w-90 d-flex align-items-center justify-content-between"
              key={discussion.id}
            >
              <div className="media-body">
                <h6 className="dark-text">{discussion.title}</h6>
                <div className="d-flex align-items-center">
                  <h6 className="dark-silver-text smaller mb-0 mr-3">
                    ????:{" "}
                    <span className="en-text" dir="ltr">
                      {startDate}
                    </span>
                  </h6>
                  <h6 className="dark-silver-text smaller mb-0">
                    ??????:{" "}
                    <span className="en-text" dir="ltr">
                      {endDate}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
            <div className="w-10 d-flex flex-column align-items-center justify-content-center">
              {discussion.active == true ? (
                <span className="badge light-bg text-white">??????????</span>
              ) : (
                <span className="badge red-bg text-white">????????</span>
              )}
            </div>
          </Link>
        );
      });
    }
  }

  render() {
    return (
      <>
        {this.state.isPageLoading ? (
          <div
            className="silver-bg box-layout w-100 pb-0 p-3 mt-4 d-flex justify-content-center align-items-center"
            style={{ minHeight: 350 }}
          >
            <Loader type="ball-spin-fade-loader" className="dark-loader" />
          </div>
        ) : (
          <React.Fragment>
            <div className="row mb-4 no-gutters">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center responsive-col">
                  <h6 className="dark-text small mb-0 mt-0">??????????????????</h6>
                </div>
              </div>
            </div>

            <div className="row no-gutters">
              <div className="col-12">
                {this.state.discussions == undefined ||
                this.state.discussions.length == 0 ? (
                  <React.Fragment>
                    <div
                      className="box-layout shadow-sm d-flex flex-column w-100 rounded p-4 justify-content-center align-items-center"
                      style={{ height: 300 }}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/empty-discussions.png"
                        }
                        height="90"
                        className="contain-img mb-3"
                      />
                      <p className="dark-text mt-0 mb-0">
                        ???? ???????? ?????????????? ??????????{" "}
                      </p>
                    </div>
                  </React.Fragment>
                ) : (
                  <div className="box-layout shadow-sm">
                    {this.renderDiscussions()}
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        )}
      </>
    );
  }
}
