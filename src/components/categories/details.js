import React, { Component } from "react";
import axios from "axios";
import { FaGraduationCap } from "react-icons/fa";
import { CardsList } from "../shared/cardsList/cardsList";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.sass";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { PublicationDetails } from "../publication/publication";

export class CategoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      lectures: [],
      content: [],
      publications: [],
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
      .get(`https://api.staging.hemma.sa/api/v1/categories/${params.id}`)
      .then(response => {
        this.setState({ details: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(
        `https://api.staging.hemma.sa/api/v1/categories/${
          params.id
        }/free-lectures`
      )
      .then(response => {
        this.setState({ lectures: response.data.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(
        `https://api.staging.hemma.sa/api/v1/categories/${
          params.id
        }/free-content`
      )
      .then(response => {
        this.setState({ content: response.data.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(
        `https://api.staging.hemma.sa/api/v1/categories/${
          params.id
        }/publications`
      )
      .then(response => {
        this.setState({ publications: response.data.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderPublications() {
    return this.state.publications.map(publication => (
      <div className="publication-img" key={publication.id}>
        <img
          src={publication.thumbnailUrl}
          width="100%"
          onClick={() => this.openModal(publication.id)}
        />
      </div>
    ));
  }

  renderLectures() {
    return this.state.lectures.map(lecture => (
      <li
        key={lecture.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <div className="media">
          <div className="gradient-bg mr-4 d-flex align-items-center justify-content-center">
            <FaGraduationCap className="text-white" size="34" />
          </div>
          <div className="media-body mt-2">
            <h6 className="dark-text mb-0">{lecture.nameAr}</h6>
            <ul className="list-inline mt-2">
              <li className="list-inline-item small mt-0">
                <p href="" className="light-text">
                  أ. طلال محمد{" "}
                </p>
              </li>
              <li className="list-inline-item light-font-text small mt-0 ml-2">
                <div className="dark-bg pl-4 pr-4 pt-1 pb-1 rounded">
                  <p className="text-white en-text mb-0">10:54</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <button type="submit" className="btn light-outline-btn unset-height">
          انضم
        </button>
      </li>
    ));
  }

  // renderFreeContent() {
  //   return this.state.content.map(content => (
  //     <div className="card" dir="rtl">
  //       <img
  //         className="card-img-top"
  //         key={content.id}
  //         src={content.bannerUrl}
  //         alt="Course image"
  //       />
  //       <div className="card-body">
  //         <h6 className="card-title dark-text" key={content.id}>
  //           {content.nameAr}
  //         </h6>
  //       </div>
  //     </div>
  //   ));
  // }

  render() {
    var customSettings = {
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
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
    const {
      match: { params }
    } = this.props;
    return (
      <React.Fragment>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4 text-center">
                <div className="half-circle-border d-flex justify-content-center align-items-center mx-auto">
                  <img
                    src={this.state.details.icon}
                    height="50"
                    width="50"
                    className="mt-3"
                  />
                </div>
                <h5 className="dark-text mt-3">{this.state.details.nameAr}</h5>
                <p className="dark-text mt-2 small">
                  {this.state.details.descriptionAr}
                </p>
              </div>
            </div>
            <div className="row pt-2 pb-5">
              <div className="col-12">
                <CardsList catId={params.id} />
              </div>
            </div>
            <div className="row pt-5 pb-3">
              <div className="col-md-4">
                <h3 className="dark-text mt-3">إننا حابين نفيدكم قدمنا لكم</h3>
                <h3 className="light-text">محاضرات مجانية</h3>
                <p className="dark-silver-text small">
                  نقدم مجموعة من المحاضرات المجانية كل أسبوعتابعونا لتعرفوا
                  المزيد
                </p>
              </div>
              <div className="col-md-8">
                <form>
                  <ul className="list-group">{this.renderLectures()}</ul>
                </form>
              </div>
            </div>

            <div className="row pt-5 pb-3 no-gutters">
              <div className="col-9">
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
              <div className="col-3">
                {/* <Slider {...customSettings}>{this.renderFreeContent()}</Slider> */}
              </div>
            </div>

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
          </div>
        </section>
      </React.Fragment>
    );
  }
}
