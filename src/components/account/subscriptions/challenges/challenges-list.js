import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  TabContent,
  TabPane
} from "reactstrap";
import classnames from "classnames";
import "./styles.sass";
import { ChallengeComponent } from "./create-challenge";

export class ChallengesList extends Component {
  state = {
    activeTab: "all",
    isChallengeOpen: false
  };

  openChallengeModal = () => {
    this.setState({ isChallengeOpen: true });
  };
  closeChallengeModal = () => {
    this.setState({ isChallengeOpen: false });
  };

  constructor(props) {
    super(props);
    this.setActiveTab = this.setActiveTab.bind(this);
  }
  /**
   * Set the active tab
   */
  setActiveTab(tab) {
    this.setState({ activeTab: tab });
  }
  render() {
    return (
      <React.Fragment>
        <div className="row mb-4 no-gutters">
          <div className="col-12">
            <div className="d-flex align-items-center">
              <h6 className="dark-text small mb-0 mt-0">التحديات</h6>
            </div>
          </div>
        </div>

        <div className="row no-gutters">
          <div className="col-12">
            <div className="box-layout shadow-sm">
              <Nav tabs className="outline-tabs mx-auto">
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "all"
                    })}
                    onClick={() => this.setActiveTab("all")}
                  >
                    جميع التحديات
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "open"
                    })}
                    onClick={() => this.setActiveTab("open")}
                  >
                    الجلسات المفتوحة{" "}
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="all">
                  <Table className="mb-0">
                    <thead className="silver-bg">
                      <tr>
                        <th className="w-70 dark-silver-text small border-0">
                          التحدي
                        </th>
                        <th className="w-15 dark-silver-text small border-0 text-center">
                          عدد الأسئلة
                        </th>
                        <th className="w-15 dark-silver-text small border-0 text-center">
                          المدة
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          scope="row"
                          className="light-font-text dark-silver-text small d-flex justify-content-between align-items-center"
                        >
                          التحدي الأول
                          <div>
                            <button
                              className="btn dark-outline-btn unset-height btn-sm small mr-2"
                              onClick={this.openChallengeModal}
                            >
                              تحدى نفسك
                            </button>
                            <button className="btn light-outline-btn unset-height small btn-sm">
                              نافس غيرك
                            </button>

                            <ChallengeComponent
                              isChallengeOpen={this.state.isChallengeOpen}
                              closeChallenge={this.closeChallengeModal}
                            />
                          </div>
                        </td>
                        <td className="en-text dark-silver-text small text-center">
                          14{" "}
                        </td>
                        <td className="dark-silver-text small text-center">
                          <span className="en-text">30</span> دقيقة
                        </td>
                      </tr>
                      <tr>
                        <td
                          scope="row"
                          className="light-font-text dark-silver-text small d-flex justify-content-between align-items-center"
                        >
                          التحدي الأول
                          <div>
                            <button className="btn dark-outline-btn unset-height btn-sm small mr-2">
                              تحدى نفسك
                            </button>
                            <button className="btn light-outline-btn unset-height small btn-sm">
                              نافس غيرك
                            </button>
                          </div>
                        </td>
                        <td className="en-text dark-silver-text small text-center">
                          14{" "}
                        </td>
                        <td className="dark-silver-text small text-center">
                          <span className="en-text">30</span> دقيقة
                        </td>
                      </tr>
                      <tr>
                        <td
                          scope="row"
                          className="light-font-text dark-silver-text small d-flex justify-content-between align-items-center"
                        >
                          التحدي الأول
                          <div>
                            <button className="btn dark-outline-btn unset-height btn-sm small mr-2">
                              تحدى نفسك
                            </button>
                            <button className="btn light-outline-btn unset-height small btn-sm">
                              نافس غيرك
                            </button>
                          </div>
                        </td>
                        <td className="en-text dark-silver-text small text-center">
                          14{" "}
                        </td>
                        <td className="dark-silver-text small text-center">
                          <span className="en-text">30</span> دقيقة
                        </td>
                      </tr>
                      <tr>
                        <td
                          scope="row"
                          className="light-font-text dark-silver-text small d-flex justify-content-between align-items-center"
                        >
                          التحدي الأول
                          <div>
                            <button className="btn dark-outline-btn unset-height btn-sm small mr-2">
                              تحدى نفسك
                            </button>
                            <button className="btn light-outline-btn unset-height small btn-sm">
                              نافس غيرك
                            </button>
                          </div>
                        </td>
                        <td className="en-text dark-silver-text small text-center">
                          14{" "}
                        </td>
                        <td className="dark-silver-text small text-center">
                          <span className="en-text">30</span> دقيقة
                        </td>
                      </tr>
                      <tr>
                        <td
                          scope="row"
                          className="light-font-text dark-silver-text small d-flex justify-content-between align-items-center"
                        >
                          التحدي الأول
                          <div>
                            <button className="btn dark-outline-btn unset-height btn-sm small mr-2">
                              تحدى نفسك
                            </button>
                            <button className="btn light-outline-btn unset-height small btn-sm">
                              نافس غيرك
                            </button>
                          </div>
                        </td>
                        <td className="en-text dark-silver-text small text-center">
                          14{" "}
                        </td>
                        <td className="dark-silver-text small text-center">
                          <span className="en-text">30</span> دقيقة
                        </td>
                      </tr>
                      <tr>
                        <td
                          scope="row"
                          className="light-font-text dark-silver-text small d-flex justify-content-between align-items-center"
                        >
                          التحدي الأول
                          <div>
                            <button className="btn dark-outline-btn unset-height btn-sm small mr-2">
                              تحدى نفسك
                            </button>
                            <button className="btn light-outline-btn unset-height small btn-sm">
                              نافس غيرك
                            </button>
                          </div>
                        </td>
                        <td className="en-text dark-silver-text small text-center">
                          14{" "}
                        </td>
                        <td className="dark-silver-text small text-center">
                          <span className="en-text">30</span> دقيقة
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </TabPane>
                <TabPane tabId="open">
                  <Table className="mb-0">
                    <thead className="silver-bg">
                      <tr>
                        <th className="w-70 dark-silver-text small border-0">
                          التحدي
                        </th>
                        <th className="w-15 dark-silver-text small border-0 text-center">
                          المتحدي
                        </th>
                        <th className="w-15 dark-silver-text small border-0 text-center">
                          حركات
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          scope="row"
                          className="light-font-text dark-silver-text small d-flex justify-content-between align-items-center"
                        >
                          التحدي الأول
                        </td>
                        <td className="dark-silver-text small text-center">
                          أحمد غانم
                        </td>
                        <td className="dark-silver-text small text-center">
                          <button className="btn light-outline-btn unset-height small btn-sm w-75">
                            انضم
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td
                          scope="row"
                          className="light-font-text dark-silver-text small d-flex justify-content-between align-items-center"
                        >
                          التحدي الأول
                        </td>
                        <td className="dark-silver-text small text-center">
                          أحمد غانم
                        </td>
                        <td className="dark-silver-text small text-center">
                          <button className="btn light-outline-btn unset-height small btn-sm w-75">
                            انضم
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td
                          scope="row"
                          className="light-font-text dark-silver-text small d-flex justify-content-between align-items-center"
                        >
                          التحدي الأول
                        </td>
                        <td className="dark-silver-text small text-center">
                          أحمد غانم
                        </td>
                        <td className="dark-silver-text small text-center">
                          <button className="btn light-outline-btn unset-height small btn-sm w-75">
                            انضم
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td
                          scope="row"
                          className="light-font-text dark-silver-text small d-flex justify-content-between align-items-center"
                        >
                          التحدي الأول
                        </td>
                        <td className="dark-silver-text small text-center">
                          أحمد غانم
                        </td>
                        <td className="dark-silver-text small text-center">
                          <button className="btn light-outline-btn unset-height small btn-sm w-75">
                            انضم
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </TabPane>
              </TabContent>
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
