import React, { Component } from "react";
import "./styles.sass";
import swal from "@sweetalert/with-react";
import Moment from "moment";
import { Link,useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

class CardComponent extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
  }
  
             
  render() {
    const course = this.props.course;
    console.log("course",course);
    var date = new Date(course.startsAt);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var courseDate = year + "-" + month + "-" + day;
    var hijriDate = moment(courseDate, "YYYY-MM-DD").format("iYYYY/iM/iD");
    var Duration = parseInt(course.durationInHours)

    const { match, location, history } = this.props;
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
          <div  dir="rtl" onClick={() => {
            (course.active==false && course.featuredInMain==true)? 
            ((course.inactiveCourseMessage)?
             swal(
                    "عفواً",
                    course.inactiveCourseMessage,
                    "error", 
                   {
                     button: "متابعة"
                   }
                 ):
              swal(
                "عفواً",
                "سيتاح التسجيل في الدورة لاحقًا ، وسيتم الإعلان عن مواعيد التسجيل عبر منصتي تويتر و الإنستقرام (@hemmaedu)"
                ,
                "error", 
               {
                 button: "متابعة"
               }
                  )
              ):
               new Date(course.endsAt) > new Date() ?  history.push(`/course/details/${course.slug}`):
               swal(
                   "عفواً",
                   "الدورة مغلقة، لا يمكنك شراؤها وبإمكانك التواصل مع الدعم الفني في حال أردت",
                   "error",
                  {
                    button: "متابعة"
                  }
                  ) }} >
                      <div className="card  border-dashed card-ele min-height-410 position-relative mb-6 overflow-hidden">
                        <div className="card-img">

                          <img key={course.id} src={course.bannerUrl} alt={course.nameAr} className="img-rounding img-dropshadow"/>
                          <div className="img-tag"> {course.price && parseFloat(course.price.toFixed(2))} <span className="ar-text mr-1">ريال</span></div>
                        </div>
                        <div className="mt-3 p-3">
                          <h5 className="h5 main-color mb-3 font-weight-bold text-center">{course.nameAr}</h5>
                          <div>
                          <ul className="list-unstyled">
                           
                              {/* <li> <h6 className="h6 sub-color">تفاصيل الدورة :</h6> {course.descriptionAr.substring(0, 150)}
                             {course.descriptionAr.length > 150 ?(<span>...</span>):null }
                              </li> */}
                              
                              {course.instructors.length > 0 ?(<li className="sub-color my-2"> <span className="mr-2">
                                <i class="far fa-user"></i>
                              </span> 
<span>
{course.instructors[0].name}
</span>
                             

                                </li>):null
                              }
                            
                              <li className="d-flex justify-content-between align-items-center flex-wrap mb-5"><span> تاريخ البدء :  <i class="far fa-calendar-alt mx-2"></i> {hijriDate} هـ . </span> <span>{Duration} ساعة</span></li>
                            </ul>
                          </div>
                          <div className="btn-card-area d-flex justify-content-center mt-3">
                            <a className="btn-title d-inline-block">انضم للدورة</a>
                          </div>
                        </div>
                      </div>
                      </div>
                   
      </React.Fragment>
    );
  }
}
export const Card = withRouter(CardComponent);