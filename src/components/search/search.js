import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "@sweetalert/with-react";
import { FaGraduationCap } from "react-icons/fa";
import { Helmet } from "react-helmet";
import Loader from "react-loaders";

import { apiBaseUrl } from "../../api/helpers";
import { Card } from "../shared/card/card";
import { getQuery } from "../../utils/query-params";
import ProfessionalLicense, {
  ProfessionalLicenseText,
} from "../categories/professional-license";
import { SubCategories } from "../categories/subCategories/index";
import NavTab from "../categories/tab-link";
import ShowAt from "../../HOC/show-at";
import { Api } from "../../api";

const hasFreeFlag = getQuery("free");
var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

const freeMeetingsText = "اللقاءات المجانية";
const platformCoursesTab = "tab-two";
const staticTabs = [
  platformCoursesTab,
  "tab-three",
  ProfessionalLicenseText,
  "tab-four",
  freeMeetingsText,
];
const Search = (props) => {
  const page = 1,
    limit = 6,
    endOfResults = false,
    SuccesesLimt = 12,
    Succesespage = 1;
  const { params } = props.match;
  const { location } = props.history;
  console.log({ params });
  const [state, setState] = useState({
    successes: [],
    details: [],
    page: 0,
    subcategoriesdetails: [],
    lectures: [],
    hiddenTabs: [],
    content: [],
    publications: [],
    courses: [],
    competitions: [],
    categoryGroups: [],
    hasProfessionalLicense: false,
    selectedPublicationId: null,
    modalIsOpen: false,
    hideBtn: false,
    showgroupedPackagesBtn: true,
    hideBtnSuccess: false,
    loading: false,
    disabled: false,
    hasNoPlatformCourses: false,
    active: "",
    defultActive: "show active",
    coursesShimmerLoader: true,
    lecturesShimmerLoader: true,
    categoryGroupsShimmerLoader: true,
    competitionsShimmerLoader: true,
    publicationsShimmerLoader: true,
    currentTab: null,
    nextPageUrl: `${apiBaseUrl}/categories/${params.slug}/courses?Page=${page}&Limit=${limit}&featuredOnly=true`,
  });

  const openModal = (id) => {
    setState({ ...state, modalIsOpen: true, selectedPublicationId: id });
  };

  const closeModal = () => {
    setState({ ...state, modalIsOpen: false });
  };

  const intiReq = () => {
    const url = `${apiBaseUrl}/categories/${
      params.slug
    }/courses?Page=${1}&Limit=${limit}&featuredOnly=true`;
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    const { subcategoriesdetails, hasProfessionalLicense } = state;
    axios.get(url, { headers }).then((response) => {
      const courses = response.data.data.data;
      setState({
        ...state,
        courses,
        hasNoPlatformCourses: !courses?.length,
        loading: false,
        disabled: false,
      });
      if (!hasFreeFlag && !!courses?.length && !hasProfessionalLicense)
        changeTab("tab-two");
    });
  };

  const loadMore = async () => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    setState({ ...state, loading: true, disabled: true });
    if (!endOfResults) {
      const { page: prevPage } = state;
      const nextUrl = `${apiBaseUrl}/categories/${state.currentSlug ||
        params.slug}/courses?Page=${prevPage +
        1}&Limit=${limit}&featuredOnly=true`;
      axios
        .get(nextUrl, { headers })
        .then((response) => {
          setState({ ...state, loading: false, disabled: false });
          const newCourses = [...state.courses, ...response.data.data.data];
          endOfResults = response.data.data.itemCount < limit;
          page++;
          const noMoreCourses =
            newCourses.length === response.data.data.itemCount;
          setState({
            ...state,
            courses: newCourses,
            coursesShimmerLoader: false,
            hasNocourses: !!!newCourses?.length,
            page: this.state.page + 1,
            noMoreCourses,
          });
          if (newCourses.length == response.data.data.itemCount) {
            setState({ ...state, hideBtn: true });
          }
        })
        .catch((error) => {
          console.log(error);
          setState({ ...state, loading: false, disabled: false });
        })
        .finally(() => {});
    }
  };
  const moreSucces = async () => {
    setState({ ...state, loading: true });
    Succesespage++;
    axios
      .get(
        `${apiBaseUrl}/Success?CategoryId=${params.slug}&Limit=${SuccesesLimt}&Page=${Succesespage}`
      )
      .then((response) => {
        const newSuccess = [...state.successes, ...response.data.data.data];
        var more = false;
        if (
          response.data.itemCount >
          response.data.limit * response.data.page
        ) {
          more = true;
        }
        setState({ ...state, successes: newSuccess, hideBtnSuccess: more });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleHasProfessionalLicense = (hasProLicense) => {
    setState({ ...state, hasProfessionalLicense: hasProLicense });
  };

  const hasProfessionalLicense = (details) => {
    if (!details?.professionalLicense) return;
    const { professionalLicense } = details;
    return professionalLicense;
  };

  const handleNavFromFree = () => {
    if (hasFreeFlag === "true") {
      changeTab("tab-three");
    }
  };
  const handleNavForProLicense = () => {
    // this.simulateClick(ProfessionalLicenseText)
  };

  const changeTab = (tab) => {
    setState({ ...state, currentTab: tab, currentSlug: tab });
  };

  const resetToInintPageState = () => {
    setState({
      ...state,
      currentSlug: "tab-two",
      page: 1,
      noMoreCourses: false,
    });
  };

  const isStaticTab = (tab) => {
    return staticTabs.includes(tab) || tab === platformCoursesTab;
  };

  const hasSubcategoriesReq = (slug) => {
    return axios.get(`${apiBaseUrl}/categories/${slug}/SubCategories`);
  };

  const validateHasSubCategories = async (slug) => {
    try {
      const {
        data: {
          data: { childCatgories = [], courses },
        },
      } = await hasSubcategoriesReq(slug);
      const navigationType = childCatgories?.length
        ? "_blank"
        : courses?.length
        ? "direct"
        : null;
      return new Promise((res, rej) =>
        res({ childCatgories, navigationType, courses })
      );
    } catch (error) {}
  };

  const handleNoChildCategories = () => {
    throw new Error("انتهت الدورات الحالية نستأنف الدورات القادمة قريبًا");
  };

  const warningAlert = (msg) => {
    swal("عفواً", msg, "error", {
      button: "متابعة",
    });
  };

  const handleCategChange = async (categSlug) => {
    try {
      if (isStaticTab(categSlug)) return;
      const { navigationType, courses } = await validateHasSubCategories(
        categSlug
      );
      const url = `./${categSlug}`;
      // if (this.handleProfessionalCase({professionalLicense, groupedPackages, rest})) return
      if (!navigationType) handleNoChildCategories();
      if (navigationType === "_blank") window.open(url);
      else {
        setState({ ...state, courses, currentSlug: categSlug });
      }
    } catch (error) {
      error?.message && warningAlert(error?.message);
    }
  };

  const validateProLicenseNav = (Category) => {
    const { professionalLicense } = Category;
    if (professionalLicense) {
      changeTab(ProfessionalLicenseText);
      setState({
        proLicenseDetails: Category,
        hasNoPlatformCourses: true,
      });
    } else return true;
  };

  const handleClick = async (Category) => {
    if (!validateProLicenseNav(Category)) return;
    changeTab(Category?.slug);
  };

  const openFreeLecture = (lecture) => {
    let token = localStorage.getItem("token");
    if (token) {
      window.open(lecture.broadcastUrl, "_blank");
    } else {
      swal(
        "عفواً",
        "يجب عليك تسجيل الدخول/تسجيل حساب حتى تتمكن من القيام بهذه الخطوة",
        "error",
        {
          button: "متابعة",
        }
      );
    }
  };

  const simulateClick = (divId, event = "click") => {
    const element = document.getElementById(divId);
    const evObj = document.createEvent("Events");
    evObj.initEvent("click", true, false);
    try {
      element.dispatchEvent(evObj);
    } catch (error) {}
  };

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/categories/${params.slug}`)
      .then((response) => {
        const hasProLicense = hasProfessionalLicense(response.data.data);
        if (hasProLicense) handleNavForProLicense();
        setState(
          {
            ...state,
            details: response.data.data,
            hasProfessionalLicense: hasProLicense,
          },
          () => {
            handleHasProfessionalLicense(hasProLicense);
            axios
              .get(`${apiBaseUrl}/categories/${params.slug}/SubCategories`)
              .then((response) => {
                setState({
                  ...state,
                  subcategoriesdetails: response.data.data.childCatgories,
                });
                intiReq();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        );
        setState({
          ...state,
          showgroupedPackagesBtn: response.data.data.groupedPackages,
          currentTab: hasProLicense
            ? ProfessionalLicenseText
            : state.currentTab,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `${apiBaseUrl}/Success?CategoryId=${params.slug}&Limit=${SuccesesLimt}&Page=${Succesespage}`
      )
      .then((response) => {
        var more = false;
        if (
          response.data.data.itemCount >
          response.data.data.limit * response.data.data.page
        ) {
          more = true;
        }
        setState({
          ...state,
          successes: response.data.data.data,
          hideBtnSuccess: more,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    handleNavFromFree();

    axios
      .get(`${apiBaseUrl}/FreeLectures?categoryIdOrSlug=${params.slug}`)
      .then((response) => {
        setState({
          ...state,
          lectures: response.data.data,
          lecturesShimmerLoader: false,
        });
      })
      .catch((error) => {
        console.log(error);
        setState({ ...state, lecturesShimmerLoader: false });
      });

    axios
      .get(`${apiBaseUrl}/categories/${params.slug}/publications`)
      .then((response) => {
        setState({
          ...state,
          publications: response.data.data.data,
          publicationsShimmerLoader: false,
        });
      })
      .catch((error) => {
        console.log(error);
        setState({ ...state, publicationsShimmerLoader: false });
      });

    Api.categories
      .getCompetitions(params.slug)
      .then((response) => {
        setState({
          ...state,
          competitions: response,
          competitionsShimmerLoader: false,
        });
      })
      .catch((error) => {
        console.log(error);
        setState({ ...state, competitionsShimmerLoader: false });
      });

    //free groups
    axios
      .get(`${apiBaseUrl}/CategoryGroups?category=${params.slug}`)
      .then((response) => {
        setState({
          ...state,
          categoryGroups: response.data.data,
          categoryGroupsShimmerLoader: false,
        });
      })
      .catch((error) => {
        console.log(error);
        setState({ ...state, categoryGroupsShimmerLoader: false });
      });

    if (location.hash == "#tab-three") {
      setState({ ...state, active: "show active", defultActive: "" });
    }
  }, []);

  useEffect(() => {
    if (state.currentTab === "tab-two") {
      intiReq();
      resetToInintPageState();
    }
  }, [state.currentTab]);

  useEffect(() => {
    handleCategChange(state.currentSlug);
  }, [state.currentSlug]);

  useEffect(() => {
    if (
      state.subcategoriesdetails.length &&
      !state.hasProfessionalLicense &&
      !hasFreeFlag
    ) {
      const [firstSubCateg] = state.subcategoriesdetails;
      const { slug } = firstSubCateg;
      if (validateProLicenseNav(firstSubCateg)) return;
      changeTab(slug);
    }
  }, [state.subcategoriesdetails, state.hasProfessionalLicense, hasFreeFlag]);

  const renderPublications = () => {
    return state.publications.map((publication) => (
      <>
        <div
          className="publication-img"
          key={publication.id}
          onClick={() => openModal(publication.id)}
        >
          <img
            src={publication.thumbnailUrl}
            width="100%"
            alt={publication.id}
          />
          <div className="publication-overlay">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/eye.png"}
              alt={publication.id}
            />
          </div>
        </div>
      </>
    ));
  };

  const renderEmptyText = () => {
    if (state.loading || state?.subcategoriesdetails?.length) return null;

    return (
      <p className="col-12 text-center">
        انتهت الدورات الحالية نستأنف الدورات القادمة قريبًا
      </p>
    );
  };

  const renderCards = () => {
    if (state.courses.length === 0) return renderEmptyText();
    return state.courses.map((course) => (
      <>
        <div className="col-lg-4">
          <Card key={course.id} course={course} />
        </div>
      </>
    ));
  };

  const renderCourses = (courses) => {
    return courses.map((course) => (
      <div className="col-lg-4">
        <Card key={course.id} course={course} />
      </div>
    ));
  };

  const renderPanelSub = () => {
    return state.subcategoriesdetails.map((Category, count) => (
      <>
        <div className="tab-pane fade " id={"tab-" + count} role="tabpanel">
          <div className="container">
            <div className="row">{renderCourses(Category.courses)}</div>
          </div>
        </div>
      </>
    ));
  };

  const rendersubCategories = () => {
    return state.subcategoriesdetails.map((Category, count) => (
      <NavTab
        key={Category.id}
        currentTab={this.state.currentTab}
        id={Category?.nameAr}
        name={Category.nameAr}
        onClick={() => handleClick(Category)}
      />
    ));
  };

  const renderLectures = () => {
    const sortedLectures = state.lectures.sort(
      (b, a) => a.scheduledAt - b.scheduledAt
    );

    return sortedLectures.map((lecture) => {
      const scheduledAt = new Date(lecture.scheduledAt);
      //Date
      var day = scheduledAt.getDate();
      var month = scheduledAt.getMonth() + 1;
      var year = scheduledAt.getFullYear();
      var scheduledDate = year + "-" + month + "-" + day;
      var hijriDate = moment(scheduledDate, "YYYY-MM-DD").format("iYYYY/iM/iD");
      //Time
      var lectureTime = scheduledAt.getTime();
      const hours = `0${new Date(lectureTime).getHours()}`.slice(-2);
      const minutes = `0${new Date(lectureTime).getMinutes()}`.slice(-2);
      const time = `${hours}:${minutes}`;
      var ampm = hours < 12 || hours === 24 ? "AM" : "PM";

      return (
        <li
          key={lecture.id}
          className="list-group-item d-flex justify-content-between align-items-center"
          dir="rtl"
        >
          <div className="media d-flex align-items-center">
            <div className="gradient-bg mr-4 d-flex align-items-center justify-content-center">
              <FaGraduationCap className="text-white" size="34" />
            </div>
            <div className="media-body">
              <h6 className="dark-text">{lecture.nameAr}</h6>
              <div className="d-flex align-items-center">
                <h5 className="mid-text small en-text d-flex align-items-center">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/calendar.png"}
                    height="12"
                    width="12"
                    className="mr-1"
                  />
                  {hijriDate}
                </h5>

                <h5 className="mid-text small en-text d-flex align-items-center">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/clock.png"}
                    className="mr-1 ml-3"
                    height="15"
                    alt="Time"
                  />
                  <span dir="ltr">
                    {time} {ampm}
                  </span>
                </h5>
              </div>
              {lecture.instructor && (
                <p className="light-text small mb-0">
                  {lecture.instructor && lecture.instructor.name}
                </p>
              )}
            </div>
          </div>
          {lecture.broadcastUrl && (
            <button
              className="btn light-outline-btn unset-height"
              onClick={() => openFreeLecture(lecture)}
            >
              انضم
            </button>
          )}
        </li>
      );
    });
  };

  const renderCompetitions = () => {
    return state.competitions.map((competition) => (
      <>
        <div
          className="competition-box d-flex flex-column justify-content-center clickable"
          onClick={() =>
            props.history.push(
              `/categories/details/${params.slug}/competition/${competition.id}`
            )
          }
        >
          <div className="box-img">
            <img
              src={
                competition.isTaken
                  ? process.env.PUBLIC_URL +
                    "/assets/images/competition-disabled.png"
                  : process.env.PUBLIC_URL + "/assets/images/competition.png"
              }
              height="50"
            />
          </div>
          <div className="box-body">
            <h6 className="dark-text mb-1">{competition.name}</h6>
            {competition.isTaken ? (
              <div className="red-label">
                <p className="text-white text-break mb-0">
                  تمت المشاركة بالمسابقة
                </p>
              </div>
            ) : (
              <div className="light-label">
                <p className="text-white text-break mb-0">تحدى نفسك</p>
              </div>
            )}
          </div>
        </div>
      </>
    ));
  };

  const Rating = ({ successCase }) => {
    return (
      <div class="card-body px-2 py-2">
        <p class="d-flex align-items-center light-gray mb-1 font-size-13">
          <span class="d-block main-color-light mr-2">اسم الطالب : </span>
          {successCase?.rating?.studentName}
        </p>
        <p class="light-gray font-size-13 m-0">
          <span class="main-color-light">التقييم : </span>
          {successCase?.rating?.feedBack}
        </p>
      </div>
    );
  };

  const contentReducer = (successCase) => {
    switch (successCase?.source) {
      case "Media":
        return (
          <a href={successCase?.url}>
            <img
              src={successCase?.img}
              className="w-100 mh-200"
              style={{ height: "170px !important" }}
            />
          </a>
        );
      case "Rating":
        return <Rating successCase={successCase} />;
      default:
        break;
    }
  };

  const renderSuccess = () => {
    return state.successes.map((successCase) => (
      <>
        <div class="h-100">
          <div class="status-card sider-items h-100">
            <div class="quote-icon">
              <i class="fas fa-quote-left"></i>
            </div>
            <h6 class="h6 main-color-light text-center mb-3">
              {successCase?.courseName}
            </h6>
            <div class="card">{contentReducer(successCase)}</div>
          </div>
        </div>
      </>
    ));
  };

  return (
    <>
      <Helmet>
        <title>{`${state.details.nameAr} | منصّة همّة التعليمية`}</title>
        <meta name="description" content={state.details.descriptionAr} />
      </Helmet>

      {/* <section id="license-two" className="license-two">
        <div className="container">
          <header className="mb-4">
            <div className="text-center mb-2">
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/images/hemma-logo-light.svg"
                }
                className="max-height-80"
                alt="Hemma-Logo"
              />
            </div>
            <h3 className="h3 main-color mb-3 font-weight-bold text-center">
              {state.details.nameAr}
            </h3>
            <p className="description-card main-color font-weight-bold mb-0 text-center">
              {state.details.descriptionAr}
            </p>
          </header>
          <div className="lic-tabs">
            <nav>
              <div
                className="nav d-flex align-items-center justify-content-center mb-6 col-12"
                id="nav-tab"
                role="tablist"
              >
                <SubCategories
                  hasProfessionalLicense={this.state.hasProfessionalLicense}
                  handleClick={(category) => this.handleClick(category)}
                  subCategories={this.state.subcategoriesdetails}
                  currentTab={this.state.currentTab}
                />
                <ShowAt
                  at={
                    !state.hasProfessionalLicense && !state.hasNoPlatformCourses
                  }
                >
                  <NavTab
                    currentTab={state.currentTab}
                    id="tab-two"
                    name={"دورات المنصة"}
                    onClick={() => changeTab("tab-two")}
                  />
                </ShowAt>
                {!!state.lectures?.length && (
                  <NavTab
                    id={freeMeetingsText}
                    currentTab={state.currentTab}
                    name={freeMeetingsText}
                    onClick={() => changeTab(freeMeetingsText)}
                  />
                )}

                {state.hasProfessionalLicense && (
                  <NavTab
                    currentTab={state.currentTab}
                    isActive={state.currentTab === ProfessionalLicenseText}
                    id={ProfessionalLicenseText}
                    name="الرخصة المهنية"
                    onClick={() => changeTab("الرخصة المهنية")}
                  />
                )}

                {!!state.successes.length && (
                  <NavTab
                    currentTab={state.currentTab}
                    id={"tab-four"}
                    name="نجاحات همة"
                    onClick={() => changeTab("tab-four")}
                  />
                )}

                {!!state.categoryGroups.length && (
                  <NavTab
                    currentTab={state.currentTab}
                    id={"tab-three"}
                    name="المجموعات المجانيه"
                    onClick={() => changeTab("tab-three")}
                  />
                )}
              </div>
              <ShowAt
                at={
                  !staticTabs.includes(state.currentTab) ||
                  state.currentTab === platformCoursesTab
                }
              >
                <div className="row">{renderCourses(this.state.courses)}</div>
              </ShowAt>
              <div className="tab-content" id="nav-tabContent">
                <ShowAt at={!staticTabs.includes(state.currentTab)}>
                  <div className="container">
                    <div className="row">
                      {!state.currentSlug && !state.noMoreCourses && (
                        <div className="row col-md-12">
                          <div className="col-md-12 d-flex align-items-center justify-content-center">
                            <button
                              className="btn dark-btn unset-height unset-line-height br-5 w-20"
                              onClick={loadMore}
                              disabled={state.disabled}
                            >
                              {state.loading == true ? (
                                <Loader type="ball-clip-rotate" />
                              ) : (
                                "عرض المزيد"
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ShowAt>
                {state.currentTab === ProfessionalLicenseText && (
                  <ProfessionalLicense
                    categoryData={state.proLicenseDetails || state.details}
                  />
                )}
                <ShowAt at={state.currentTab === freeMeetingsText}>
                  <div className="container">
                    <div className="row">{renderLectures()}</div>
                  </div>
                </ShowAt>
                <div>
                  <div className="container">
                    <ShowAt at={state.currentTab === "tab-four"}>
                      <div
                        className=""
                        style={{
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(345px, 1fr))",
                          display: "grid",
                          gridRowGap: "1.5rem",
                          gridColumnGap: "0.5rem",
                        }}
                      >
                        {renderSuccess()}
                        {state.hideBtnSuccess && (
                          <div className="row col-md-12">
                            <div className="col-md-12 d-flex align-items-center justify-content-center">
                              <button
                                className="btn dark-btn unset-height unset-line-height br-5 w-20"
                                onClick={moreSucces}
                              >
                                {state.loading == true ? (
                                  <Loader type="ball-clip-rotate" />
                                ) : (
                                  "عرض المزيد"
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </ShowAt>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Search;
