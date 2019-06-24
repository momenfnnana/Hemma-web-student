import React, { Component } from "react";
import "./styles.sass";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { DiscussionComponent } from "./create-discussion";
import { Link } from "react-router-dom";

export class DiscussionsList extends Component {
  state = {
    isDiscussionOpen: false
  };

  openDiscussionModal = () => {
    this.setState({ isDiscussionOpen: true });
  };
  closeDiscussionModal = () => {
    this.setState({ isDiscussionOpen: false });
  };
  render() {
    const courseId = this.props.match.params.id;
    return (
      <React.Fragment>
        <div className="row mb-4 no-gutters">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center responsive-col">
              <h6 className="dark-text small mb-0 mt-0">المناقشات</h6>
              <button
                type="button"
                className="btn light-btn pr-4 pl-4"
                onClick={this.openDiscussionModal}
              >
                نقاش جديد
              </button>
              <DiscussionComponent
                isDiscussionOpen={this.state.isDiscussionOpen}
                closeDiscussion={this.closeDiscussionModal}
              />
            </div>
          </div>
        </div>

        <div className="row no-gutters">
          <div className="col-12">
            <div className="box-layout shadow-sm">
              <Link to={`/subscriptions/${courseId}/discussions/details`}>
                <div className="discussion-item d-flex align-items-center">
                  <div className="media w-90 d-flex align-items-center">
                    <div className="media-body">
                      <h6 className="mt-0 mid-text smaller">النسبة والتناسب</h6>
                      <h6 className="dark-text">
                        سؤال سريع عن إحدى زوايا المثلث
                      </h6>
                      <div className="d-flex align-items-center">
                        <h6 className="dark-silver-text smaller mb-0 mr-3">
                          بواسطة: ريحان شاهين
                        </h6>
                        <h6 className="dark-silver-text smaller en-text mb-0">
                          15 - 3 -2019
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="seperator-md" />
                  <div className="w-10 d-flex flex-column align-items-center justify-content-center">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/chat.png"}
                      height="20"
                      width="20"
                      className="contain-img mb-2"
                    />
                    <h6 className="dark-text en-text mb-0 small">23</h6>
                  </div>
                </div>
              </Link>

              <div className="discussion-item d-flex align-items-center">
                <div className="media w-90 d-flex align-items-center">
                  <div className="media-body">
                    <h6 className="mt-0 mid-text smaller">النسبة والتناسب</h6>
                    <h6 className="dark-text">
                      سؤال سريع عن إحدى زوايا المثلث
                    </h6>
                    <div className="d-flex align-items-center">
                      <h6 className="dark-silver-text smaller mb-0 mr-3">
                        بواسطة: ريحان شاهين
                      </h6>
                      <h6 className="dark-silver-text smaller en-text mb-0">
                        15 - 3 -2019
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="seperator-md" />
                <div className="w-10 d-flex flex-column align-items-center justify-content-center">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/chat.png"}
                    height="20"
                    width="20"
                    className="contain-img mb-2"
                  />
                  <h6 className="dark-text en-text mb-0 small">23</h6>
                </div>
              </div>

              <div className="discussion-item d-flex align-items-center">
                <div className="media w-90 d-flex align-items-center">
                  <div className="media-body">
                    <h6 className="mt-0 mid-text smaller">النسبة والتناسب</h6>
                    <h6 className="dark-text">
                      سؤال سريع عن إحدى زوايا المثلث
                    </h6>
                    <div className="d-flex align-items-center">
                      <h6 className="dark-silver-text smaller mb-0 mr-3">
                        بواسطة: ريحان شاهين
                      </h6>
                      <h6 className="dark-silver-text smaller en-text mb-0">
                        15 - 3 -2019
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="seperator-md" />
                <div className="w-10 d-flex flex-column align-items-center justify-content-center">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/chat.png"}
                    height="20"
                    width="20"
                    className="contain-img mb-2"
                  />
                  <h6 className="dark-text en-text mb-0 small">23</h6>
                </div>
              </div>

              <div className="discussion-item d-flex align-items-center">
                <div className="media w-90 d-flex align-items-center">
                  <div className="media-body">
                    <h6 className="mt-0 mid-text smaller">النسبة والتناسب</h6>
                    <h6 className="dark-text">
                      سؤال سريع عن إحدى زوايا المثلث
                    </h6>
                    <div className="d-flex align-items-center">
                      <h6 className="dark-silver-text smaller mb-0 mr-3">
                        بواسطة: ريحان شاهين
                      </h6>
                      <h6 className="dark-silver-text smaller en-text mb-0">
                        15 - 3 -2019
                      </h6>
                    </div>
                  </div>
                  <span className="badge red-bg text-white">سؤال مهم</span>
                </div>
                <div className="seperator-md" />
                <div className="w-10 d-flex flex-column align-items-center justify-content-center">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/comment.png"}
                    width="20"
                    className="contain-img mb-2"
                  />
                  <h6 className="light-text en-text mb-0 small">23</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

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
        </div>
      </React.Fragment>
    );
  }
}
