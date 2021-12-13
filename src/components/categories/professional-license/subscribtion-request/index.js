import React from "react";
import Loader from "react-loaders";
import CourseOverview from "./course-elem-display";
import "./index.scss";

export default function SubscribtionRequest({
  info,
  mergedData,
  onGeneralDelete = () => {},
  onSpecDelete = () => {},
  refreshShow = () => {},
  localTotal = 0,
  onSubscribe = () => true,
  showDescription=false,
  LoadingSubScribtion=false
}) {
  const { data, error } = info;
  const validPackageData = !error && data;
  return (
    <div class="col-lg-4 subscription-wrapper" id="subscription-wrapper">
      <div
        class="card white-bg p-4 card-ele position-relative with-bg-img"
        style={{
          background: `url(${process.env.PUBLIC_URL +
            "/assets/images/human.svg"}) no-repeat scroll center padding-box`,
        }}
      >
        <h4 class="card-title h4  mb-4 font-weight-bold text-center line-height-1-9">
          هل ترغب في الاشتراك <br /> في الدورة المحددة؟
        </h4>
        <>
          <CourseOverview
            mergedData={mergedData}
            valueKey="spec"
            onDelete={onSpecDelete}
          />
          <CourseOverview
            mergedData={mergedData}
            valueKey="general"
            onDelete={onGeneralDelete}
          />
        </>
        <div class="d-flex flex-column justify-content-between">
          <div class="mb-5 ">
            <p class="font-size-15 font-weight-bold mb-4 text-center text-white">
              {data?.description ||(showDescription &&
                "يمكنك أيضا اختيار دورة إضافيـــــــة بجانب الدورة الحالية لتحصل على نسبة خصـــــم باقة الاشتراك لدورتي التخصص والعــام")}
            </p>
            {error && !data && (
              <div className="w-100 text-center bg-danger btn-card-normal big-height mb-4">
                <span className="text-white">{error}</span>
              </div>
            )}
            {
              <>
                <div class="d-flex align-items-center justify-content-between flex-column-small font-size-14 mb-2 font-weight-bold">
                  <div class="text-white mr-4 mr-sm-0">
                    إجمالي القيمة الأساسية
                  </div>
                  <div class="text-white">{localTotal} ريال</div>
                </div>
                {data?.discount && (
                  <div class="d-flex align-items-center justify-content-between flex-column-small font-size-14 mb-2 font-weight-bold">
                    <div class="text-white  mr-4 mr-sm-0">نسبة الخصم </div>
                    <div class="text-white ">{data?.discount} ريال</div>
                  </div>
                )}
                <hr />
                <div class="d-flex align-items-center justify-content-between flex-column-small font-size-14 mb-2 font-weight-bold">
                  <div class="text-white  mr-4 mr-sm-0">
                    اجمالى قيمه الاشتراك
                  </div>
                  <div class="text-white ">
                    {data?.priceAfterDisscount || localTotal} ريال
                  </div>
                </div>
              </>
            }
          </div>
          <div class="d-flex align-items-center justify-content-center">
            {LoadingSubScribtion?
            (
                <div class="btn-card-normal headShake big-height light-sub-bgcolor m-0 flex-root">
                  <Loader type="ball-clip-rotate" />
                </div>
              ):(
                <a
                  class="btn-card-normal headShake big-height light-sub-bgcolor m-0 flex-root"
                  onClick={!LoadingSubScribtion?onSubscribe:()=>true}
                >
                  الاشتراك
                </a>
              )
            }
            <span class="mx-1"></span>
            <a
              class="btn-card-normal headShake big-height m-0 flex-root"
              onClick={refreshShow}
            >
              الغاء الاختيار
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
