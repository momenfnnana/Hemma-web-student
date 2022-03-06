import React, { useState, useEffect } from "react";
import OnlinePaymentTap from "../../OnlinePayment";
import { OnlinePayment } from "../../OnlinePaymentold";
import { BankPayment } from "./../../BankPayment";
import classnames from "classnames";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import swal from "@sweetalert/with-react";
import { apiBaseUrl } from "../../../../api/helpers";
import axios from "axios";

export default function PaymentStage({
  path,
  activeTab,
  isShippingAddressFilled,
  setActiveTab = () => {},
  deliveryData,
  cart,
  paymentMethods,
  paymentGateway,
}) {
  useEffect(() => {
    if(paymentMethods.length > 0){
      setActiveTab("online");
    }else{
      setActiveTab("bank");
    }
  });
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
        {paymentMethods.length > 0 && (
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
        )}
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="bank">
          <BankPayment
            deliveryData={deliveryData}
            isShippingAddressFilled={isShippingAddressFilled}
          />
        </TabPane>
        {paymentMethods.length > 0 && (
          <TabPane tabId="online">
            {paymentGateway === "tap" ? (
              <OnlinePaymentTap
                cart={cart}
                paymentMethods={[paymentMethods]}
                deliveryData={deliveryData}
                isShippingAddressFilled={isShippingAddressFilled}
              />
            ) : (
              <OnlinePayment
                cart={cart}
                deliveryData={deliveryData}
                isShippingAddressFilled={isShippingAddressFilled}
              />
            )}
          </TabPane>
        )}
      </TabContent>
    </div>
  );
}
