import React from "react";
import { OnlinePayment } from "../../OnlinePayment";
import { BankPayment } from "./../../BankPayment";
import classnames from "classnames";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

export default function PaymentStage({
  path,
  activeTab,
  isShippingAddressFilled,
  setActiveTab = () => {},
  deliveryData,
}) {
  return (
    <div className="col-12">
      <Nav tabs className="custom-tabs w-50 mx-auto">
        {path !== "/cart/anonymouscheckout" && (
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "bank",
              })}
              onClick={() => setActiveTab("bank")}
            >
              تحويل بنكي
            </NavLink>
          </NavItem>
        )}
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === "online",
            })}
            onClick={() => setActiveTab("online")}
          >
            بطاقة إئتمانية
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
          <TabPane tabId="bank">
            <BankPayment deliveryData={deliveryData} isShippingAddressFilled={isShippingAddressFilled} />
          </TabPane>
        <TabPane tabId="online">
          <OnlinePayment deliveryData={deliveryData} isShippingAddressFilled={isShippingAddressFilled} />
        </TabPane>
      </TabContent>
    </div>
  );
}
