import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ShareInitiatives } from "./share-initiatives";
import { Button, Form } from "reactstrap";
import AddInitiative from "./add-initiative";
import axios from "axios";
import { apiBaseUrl } from "../../api/helpers";
import ImportantQuiestions from "./important-questions";
import swal from "@sweetalert/with-react";

var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

class InitiativesDetailsComponent extends Component {
  state = {
    initiative: {},
    freeLectures: [],
    isModelOpen: false,
    isImportantQuiestionsModelOpen: false,
    freeLectureId: null,
  };
  componentDidMount() {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    const {
      match: { params },
    } = this.props;
    if (token === null) {
      axios
        .get(`${apiBaseUrl}/Initiatives/${params.id}`)
        .then((response) => {
          this.setState({
            details: response.data.data,
            freeLectures: response.data.data.freeLectures,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${apiBaseUrl}/Initiatives/${params.id}`, {
          headers,
        })
        .then((response) => {
          this.setState({
            details: response.data.data,
            freeLectures: response.data.data.freeLectures,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  toggleModal = (id) => {
    let token = localStorage.getItem("token");
    if (token) {
      this.setState({
        isModelOpen: !this.state.isModelOpen,
        freeLectureId: id,
      });
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
  };
  toggleImportantModal = () => {
    this.setState({
      isImportantQuiestionsModelOpen: !this.state
        .isImportantQuiestionsModelOpen,
    });
  };

  onSubmit(id) {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${apiBaseUrl}/auth/nationalId`, {
        headers,
      })
      .then((response) => {
        if (response.data.isStudentHasNationalId === true) {
          axios
            .post(`${apiBaseUrl}/InitiativeFreeLectures?id=${id}`, null, {
              headers,
            })
            .then(() => {
              window.location.reload();
            });
        } else {
          this.toggleModal(id);
        }
      })
      .catch((error) => {
        switch (error.response && error.response.status) {
          case 401:
            swal(
              "عفواً",
              "يجب عليك تسجيل الدخول/تسجيل حساب حتى تتمكن من القيام بهذه الخطوة",
              "error",
              {
                button: "متابعة",
              }
            );
            break;
          default:
            console.log(error);
        }
      });
  }

  renderfreeLecture() {
    const freeLectures = this.state.freeLectures;
    return (
      <React.Fragment>
        <div className="row">
          {freeLectures.map((freeLecture) => {
            //Date
            const scheduledAt = new Date(freeLecture.scheduledAt);
            var day = scheduledAt.getDate();
            var month = scheduledAt.getMonth() + 1;
            var year = scheduledAt.getFullYear();
            var freeLectureDate = year + "-" + month + "-" + day;
            var hijriDate = moment(freeLectureDate, "YYYY-MM-DD").format(
              "iYYYY/iM/iD"
            );
            // Time
            var freeLectureTime = scheduledAt.getTime();
            const hours = `0${new Date(freeLectureTime).getHours()}`.slice(-2);
            const hour = hours > 12 ? hours - 12 : hours;
            const minutes = `0${new Date(freeLectureTime).getMinutes()}`.slice(
              -2
            );
            const time = `${hour}:${minutes}`;
            var amOrPm = hours < 12 || hours === 24 ? "صباحا" : "مساء";
            return (
              <div className="col-lg-6">
                <div className="lecture-box-layout">
                  <div className="row">
                    <div className="col-8 ">
                      <h5 className="dark-text m-4">{freeLecture.nameAr}</h5>
                    </div>
                    <div className="col-4  d-flex align-items-center justify-content-end">
                      <div className="share-label">
                        <ShareInitiatives />
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                      <h6 className=" en-text smaller mid-text ">
                        {hijriDate}
                      </h6>
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                      <h6 className=" en-text smaller mid-text ">
                        {time} {amOrPm}
                      </h6>
                    </div>
                    <div className="col-md-12 d-flex flex-column align-items-center justify-content-center center">
                      {freeLecture.isJoined ? (
                        <Link
                          className="btn w-20 yellow-btn justify-content-center d-flex light-text align-items-center m-3"
                          target="_blank"
                          to={{
                            pathname: `${freeLecture.broadcastUrl} `,
                          }}
                        >
                          انضم
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            this.onSubmit(freeLecture.initiativeFreeLectureId);
                          }}
                          className="btn w-20 yellow-btn justify-content-center d-flex light-text align-items-center m-3"
                        >
                          اشترك
                        </button>
                      )}
                      <AddInitiative
                        toggleModal={this.toggleModal}
                        isModelOpen={this.state.isModelOpen}
                        id={this.state.freeLectureId}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
  render() {
    return (
      <React.Fragment>
        <section className="pt-5">
          <div className="container">
            <div className="row mb-4">
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
                <h1 className="dark-text mb-1">
                  مبادرات همة للتعريف بالائحة التعليمية
                </h1>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-md-12  d-flex flex-column align-items-center justify-content-center">
                <h5 className="dark-text w-50 mb-1 d-flex flex-column align-items-center justify-content-center yellow-div">
                  بالتعاون مع
                </h5>
              </div>
            </div>
            <div className="row w-75 mx-auto d-flex justify-content-center align-items-center">
              <div className="col-lg-4 d-flex flex-column align-items-center justify-content-center">
                <div className="categories-box-layout">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                    width="100%"
                    height="100%"
                    className="contain-img d-md-block d-none d-sm-none"
                    alt="artwork"
                  />
                </div>
              </div>
              <div className="col-lg-4 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <div className="categories-box-layout">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                      width="100%"
                      height="100%"
                      className="contain-img d-md-block d-none d-sm-none"
                      alt="artwork"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <div className="categories-box-layout">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                      width="100%"
                      height="100%"
                      className="contain-img d-md-block d-none d-sm-none"
                      alt="artwork"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5 mb-5">
              <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
                <div
                  className="btn w-100 ml-4 label-btn clickable"
                  onClick={() => this.props.history.push("/initiative-role")}
                >
                  <h3>لمعرفة الرتبة التي تم تسكينك عليها</h3>
                </div>
              </div>
              <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
                <div
                  className="btn w-100 ml-4 label-btn"
                  onClick={() => this.props.history.push("/initiative-exam")}
                >
                  <h3>لمعرفة الاختبار المناسب لمؤهلك</h3>
                </div>
              </div>
              <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
                <div
                  className="btn w-100 ml-4 label-btn"
                  onClick={this.toggleImportantModal}
                >
                  <h3>أهم التساؤلات حول اللائحة التعليمية</h3>
                  <ImportantQuiestions
                    toggleImportantModal={this.toggleImportantModal}
                    isImportantQuiestionsModelOpen={
                      this.state.isImportantQuiestionsModelOpen
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-5">
          <div className="container">
            <div className="row mb-3">
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
                <h1 className="dark-text mb-1">
                  محاضرات مجانية لتوضيح الائحة التعليمية
                </h1>
              </div>
            </div>
            <div className="row w-75 mx-auto d-flex justify-content-center align-items-center">
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center blue-btn p-5">
                <Link
                  to="/enter-To-Lecture"
                  className="btn blue-btn justify-content-center d-flex align-items-center"
                >
                  <h2 className="m-2">خطوات المشاهدة للمحاضرات المجانية</h2>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-5">
          <div className="container">
            <div className="row mx-auto d-flex justify-content-center align-items-center mb-5">
              {this.renderfreeLecture()}
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export const InitiativesDetails = InitiativesDetailsComponent;
