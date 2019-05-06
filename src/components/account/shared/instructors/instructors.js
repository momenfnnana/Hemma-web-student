import React, { Component } from "react";
import "./styles.sass";
import StarRatingComponent from "react-star-rating-component";

export class Instructors extends Component {
  constructor(props) {
    super(props);

    this.state = { rating: 3 };
  }

  renderInstructors() {
    const { rating } = this.state;

    return (
      <div className="white-bg border-bottom d-flex align-items-center h-55 pl-3 pr-3">
        <div>
          <img
            src={process.env.PUBLIC_URL + "/assets/images/female-circle.png"}
            className="mr-2"
            height="25"
          />
        </div>

        <div className="d-flex justify-content-center flex-column">
          <h6 className="mid-text smaller mb-1 mt-0">طلال أحمد</h6>

          <div className="d-flex align-items-center">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/diary.png"}
              className="mr-2"
              height="11"
            />
            <h6 className="dark-text smaller mt-0 mb-0">الجزء الكمي</h6>
          </div>
        </div>

        <div className="d-flex justify-content-end flex-fill align-items-center">
          <StarRatingComponent
            starCount={5}
            value={rating}
            starColor={"#ffe552"}
            emptyStarColor={"#a9acb4"}
            editing={false}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="box-layout w-100 radius-bottom-0 border-bottom-0">
          <div className="silver-bg d-flex align-items-center p-3">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/instructors.png"}
              className="mr-2"
              height="20"
            />
            <h6 className="dark-text small mb-0">المدربين</h6>
          </div>
          <hr className="mt-0 mb-0" />

          <div>{this.renderInstructors()}</div>
        </div>
      </React.Fragment>
    );
  }
}
