import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";

export class Schedule extends Component {
  renderChallenges() {
    return (
      <React.Fragment>
        <div className="box-layout shadow-sm d-flex flex-column justify-content-center align-items-center w-100 rounded p-3">
          <h6 className="small mid-text">التحدي الأول</h6>
          <h6 className="smaller mid-text pb-2">أحمد علي</h6>
          <button
            type="submit"
            className="btn light-outline-btn unset-height btn-sm w-50"
          >
            انضم
          </button>
        </div>
      </React.Fragment>
    );
  }

  renderSections() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card section-card">
            <div className="card-header border-bottom-0">
              <h6 className="text-white small mb-0">الجزء الكمي</h6>
            </div>
            <Accordion>
              <AccordionItem>
                <AccordionItemTitle>
                  <h6 className="dark-text mb-0 small dark-text">
                    النسبة والتناسب
                  </h6>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <ul className="list-group list-group-flush flex-fill">
                    <li className="list-group-item bg-transparent small dark-silver-text light-font-text">
                      <div className="row">
                        <div className="col-6">
                          <img
                            src={
                              process.env.PUBLIC_URL + "/assets/images/play.png"
                            }
                            className="mr-2"
                            height="15"
                          />
                          المحاضرة الأولى
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                          السبت 20-1-2019
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/blue-check.png"
                            }
                            className="ml-2"
                            height="15"
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </AccordionItemBody>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    );
  }

  render() {
    var settings = {
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <React.Fragment>
        <div className="row no-gutters">
          <div className="col-12 mb-4">
            <div className="d-flex justify-content-between">
              <h6 className="dark-text small mb-0 mt-0">
                آخر التحديات المضافة
              </h6>
              <h6 className="dark-silver-text smaller mb-0 mt-0">
                مشاهدة الجميع
              </h6>
            </div>
          </div>
          <div className="col-12 mb-4">
            <Slider {...settings}>{this.renderChallenges()}</Slider>
          </div>
          <div className="col-12 mb-4">
            <h6 className="dark-text small mb-0 mt-0">جدول الدورة </h6>
          </div>
          <div className="col-12">{this.renderSections()}</div>
        </div>
      </React.Fragment>
    );
  }
}