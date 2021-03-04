import React, { Component } from "react";
import "./styles.sass";
import { Link } from "react-router-dom";
var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

export class Card extends Component {
  render() {
    const course = this.props.course;
    var date = new Date(course.startsAt);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var courseDate = year + "-" + month + "-" + day;
    var hijriDate = moment(courseDate, "YYYY-MM-DD").format("iYYYY/iM/iD");

    var desc = course.descriptionAr;
    if (desc.length > 10) desc = desc.substring(0, 100) + "...";

    const instructor = course.instructors.map((instructor) => (
      <React.Fragment key={instructor.id}>
        <div className="col-md-6 light-font-text small light-text d-flex align-items-center mb-0">
          <img
            src={process.env.PUBLIC_URL + "/assets/images/blue-male.png"}
            height="15"
            width="15"
            className="mr-1 contain-img"
          />
          <span key={instructor.id} className="mr-3">
            {instructor.name}
          </span>
        </div>
      </React.Fragment>
    ));
    return (
      <React.Fragment>
        <Link to={`/course/details/${course.slug}`} key={course.id}>
          <div className="card course-card shadow-sm m-2 border-0" dir="rtl">
            <header className="card-thumb">
              <img key={course.id} src={course.bannerUrl} alt={course.nameAr} />
            </header>
            <div className="card-body">
              <h6 className="card-title small mid-text" key={course.id}>
                {course.nameAr}
              </h6>
              {course.relatedDiscound ?
               ( <h5 className="small light-font-text dark-text">
                   نقدر لك ولاءك لهمة ورجوعك لنا مره اخرى، لهذا تم تقديم لك خصم خاص 
                   &nbsp;{course.relatedDiscound} %&nbsp;
                  بسبب أشتراكك فى  
                  &nbsp;{course.relatedDiscoundCourse} &nbsp;
                    </h5>
              ):null}
              
              {course.instructors == undefined ||
              course.instructors == 0 ? null : (
                <div className="card-subtitle">
                  <div className="row">{instructor}</div>
                </div>
              )}
              <ul className="list-inline mb-1">
                <li className="list-inline-item light-font-text small dark-text mr-4 d-inline-flex align-items-center">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/calendar.png"}
                    height="12"
                    width="12"
                    className="mr-1"
                  />
                  <span className="en-text mr-1">
                    {parseFloat(course.durationInHours)}
                  </span>
                  ساعة
                </li>
                <li className="list-inline-item light-font-text small dark-text en-text d-inline-flex align-items-center">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/quarters.png"}
                    height="12"
                    width="12"
                    className="mr-1"
                  />
                  <span className="en-text">{hijriDate}</span>{" "}
                </li>
                {course.originalPrice ? (
                  <>
                    <li className="list-inline-item light-font-text small red-text d-inline-flex align-items-center float-right">
                      <span className="en-text mr-1">
                        {course.price && parseFloat(course.price.toFixed(2))}
                      </span>
                      ريال
                    </li>
                    <li className="list-inline-item light-font-text small d-inline-flex align-items-center float-right mr-1 crossed-line dark-text">
                      <span className="en-text mr-1">
                        {course.originalPrice &&
                          parseFloat(course.originalPrice.toFixed(2))}
                        <span className="ar-text mr-1">ريال</span>
                      </span>
                    </li>
                  </>
                ) : (
                  <li className="list-inline-item light-font-text small dark-text d-inline-flex align-items-center float-right mr-1">
                    <span className="en-text mr-1">
                      {course.price && parseFloat(course.price.toFixed(2))}
                    </span>
                    ريال
                  </li>
                )}
              </ul>
            </div>
            <p className="card-description dark-text light-font-text smaller mb-0 text-center text-break">
              {desc}
            </p>
          </div>
        </Link>
      </React.Fragment>
    );
  }
}
