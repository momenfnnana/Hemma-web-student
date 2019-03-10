import React, { Component } from "react";
import axios from "axios";
import { FaGraduationCap } from "react-icons/fa";
import { IoIosClockOutline } from "react-icons/io";
import "./styles.sass";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";

export class CourseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: []
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    axios
      .get(`https://api.staging.hemma.sa/api/v1/courses/${params.id}`)
      .then(response => {
        this.setState({ details: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderFeatures() {
    const features = this.state.details.features;

    // return features.map(feature => (
    //   <React.Fragment>
    //     <div className="col-6 align-items-center pb-2" key={feature.id}>
    //       <p className="small dark-text mb-0">
    //         <img
    //           src={feature.icon}
    //           className="mr-2 contain-img"
    //           height="15"
    //           width="15"
    //         />
    //         {feature.descriptionAr}
    //       </p>
    //     </div>
    //   </React.Fragment>
    // ));
  }

  render() {
    return (
      <React.Fragment>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="white-bg box-layout w-100 p-2 pb-4 mb-4 d-flex flex-column">
                  <img
                    src={this.state.details.bannerUrl}
                    height="180"
                    width="100%"
                    className="mb-3 rounded cover-img"
                  />
                  <div className="container">
                    <div className="d-inline-flex align-items-center">
                      <h6 className="dark-text small mr-3">سعر الاشتراك</h6>
                      <h4 className="mid-text">
                        <span className="en-text">
                          {this.state.details.price}
                        </span>{" "}
                        ريال
                      </h4>
                    </div>
                    <button
                      type="button"
                      className="btn light-outline-btn w-100 align-self-center mt-2 mb-3"
                    >
                      اشترك الآن
                    </button>
                    <h6 className="dark-text mr-3 mb-3">تتضمن:</h6>
                    <ul className="list-unstyled">
                      <li className="small dark-text mb-2">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/assets/images/clock.png"
                          }
                          className="mr-2"
                          height="15"
                        />
                        {this.state.details.durationTextAr} تدريبية
                      </li>
                      <li className="small dark-text mb-2">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/quarters.png"
                          }
                          className="mr-2"
                          height="15"
                        />{" "}
                        مدة صلاحية الدورة {this.state.details.validityTextAr}
                      </li>
                      <li className="small dark-text mb-2">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/calendar.png"
                          }
                          className="mr-2"
                          height="15"
                        />{" "}
                        تبدأ في تاريخ {this.state.details.startsAt}
                      </li>
                      <li className="small dark-text mb-2">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/calendar.png"
                          }
                          className="mr-2"
                          height="15"
                        />{" "}
                        يومي {this.state.details.scheduleTextAr}
                      </li>
                      <li className="small dark-text mb-2">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/assets/images/diary.png"
                          }
                          className="mr-2"
                          height="20"
                        />{" "}
                        سعر الملزمة 200 ريال
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="silver-bg box-layout w-100 p-3 d-inline-flex align-items-center justify-content-center">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/download.png"}
                    className="mr-2"
                    height="20"
                  />{" "}
                  <h6 className="dark-text mb-0 mt-0">تنزيل جدول الدورة</h6>
                </div>
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-12">
                    <h3 className="mid-text">{this.state.details.nameAr}</h3>
                    <p className="small dark-text light-font-text w-75 mt-3">
                      {this.state.details.descriptionAr}
                    </p>
                  </div>
                </div>

                <div className="row">{this.renderFeatures()}</div>

                <div className="row mt-3">
                  <div className="col-12">
                    <Accordion>
                      <AccordionItem expanded={true}>
                        <AccordionItemTitle>
                          <h6 className="text-white small mb-0">الجزء الكمي</h6>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                          <h6 className="dark-text small mb-0">
                            - النسبة والتناسب
                          </h6>
                        </AccordionItemBody>
                        <AccordionItemBody>
                          <h6 className="dark-text small mb-0">
                            - النسبة والتناسب
                          </h6>
                        </AccordionItemBody>
                        <AccordionItemBody>
                          <h6 className="dark-text small mb-0">
                            - النسبة والتناسب
                          </h6>
                        </AccordionItemBody>
                      </AccordionItem>
                    </Accordion>
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
