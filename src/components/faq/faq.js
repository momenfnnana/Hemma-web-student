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
                          أكاديمية همة التعليمية ماذا تقدم؟
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
                          دورات تدريبة مكثفة، تساعدك على إجتياز الاختبارات
                          التالية :
                        </p>
                        <ul className="mb-1">
                          <li className="dark-silver-text small text-break">
                            الرخصة المهنية التعليمية
                          </li>
                          <li className="dark-silver-text small text-break">
                            القدرات العامة
                          </li>
                          <li className="dark-silver-text small text-break">
                            التحصيلي 
                          </li>
                          <li className="dark-silver-text small text-break">
                            القدره المعرفية
                          </li>
                          <li className="dark-silver-text small text-break">
                            قدرات الجامعيين
                          </li>
                        </ul>
                        <p className="dark-silver-text small text-break mb-0">
                          وكذلك نقدم دورات لإعداد معلمات التربية البدنية
                        </p>
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
                          كيف أشترك بالدورة؟
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
                          ما هي طريقة دوراتنا؟
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
                        <p className="dark-silver-text small text-break mb-0">
                          دوراتنا اونلاين تتابعها وأنت في بيتك عن الموقع
                          الالكتروني{" "}
                          <span className="en-text light-text mr-1" dir="ltr">
                            hemma.sa
                          </span>
                          ونقدم محاضرات بث مباشر يُحفظ في صفحتك لاحقا، او
                          متابعتها عن طريق المحاضرات المسجله ..{" "}
                        </p>
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
                          بماذا تتميز الدورات؟
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
                            مادة علمية مكثفة وشاملة للمعايير
                          </li>
                          <li className="dark-silver-text small text-break">
                            بث مباشر للمحاضرات{" "}
                          </li>
                          <li className="dark-silver-text small text-break">
                            حقيبة تعليمية شاملة{" "}
                          </li>
                          <li className="dark-silver-text small text-break">
                            اختبارات دورية
                          </li>
                          <li className="dark-silver-text small text-break">
                            مناقشات عامة بين المشتركين{" "}
                          </li>
                          <li className="dark-silver-text small text-break">
                            مناقشات مع المدرب{" "}
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
                          هل جميع الدورات بث مباشر؟{" "}
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
                          حسب الدورة المُسجل فيها، يوجد دورات بث مباشر وبعد البث
                          تنزل مسجلة في صفحتك، ودورات أخرى تُقدم فيها المحاضرات
                          مسجلة فقط، ودورات تُقدم بث مباشر فقط
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
                          هل يتوجب علي حضور البث المباشر؟{" "}
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
                        <p className="dark-silver-text small text-break mb-1">
                          1-في حاله كانت الدورة المشترك فيها تعتمد على البث
                          المباشر فقط ، فيجب عليك الحضور في الوقت المحدد للبث.
                        </p>
                        <p className="dark-silver-text small text-break mb-0">
                          2- في حاله كانت مشترك في دورة تحفظ فيها المحاضرات بعد
                          البث مسجلة فلا يتوجب حضورك ، ويمكنك مشاهدتها لاحقا.
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
                          كيف يمكنني الإنضمام للبث المباشر عن طريق جهاز الجوال
                          او الايباد؟{" "}
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
                          كيف يمكنني الإنضمام للبث المباشر عن طريق جهاز
                          االلابتوب؟
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
                          كيف يمكنني مشاهدة المحاضرات المسجلة؟
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
                        <p className="dark-silver-text small text-break mb-2">
                          إتبع الخطوات التالية :{" "}
                        </p>
                        <ul className="mb-1">
                          <li className="dark-silver-text small text-break">
                            سجل دخول في الموقع بإستخدام رقم جوالك وكلمة المرور{" "}
                          </li>
                          <li className="dark-silver-text small text-break">
                            ادخل أيقونة دوراتي 
                          </li>
                          <li className="dark-silver-text small text-break">
                            قم بإختيار دورتك
                          </li>
                          <li className="dark-silver-text small text-break">
                            سوف تظهر لك قائمة على يمين الشاشة، اختر أيقونة
                            المحاضرات المسجلة
                          </li>
                        </ul>
                        <p className="dark-silver-text small text-break mb-0">
                          ومشاهدة ممتعة 💓
                        </p>
                      </div>
                    </div>
                  </div>
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
                          هل يوجد كتاب أو ملزمة للدورة؟
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
                        <p className="dark-silver-text small text-break mb-0">
                          نعم، لكل دورة حقيبة علمية شاملة لمحتوى الدورة{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="faq" id="accordion">
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
                          اين أجد الملزمه الخاصه بالدورة ؟
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
                          الملزمة الإلكترونيه موجودة في ايقونة مرفقات الدورة
                          بصيغة pdf ، ويمكنك طباعتها .{" "}
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
                          اين أجد الإختبارات الإلكترونية وحلولها؟
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
                          في ايقونة الاختبارات الإلكترونية في صفحتك بالموقع،
                          ويمكن الاطلاع على حلول الأسئلة، بالضغط على ايقونة
                          طريقة الحل.{" "}
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
                          تجارب وآراء المشتركين اين اجدها؟
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
                          زر حسابنا على التويتر، نسعد بمرورك{" "}
                          <span className="en-text light-text" dir="ltr">
                            @hemmaEdu
                          </span>
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
                          كيف أدفع مبلغ الدورة؟
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
                        <p className="dark-silver-text small text-break mb-1">
                          يمكنك الدفع عن طريق التحويل لأحد حسابتنا البنكية .. او
                          الدفع عن طريقة بطاقة الفيزا، او الماستركارد أو مدى .
                        </p>
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
                          مدة تأكيد الإشتراك بالدورة ؟
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
                          يستغرق تأكيد إشتراكك بالدورة من 24-48 ساعة  {" "}
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
                          هل يتطلب مشاهدة البث والمحاضرات المسجلة شبكة انترنت
                          ممتازة؟  
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
                          نعم .. يتطلب مشاهدة المحاضرات اتصال انترنت سريع .. {" "}
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
                          هل يمكنني الانسحاب من الدورة؟ 
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
                          نعم يمكنك الانسحاب قبل توافر الملازم في حسابك، أما بعد
                          توافر الملزمة لا يمكن ذلك.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="faqHeading-18">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-18"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-18"
                        >
                          <span className="badge">18</span>
                          هل استطيع الاشتراك انا وصديقي او احد اقاربي في حساب
                          واحد؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-18"
                      className="collapse"
                      aria-labelledby="faqHeading-18"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p className="dark-silver-text small text-break mb-0">
                          لا، الدورة متاحة لمشترك واحد فقط
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="faqHeading-19">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-19"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-19"
                        >
                          <span className="badge">19</span>
                          هل يمكنني الدفع عن طريق الأقساط؟
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-19"
                      className="collapse"
                      aria-labelledby="faqHeading-19"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p className="dark-silver-text small text-break mb-0">
                          خدمة الدفع بالأقساط متاحة لبعض الدورات..
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="faqHeading-20">
                      <div className="mb-0">
                        <h5
                          className="faq-title dark-text mb-0 small"
                          data-toggle="collapse"
                          data-target="#faqCollapse-20"
                          data-aria-expanded="true"
                          data-aria-controls="faqCollapse-20"
                        >
                          <span className="badge">20</span>
                          إلى متى تبقى المحاضرات في حسابي؟{" "}
                        </h5>
                      </div>
                    </div>
                    <div
                      id="faqCollapse-20"
                      className="collapse"
                      aria-labelledby="faqHeading-20"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <p className="dark-silver-text small text-break mb-0">
                          محاضرات الدورة تبقى في حسابك حتى وقت الإختبار، ثم يتم
                          حذفها بشكل تلقائي ..{" "}
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
