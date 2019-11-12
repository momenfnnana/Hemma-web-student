import React, { Component } from "react";
import "./styles.sass";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";
import { apiBaseUrl } from "../../../../api/helpers";
export class Instructors extends Component {
  constructor(props) {
    super(props);

    this.state = { instructors: [] };
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
    const instructors = this.state.instructors;
    if (instructors) {
      return instructors.map(instructor => (
        <div
          className="white-bg border-bottom d-flex align-items-center mh-55 p-3"
          key={instructor.id}
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

            {instructor.sections.map(section => (
              <div className="d-flex align-items-center" key={section.id}>
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/diary.png"}
                  className="mr-2"
                  height="11"
                />
                <h6 className="dark-text smaller mt-0 mb-1">{section}</h6>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-end flex-fill align-items-center">
            {instructor.rating == 0 ? null : (
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
      ));
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.instructors == undefined ||
        this.state.instructors == 0 ? null : (
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
        )}
      </React.Fragment>
    );
  }
}
