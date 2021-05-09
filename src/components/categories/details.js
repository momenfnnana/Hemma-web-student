import React, { Component } from "react";
import { FaGraduationCap } from "react-icons/fa";
import Slider from "react-slick";
import { Card } from "../shared/card/card";
import { PublicationDetails } from "../publication/publication";
import { apiBaseUrl } from "../../api/helpers";
import { Helmet } from "react-helmet";
import swal from "@sweetalert/with-react";
import Loader from "react-loaders";
import { Api } from "../../api";
import axios from "axios";
import { Link } from "react-router-dom";
import "loaders.css/src/animations/ball-clip-rotate.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.sass";
import { PageLoader } from "../courses/page-loader";
import ContentLoader from "react-content-loader";
import { Category } from "emoji-mart";


var moment = require("moment-hijri");
moment().format("iYYYY/iM/iD");

export class CategoryDetails extends Component {
  page = 1;
  limit = 6;
  endOfResults = false;
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      subcategoriesdetails:[],
      lectures: [],
      content: [],
      publications: [],
      courses: [],
      competitions: [],
      categoryGroups: [],
      selectedPublicationId: null,
      modalIsOpen: false,
      hideBtn: false,
      loading: false,
      disabled: false,
      coursesShimmerLoader: true,
      lecturesShimmerLoader: true,
      categoryGroupsShimmerLoader: true,
      competitionsShimmerLoader: true,
      publicationsShimmerLoader: true,
      nextPageUrl: `${apiBaseUrl}/categories/${this.props.match.params.slug}/courses?Page=${this.page}&Limit=${this.limit}&featuredOnly=true`
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(id) {
    this.setState({ modalIsOpen: true, selectedPublicationId: id });
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  loadMore = async () => {
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `Bearer ${token}`
    };
    this.setState({ loading: true, disabled: true });
    if (!this.endOfResults) {
      axios
        .get(this.state.nextPageUrl, { headers })
        .then(response => {
          this.setState({ loading: false, disabled: false });
          const newCourses = [
            ...this.state.courses,
            ...response.data.data.data
          ];
          this.endOfResults = response.data.data.itemCount < this.limit;
          this.page++;
          const nextUrl = `${apiBaseUrl}/categories/${this.props.match.params.slug}/courses?Page=${this.page}&Limit=${this.limit}&featuredOnly=true`;
          this.setState({
            courses: newCourses,
            nextPageUrl: nextUrl,
            coursesShimmerLoader: false
          });
          if (newCourses.length == response.data.data.itemCount) {
            this.setState({ hideBtn: true });
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading: false, disabled: false });
        });
    }
  };

  async componentDidMount() {
    const {
      match: { params }
    } = this.props;
    axios
      .get(`${apiBaseUrl}/categories/${params.slug}`)
      .then(response => {
        this.setState({ details: response.data.data});
      })
      .catch(error => {
        console.log(error);
      });
      axios
      .get(`${apiBaseUrl}/categories/${params.slug}/SubCategories`)
      .then(response => {
        this.setState({ subcategoriesdetails: response.data.data.childCatgories});
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get(`${apiBaseUrl}/FreeLectures?categoryIdOrSlug=${params.slug}`)
      .then(response => {
        this.setState({ lectures: response.data.data, lecturesShimmerLoader: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({lecturesShimmerLoader: false})
      });

    axios
      .get(`${apiBaseUrl}/categories/${params.slug}/publications`)
      .then(response => {
        this.setState({ publications: response.data.data.data, publicationsShimmerLoader: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({publicationsShimmerLoader: false})
      });

    Api.categories
      .getCompetitions(params.slug)
      .then(response => {
        this.setState({ competitions: response, competitionsShimmerLoader: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({competitionsShimmerLoader: false})
      });

    axios
      .get(
        `${apiBaseUrl}/CategoryGroups?category=${params.slug}`
      )
      .then(response => {
        this.setState({ categoryGroups: response.data.data, categoryGroupsShimmerLoader: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({categoryGroupsShimmerLoader: false})
      });

    await this.loadMore();
  }

  categoryGroupRedirection(CategoryGroup) {
    const {
      match: { params }
    } = this.props;
    let token = localStorage.getItem("token");
    if (token) {
      this.props.history.push(
        `/categories/details/${params.slug}/quick-questions/${CategoryGroup}`
      );
    } else {
      swal(
        "عفواً",
        "يجب عليك تسجيل الدخول/تسجيل حساب حتى تتمكن من القيام بهذه الخطوة",
        "error",
        {
          button: "متابعة"
        }
      );
    }
  }

  renderCategoryGroups() {
    console.log(this.state.categoryGroups);
    return this.state.categoryGroups.map(group => (
      <React.Fragment>
        <div className="col-lg-4">
                      <div className="card p-3 card-gradient border-dashed card-ele mb-3 position-relative min-height-150 max-height-150"    key={group.id}
            onClick={() => this.categoryGroupRedirection(group.id)}>
                        <div className="d-flex align-items-center">
                          <div className="mr-4">
                            <img src={process.env.PUBLIC_URL +"/assets/images/icon.svg"}  className="width-80" alt="ICON"/>
                          </div>
                          <div className="text-white">
                            <h4 className="h4">{group.name}</h4>
                            <div className="font-size-18 mb-2">{group.description}</div>
                            <div className="font-size-14 d-flex align-items-center">
                              <div className="mr-2">
                                <i className="far fa-user-circle"></i>
                              </div>
                              <div className="mr-2">طالب</div>
                              <div>680</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
        {/* <div className="col-md-2">
          <div
            className="shadow-box d-flex flex-column align-items-center justify-content-center clickable"
            key={group.id}
            onClick={() => this.categoryGroupRedirection(group.id)}
          >
            <h6 className="dark-text mb-1">{group.name}</h6>
            <p className="dark-text smaller mb-0 text-break text-center">
              {group.description}
            </p>
          </div>
        </div> */}
      </React.Fragment>
    ));
  }

  renderPublications() {
    return this.state.publications.map(publication => (
      <React.Fragment>
        <div
          className="publication-img"
          key={publication.id}
          onClick={() => this.openModal(publication.id)}
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
      </React.Fragment>
    ));
  }

  renderCards() {
    return this.state.courses.map(course => (
      <React.Fragment>
       <div className="col-lg-4">
          <Card key={course.id} course={course} />
        </div>
      </React.Fragment>
    ));
  }
  renderCourses(courses) {
    return courses.map(course => (
      <React.Fragment>
       <div className="col-lg-4">
          <Card key={course.id} course={course} />
        </div>
      </React.Fragment>
    ));
  }
  renderPanelSub()
  {
    return this.state.subcategoriesdetails.map(Category => (
      <React.Fragment>
<div className="tab-pane fade " id={Category.id} role="tabpanel" aria-labelledby="nav-profile-tab">
                <div className="container">
                  <div className="row">
                  {this.renderCourses(Category.courses)}
                  </div>
              </div>
          </div>
          </React.Fragment>
          ));
  }
  rendersubCategories()
  {
    return this.state.subcategoriesdetails.map(Category => (
      <React.Fragment>
        <a className="tab-items nav-link px-4" data-toggle="tab" href={"#"+Category.id} role="tab" aria-controls="nav-three" aria-selected="false">
                  <div className="tab-img">
                    <img src={process.env.PUBLIC_URL +"/assets/images/hemma-logo-light.svg"} className="width-50" alt="Hemma-logo"/>
                  </div>
                  <div className="main-color font-weight-bold">{Category.nameAr}</div>
                </a>
      </React.Fragment>
    ));
  }
  openFreeLecture(lecture) {
    let token = localStorage.getItem("token");
    if (token) {
      window.open(lecture.broadcastUrl, "_blank");
    } else {
      swal(
        "عفواً",
        "يجب عليك تسجيل الدخول/تسجيل حساب حتى تتمكن من القيام بهذه الخطوة",
        "error",
        {
          button: "متابعة"
        }
      );
    }
  }

  renderLectures() {
    
      const sortedLectures = this.state.lectures.sort(
        (b, a) => a.scheduledAt - b.scheduledAt
      );
  
      return sortedLectures.map(lecture => {
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
                onClick={() => this.openFreeLecture(lecture)}
              >
                انضم
              </button>
            )}
          </li>
        );
      });
  }

  renderCompetitions() {
    const {
      match: { params }
    } = this.props;
    return this.state.competitions.map(competition => (
      <React.Fragment>
        <div
          className="competition-box d-flex flex-column justify-content-center clickable"
          onClick={() =>
            this.props.history.push(
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
      </React.Fragment>
    ));
  }

  render() {
    let token = localStorage.getItem("token");
    const {
      match: { params }
    } = this.props;
    var settings = {
      dots: true,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    };

    var verticalCarousel = {
      infinite: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000,
      arrows: true,
      vertical: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true
          }
        }
      ]
    };

    return (
      <React.Fragment>
        <Helmet>
          <title>{`${this.state.details.nameAr} | منصّة همّة التعليمية`}</title>
          <meta name="description" content={this.state.details.descriptionAr} />
        </Helmet>
        {/* <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="half-circle-border mx-auto">
                  {this.state.details.icon
                  ?(
                    <img
                    src={this.state.details.icon}
                    height="50"
                    width="50"
                    className="mt-3 contain-img"
                    alt={this.state.details.nameAr}
                  />
                  )
                  :(
                    <ContentLoader
                    viewBox="-55 -20 200 200"
                    >
                      <circle  cx="44" cy="42" r="38" />
                    </ContentLoader>
                  )}
                  
                </div>
                <h5 className="dark-text mt-3">
                  {this.state.details.nameAr
                  ?this.state.details.nameAr
                  :( 
                    <ContentLoader height="40" className="w-20 mx-auto">
                      <rect x="0" y="0" rx="5" ry="5" width="100%" height="40" />
                    </ContentLoader>
                  )}
                  </h5>
                <p className="dark-text mt-2 small w-40 mx-auto">
                  {this.state.details.descriptionAr
                  ?this.state.details.descriptionAr
                  :(
                    <ContentLoader height="10" className="">
                      <rect x="0" y="0" rx="5" ry="5" width="400" height="10" />
                    </ContentLoader>
                  )}
                </p>
              </div>
            </div>
            {this.state.lecturesShimmerLoader && (
              <div className="row pt-5 pb-4">
              <div className="col-md-4">
                <h4 className="dark-text mt-3">
                  لأننا حابين نفيدكم قدمنا لكم
                </h4>
                <h4 className="light-text">محاضرات مجانية</h4>
                <p className="dark-silver-text small text-break">
                  نقدم مجموعة من المحاضرات المجانية كل أسبوعتابعونا لتعرفوا
                  المزيد
                </p>
              </div>
              <div className="col-md-8">
                <ContentLoader height="106" className="mb-4">
                  <rect x="0" y="0" rx="5" ry="5" width="100%" height="106" />
                </ContentLoader>
              </div>
            </div>
            )}
            {this.state.lectures && this.state.lectures.length > 0 ? (
              <div className="row pt-5 pb-4">
                <div className="col-md-4">
                  <h4 className="dark-text mt-3">
                    لأننا حابين نفيدكم قدمنا لكم
                  </h4>
                  <h4 className="light-text">محاضرات مجانية</h4>
                  <p className="dark-silver-text small text-break">
                    نقدم مجموعة من المحاضرات المجانية كل أسبوعتابعونا لتعرفوا
                    المزيد
                  </p>
                </div>
                <div className="col-md-8">
                  <Slider {...verticalCarousel}>{this.renderLectures()}</Slider>
                </div>
              </div>
            ) : null}
            
            {this.state.coursesShimmerLoader === true && (<>
              <div className="row">
                <div className="col-12 pt-4">
                  <h5 className="dark-text">الدورات المتاحة</h5>
                </div>
              </div>
              
              <div className="row pt-2 pb-3">
                {this.renderCards()}
                </div>
              <div className="row pt-2 pb-3">
                <div className="col-md-4">
                    <ContentLoader height="300">
                      <rect x="0" y="0" rx="5" ry="5" width="100%" height="300" />
                    </ContentLoader>
                  </div>
                  <div className="col-md-4">
                    <ContentLoader height="300">
                      <rect x="0" y="0" rx="5" ry="5" width="100%" height="300" />
                    </ContentLoader>
                  </div>
                  <div className="col-md-4">
                    <ContentLoader height="300">
                      <rect x="0" y="0" rx="5" ry="5" width="100%" height="300" />
                    </ContentLoader>
                  </div>
                </div>
              
              {!this.state.hideBtn && (
                <div className="row">
                  <div className="col-md-12 d-flex align-items-center justify-content-center">
                    <button
                      className="btn dark-btn unset-height unset-line-height br-5 w-20"
                      onClick={this.loadMore}
                      disabled={this.state.disabled}
                    >
                      {this.state.loading == true ? (
                        <Loader type="ball-clip-rotate" />
                      ) : (
                        "عرض المزيد"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </>)}
            {this.state.courses.length > 0 && (<>
              <div className="row">
                <div className="col-12 pt-4">
                  <h5 className="dark-text">الدورات المتاحة</h5>
                </div>
              </div>
              
              <div className="row pt-2 pb-3">
                {this.renderCards()}
                </div>
                {this.state.coursesShimmerLoader && (
                <div className="row pt-2 pb-3">
                  <div className="col-md-4">
                      <ContentLoader height="300">
                        <rect x="0" y="0" rx="5" ry="5" width="100%" height="300" />
                      </ContentLoader>
                    </div>
                    <div className="col-md-4">
                      <ContentLoader height="300">
                        <rect x="0" y="0" rx="5" ry="5" width="100%" height="300" />
                      </ContentLoader>
                    </div>
                    <div className="col-md-4">
                      <ContentLoader height="300">
                        <rect x="0" y="0" rx="5" ry="5" width="100%" height="300" />
                      </ContentLoader>
                    </div>
                  </div>
                  )}
              {!this.state.hideBtn && (
                <div className="row">
                  <div className="col-md-12 d-flex align-items-center justify-content-center">
                    <button
                      className="btn dark-btn unset-height unset-line-height br-5 w-20"
                      onClick={this.loadMore}
                      disabled={this.state.disabled}
                    >
                      {this.state.loading == true ? (
                        <Loader type="ball-clip-rotate" />
                      ) : (
                        "عرض المزيد"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </>)}
            
            {this.state.publicationsShimmerLoader && (
              <div className="row pt-5">
                <div className="col-12 text-center">
                  <h3 className="dark-text">إصداراتنا</h3>
                  <p className="dark-silver-text">
                    احصل على آخر إصداراتنا في القدرات والتحصيلي
                  </p>
                </div>

                <div className="col-12">
                  <Slider {...settings}>
                    <ContentLoader height="200">
                      <rect x="0" y="0" rx="5" ry="5" width="80%" height="200" />
                    </ContentLoader>
                    <ContentLoader height="200">
                      <rect x="0" y="0" rx="5" ry="5" width="80%" height="200" />
                    </ContentLoader>
                    <ContentLoader height="200">
                      <rect x="0" y="0" rx="5" ry="5" width="80%" height="200" />
                    </ContentLoader>
                    <ContentLoader height="200">
                      <rect x="0" y="0" rx="5" ry="5" width="80%" height="200" />
                    </ContentLoader>
                  </Slider>
                  
                </div>
              </div>
            )}
            {this.state.publications.length > 0 && (
              <div className="row pt-5">
                <div className="col-12 text-center">
                  <h3 className="dark-text">إصداراتنا</h3>
                  <p className="dark-silver-text">
                    احصل على آخر إصداراتنا في القدرات والتحصيلي
                  </p>
                </div>

                <div className="col-12">
                  <Slider {...settings}>{this.renderPublications()}</Slider>
                  <PublicationDetails
                    id={this.state.selectedPublicationId}
                    modalIsOpen={this.state.modalIsOpen}
                    onClose={this.closeModal}
                  />
                </div>
              </div>
            )}
            {this.state.categoryGroupsShimmerLoader && (
              <React.Fragment>
                <div className="row pt-5">
                  <div className="col-12 text-center">
                    <h3 className="dark-text">المجموعات</h3>
                    <p className="dark-silver-text">
                      بنقدملكم مجموعة من الأسئلة السريعة
                    </p>
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-md-2">
                    <ContentLoader width="150px" height="100" style={{width: "150px", height: "100px"}}>
                      <rect x="0" y="0" rx="5" ry="5" width="150px" height="100" />
                    </ContentLoader>
                  </div>
                  <div className="col-md-2">
                    <ContentLoader width="150px" height="100" style={{width: "150px", height: "100px"}}>
                      <rect x="0" y="0" rx="5" ry="5" width="150px" height="100" />
                    </ContentLoader>
                  </div>
                  <div className="col-md-2">
                    <ContentLoader width="150px" height="100" style={{width: "150px", height: "100px"}}>
                      <rect x="0" y="0" rx="5" ry="5" width="150px" height="100" />
                    </ContentLoader>
                  </div>
                  <div className="col-md-2">
                    <ContentLoader width="150px" height="100" style={{width: "150px", height: "100px"}}>
                      <rect x="0" y="0" rx="5" ry="5" width="150px" height="100" />
                    </ContentLoader>
                  </div>
                  <div className="col-md-2">
                    <ContentLoader width="150px" height="100" style={{width: "150px", height: "100px"}}>
                      <rect x="0" y="0" rx="5" ry="5" width="150px" height="100" />
                    </ContentLoader>
                  </div>
                  <div className="col-md-2">
                    <ContentLoader width="150px" height="100" style={{width: "150px", height: "100px"}}>
                      <rect x="0" y="0" rx="5" ry="5" width="150px" height="100" />
                    </ContentLoader>
                  </div>
                </div>
              </React.Fragment>
            )}
            {this.state.categoryGroups.length > 0 && (
              <React.Fragment>
                <div className="row pt-5">
                  <div className="col-12 text-center">
                    <h3 className="dark-text">المجموعات</h3>
                    <p className="dark-silver-text">
                      بنقدملكم مجموعة من الأسئلة السريعة
                    </p>
                  </div>
                </div>
                <div className="row pt-3">{this.renderCategoryGroups()}</div>
              </React.Fragment>
            )}
            
            {this.state.competitionsShimmerLoader && (
                <div className="row pt-5 pb-4 d-flex align-items-center">
                  <div className="col-md-5">
                    <h4 className="dark-text">
                      مع همة تقدرون تتحدون أنفسكم مع{" "}
                      <span className="light-text">المسابقات</span>
                    </h4>
                    <p className="dark-silver-text text-break mb-0">
                      نقدم مجموعة من المسابقات التي تقدرون من خلالها تتنافسوا مع
                      اقوى المنافسين
                    </p>
                  </div>
                  <div className="col-md-4">
                    <ContentLoader width="350px" height="100" style={{width: "350px", height: "100px"}}>
                      <rect x="0" y="0" rx="5" ry="5" width="350px" height="100" />
                    </ContentLoader>
                  </div>
                  <div className="col-md-3">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/competitions.png"
                      }
                      width="100%"
                      className="contain-img"
                    />
                  </div>
                </div>
            )}
            {this.state.competitions.length > 0 && (
                <div className="row pt-5 pb-4 d-flex align-items-center">
                  <div className="col-md-5">
                    <h4 className="dark-text">
                      مع همة تقدرون تتحدون أنفسكم مع{" "}
                      <span className="light-text">المسابقات</span>
                    </h4>
                    <p className="dark-silver-text text-break mb-0">
                      نقدم مجموعة من المسابقات التي تقدرون من خلالها تتنافسوا مع
                      اقوى المنافسين
                    </p>
                  </div>

                  {(!this.state.competitions == undefined ||
                    !this.state.competitions.length == 0) &&
                  !token ? (
                    <div className="col-md-4">
                      <div className="competition-box-empty d-flex flex-column justify-content-around align-items-center">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/warning.png"
                          }
                          height="30"
                        />
                        <h6 className="dark-text small mb-0 text-center w-75">
                          يجب عليك{" "}
                          <Link to="/auth/login" className="light-text">
                            تسجيل الدخول
                          </Link>{" "}
                          حتى تتمكن من الاشتراك بالمسابقات
                        </h6>
                      </div>
                    </div>
                  ) : (
                    <div className="col-md-4">{this.renderCompetitions()}</div>
                  )}

                  <div className="col-md-3">
                    <img
                      src={process.env.PUBLIC_URL +"/assets/images/competitions.png"}
                      width="100%"
                      className="contain-img"
                    />
                  </div>
                </div>
            )}
            
          </div>
        </section> */}
   <section id="license-two" className="license-two">
      <div className="container">
        <header className="mb-4">
          <div className="text-center mb-2">
            <img src={process.env.PUBLIC_URL +"/assets/images/hemma-logo-light.svg"} className="max-height-80" alt="Hemma-Logo"/>
          </div>
          <h3 className="h3 main-color mb-3 font-weight-bold text-center">{this.state.details.nameAr}</h3>
          <p className="description-card main-color font-weight-bold mb-0 text-center">
          {this.state.details.descriptionAr}
          </p>
        </header>
        <div className="lic-tabs">
          <nav>
              <div className="nav d-flex align-items-center justify-content-center mb-6" id="nav-tab" role="tablist">
               {/* <a className="tab-items nav-link px-4 active" data-toggle="tab" href="#tab-one" role="tab" aria-controls="nav-one" aria-selected="true">
                  <div className="tab-img">
                    <img src={process.env.PUBLIC_URL +"/assets/images/hemma-logo-light.svg"}  className="width-50" alt="Hemma-logo"/>
                  </div>
                  <div className="main-color font-weight-bold">الرخصة المهنية</div>
                </a> */}
                <a className="tab-items nav-link px-4 active" data-toggle="tab" href="#tab-two" role="tab" aria-controls="nav-two" aria-selected="false">
                  <div className="tab-img">
                    <img src={process.env.PUBLIC_URL +"/assets/images/hemma-logo-light.svg"}  className="width-50" alt="Hemma-logo"/>
                  </div>
                  <div className="main-color font-weight-bold">{this.state.details.nameAr}</div>
                </a>
                {this.rendersubCategories()}
                <a className="tab-items nav-link px-4" data-toggle="tab" href="#tab-three" role="tab" aria-controls="nav-three" aria-selected="false">
                  <div className="tab-img">
                    <img src={process.env.PUBLIC_URL +"/assets/images/hemma-logo-light.svg"} className="width-50" alt="Hemma-logo"/>
                  </div>
                  <div className="main-color font-weight-bold">المجموعات المجانيه</div>
                </a>
              </div>
            <div className="tab-content" id="nav-tabContent">
              {/* <div className="tab-pane fade show active" id="tab-one" role="tabpanel" aria-labelledby="nav-home-tab">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="card p-3 border-dashed card-ele min-height-630 position-relative mb-6">
                        <div className="card-img">
                          <img src={process.env.PUBLIC_URL +"/assets/images/human.svg"}  alt="Human"/>
                          <div className="img-tag">2000 ريال</div>
                        </div>
                        <div className="mt--50">
                          <h5 className="h5 main-color mb-3 font-weight-bold text-center">دورات الرخصة المهنية للتخصصات</h5>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <select className="custom-select font-size-14 border-radius-50 border-sub-color">
                              <option selected>اختر التخصص</option>
                              <option value="1">التخصص 1</option>
                              <option value="2">التخصص 2</option>
                              <option value="3">التخصص 3</option>
                            </select>
                            <span className="mx-1"></span>
                            <select className="custom-select font-size-14 border-radius-50 border-sub-color">
                              <option selected>اختر مستوي الدورة</option>
                              <option value="1">الدورة 1</option>
                              <option value="2">الدورة 2</option>
                              <option value="3">الدورة 3</option>
                            </select>
                          </div>
                          <div>
                            <h6 className="h6 sub-color">تفاصيل الدورة :</h6>
                            <ul className="list-unstyled">
                              <li>. البث المباشر: من 10:00م إلى 12:00 ص</li>
                              <li>مدة صلاحية الدورة: (4 أشهر) من تاريخ البداية</li>
                              <li>تاريخ البداية الفعلية: 12/3/1441هـ.</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="h6 sub-color">مميزات الدورة :</h6>
                            <ul className="list-unstyled">
                              <li>. البث المباشر: من 10:00م إلى 12:00 ص</li>
                              <li>مدة صلاحية الدورة: (4 أشهر) من تاريخ البداية</li>
                              <li>تاريخ البداية الفعلية: 12/3/1441هـ.</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="h6 sub-color">مجموعات المتدربين:</h6>
                            <select className="custom-select font-size-14 border-radius-50 border-sub-color">
                              <option selected>1 مجموعة</option>
                              <option value="1">مجموعة 1</option>
                              <option value="2">مجموعة 2</option>
                              <option value="3">مجموعة 3</option>
                            </select>
                          </div>
                          <div className="btn-card-area d-flex justify-content-center mt-3">
                            <a className="btn-title d-inline-block">انضم للدورة</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card p-3 border-dashed card-ele min-height-630 position-relative mb-5">
                        <div className="card-img">
                          <img src={process.env.PUBLIC_URL +"/assets/images/human.svg"} alt="Human"/>
                          <div className="img-tag">2000 ريال</div>
                        </div>
                        <div className="mt--50">
                          <h5 className="h5 main-color mb-3 font-weight-bold text-center">دورات الرخصة المهنية للعام</h5>
                          <div>
                            <h6 className="h6 sub-color">تفاصيل الدورة :</h6>
                            <ul className="list-unstyled">
                              <li>. البث المباشر: من 10:00م إلى 12:00 ص</li>
                              <li>مدة صلاحية الدورة: (4 أشهر) من تاريخ البداية</li>
                              <li>تاريخ البداية الفعلية: 12/3/1441هـ.</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="h6 sub-color">مميزات الدورة :</h6>
                            <ul className="list-unstyled">
                              <li>. البث المباشر: من 10:00م إلى 12:00 ص</li>
                              <li>مدة صلاحية الدورة: (4 أشهر) من تاريخ البداية</li>
                              <li>تاريخ البداية الفعلية: 12/3/1441هـ.</li>
                            </ul>
                          </div>
                          <div>
                            <h6 className="h6 sub-color">مجموعات المتدربين:</h6>
                            <select className="custom-select font-size-14 border-radius-50 border-sub-color mb-2">
                              <option selected>1 مجموعة</option>
                              <option value="1">مجموعة 1</option>
                              <option value="2">مجموعة 2</option>
                              <option value="3">مجموعة 3</option>
                            </select>
                            <select className="custom-select font-size-14 border-radius-50 border-sub-color">
                              <option selected>1 مجموعة</option>
                              <option value="1">مجموعة 1</option>
                              <option value="2">مجموعة 2</option>
                              <option value="3">مجموعة 3</option>
                            </select>
                          </div>
                          <div className="btn-card-area d-flex justify-content-center mt-3">
                            <a className="btn-title d-inline-block">انضم للدورة</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card p-3 border-dashed card-ele min-height-630 position-relative ">
                          <h4 className="card-title h4 main-color mb-4 font-weight-bold text-center">هل ترغب في الاشتراك في الدورة المحددة؟</h4>
                          <div className="input-area mb-3">
                            <input type="text" className="form-control border-radius-50" placeholder="اسم دورة للرخصة المهنية للتخصصات"/>
                            <span className="input-close cursor-pointer">
                              <i className="fas fa-times"></i>
                            </span>
                          </div>
                          <div className="input-area mb-3">
                            <input type="text" className="form-control border-radius-50" placeholder="اسم دورة للرخصة المهنية للعام"/>
                            <span className="input-close cursor-pointer">
                              <i className="fas fa-times"></i>
                            </span>
                          </div>
                          <p className="description-card font-weight-bold mb-4 text-center">
                            يمكنك أيضا اختيار دورة إضافيـــــــة بجانب الدورة الحالية لتحصل على نسبة خصـــــم باقة الاشتراك لدورتي التخصص والعــام
                          </p>
                          <div className="d-flex align-items-center mb-2 font-weight-bold">
                            <div className="main-color mr-4 min-width-200 width-small">إجمالي القيمة الأساسية</div>
                            <div className="sub-color">4000 ريال</div>
                          </div>
                          <div className="d-flex align-items-center mb-2 font-weight-bold">
                            <div className="main-color mr-4 min-width-200 width-small">نسبة الخصم %10</div>
                            <div className="sub-color">400 ريال</div>
                          </div>
                        <hr></hr>
                          <div className="d-flex align-items-center mb-2 font-weight-bold">
                            <div className="main-color mr-4 min-width-200 width-small">اجمالى قيمه الاشتراك</div>
                            <div className="sub-color">3600 ريال</div>
                          </div>
                          <div className="btn-card-area d-flex justify-content-center mt-3">
                            <a className="btn-title d-inline-block">الاشتراك</a>
                            <span className="mx-2"></span>
                            <a className="btn-title d-inline-block">الغاء الاختيار</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              {this.renderPanelSub()}
              <div className="tab-pane fade show active" id="tab-two" role="tabpanel" aria-labelledby="nav-profile-tab">
                <div className="container">
                  <div className="row">
                  {this.renderCards()}
                    {/* <div className="col-lg-4">
                      <div className="card p-3 border-dashed card-ele min-height-380 position-relative mb-6">
                        <div className="card-img">
                          <img  src={process.env.PUBLIC_URL +"/assets/images/human.svg"}  alt="Human"/>
                          <div className="img-tag">2000 ريال</div>
                        </div>
                        <div className="mt--50">
                          <h5 className="h5 main-color mb-3 font-weight-bold text-center">دورات الرخصة المهنية للتخصصات</h5>
                          <div>
                            <h6 className="h6 sub-color">تفاصيل الدورة :</h6>
                            <ul className="list-unstyled">
                              <li>. البث المباشر: من 10:00م إلى 12:00 ص</li>
                              <li>مدة صلاحية الدورة: (4 أشهر) من تاريخ البداية</li>
                              <li>تاريخ البداية الفعلية: 12/3/1441هـ.</li>
                            </ul>
                          </div>
                          <div className="btn-card-area d-flex justify-content-center mt-3">
                            <a className="btn-title d-inline-block">انضم للدورة</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card p-3 border-dashed card-ele min-height-380 position-relative mb-6">
                        <div className="card-img">
                          <img src={process.env.PUBLIC_URL +"/assets/images/human.svg"}  alt="Human"/>
                          <div className="img-tag">2000 ريال</div>
                        </div>
                        <div className="mt--50">
                          <h5 className="h5 main-color mb-3 font-weight-bold text-center">دورات الرخصة المهنية للتخصصات</h5>
                          <div>
                            <h6 className="h6 sub-color">تفاصيل الدورة :</h6>
                            <ul className="list-unstyled">
                              <li>. البث المباشر: من 10:00م إلى 12:00 ص</li>
                              <li>مدة صلاحية الدورة: (4 أشهر) من تاريخ البداية</li>
                              <li>تاريخ البداية الفعلية: 12/3/1441هـ.</li>
                            </ul>
                          </div>
                          <div className="btn-card-area d-flex justify-content-center mt-3">
                            <a className="btn-title d-inline-block">انضم للدورة</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card p-3 border-dashed card-ele min-height-380 position-relative mb-6">
                        <div className="card-img">
                          <img src={process.env.PUBLIC_URL +"/assets/images/human.svg"}  alt="Human"/>
                          <div className="img-tag">2000 ريال</div>
                        </div>
                        <div className="mt--50">
                          <h5 className="h5 main-color mb-3 font-weight-bold text-center">دورات الرخصة المهنية للتخصصات</h5>
                          <div>
                            <h6 className="h6 sub-color">تفاصيل الدورة :</h6>
                            <ul className="list-unstyled">
                              <li>. البث المباشر: من 10:00م إلى 12:00 ص</li>
                              <li>مدة صلاحية الدورة: (4 أشهر) من تاريخ البداية</li>
                              <li>تاريخ البداية الفعلية: 12/3/1441هـ.</li>
                            </ul>
                          </div>
                          <div className="btn-card-area d-flex justify-content-center mt-3">
                            <a className="btn-title d-inline-block">انضم للدورة</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card p-3 border-dashed card-ele min-height-380 position-relative mb-6">
                        <div className="card-img">
                          <img src={process.env.PUBLIC_URL +"/assets/images/human.svg"}  alt="Human"/>
                          <div className="img-tag">2000 ريال</div>
                        </div>
                        <div className="mt--50">
                          <h5 className="h5 main-color mb-3 font-weight-bold text-center">دورات الرخصة المهنية للتخصصات</h5>
                          <div>
                            <h6 className="h6 sub-color">تفاصيل الدورة :</h6>
                            <ul className="list-unstyled">
                              <li>. البث المباشر: من 10:00م إلى 12:00 ص</li>
                              <li>مدة صلاحية الدورة: (4 أشهر) من تاريخ البداية</li>
                              <li>تاريخ البداية الفعلية: 12/3/1441هـ.</li>
                            </ul>
                          </div>
                          <div className="btn-card-area d-flex justify-content-center mt-3">
                            <a className="btn-title d-inline-block">انضم للدورة</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card p-3 border-dashed card-ele min-height-380 position-relative mb-6">
                        <div className="card-img">
                          <img src={process.env.PUBLIC_URL +"/assets/images/human.svg"}  alt="Human"/>
                          <div className="img-tag">2000 ريال</div>
                        </div>
                        <div className="mt--50">
                          <h5 className="h5 main-color mb-3 font-weight-bold text-center">دورات الرخصة المهنية للتخصصات</h5>
                          <div>
                            <h6 className="h6 sub-color">تفاصيل الدورة :</h6>
                            <ul className="list-unstyled">
                              <li>. البث المباشر: من 10:00م إلى 12:00 ص</li>
                              <li>مدة صلاحية الدورة: (4 أشهر) من تاريخ البداية</li>
                              <li>تاريخ البداية الفعلية: 12/3/1441هـ.</li>
                            </ul>
                          </div>
                          <div className="btn-card-area d-flex justify-content-center mt-3">
                            <a className="btn-title d-inline-block">انضم للدورة</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4"> */}
                      {/* <div className="card p-3 border-dashed card-ele min-height-380 position-relative mb-6">
                        <div className="card-img">
                          <img src={process.env.PUBLIC_URL +"/assets/images/human.svg"}  alt="Human"/>
                          <div className="img-tag">2000 ريال</div>
                        </div>
                        <div className="mt--50">
                          <h5 className="h5 main-color mb-3 font-weight-bold text-center">دورات الرخصة المهنية للتخصصات</h5>
                          <div>
                            <h6 className="h6 sub-color">تفاصيل الدورة :</h6>
                            <ul className="list-unstyled">
                              <li>. البث المباشر: من 10:00م إلى 12:00 ص</li>
                              <li>مدة صلاحية الدورة: (4 أشهر) من تاريخ البداية</li>
                              <li>تاريخ البداية الفعلية: 12/3/1441هـ.</li>
                            </ul>
                          </div>
                          <div className="btn-card-area d-flex justify-content-center mt-3">
                            <a className="btn-title d-inline-block">انضم للدورة</a>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="tab-three" role="tabpanel" aria-labelledby="nav-contact-tab">
                <div className="container">
                  <div className="row">
                  {this.renderCategoryGroups()}
                    {/* <div className="col-lg-4">
                      <div className="card p-3 card-gradient border-dashed card-ele mb-3 position-relative">
                        <div className="d-flex align-items-center">
                          <div className="mr-4">
                            <img src={process.env.PUBLIC_URL +"/assets/images/icon.svg"}  className="width-80" alt="ICON"/>
                          </div>
                          <div className="text-white">
                            <h4 className="h4">مجموعة الرياضيات</h4>
                            <div className="font-size-18 mb-2">وصف المجموعه</div>
                            <div className="font-size-14 d-flex align-items-center">
                              <div className="mr-2">
                                <i className="far fa-user-circle"></i>
                              </div>
                              <div className="mr-2">طالب</div>
                              <div>680</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card p-3 card-gradient border-dashed card-ele mb-3 position-relative">
                        <div className="d-flex align-items-center">
                          <div className="mr-4">
                            <img src={process.env.PUBLIC_URL +"/assets/images/icon.svg"}  className="width-80" alt="ICON"/>
                          </div>
                          <div className="text-white">
                            <h4 className="h4">مجموعة الرياضيات</h4>
                            <div className="font-size-18 mb-2">وصف المجموعه</div>
                            <div className="font-size-14 d-flex align-items-center">
                              <div className="mr-2">
                                <i className="far fa-user-circle"></i>
                              </div>
                              <div className="mr-2">طالب</div>
                              <div>680</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card p-3 card-gradient border-dashed card-ele mb-3 position-relative">
                        <div className="d-flex align-items-center">
                          <div className="mr-4">
                            <img src={process.env.PUBLIC_URL +"/assets/images/icon.svg"}  className="width-80" alt="ICON"/>
                          </div>
                          <div className="text-white">
                            <h4 className="h4">مجموعة الرياضيات</h4>
                            <div className="font-size-18 mb-2">وصف المجموعه</div>
                            <div className="font-size-14 d-flex align-items-center">
                              <div className="mr-2">
                                <i className="far fa-user-circle"></i>
                              </div>
                              <div className="mr-2">طالب</div>
                              <div>680</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card p-3 card-gradient border-dashed card-ele mb-3 position-relative">
                        <div className="d-flex align-items-center">
                          <div className="mr-4">
                            <img src={process.env.PUBLIC_URL +"/assets/images/icon.svg"}  className="width-80" alt="ICON"/>
                          </div>
                          <div className="text-white">
                            <h4 className="h4">مجموعة الرياضيات</h4>
                            <div className="font-size-18 mb-2">وصف المجموعه</div>
                            <div className="font-size-14 d-flex align-items-center">
                              <div className="mr-2">
                                <i className="far fa-user-circle"></i>
                              </div>
                              <div className="mr-2">طالب</div>
                              <div>680</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card p-3 card-gradient border-dashed card-ele mb-3 position-relative">
                        <div className="d-flex align-items-center">
                          <div className="mr-4">
                            <img src={process.env.PUBLIC_URL +"/assets/images/icon.svg"}  className="width-80" alt="ICON"/>
                          </div>
                          <div className="text-white">
                            <h4 className="h4">مجموعة الرياضيات</h4>
                            <div className="font-size-18 mb-2">وصف المجموعه</div>
                            <div className="font-size-14 d-flex align-items-center">
                              <div className="mr-2">
                                <i className="far fa-user-circle"></i>
                              </div>
                              <div className="mr-2">طالب</div>
                              <div>680</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card p-3 card-gradient border-dashed card-ele mb-3 position-relative">
                        <div className="d-flex align-items-center">
                          <div className="mr-4">
                            <img src={process.env.PUBLIC_URL +"/assets/images/icon.svg"}  className="width-80" alt="ICON"/>
                          </div>
                          <div className="text-white">
                            <h4 className="h4">مجموعة الرياضيات</h4>
                            <div className="font-size-18 mb-2">وصف المجموعه</div>
                            <div className="font-size-14 d-flex align-items-center">
                              <div className="mr-2">
                                <i className="far fa-user-circle"></i>
                              </div>
                              <div className="mr-2">طالب</div>
                              <div>680</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
      </React.Fragment>
    );
  }
}
