import React, { Component } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemTitle
} from "react-accessible-accordion";
import "./style.sass";

export default class FAQ extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="pt-3 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h5 className="dark-text mt-3">الأسئلة المتكررة</h5>
              </div>
            </div>
            <div className="row py-5 faq-accordion">
              <div className="col-md-6">
                <Accordion>
                  <AccordionItem>
                    <AccordionItemTitle>
                      <div className="d-flex justify-content-between w-100">
                        <h6 className="dark-text mb-0 small">
                          كيف تكون طريقة الدورات؟
                        </h6>
                        <span className="fa fa-chevron-down dark-text" />
                      </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
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
                    </AccordionItemBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemTitle>
                      <div className="d-flex justify-content-between w-100">
                        <h6 className="dark-text mb-0 small">
                          هل يجب علي حضور البث المباشر؟
                        </h6>
                        <span className="fa fa-chevron-down dark-text" />
                      </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <p className="dark-silver-text small text-break">
                        لا، على حسب الدورة المسجل بعض الدورات فقط مباشر
                      </p>
                    </AccordionItemBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemTitle>
                      <div className="d-flex justify-content-between w-100">
                        <h6 className="dark-text mb-0 small">
                          كيف يمكنني الانضمام للبث المباشر؟
                        </h6>
                        <span className="fa fa-chevron-down dark-text" />
                      </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <p className="dark-silver-text small text-break">
                        ممكن نرفق صورة طريقة المشاهدة
                      </p>
                    </AccordionItemBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemTitle>
                      <div className="d-flex justify-content-between w-100">
                        <h6 className="dark-text mb-0 small">
                          كيف يمكنني مشاهدة المحاضرات المسجلة؟
                        </h6>
                        <span className="fa fa-chevron-down dark-text" />
                      </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
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
                          راح تظهرلك قائمة اختر أيقونة المحاضرات المسجلة ومشاهدة
                          ممتعة
                        </li>
                      </ul>
                    </AccordionItemBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemTitle>
                      <div className="d-flex justify-content-between w-100">
                        <h6 className="dark-text mb-0 small">
                          هل يوجد كتاب أو مرجع للدورة؟
                        </h6>
                        <span className="fa fa-chevron-down dark-text" />
                      </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <p className="dark-silver-text small text-break">
                        ايوه بالتأكيد ومرجعك شامل سيكون
                      </p>
                    </AccordionItemBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemTitle>
                      <div className="d-flex justify-content-between w-100">
                        <h6 className="dark-text mb-0 small">
                          متى تبدأ الدورة؟
                        </h6>
                        <span className="fa fa-chevron-down dark-text" />
                      </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <p className="dark-silver-text small text-break">
                        لكل دورة موعد مختلف ,تواصل مع الدعم الفني لمعرفة
                        المواعيد أو اشترك بالنشرة البريدية، نسعد بخدمتك
                      </p>
                    </AccordionItemBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemTitle>
                      <div className="d-flex justify-content-between w-100">
                        <h6 className="dark-text mb-0 small">مدة الدورة؟ </h6>
                        <span className="fa fa-chevron-down dark-text" />
                      </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <p className="dark-silver-text small text-break">
                        المدة الزمنية مختلفة بين كل دورة وأخرى.
                      </p>
                    </AccordionItemBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemTitle>
                      <div className="d-flex justify-content-between w-100">
                        <h6 className="dark-text mb-0 small">
                          تجارب وآراء المشتركين وين القاها؟
                        </h6>
                        <span className="fa fa-chevron-down dark-text" />
                      </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <p className="dark-silver-text small text-break">
                        زر حسابنا على التويتر، نسعد بمرورك{" "}
                        <span className="en-text">@hemmaEdu</span>
                      </p>
                    </AccordionItemBody>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="col-md-6">
                <Accordion>
                  <AccordionItem>
                    <AccordionItemTitle>
                      <div className="d-flex justify-content-between w-100">
                        <h6 className="dark-text mb-0 small">رقم الحساب؟ </h6>
                        <span className="fa fa-chevron-down dark-text" />
                      </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <p className="dark-silver-text small text-break">
                        نرفق صورة رقم الحسابات
                      </p>
                    </AccordionItemBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemTitle>
                      <div className="d-flex justify-content-between w-100">
                        <h6 className="dark-text mb-0 small">
                          مدة تأكيد الطلب؟
                        </h6>
                        <span className="fa fa-chevron-down dark-text" />
                      </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <p className="dark-silver-text small text-break">
                        من ٢٤-٤٨ ساعة
                      </p>
                    </AccordionItemBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemTitle>
                      <div className="d-flex justify-content-between w-100">
                        <h6 className="dark-text mb-0 small">
                          هل يتطلب الاتصال نت ممتاز؟
                        </h6>
                        <span className="fa fa-chevron-down dark-text" />
                      </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <p className="dark-silver-text small text-break">
                        ايوه ضروري يكون اتصالك ممتاز
                      </p>
                    </AccordionItemBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemTitle>
                      <div className="d-flex justify-content-between w-100">
                        <h6 className="dark-text mb-0 small">
                          هل يمكنني الانسحاب من الدورة؟
                        </h6>
                        <span className="fa fa-chevron-down dark-text" />
                      </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <p className="dark-silver-text small text-break">
                        لا، بعد ما يتم تأكيد طلبك لا مجال للانسحاب مهما كان
                        العذر.
                      </p>
                    </AccordionItemBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemTitle>
                      <div className="d-flex justify-content-between w-100">
                        <h6 className="dark-text mb-0 small">
                          اقدر اشترك مع اخوي او اي شخص اخر بالحساب؟
                        </h6>
                        <span className="fa fa-chevron-down dark-text" />
                      </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <p className="dark-silver-text small text-break">
                        لا الحساب حق لمشترك واحد
                      </p>
                    </AccordionItemBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemTitle>
                      <div className="d-flex justify-content-between w-100">
                        <h6 className="dark-text mb-0 small">
                          هل يمكنني التقسيط؟
                        </h6>
                        <span className="fa fa-chevron-down dark-text" />
                      </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <p className="dark-silver-text small text-break">
                        بعض الدورات متاح فيها امكانية التقسيط
                      </p>
                    </AccordionItemBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemTitle>
                      <div className="d-flex justify-content-between w-100">
                        <h6 className="dark-text mb-0 small">
                          هل تبقى المحاضرات بعد نهاية المدة؟
                        </h6>
                        <span className="fa fa-chevron-down dark-text" />
                      </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <p className="dark-silver-text small text-break">
                        لا تكون مفعلة فقط خلال مدة الاشتراك
                      </p>
                    </AccordionItemBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemTitle>
                      <div className="d-flex justify-content-between w-100">
                        <h6 className="dark-text mb-0 small">
                          هل يوجد كوبون خصم؟
                        </h6>
                        <span className="fa fa-chevron-down dark-text" />
                      </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <p className="dark-silver-text small text-break">
                        نعتذر منك لا يوجد كوبونات حالية
                      </p>
                    </AccordionItemBody>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
