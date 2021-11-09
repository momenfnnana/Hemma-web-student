import React from "react";

import Star from "./components/star";
import "./index.scss";

const bands = [
  {
    typeTitle: "المدرب",
    items: [
      {
        id: 1,
        title: "التزام المدرب بالحضور في مواعيده المحددة",
        rate: 1,
      },
      {
        id: 2,
        title: "عرض المدرب المادة التدريبية وقدمها بصورة جيدة",
        rate: 4,
      },
      {
        id: 3,
        title: "انعكست خبرة المدرب على أدائه",
        rate: 3,
      },
      {
        id: 4,
        title: "استخدم المدرب أساليب تدريبية متنوعة بمهارة",
        rate: 4,
      },
      {
        id: 5,
        title: "سيطرة المدرب جيدا على سير العملية التدريبية",
        rate: 5,
      },
      {
        id: 6,
        title: "يتقبل المدرب الاقتراحات والنقد",
        rate: 5,
      },
    ],
  },
  {
    typeTitle: "المحتوى التدريبي",
    items: [
      {
        id: 1,
        title: "كانت المادة التدريبية واضحة ومفهومة",
        rate: 1,
      },
      {
        id: 2,
        title: "غطت المادة التدريبية موضوعات الدورة",
        rate: 4,
      },
      {
        id: 3,
        title: "محتويات الدورة منظمة ومترابطة وغير متكررة",
        rate: 3,
      },
    ],
  },
  {
    typeTitle: "التقييم العام",
    items: [
      {
        id: 1,
        title: "حقت الدورة توقعاتي منها",
        rate: 1,
      },
      {
        id: 2,
        title: "سألتحق بدورات في نفس المجال في المستقبل",
        rate: 4,
      },
      {
        id: 3,
        title: "بشكل عام يمكن القول ان الدورة كانت ناجحة",
        rate: 3,
      },
    ],
  },
];

const Header = () => (
  <div className="container-fluid">
    <div className="row border d-flex justify-content-between header-container align-items-center">
      <div className="col-3 border-right title-container d-flex justify-content-center align-items-center">
        <h5 className="header-title">مجال التقييم</h5>
      </div>
      <div className="col-6 border-right title-container d-flex align-items-center">
        <h5 className="header-title">البند</h5>
      </div>
      <div className="col-3 title-container d-flex align-items-center">
        <h5 className="header-title">التقييم</h5>
      </div>
    </div>
  </div>
);

const TableBody = () => {
  return (
    <div className="container-fluid">
      {bands.map((item, fatherIndex) => (
        <div className="row border border-info table-container">
          <div className="col-3 border-right table-title-container d-flex justify-content-center align-items-center">
            <h5 className="table-line-title">{item.typeTitle}</h5>
          </div>
          <div className="col-6 border-right table-title-container p-0">
            {item.items.map((item, index) => (
              <div
                className={
                  item.items?.length === index + 1
                    ? "rate-item px-3 py-3"
                    : "rate-item border-bottom px-3 py-3"
                }
              >
                {item?.title}
              </div>
            ))}
          </div>
          <div className="col-3 px-0 py-0">
            {item.items.map((item, index) => {
              return <Star item={item} index={index} />;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const Evaluation = () => {
  return (
    <div>
      <h4>تقييمات الدورة</h4>
      <Header />
      <TableBody />
    </div>
  );
};

export default Evaluation;
