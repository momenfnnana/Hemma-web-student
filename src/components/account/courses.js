import React, { Component } from "react";
import axios from "axios";
import "./styles.sass";
import { Tooltip } from "reactstrap";

export class Courses extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    const classes = "tooltip-inner";

    return (
      <React.Fragment>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="white-bg box-layout w-100 p-4 d-flex align-items-center justify-content-center flex-column">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/profile-img.png"
                    }
                    height="150"
                    className="mb-3"
                  />
                  <h4 className="dark-text">إبراهيم أحمد</h4>
                  <p className="dark-text en-text small mb-0">
                    Raihan-s6h@hotmail.com
                  </p>
                  <p className="dark-text en-text small mb-1" dir="ltr">
                    +962759514752{" "}
                  </p>
                  <a href="" className="light-text text-underline">
                    تعديل الملف الشخصي
                  </a>
                </div>
              </div>
              <div className="col-md-8">
                <h3 className="dark-text">قائمة دوراتي</h3>
                <div className="silver-bg box-layout w-100 pb-0 p-4 mt-4">
                  {/* <p className="dark-text">
                    لسا ما سجلت بدوره معانا؟ يشرفنا انضمامك لنا!
                  </p>
                  <button type="button" className="btn light-outline-btn w-25">
                    أختر دورتك الآن
                  </button> */}

                  <div className="bg-white box-layout w-100 p-4 d-flex align-items-center mb-4">
                    <div className="media w-75">
                      <img
                        class="mr-3 rounded cover-img"
                        src={
                          process.env.PUBLIC_URL + "/assets/images/course1.png"
                        }
                        height="120"
                        width="120"
                      />
                      <div className="media-body mt-2">
                        <h5 class="mt-0 dark-text">دورة القدرات للجامعيين</h5>
                        <span class="badge blue-status light-font-text">
                          سارية
                        </span>
                      </div>
                    </div>
                    <div className="seperator" />
                    <div className="">
                      <h6 className="dark-text mb-0">الحالة المالية</h6>
                      <p className="dark-silver-text small mb-0">مسددة </p>
                    </div>
                  </div>

                  <div className="bg-white box-layout w-100 p-4 d-flex align-items-center mb-4">
                    <div className="media w-75">
                      <img
                        class="mr-3 rounded cover-img"
                        src={
                          process.env.PUBLIC_URL + "/assets/images/course2.png"
                        }
                        height="120"
                        width="120"
                      />
                      <div className="media-body mt-2">
                        <h5 class="mt-0 dark-text">دورة القدرات للجامعيين</h5>

                        <span
                          class="badge yellow-status light-font-text tooltip-on-hover"
                          id="status-tooltip"
                        >
                          قيد المراجعة
                        </span>

                        <Tooltip
                          placement="right"
                          isOpen={this.state.tooltipOpen}
                          target="status-tooltip"
                          toggle={this.toggle}
                          placement="bottom"
                          style={{
                            backgroundColor: "#f2fdfe",
                            color: "#4b3a85",
                            opacity: 1
                          }}
                        >
                          <p className="light-font-text small mb-1 mt-2">
                            حقك علينا لسه ما تم تأكيد طلبك إذا تجاوز طلبك 48
                            ساعة ياريت تراسلنا
                          </p>
                          <p className="small en-text mb-2" dir="ltr">
                            +9660539412412
                          </p>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="seperator" />
                    <div className="">
                      <h6 className="dark-text mb-0">الحالة المالية</h6>
                      <p className="dark-silver-text small mb-0">
                        مسددة جزئيا{" "}
                      </p>
                    </div>
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
