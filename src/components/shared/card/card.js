import React, { Component } from "react";
import "./styles.sass";
import { Link } from "react-router-dom";

export class Card extends Component {
  addToCart(id) {
    console.log(id);
    // let token = localStorage.getItem("token");
    // let headers = {
    //   Authorization: `Bearer ${token}`
    // };
    // let data = {
    //   type: "Course",
    //   itemId: id,
    //   installment: 0
    // };
    // axios
    //   .post("https://api.staging.hemma.sa/api/v1/cart/items", data, { headers })
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  render() {
    const course = this.props.course;
    var date = new Date(course.startsAt);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var courseDate = day + "-" + month + "-" + year;

    var desc = course.descriptionAr;
    if (desc.length > 10) desc = desc.substring(0, 100) + "...";

    const instructor = course.instructors.map(instructor => (
      <span key={instructor.id}>{instructor.name}</span>
    ));

    return (
      <React.Fragment>
        <Link to={`/course/details/${course.id}`} key={course.id}>
          <div className="card course-card shadow-sm border-0 m-2" dir="rtl">
            <img
              className="card-img-top"
              key={course.id}
              src={course.bannerUrl}
              alt="Course image"
            />
            <div className="card-body bg-white pb-1">
              <h6 className="card-title small mid-text" key={course.id}>
                {course.nameAr}
              </h6>
              {course.instructors == undefined ||
              course.instructors == 0 ? null : (
                <div className="list-inline-item light-font-text small light-text d-inline-flex align-items-center mb-2">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/blue-male.png"
                    }
                    height="15"
                    width="15"
                    className="mr-1 contain-img"
                  />
                  <span>{instructor}</span>
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
                  <span className="en-text mr-1">{course.durationInHours}</span>{" "}
                  ساعة
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
                <li className="list-inline-item light-font-text small dark-text d-inline-flex align-items-center float-right">
                  <span className="en-text mr-1">{course.price}</span> ريال
                </li>
              </ul>

              {course.instructors == undefined || course.instructors == 0 ? (
                <p className="dark-text light-font-text smaller mb-0 text-center mt-3">
                  {desc}
                </p>
              ) : (
                <p className="dark-text light-font-text smaller mb-0 text-center">
                  {desc}
                </p>
              )}
            </div>
          </div>
        </Link>
      </React.Fragment>
    );
  }
}
