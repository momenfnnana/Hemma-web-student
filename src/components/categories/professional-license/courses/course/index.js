import React, { useEffect, useState } from "react";
import ChooseOptions, { courseTypeKey, lvlKey, specKey } from "./choose-options";
import PickTrainer from "./choose-trainer";
import KnowMore from "./video-content/index";
import "./index.scss";
import PickTrainerList from "./pick-trainer-list";
import CourseTabPicker from "./course-picker";
import { courseTabs } from "./course-tabs";
import Axios from "axios";
import { EMPTY_ID } from "./choose-options/data/options";
import { CourseDescribtion } from "./describtion";

const moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

export default function ProfessionalCourse({
  price = "2000 ريال",
  title = "دورات الرخصة المهنية",
  subTitle = 'للتخصصات',
  general= '',
  hasPickTrainer = true,
  hasChooseOptions = true,
  categoryData,
  specialitiesState,
  url,
  triggerkeysCount = 4,
  onCourseSelect = () => {},
  showDescriptionAt,
  descriptionData,
  setSelectedGeneralCourse = () => {},
  onResponse = () => {},
  onJoin = () => {},
  onTrainerSelected = () => {},
  onClear = () => {},
  triggerReset = ()=>{}
}) {
  const [optionsData, setOptionsData] = useState({});
  const [courseData, setCourseData] = useState(null);
  const showCourseWrapperClass = courseData ? "" : "d-none";
  const statePriority = [lvlKey,courseTypeKey]
  const completeOptionsKeyLength = 3
  const completedOptionsLength = Object.values(optionsData || {}).filter(elem => !!elem)?.length
  //Start index here is 1 cuz we don't want to reset level cuz it's already dependent on specType => could lead to inifite loop
  const RESET_STATE_START_INDEX = 1
  const validKeys = Object.values(optionsData).filter(
    (value) => value !== EMPTY_ID && !!value
  );


  useEffect(()=>{
    if(completedOptionsLength === completeOptionsKeyLength) return
    triggerReset()
  },[completedOptionsLength])

  const handleChangePriority = (key)=>{
    const priority = statePriority.findIndex(stateProp => stateProp === key)
    let newStateProps = {}
    if(priority < RESET_STATE_START_INDEX){
      statePriority.forEach((prop,index) =>{
        if(index >= RESET_STATE_START_INDEX){
          newStateProps = {
            ...newStateProps,
            [prop] : null
          }
        }
      })
    }
    return newStateProps
  }

  const handleChange = (key, value) => {

    const priotiryStateModified = handleChangePriority(key)
    const newValeus = {
      ...optionsData,
      [key]: value,
      ...priotiryStateModified
    };
    setOptionsData(newValeus);
  };
  const handleCourseTabClick = (id) => handleChange(courseTypeKey, id);

  const getHijriDate = (date) => {
    var hijriDate = moment(date, "YYYY-MM-DD").format("iYYYY/iM/iD");
    return hijriDate;
  };

  const getCourseData = async (cb = ()=>{},parmas) => {
    setCourseData(null);
    const token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    const getCourseDataUrl = url;
    try {
      const { data } = await Axios.get(getCourseDataUrl, {
        headers,
        params: {
          ...optionsData,
          CategoryId: categoryData.id,
          ...parmas
        },
      });
      cb(data)
    } catch (error) {
      console.log({ error });
    }
  };

  const clearCourseData = () => setSelectedGeneralCourse(null);

  const updateCourseData = (data) =>{
      setCourseData(data.data);
      onResponse(data.data);
  }

  useEffect(() => {
    clearCourseData();
    if (validKeys?.length < triggerkeysCount) {
      setCourseData(null);
      onClear();
      return;
    }
    if (!optionsData?.CourseType) return;
    getCourseData(updateCourseData);
  }, [optionsData]);

  useEffect(() => {
    //if one course was retrieved it's dropdown should be hidden and the only value should be selected
    if (courseData?.length === 1)
    onCourseSelect(courseData[0])
    else
    onCourseSelect(null)
  }, [courseData?.length]);

  return (
    <div className="col-lg-4">
      <div className="card p-4 border-dashed  card-ele position-relative mb-6">
        <div className="card-img">
          <img
            src={
              descriptionData?.bannerUrl ||
              process.env.PUBLIC_URL + "/assets/images/course-placholder.png"
            }
            alt="Human"
          />
          <div class="img-tag">{descriptionData?.price || 0} ريال</div>
        </div>
        <div className="mt--50">
          <h5 className="h5 main-color mb-3 font-weight-bold text-center">
            {!descriptionData?.nameAr ?  title :  <span style={{color: "red"}}>{ descriptionData?.nameAr || subTitle}</span>}
          </h5>
          {hasChooseOptions && (
            <ChooseOptions
              onChange={handleChange}
              specialitiesState={specialitiesState}
              optionsData={optionsData}
            />
          )}
          <div className="d-flex align-items-center justify-content-between mb-3">
            {courseTabs.map((courseTab, index) => (
              <>
                <CourseTabPicker
                  id={courseTab.id}
                  selectedId={optionsData?.CourseType}
                  onClick={handleCourseTabClick}
                  title={courseTab?.title}
                  descriptionData={descriptionData}
                  points={courseTab.points}
                  checkCourseCondition={completedOptionsLength === triggerkeysCount - 1}
                  optionsData={optionsData}
                  getCourseData={getCourseData}
                  completedOptionsLength={completedOptionsLength}
                />
                {index !== courseTabs?.length && <span className="mx-1"></span>}
              </>
            ))}
          </div>
          <div className={showCourseWrapperClass}>
            <div className="courses-wrapper">
              <div
                id="full-licences-course-one"
                className="instructor-courses-one show"
              >
                {!!(courseData?.length) && (
                  <PickTrainer
                    onSelect={onCourseSelect}
                    trainers={courseData}
                    onTrainerSelected={onTrainerSelected}
                  />
                )}
                {descriptionData && (
                  <div className="d-flex flex-column justify-content-between">
                    <div>
                      <CourseDescribtion descriptionData={descriptionData} />
                      <div>
                        {courseData?.instructors?.map((instructor) => (
                          <div
                            className="d-flex justify-content-between"
                            onClick={() => onTrainerSelected(instructor)}
                          >
                            <div className="d-flex align-items-center sub-color mb-2">
                              <i className="far fa-user"></i>
                              <span className="ml-2">{instructor?.name}</span>
                            </div>
                            <a
                              className="d-block lighter-gray text-underline mb-2 link-hover cursor-pointer"
                              data-bs-toggle="modal"
                              data-bs-target="#coach-modal"
                            >
                              اعرف المزيد عن مدربك
                            </a>
                          </div>
                        ))}
                        <a
                          className="btn-card-normal w-auto headShake big-height linear-bg mt-4"
                          onClick={onJoin}
                        >
                          انضم للدورة
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
