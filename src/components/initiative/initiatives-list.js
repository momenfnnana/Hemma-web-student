import React, { Component } from "react";
import { Link } from "react-router-dom";
class InitiativesListComponent extends Component {
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
              <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <div className="btn w-100 yellow-btn ml-4">
                    <h3>بالتعاون مع</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="row w-75 mx-auto d-flex justify-content-center align-items-center">
              <div className="col-lg-4 d-flex flex-column align-items-center justify-content-center">
                <div className="categories-box-layout">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                    width="100%"
                    className="contain-img d-md-block d-none d-sm-none pt-2"
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
                      className="contain-img d-md-block d-none d-sm-none pt-2"
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
                      className="contain-img d-md-block d-none d-sm-none pt-2"
                      alt="artwork"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5 mb-5">
              <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
                <div className="btn w-100 ml-4 label-btn">
                  <h3>لمعرفة الرتبة التي تم تسكينك عليها</h3>
                </div>
              </div>
              <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
                <div className="btn w-100 ml-4 label-btn">
                  <h3>لمعرفة الاختبار المناسب لمؤهلك</h3>
                </div>
              </div>
              <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
                <div className="btn w-100 ml-4 label-btn">
                  <h3>أهم التساؤلات حول اللائحة التعليمية</h3>
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
                  to="/initiative/list"
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
              <div className="col-lg-4 d-flex flex-column align-items-center justify-content-center">
                <div className="lecture-box-layout">
                  <h5 className="dark-text m-4">
                    التعريف بالمواد و الرتب والمزايا في اللائحة التعليمية
                    الجديدة
                  </h5>
                </div>
              </div>
              <div className="col-lg-4 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <div className="lecture-box-layout">
                    <h5 className="dark-text m-4">
                      التعريف بالمواد و الرتب والمزايا في اللائحة التعليمية
                      الجديدة
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <div className="lecture-box-layout">
                    <h5 className="dark-text m-4">
                      التعريف بالمواد و الرتب والمزايا في اللائحة التعليمية
                      الجديدة
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <div className="lecture-box-layout">
                    <h5 className="dark-text m-4">
                      التعريف بالمواد و الرتب والمزايا في اللائحة التعليمية
                      الجديدة
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <div className="lecture-box-layout">
                    <h5 className="dark-text m-4">
                      التعريف بالمواد و الرتب والمزايا في اللائحة التعليمية
                      الجديدة
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <div className="lecture-box-layout">
                    <h5 className="dark-text m-4">
                      التعريف بالمواد و الرتب والمزايا في اللائحة التعليمية
                      الجديدة
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export const InitiativesList = InitiativesListComponent;
