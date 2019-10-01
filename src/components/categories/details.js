import React, { Component } from "react";
import axios from "axios";
import { FaGraduationCap } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../shared/card/card";
import { CardsList } from "../shared/cardsList/cardsList";
import "./styles.sass";
import { PublicationDetails } from "../publication/publication";
import { apiBaseUrl } from "../../api/helpers";

export class CategoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      lectures: [],
      content: [],
      publications: [],
      courses: [],
      selectedPublicationId: null,
      modalIsOpen: false
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

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    axios
      .get(`${apiBaseUrl}/categories/${params.slug}`)
      .then(response => {
        this.setState({ details: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`${apiBaseUrl}/FreeLectures?categoryIdOrSlug=${params.slug}`)
      .then(response => {
        this.setState({ lectures: response.data.data });
        console.log("lectures ", this.state.lectures);
      })
      .catch(error => {
        console.log(error);
      });

    // axios
    //   .get(
    //     `${apiBaseUrl}/categories/${
    //       params.id
    //     }/free-content`
    //   )
    //   .then(response => {
    //     this.setState({ content: response.data.data.data });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    axios
      .get(`${apiBaseUrl}/categories/${params.slug}/publications`)
      .then(response => {
        this.setState({ publications: response.data.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(
        `${apiBaseUrl}/categories/` + params.slug + "/courses?featuredOnly=true"
      )
      .then(response => {
        this.setState({ courses: response.data.data.data });
        setTimeout(
          function() {
            this.setState({ loading: false });
          }.bind(this),
          800
        );
      })
      .catch(error => {
        console.log(error);
      });

    // axios
    //   .get(`${apiBaseUrl}/courses/recent`)
    //   .then(response => {
    //     this.setState({ courses: response.data.data.data });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  renderPublications() {
    return this.state.publications.map(publication => (
      <React.Fragment>
        <div
          className="publication-img"
          key={publication.id}
          onClick={() => this.openModal(publication.id)}
        >
          <img src={publication.thumbnailUrl} width="100%" />
          <div className="publication-overlay">
            <img src={process.env.PUBLIC_URL + "/assets/images/eye.png"} />
          </div>
        </div>
      </React.Fragment>
    ));
  }

  renderCards() {
    return this.state.courses.map(course => (
      <React.Fragment>
        <div className="col-md-4">
          <Card key={course.id} course={course} />
        </div>
      </React.Fragment>
    ));
  }

  renderLectures() {
    return this.state.lectures.map(lecture => (
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
            onClick={() => window.open(lecture.broadcastUrl, "_blank")}
          >
            انضم
          </button>
        )}
      </li>
    ));
  }

  // renderFreeContent() {
  //   return this.state.courses.map(course => (
  //     <Card key={course.id} course={course} />
  //   ));
  // }

  render() {
    // var customSettings = {
    //   infinite: false,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   autoplay: false,
    //   autoplaySpeed: 2000,
    //   arrows: false,
    //   responsive: [
    //     {
    //       breakpoint: 1024,
    //       settings: {
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //         infinite: false
    //       }
    //     },
    //     {
    //       breakpoint: 600,
    //       settings: {
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //         initialSlide: 1
    //       }
    //     },
    //     {
    //       breakpoint: 480,
    //       settings: {
    //         slidesToShow: 1,
    //         slidesToScroll: 1
    //       }
    //     }
    //   ]
    // };

    var settings = {
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
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
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
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    const {
      match: { params }
    } = this.props;
    return (
      <React.Fragment>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="half-circle-border d-flex justify-content-center align-items-center mx-auto">
                  <img
                    src={this.state.details.icon}
                    height="50"
                    width="50"
                    className="mt-3"
                  />
                </div>
                <h5 className="dark-text mt-3">{this.state.details.nameAr}</h5>
                <p className="dark-text mt-2 small w-40 mx-auto">
                  {this.state.details.descriptionAr}
                </p>
              </div>
            </div>
            <div className="row pt-2 pb-5">{this.renderCards()}</div>

            {this.state.lectures && this.state.lectures.length > 0 ? (
              <div className="row pt-2 pb-3">
                <div className="col-md-4">
                  <h4 className="dark-text mt-3">
                    لأننا حابين نفيدكم قدمنا لكم
                  </h4>
                  <h4 className="light-text">محاضرات مجانية</h4>
                  <p className="dark-silver-text small text-break mb-0">
                    نقدم مجموعة من المحاضرات المجانية كل أسبوعتابعونا لتعرفوا
                    المزيد
                  </p>
                </div>
                <div className="col-md-8">
                  <Slider {...verticalCarousel}>{this.renderLectures()}</Slider>
                </div>
              </div>
            ) : null}

            {/* <div className="row pt-5 pb-3 no-gutters d-flex align-items-center">
              <div className="col-md-8 col-12">
                <div
                  className="gradient-bg w-100 d-flex align-items-center justify-content-center"
                  style={{ height: 180 }}
                >
                  <div className="media">
                    <div className="mr-4">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/megaphone.png"
                        }
                        height="60"
                      />
                    </div>
                    <div className="media-body">
                      <h3 className="text-white light-font-text mb-1">
                        لا تفوت المحتوى المجاني
                      </h3>
                      <p className="text-white light-font-text">
                        تحتوي هذه المنصة على مجموعة من الدروس والتمرينات
                        المجانية.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 negative-margin">
                <Slider {...customSettings}>{this.renderFreeContent()}</Slider>
              </div>
            </div> */}

            {this.state.publications && this.state.publications.length > 0 ? (
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
            ) : null}
          </div>
        </section>
      </React.Fragment>
    );
  }
}
