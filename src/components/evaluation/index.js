import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { reduxForm } from "redux-form";
import Axios from "axios";
import swal from "@sweetalert/with-react";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";

import { apiBaseUrl } from "../../api/helpers";
import { useFetch } from "../../hooks/useFetch";

import { Star } from "./components/star";
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
    <div className="row border header-container">
      <div className="col-3 border-right title-container d-flex justify-content-center align-items-center">
        <p className="header-title">مجال التقييم</p>
      </div>
      <div className="col-6 border-right title-container d-flex align-items-center">
        <p className="header-title">البند</p>
      </div>
      <div className="col-3 title-container d-flex align-items-center">
        <p className="header-title">التقييم</p>
      </div>
    </div>
  </div>
);

const TableBody = ({ courseId, savedRates }) => {
  const url = `${apiBaseUrl}/Ratings/GetRatingQuestion`;
  const [getQuestions, questions, loading] = useFetch(url);

  useEffect(() => {
    getQuestions();
  }, []);
  if (loading) {
    return (
      <div className="align-items-center d-flex justify-content-center loader-container">
        <Loader
          type="ball-spin-fade-loader"
          className="dark-loader mx-auto w-10"
        />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {bands.map((fatherItem, fatherIndex) => (
        <div className="row border border-info table-container">
          <div className="col-3 border-right table-title-container d-flex justify-content-center align-items-center">
            <p className="table-line-title">{fatherItem.typeTitle}</p>
          </div>
          <div className="col-6 border-right table-title-container p-0">
            {questions?.data.map((item, index) => (
              <>
                {item?.ratingArea === fatherItem?.typeTitle && (
                  <div
                    className={
                      item.items?.length === index + 1
                        ? "rate-item px-3 py-0 py-lg-3 d-flex align-items-center"
                        : "rate-item border-bottom px-3 py-0 py-lg-3 d-flex align-items-center"
                    }
                  >
                    {item?.ratingQuestion}
                  </div>
                )}
              </>
            ))}
          </div>
          <div className="col-3 p-0">
            {questions?.data.map((item, index) => {
              return (
                item?.ratingArea === fatherItem?.typeTitle && (
                  <Star
                    item={item}
                    index={index}
                    courseId={courseId}
                    savedRates={savedRates}
                  />
                )
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const EvaluationComponent = (props) => {
  const courseId = props?.location?.pathname.split("/")[3];
  let token = localStorage.getItem("token");
  let headers = {
    Authorization: `Bearer ${token}`,
  };
  const rateValue = props?.rateValue?.subscription?.rateValue;
  const [ratesAnswers, setRatesAnswers] = useState({
    courseId,
    ratingQuesionAnswer: [],
  });
  const [savedRates, setSavedRates] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (Object.keys(rateValue || {})?.length) {
      const findedRate = ratesAnswers?.ratingQuesionAnswer?.find(
        (item) => item?.ratingQuesionId === rateValue?.ratingQuesionId
      );
      if (findedRate === undefined) {
        setRatesAnswers({
          ...ratesAnswers,
          ratingQuesionAnswer: [
            ...ratesAnswers?.ratingQuesionAnswer,
            rateValue,
          ],
        });
      } else {
        const newArr = ratesAnswers?.ratingQuesionAnswer?.filter(
          (element) => element?.ratingQuesionId !== rateValue?.ratingQuesionId
        );
        setRatesAnswers({
          ...ratesAnswers,
          ratingQuesionAnswer: [...newArr, rateValue],
        });
      }
    }
  }, [rateValue]);

  useEffect(() => {
    (async () => {
      Axios({
        method: "get",
        url: `${apiBaseUrl}/Ratings/GetCourseRating?courseId=${courseId}`,
        headers,
      })
        .then((res) => setSavedRates(res?.data?.data))
        .catch((error) => console.log({ error }));
    })();
  }, [courseId, reload]);

  const sendAnswers = () => {
    Axios({
      method: "post",
      url: `${apiBaseUrl}/Ratings/AddRatingAnswer`,
      headers,
      data: ratesAnswers,
    })
      .then((res) => {
        setReload((prevState) => !prevState);
        swal("تنبيه", "تم اعتماد التقييم بنجاح", "success", {
          button: "متابعة",
        });
      })
      .catch((error) => console.log({ error }));
  };
  return (
    <div>
      <p className="my-3 my-lg-0 mb-0 mb-lg-3 rate-title">تقييمات الدورة</p>
      <Header />
      <TableBody courseId={courseId} savedRates={savedRates} />
      <div
        className="rate-course-btn d-flex justify-content-center align-items-center my-4"
        onClick={() => sendAnswers()}
      >
        <h4 className="rate-course-btn-text">حفظ التقييم</h4>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    rateValue: state,
  };
}

const actionCreators = {};

export const Evaluation = connect(
  mapStateToProps,
  actionCreators
)(
  reduxForm({
    form: "subscription",
    destroyOnUnmount: false,
  })(withRouter(EvaluationComponent))
);
