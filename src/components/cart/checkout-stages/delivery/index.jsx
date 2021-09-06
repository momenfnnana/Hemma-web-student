import React from "react";
import { ShippingAddressForm } from "./../../ShippingAddressForm";
import { OnlineShippingAddressForm } from "./../../OnlineShippingAddressForm";
import { formatPrice } from "./../../helpers";

export default function DeliveryStage({
  activeTab,
  cart,
  onFillShippingAddress,
}) {
  return (
    <div className="off-white-bg box-layout w-100 border-top-0 radius-top-0">
      {/* This line has been set to true because no difference found between those components */}
      {/* {activeTab == "bank" ? ( */}
      {true ? (
        <React.Fragment>
          {cart && cart.requireShippingAddress && (
            <ShippingAddressForm
              onFillShippingAddress={onFillShippingAddress}
            />
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {cart && cart.requireShippingAddress && (
            <OnlineShippingAddressForm
              onFillShippingAddress={onFillShippingAddress}
            />
          )}
        </React.Fragment>
      )}
      <div className="pt-2 pb-3">
        <div className="pl-4 pr-4 pt-2 pb-1 d-flex flex-row align-items-center">
          <h6 className="mid-text mb-0 mt-0 mr-3">المبلغ الكلي</h6>
          <h4 className="dark-text mb-0 mt-0">
            <span className="en-text">
              {formatPrice(cart && (cart.installment || cart.total))}
            </span>{" "}
            ريال
          </h4>
        </div>
      </div>
    </div>
  );
}
