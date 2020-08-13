import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ShareInitiatives } from "./share-initiatives";
import { Button } from "reactstrap";
import AddInitiative from "./add-initiative";
import axios from "axios";
import { apiBaseUrl } from "../../api/helpers";
import ImportantQuiestions from "./important-questions";
class InitiativesDetailsComponent extends Component {
  state = {
    initiative: {},
    freeLectures: [],
    isModelOpen: false,
    isImportantQuiestionsModelOpen: false,
  };
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    axios
      .get(`${apiBaseUrl}/Initiatives/${params.id}`)
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          details: response.data.data,
          freeLectures: response.data.data.freeLectures,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  toggleModal = () => {
    this.setState({ isModelOpen: !this.state.isModelOpen });
  };
  toggleImportantModal = () => {
    this.setState({
      isImportantQuiestionsModelOpen: !this.state
        .isImportantQuiestionsModelOpen,
    });
  };

  renderfreeLecture() {
    const freeLectures = this.state.freeLectures;
    console.log(freeLectures);
    return (
      <React.Fragment>
        <div className="row">
          {freeLectures.map((freeLecture) => {
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
                      <h6 className=" ar-text smaller mid-text ">1440/12/18</h6>
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                      <h6 className=" ar-text smaller mid-text ">10:00 مساء</h6>
                    </div>
                    <div className="col-md-12 d-flex flex-column align-items-center justify-content-center center">
                      <button
                        onClick={this.toggleModal}
                        className="btn w-20 yellow-btn justify-content-center d-flex light-text align-items-center m-3"
                      >
                        اشترك
                      </button>
                      <AddInitiative
                        toggleModal={this.toggleModal}
                        isModelOpen={this.state.isModelOpen}
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
                    isImportantQuiestionsModelOpen={this.state.isImportantQuiestionsModelOpen}
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
