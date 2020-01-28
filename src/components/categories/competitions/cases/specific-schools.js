import React, { Component } from "react";

export class SpecificSchools extends Component {
  render() {
    return (
      <div className="row py-4">
        <div className="col-12 d-flex flex-column align-items-center">
          <img
            src={process.env.PUBLIC_URL + "/assets/images/restricted.png"}
            height="90"
            className="contain-img mb-3"
          />
          <h6 className="dark-text mb-1">هذه المسابقة مخصصة لمدارس معينة</h6>
          <h6 className="dark-text">يمكنك المشاركة بمسابقة أخرى</h6>
        </div>
      </div>
    );
  }
}
