import React, { Component } from "react";

export class QuickQuestion extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h5 className="dark-text mt-3">الأسئلة السريعة</h5>
                <p className="dark-text mt-2 small w-40 mx-auto text-break">
                  لا تفوت فرصة الاشتراك بأحدث دوراتنا التي تؤهلك لاجتياز امتحان
                  القدرات والتحصيلي بأعلى العلامات!
                </p>
              </div>
            </div>
            <div className="row py-5">
              <div className="col-md-12">
                <div className="row p-4 pb-2">
                  <div className="col-12">
                    <p className="smaller red-text d-flex align-items-center">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/warning.png"
                        }
                        height="15"
                        className="mr-1"
                      />
                      ملاحظة : يمكنك الإجابة عن السؤال لمرة واحدة فقط
                    </p>
                    <h6 className="dark-text">
                      سؤال عن النسبة والتناسب مكرر أعوام سابقة
                    </h6>
                    <p className="mid-text light-font-text small text-break w-50 mb-0">
                      سؤال عن النسبة و التناسب يقيس درجة فهم الطالب لمفاهيم
                      العامة للمفاهيم العامة للمفاهيم العامة للمفاهيم العامة
                    </p>
                  </div>
                </div>
                <div className="row pl-4 pr-4 pb-4">
                  <div className="col-7">
                    <div className="row d-flex justify-content-between align-items-center mb-3">
                      <div className="col-md-12">
                        <p className="small dark-silver-text mb-0">
                          اختر الإجابة الصحيحة
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="box-layout h-40 d-flex align-items-center pr-2 pl-2 mb-2">
                          <input
                            type="radio"
                            className="small dark-silver-text light-font-text d-flex align-items-center"
                          />
                          <label className="mb-0 dark-silver-text small ml-2">
                            الإجابة الأولى
                          </label>
                        </div>
                        <div className="box-layout h-40 d-flex align-items-center pr-2 pl-2 mb-2">
                          <input
                            type="radio"
                            className="small dark-silver-text light-font-text d-flex align-items-center"
                          />
                          <label className="mb-0 dark-silver-text small ml-2">
                            الإجابة الأولى
                          </label>
                        </div>
                        <div className="box-layout h-40 d-flex align-items-center pr-2 pl-2 mb-2">
                          <input
                            type="radio"
                            className="small dark-silver-text light-font-text d-flex align-items-center"
                          />
                          <label className="mb-0 dark-silver-text small ml-2">
                            الإجابة الأولى
                          </label>
                        </div>
                        <div className="box-layout h-40 d-flex align-items-center pr-2 pl-2 mb-2">
                          <input
                            type="radio"
                            className="small dark-silver-text light-font-text d-flex align-items-center"
                          />
                          <label className="mb-0 dark-silver-text small ml-2">
                            الإجابة الأولى
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-1" />
                  <div className="col-4 d-flex align-items-center">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/graph.png"}
                      className="contain-img w-100"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 d-flex align-items-center justify-content-center">
                <button className="btn light-outline-btn w-20">
                  ارسال الاجابة
                </button>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
