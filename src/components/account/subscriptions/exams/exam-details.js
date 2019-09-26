import React, { Component } from "react";
import { CustomInput, Form, FormGroup, Label } from "reactstrap";
import { ConfirmExam } from "./confirm-exam";
import "../styles.sass";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { HintModal } from "./hint";

export class ExamDetails extends Component {
  state = {
    isConfirmExamOpen: false,
    isHintOpen: false
  };

  openConfirmExamModal = () => {
    this.setState({ isConfirmExamOpen: true });
  };
  closeConfirmExamModal = () => {
    this.setState({ isConfirmExamOpen: false });
  };

  openHintModal = () => {
    this.setState({ isHintOpen: true });
  };
  closeHintModal = () => {
    this.setState({ isHintOpen: false });
  };

  render() {
    const courseId = this.props.match.params.id;
    const settings = {
      className: "center",
      centerMode: true,
      infinite: false,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
      rtl: true
    };

    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12">
            {/* <div className="box-layout shadow-sm h-100 pt-5 pb-5 d-flex align-items-center justify-content-center flex-column">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/failed.png"}
                height="100"
                className="contain-img mb-3"
              />
              <h6 className="mid-text mb-2">لا بأس عاود المحاولة ..</h6>
              <p className="dark-text w-50 mx-auto text-center">
                لقد حصلت على نتيجة <span className="en-text">30/100</span> في
                الامتحان
              </p>
              <p className="dark-silver-text small mb-1">
                الوقت المستغرق في حل الامتحان
              </p>
              <p className="dark-silver-text small en-text">20:30</p>
              <Link
                className="dark-text smaller mb-4"
                to={`/subscriptions/${courseId}/exams/list`}
              >
                <u>الرجوع الى القائمة</u>
              </Link>

              <Link
                className="btn light-btn unset-height unset-line-height"
                to={`/subscriptions/${courseId}/exams/list`}
              >
                التأكد من الإجابات
              </Link>
            </div> */}

            {/* <div className="box-layout shadow-sm h-100 pt-5 pb-5 d-flex align-items-center justify-content-center flex-column">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/passed.png"}
                height="100"
                className="contain-img mb-3"
              />
              <h6 className="mid-text mb-2">تهانينا، لقد نجحت!</h6>
              <p className="dark-text w-50 mx-auto text-center">
                لقد حصلت على نتيجة <span className="en-text">90/100</span> في
                الامتحان
              </p>

              <p className="dark-silver-text small mb-1">
                الوقت المستغرق في حل الامتحان
              </p>
              <p className="dark-silver-text small en-text">20:30</p>
              <Link
                className="dark-text smaller mb-4"
                to={`/subscriptions/${courseId}/exams/list`}
              >
                <u>الرجوع الى القائمة</u>
              </Link>

              <Link
                className="btn light-btn unset-height unset-line-height"
                to={`/subscriptions/${courseId}/exams/list`}
              >
                التأكد من الإجابات
              </Link>
            </div> */}

            <div className="box-layout shadow-sm h-100 pb-2">
              <div className="row p-4">
                <div className="col-12 d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="mid-text mb-0">
                      الامتحان الأول: القطوع المخروطية
                    </h6>
                    <p className="dark-silver-text mb-0 mt-1 smaller">
                      وصف الامتحان
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/silver-clock.png"
                      }
                      height="14"
                      width="14"
                      className="contain-img mr-1"
                    />
                    <p className="small en-text dark-silver-text mb-0">3:30</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <hr className="mb-0 mt-0" />
                </div>
              </div>
              <div className="question-item">
                <Slider {...settings} className="mb-3">
                  <div className="box-layout h-55 d-flex justify-content-center flex-column p-3 br-0 border-right-0 border-top-0">
                    <h6 className="green-text small mb-1">السؤال الاول</h6>
                    <p className="dark-silver-text smaller mb-0">
                      ذا النص هو مثال لنص يمكن أن يستبدل
                    </p>
                  </div>
                  <div className="box-layout h-55 d-flex justify-content-center flex-column p-3 br-0 border-right-0 border-top-0">
                    <h6 className="red-text small mb-1">السؤال الثاني</h6>
                    <p className="dark-silver-text smaller mb-0">
                      ذا النص هو مثال لنص يمكن أن يستبدل
                    </p>
                  </div>
                  <div className="box-layout h-55 d-flex justify-content-center flex-column p-3 br-0 border-right-0 border-top-0">
                    <h6 className="dark-text small mb-1">السؤال الثالث</h6>
                    <p className="dark-silver-text smaller mb-0">
                      ذا النص هو مثال لنص يمكن أن يستبدل
                    </p>
                  </div>
                  <div className="box-layout h-55 d-flex justify-content-center flex-column p-3 br-0 border-right-0 border-top-0">
                    <h6 className="dark-text small mb-1">السؤال الرابع</h6>
                    <p className="dark-silver-text smaller mb-0">
                      ذا النص هو مثال لنص يمكن أن يستبدل
                    </p>
                  </div>
                  <div className="box-layout h-55 d-flex justify-content-center flex-column p-3 br-0 border-top-0">
                    <h6 className="dark-text small mb-1">السؤال الخامس</h6>
                    <p className="dark-silver-text smaller mb-0">
                      ذا النص هو مثال لنص يمكن أن يستبدل
                    </p>
                  </div>
                </Slider>

                <div className="row p-4 pb-2">
                  <div
                    className="col-12 d-flex align-items-center mb-2 clickable"
                    onClick={this.openHintModal}
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/hint.png"}
                      height="17"
                      className="contain-img mr-2"
                    />
                    <p className="small red-text mb-0">
                      <u>المساعدة</u>
                    </p>
                  </div>

                  <div className="col-12">
                    <div className="box-layout box-border shadow-sm">
                      <p className="dark-text small mb-0 p-3 text-break">
                        لصفحة وليس مقاطع النشر دليل المقروء صار. ألدوس توزيعاَ
                        قرون إصدار ليتراسيت. أيضاً للنص ما الشكل وليس مقاطع
                        مقاطع هذا هذا بل مستخدماً.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row pl-4 pr-4">
                  <div className="col-12">
                    <p className="small dark-silver-text mb-2">
                      اختر الإجابة الصحيحة
                    </p>
                  </div>
                </div>

                <div className="row pl-4 pr-4 pb-4">
                  <div className="col-7">
                    <div className="box-layout h-40 d-flex align-items-center pr-2 pl-2 mb-2">
                      <CustomInput
                        type="radio"
                        label="الإجابة الأولى"
                        className="small dark-silver-text light-font-text d-flex align-items-center"
                      />
                    </div>
                    <div className="box-layout h-40 d-flex align-items-center pr-2 pl-2 mb-2">
                      <CustomInput
                        type="radio"
                        label="الإجابة الثانية"
                        className="small dark-silver-text light-font-text d-flex align-items-center"
                      />
                    </div>
                    <div className="box-layout h-40 d-flex align-items-center pr-2 pl-2 mb-2">
                      <CustomInput
                        type="radio"
                        label="الإجابة الثالثة"
                        className="small dark-silver-text light-font-text d-flex align-items-center"
                      />
                    </div>
                    <div className="box-layout h-40 d-flex align-items-center pr-2 pl-2 mb-2">
                      <CustomInput
                        type="radio"
                        label="الإجابة الرابعة"
                        className="small dark-silver-text light-font-text d-flex align-items-center"
                      />
                    </div>
                  </div>

                  <div className="col-5 d-flex align-items-center">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/graph.png"}
                      height="180"
                      width="100%"
                      className="contain-img"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <hr className="mb-0" />
                </div>
              </div>

              <div className="row pt-4 pb-3">
                <div className="col-12 text-center">
                  <button
                    className="btn light-outline-btn w-25"
                    onClick={this.openConfirmExamModal}
                  >
                    إنهاء الامتحان
                  </button>
                </div>
              </div>
            </div>

            <ConfirmExam
              isConfirmExamOpen={this.state.isConfirmExamOpen}
              closeConfirmExam={this.closeConfirmExamModal}
            />

            <HintModal
              isHintOpen={this.state.isHintOpen}
              closeHint={this.closeHintModal}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
