import React, { Component } from "react";

export class NotAllowed extends Component {
  render() {
    return (
      <div className="row py-4">
        <div className="col-12 d-flex flex-column align-items-center">
          <img
            src={process.env.PUBLIC_URL + "/assets/images/block.png"}
            height="90"
            className="contain-img mb-3"
          />
          <h6 className="dark-text">لا يمكنك الاشتراك بالمسابقة أكثر من مرة</h6>
        </div>
      </div>
    );
  }
}
