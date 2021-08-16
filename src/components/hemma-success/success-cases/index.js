import Axios from "axios";
import React, { useEffect, useState } from "react";
import { successUrl } from "../../../api/urls";
import { useFetch } from "../../../hooks/useFetch";
import { SuccessCard } from "./success-card";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";

import "./index.scss";
import { Carousel } from "./../../../shared-components/carsoul/index";
const CardReducer = (card) => {
  switch (card.source) {
    case "Media":
      return <div>med9a</div>;
      break;
    case "Rating":
      break;

    default:
      break;
  }
};

const enabledCarsoulOptions = {
  type: "carousel",
  startAt: 1,
  perView: 3,
  focusAt: "center",
  gap: 20,
  autoplay: 4000,
  // animationTimingFunc: 'ease-in-out',
  animationDuration: 800,
  // peek: {
  //   before: 100,
  //   after: 100
  // },
  hoverpause: false,
  keyboard: true,
  direction: "rtl",
  breakpoints: {
    1200: { perView: 3 },
    992: { perView: 2 },
    768: { perView: 1 },
  },
};

const SuccessElem = ({ suc, index, id, style }) => (
  <>
    <div id={id} className="sider-items  min-height-150 flex-1" style={style}>
      <div className="quote-icon">
        <i className="fas fa-quote-left"></i>
      </div>
      <h4 className="color-danger wrapped-text">{suc.courseName}</h4>
      {suc.source == "Media" ? (
        <>
          <a href={suc?.url}>
            <img src={suc?.img} className="w-100 h-auto" />
          </a>
        </>
      ) : (
        <>
          <div className="card-body px-2 py-2">
            <p className="d-flex align-items-center light-gray mb-1 font-size-13">
              <span className="d-block main-color-light mr-2">
                اسم الطالب :{" "}
              </span>
              {suc?.rating?.studentName}
            </p>
            <p className="light-gray font-size-13 m-0">
              <span className="main-color-light">التقييم : </span>
              {suc?.rating?.feedBack}
            </p>
          </div>
        </>
      )}
    </div>
  </>
);

export default function SuccessCases() {
  const [page, setPage] = useState(1);
  const [getCasesTest, casesResponse] = useFetch(successUrl(), {
    method: "GET",
  });
  const [allCases, setCases] = useState([]);
  const [noMore, setNoMore] = useState(false);
  const [maxCount, setMaxCount] = useState();
  const [activeted, setActiveted] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const getNaxtPage = () => setPage(page + 1);

  const handleCaseRequestSuccess = (response) => {
    const cases = response?.data?.data;
    debugger
    if (response.data.itemCount >= allCases.length) {
      setNoMore(true);
    } else {
      setNoMore(false);
    }
    setCases([...allCases, ...cases]);
  };
  useEffect(() => {
    if (page <= 1) return;
    getCasesTest({ url: successUrl(9, page) }, handleCaseRequestSuccess);
  }, [page]);

  useEffect(() => {}, [allCases]);

  useEffect(() => {
    getCasesTest({ url: successUrl(9, page) }, handleCaseRequestSuccess);
  }, []);

  const [, setDiffTimes] = useState(0);
  const findMax = () => {
    let _max = 0;
    allCases.forEach(({ id }) => {
      const elemNode = document.getElementById(id);
      if (elemNode?.offsetHeight > maxHeight) _max = elemNode?.offsetHeight;
    });
    if (_max > maxHeight) {
      setDiffTimes((c) => c + 1);
      setMaxHeight(_max);
    }
  };

  useEffect(() => {
    if (allCases.length && activeted)
      setTimeout(() => {
        findMax();
      }, 1000);
  });

  useEffect(() => {
    let glide = new Glide(".glide",enabledCarsoulOptions)
    if (!allCases.length) return;
     setPage((c) => c + 1);
    if (!allCases.length || activeted) return;
    setActiveted(true);
    glide.destroy()
    setTimeout(() => {
      glide.mount()
    }, 500);
  }, [allCases?.length]);

  return (
    <div className="container-fluid py-5">
      <div className="d-flex mx-auto">
        <div class="glide">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              {/* test */}
              {/* {[1,2,3]?.map(_case => <SuccessElem suc={_case} />)} */}
              {allCases.map((_case) => (
                <li
                  className="glide__slide"

                  // style={{minHeight:`${maxHeight}px !important`}}
                >
                  <SuccessElem
                    suc={_case}
                    id={_case?.id}
                    // style={{minHeight:`${maxHeight}px`}}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* <div className="d-flex justify-content-center mt-5">
        {noMore && (
          <button
            className="btn dark-btn unset-height unset-line-height br-5 w-20 m-auto"
            onClick={getNaxtPage}
          >
            عرض المزيد
          </button>
        )}
      </div> */}
    </div>
  );
}
