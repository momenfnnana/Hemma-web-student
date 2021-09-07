import React from "react";

export default function LogoSection() {
  return (
    <div className="d-flex align-items-center logo-section flex-column flex-md-row">
      <span className="order-1 gheed-purple-color font-weight-600">
        سلسلة بالبيد التعليمية
      </span>
      <img
        className="h-auto logo order-0 mx-3"
        src="/assets/images/Hemma-logo.png"
        alt="Logo"
      />
    </div>
  );
}
