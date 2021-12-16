import React from "react";
import { dummyData } from "./data";

import "./index.scss";

const PrivacyPolicyComponent = () => (
  <div className="page-container container-fluid my-5">
    {/* start table */}
    <div className="table mx-auto row border">
      <div className="col-12 d-flex justify-content-center align-items-center p-0 table-header">
        <div className="w-50 h-100 border d-flex justify-content-start align-items-center px-3">
          <img
            className="logo-img header-mobile-icon"
            src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
            height="60"
          />
        </div>
        <div className="w-50 h-100 border p-3">
          <p>مركز منصة همة للتدريب</p>
          <p>إدارة التشغيل</p>
          <p>سياسات ودالئل التشغيل</p>
          <p>مبادئ حقوق الملكية الفكرية وحقوق النشر</p>
        </div>
      </div>
      <div className="col-12 d-flex justify-content-center align-items-center p-0 table-body">
        <div className="w-50 h-100 border"></div>
        <div className="d-flex flex-column justify-content-center align-items-end border h-100 p-3 w-50">
          <p className="m-0 p-0 font-weight-bold">IMS-35-01</p>
          <p className="m-0 p-0 font-weight-bold">V:1/1</p>
          <p className="m-0 p-0 font-weight-bold">DOI: 01/04/2021</p>
        </div>
      </div>
    </div>
    {/* end table */}
    {/* page content */}
    <div>
      {dummyData?.map((item, index) => (
        <div key={index}>{item?.title}</div>
      ))}
    </div>
  </div>
);

export default PrivacyPolicyComponent;
