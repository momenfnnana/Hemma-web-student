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
            <div className="card-body">
              <h6 className="card-title dark-text small" key={course.id}>
                {course.nameAr}
              </h6>
              <p className="dark-text smaller">{desc}</p>
              <ul className="list-inline mb-2">
                <li className="list-inline-item light-font-text small dark-text mr-4 d-inline-flex align-items-center">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/male.png"}
                    height="15"
                    width="15"
                    className="mr-1 contain-img"
                  />
                  <span>أ. طلال محمد</span>
                </li>
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
              </ul>

              <h6 className="dark-text float-right mt-0 mb-0">
                <span className="en-text">{course.price}</span> ريال
              </h6>
            </div>
            {/* <div className="card-footer">
              <button
                type="submit"
                className="btn light-outline-btn w-100"
                onClick={() => this.addToCart(course.id)}
              >
                اشترك الآن
              </button>
            </div> */}
          </div>
        </Link>
      </React.Fragment>
    );
  }
}
