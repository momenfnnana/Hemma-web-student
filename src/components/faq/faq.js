import React, { Component } from "react";
import "./style.sass";

export default class FAQ extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="faq-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="faq-title text-center">
                  <h5 className="dark-text mt-3">الأسئلة المتكررة</h5>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="faq" id="accordion">
                  <div className="card">
                    <div className="card-header" id="faqHeading-1">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-1"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-1"
                        >
                          <span className="badge">1</span>
                          كيف تكون طريقة الدورات؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-1"
                      className="collapse"
                      aria-labelledby="faqHeading-1"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p className="dark-silver-text small text-break mb-2">
                          من مميزات دوراتنا واللي نقدمها لمشتركينا
                        </p>
                        <ul className="mb-0">
                          <li className="dark-silver-text small text-break">
                            البث المباشر والتدريب المكثف
                          </li>
                          <li className="dark-silver-text small text-break">
                            ملزمة شاملة{" "}
                          </li>
                          <li className="dark-silver-text small text-break">
                            اختبارات دورية
                          </li>
                          <li className="dark-silver-text small text-break">
                            مناقشات ودردشة جماعية مع زملائك
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="faqHeading-2">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-2"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-2"
                        >
                          <span className="badge">2</span>
                          هل يجب علي حضور البث المباشر؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-2"
                      className="collapse"
                      aria-labelledby="faqHeading-2"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p className="dark-silver-text small text-break mb-0">
                          لا، على حسب الدورة المسجل بعض الدورات فقط مباشر
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="faqHeading-3">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-3"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-3"
                        >
                          <span className="badge">3</span>
                          كيف يمكنني الانضمام للبث المباشر؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-3"
                      className="collapse"
                      aria-labelledby="faqHeading-3"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12">
                            <p className="dark-silver-text small text-break mb-0">
                              عن طريق اللابتوب:
                            </p>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/faq/laptop.png"
                              }
                              className="contain-img"
                              width="100%"
                              alt="faq"
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-md-12">
                            <p className="dark-silver-text small text-break mb-0">
                              عن طريق الجوال:
                            </p>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/faq/mobile.png"
                              }
                              className="contain-img"
                              width="100%"
                              alt="faq"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="faqHeading-4">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-4"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-4"
                        >
                          <span className="badge">4</span>
                          كيف يمكنني مشاهدة المحاضرات المسجلة؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-4"
                      className="collapse"
                      aria-labelledby="faqHeading-4"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <ul className="mb-0">
                          <li className="dark-silver-text small text-break">
                            سجل دخول في الموقع ب رقم جوالك وكلمة السر
                          </li>
                          <li className="dark-silver-text small text-break">
                            ادخل أيقونة دوراتي
                          </li>
                          <li className="dark-silver-text small text-break">
                            قم باختيار دورتك
                          </li>
                          <li className="dark-silver-text small text-break">
                            راح تظهرلك قائمة اختر أيقونة المحاضرات المسجلة
                            ومشاهدة ممتعة
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="faqHeading-5">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-5"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-5"
                        >
                          <span className="badge">5</span>
                          هل يوجد كتاب أو مرجع للدورة؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-5"
                      className="collapse"
                      aria-labelledby="faqHeading-5"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p className="dark-silver-text small text-break mb-0">
                          نعم، بالتأكيد ومرجعك شامل سيكون
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="faqHeading-6">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-6"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-6"
                        >
                          <span className="badge">6</span>
                          متى تبدأ الدورة؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-6"
                      className="collapse"
                      aria-labelledby="faqHeading-6"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p className="dark-silver-text small text-break mb-0">
                          لكل دورة موعد مختلف ,تواصل مع الدعم الفني لمعرفة
                          المواعيد أو اشترك بالنشرة البريدية، نسعد بخدمتك
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="faqHeading-7">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-7"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-7"
                        >
                          <span className="badge">7</span>
                          كم مدة الدورة؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-7"
                      className="collapse"
                      aria-labelledby="faqHeading-7"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p className="dark-silver-text small text-break mb-0">
                          المدة الزمنية مختلفة بين كل دورة وأخرى
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="faqHeading-8">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-8"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-8"
                        >
                          <span className="badge">8</span>
                          تجارب وآراء المشتركين وين القاها؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-8"
                      className="collapse"
                      aria-labelledby="faqHeading-8"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p className="dark-silver-text small text-break mb-0">
                          زر حسابنا على التويتر، نسعد بمرورك{" "}
                          <span className="en-text light-text" dir="ltr">
                            @hemmaEdu
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="faqHeading-9">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-9"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-9"
                        >
                          <span className="badge">9</span>
                          كيف أسجل بالدورة؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-9"
                      className="collapse"
                      aria-labelledby="faqHeading-9"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/faq/subscribe.png"
                          }
                          className="contain-img"
                          width="100%"
                          alt="faq"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="faq" id="accordion">
                  <div className="card">
                    <div className="card-header" id="faqHeading-10">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-10"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-10"
                        >
                          <span className="badge">10</span>
                          ما هو رقم الحساب البنكي؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-10"
                      className="collapse"
                      aria-labelledby="faqHeading-10"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/faq/banks.png"
                          }
                          className="contain-img"
                          width="100%"
                          alt="faq"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="faqHeading-11">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-11"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-11"
                        >
                          <span className="badge">11</span>
                          مدة تأكيد الطلب؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-11"
                      className="collapse"
                      aria-labelledby="faqHeading-11"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p className="dark-silver-text small text-break mb-0">
                          من ٢٤-٤٨ ساعة
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="faqHeading-12">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-12"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-12"
                        >
                          <span className="badge">12</span>
                          هل يتطلب الاتصال شبكة إنترنت ممتازة؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-12"
                      className="collapse"
                      aria-labelledby="faqHeading-12"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p className="dark-silver-text small text-break mb-0">
                          نعم، ضروري يكون اتصالك ممتاز
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="faqHeading-13">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-13"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-13"
                        >
                          <span className="badge">13</span>
                          هل يمكنني الانسحاب من الدورة؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-13"
                      className="collapse"
                      aria-labelledby="faqHeading-13"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p className="dark-silver-text small text-break mb-0">
                          لا، بعد ما يتم تأكيد طلبك لا مجال للانسحاب مهما كان
                          العذر
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="faqHeading-14">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-14"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-14"
                        >
                          <span className="badge">14</span>
                          اقدر اشترك مع أخوي أو أي شخص آخر بالحساب؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-14"
                      className="collapse"
                      aria-labelledby="faqHeading-14"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p className="dark-silver-text small text-break mb-0">
                          لا، الحساب حق لمشترك واحد
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="faqHeading-15">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-15"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-15"
                        >
                          <span className="badge">15</span>
                          هل يمكنني التقسيط؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-15"
                      className="collapse"
                      aria-labelledby="faqHeading-15"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p className="dark-silver-text small text-break mb-0">
                          بعض الدورات متاح فيها إمكانية التقسيط
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="faqHeading-16">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-16"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-16"
                        >
                          <span className="badge">16</span>
                          هل تبقى المحاضرات بعد نهاية المدة؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-16"
                      className="collapse"
                      aria-labelledby="faqHeading-16"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p className="dark-silver-text small text-break mb-0">
                          لا تكون مفعلة فقط خلال مدة الاشتراك
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="faqHeading-17">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-17"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-17"
                        >
                          <span className="badge">17</span>
                          هل يوجد كوبون خصم؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-17"
                      className="collapse"
                      aria-labelledby="faqHeading-17"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p className="dark-silver-text small text-break mb-0">
                          لا يوجد كوبونات حالية، يتم الإعلان عنها فور توفرها
                        </p>
                      </div>
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
