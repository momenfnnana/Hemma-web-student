import React, { Component } from "react";
import "./styles.scss";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";
import { MdKeyboardArrowDown } from "react-icons/md";

import { apiBaseUrl } from "../../../../api/helpers";
export class Instructors extends Component {
  constructor(props) {
    super(props);

    this.state = { instructors: [], filterValue:4 };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${apiBaseUrl}/content/${this.props.id}/instructors`, { headers })
      .then(response => {
        this.setState({ instructors: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderInstructors() {
    const {instructors,filterValue}=this.state;
    const changeFliterValue=()=>{
      if(filterValue===4){
        this.setState({filterValue:instructors?.length})
      }else{
        this.setState({filterValue:4})
      }
    }
    if (instructors) {
      return <>{instructors?.filter((_,i)=>i<filterValue)?.map((instructor, index) => (
        <div
          className="white-bg border-bottom d-flex align-items-center mh-55 p-3"
          key={index}
        >
          {/* <div>
            <img
              src={process.env.PUBLIC_URL + "/assets/images/female-circle.png"}
              className="mr-2"
              height="25"
            />
          </div> */}

          <div className="d-flex justify-content-center flex-column">
            <h6 className="mid-text small mb-1 mt-0">{instructor.name}</h6>

            {instructor.sections.map((section, index) => (
              <div className="d-flex align-items-center" key={index}>
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/diary.png"}
                  className="mr-2"
                  height="11"
                  alt="diary"
                />
                <h6 className="dark-text smaller mt-0 mb-1">{section}</h6>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-end flex-fill align-items-center">
            {instructor.rating === 0 ? null : (
              <StarRatingComponent
                starCount={5}
                value={instructor.rating}
                starColor={"#ffe552"}
                emptyStarColor={"#a9acb4"}
                editing={false}
                name="rate"
              />
            )}
          </div>
        </div>
      ))}
      {instructors?.length >= 4 ? (
            <div
              className="white-bg border-bottom d-flex align-items-center justify-content-center mh-55 p-3 see-more pointer"
              onClick={() => changeFliterValue()}
            >
              مشاهدة المزيد
              <MdKeyboardArrowDown
                className={filterValue === 4 ? "" : "rotateBox"}
              />
            </div>
          ) : null}
      </>
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.instructors === undefined ||
        this.state.instructors === 0 ? null : (
          <div className="box-layout w-100 radius-bottom-0 border-bottom-0">
            <div className="silver-bg d-flex align-items-center p-3">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/instructors.png"}
                className="mr-2"
                height="20"
                altr="instructors"
              />
              <h6 className="dark-text small mb-0">المدربين</h6>
            </div>
            <hr className="mt-0 mb-0" />

            <div>{this.renderInstructors()}</div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
