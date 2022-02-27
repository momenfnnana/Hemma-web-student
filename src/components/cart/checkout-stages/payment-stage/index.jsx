import React, { useState, useEffect } from "react";
import OnlinePaymentTap from "../../OnlinePayment";
import { OnlinePayment  } from "../../OnlinePaymentold";
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
  cart
}) {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentGateway, setPaymentGateway] = useState("tap");

  useEffect(() => {
    GetPaymentMethods();
  }, []);

  const GetPaymentMethods = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`${apiBaseUrl}/cart_v2/GetDefaultPaymentGatewayAndPaymentMethods`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          setPaymentGateway(response.data.data.defaultGatewaySetting.defaultGatewayName.toLowerCase());
          if (
            response.data.data.defaultGatewaySetting.defaultGatewayName.toLowerCase() ===
            "tap"
          ) {
            setPaymentMethods(response.data.data.paymentMethods);
          }
        }
      })
      .catch(() => {
        swal("عفواً", "حدث خطأ ما", "error", {
          button: "متابعة",
        });
      });
  };
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
          <BankPayment
            deliveryData={deliveryData}
            isShippingAddressFilled={isShippingAddressFilled}
          />
        </TabPane>
        <TabPane tabId="online">
          {paymentGateway === "tap" ?
          <OnlinePaymentTap
            cart={cart}
            paymentMethods={paymentMethods}
            deliveryData={deliveryData}
            isShippingAddressFilled={isShippingAddressFilled}
          />
          :
          <OnlinePayment
            cart={cart}
            deliveryData={deliveryData}
            isShippingAddressFilled={isShippingAddressFilled}
          />}
        </TabPane>
      </TabContent>
    </div>
  );
}
