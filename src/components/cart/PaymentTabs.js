import React, { Component, Fragment } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import { BankPayment } from "./BankPayment";
import { OnlinePayment } from "./OnlinePayment";

export class PaymentTabs extends Component {
  state = {
    activeTab: "bank"
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
      <Fragment>
        <div className="row">
          <div className="col-12">
            <Nav tabs className="custom-tabs w-50 mx-auto">
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "bank"
                  })}
                  onClick={() => this.setActiveTab("bank")}
                >
                  تحويل بنكي{" "}
                </NavLink>
              </NavItem>
              <NavItem className="position-relative">
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "online"
                  })}
                  onClick={() => this.setActiveTab("online")}
                  disabled
                >
                  بطاقة إئتمانية{" "}
                </NavLink>
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/tag.png"}
                  height="28"
                  alt="Soon"
                  className="position-absolute tag-img"
                />
                <h6 className="text-white light-font-text small text-position mb-0">
                  قريبًا..
                </h6>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="bank">
                <BankPayment />
              </TabPane>
              <TabPane tabId="online">
                <OnlinePayment />
              </TabPane>
            </TabContent>
          </div>
        </div>
      </Fragment>
    );
  }
}
