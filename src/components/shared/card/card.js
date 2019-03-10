import React, { Component } from "react";
import "./styles.sass";

export class Card extends Component {
  render() {
    const course = this.props.course;
    var date = new Date(course.startsAt);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var courseDate = day + "-" + month + "-" + year;
    return (
      <React.Fragment>
        <div className="card shadow-sm border-0 m-2" dir="rtl">
          <img
            className="card-img-top"
            key={course.id}
            src={course.bannerUrl}
            alt="Course image"
          />
          <div className="card-body">
            <h6 className="card-title dark-text" key={course.id}>
              {course.nameAr}
            </h6>
            <ul className="list-inline mb-2">
              <li className="list-inline-item light-font-text small dark-text mr-4 d-inline-flex align-items-center">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/calendar.png"}
                  height="12"
                  width="12"
                  className="mr-1"
                />
                <span className="en-text">{course.durationInHours}</span> ساعة
              </li>
              <li className="list-inline-item light-font-text small dark-text en-text d-inline-flex align-items-center">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/quarters.png"}
                  height="12"
                  width="12"
                  className="mr-1"
                />
                <span className="en-text">{courseDate}</span>
              </li>
            </ul>

            <h6 className="dark-text float-right mt-0 mb-0">
              <span className="en-text">{course.price}</span> ريال
            </h6>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
