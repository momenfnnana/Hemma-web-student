import React, { Component } from "react";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";
import { withRouter } from "react-router-dom";
import axios from "axios";
import swal from "@sweetalert/with-react";
import { apiBaseUrl } from "../../../api/helpers";

var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

class myFreeGroups extends Component {
  state = {
    groups: [],
  };
  componentDidMount() {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${apiBaseUrl}/CategoryGroups/GetCategoryGroupForUser`, { headers })
      .then((response) => {
        this.setState({
          groups: response.data?.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  categoryGroupRedirection(CategoryGroup) {
    const {
      match: { params },
    } = this.props;
    let token = localStorage.getItem("token");
    if (token) {
      this.props.history.push(
        `/categories/details/${params.slug}/quick-questions/${CategoryGroup}`
      );
    } else {
      swal(
        "عفواً",
        "يجب عليك تسجيل الدخول/تسجيل حساب حتى تتمكن من القيام بهذه الخطوة",
        "error",
        {
          button: "متابعة",
        }
      );
    }
  }
  renderCategoryGroups() {
    //free groups
    return (
      <div className="row">
        {this.state.groups.map((group) => (
          <div className="col-lg-4" key={group.id}>
            <div
              className="card p-3 card-gradient border-dashed card-ele mb-3 position-relative min-height-150"
              onClick={() => this.categoryGroupRedirection(group.id)}
            >
              <div className="d-flex align-items-center">
                <div className="mr-4">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/icon.svg"}
                    className="width-80"
                    alt="ICON"
                  />
                </div>
                <div className="text-white">
                  <h4 className="h4">{group.name}</h4>
                  <div className="font-size-18 mb-2">{group.description}</div>
                  <div className="font-size-14 d-flex align-items-center">
                    <div className="mr-2">
                      <i className="far fa-user-circle"></i>
                    </div>
                    <div className="mr-2">طالب</div>
                    <div>{group.numberOfMembers}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  render() {
    const { groups } = this.state;
    return (
      <React.Fragment>
        <div className="container pt-5 pb-5">
          <div className="row">
            <div className="col-12">
              <h3 className="ar-text dark-text">مجموعاتي المجانية</h3>
              {this.state.groups?.length > 0 ? (
                <div className="mb-5">{this.renderCategoryGroups()}</div>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(myFreeGroups);
