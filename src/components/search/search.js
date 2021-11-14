import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../shared/card/card";
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";
import { apiBaseUrl } from "../../api/helpers";
import { Helmet } from "react-helmet";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-beat.scss";
import swal from "@sweetalert/with-react";

const MyLoader = (props) => (
  <div className="container">
    <div className="row mb-3">
      <div className="col-md-12">
        <ContentLoader
          rtl
          height={50}
          width={300}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
          {...props}
        >
          <circle cx="25" cy="25" r="25" />
          <rect x="60" y="21" rx="4" ry="4" width="150" height="10" />
        </ContentLoader>
      </div>
    </div>

    <div className="row">
      <div className="col-md-4">
        <ContentLoader height="300" className="mb-4">
          <rect x="0" y="0" rx="5" ry="5" width="370" height="300" />
        </ContentLoader>
      </div>
      <div className="col-md-4">
        <ContentLoader height="300" className="mb-4">
          <rect x="0" y="0" rx="5" ry="5" width="370" height="300" />
        </ContentLoader>
      </div>
      <div className="col-md-4">
        <ContentLoader height="300" className="mb-4">
          <rect x="0" y="0" rx="5" ry="5" width="370" height="300" />
        </ContentLoader>
      </div>
    </div>
  </div>
);

const Search = (props) => {
  const { match, history } = props;

  const [state, setState] = useState({
    categories: [],
    loading: false,
    CategoryName: "",
    CourseName: "",
  });

  const getSearchResult = () => {
    setState({ ...state, loading: true });
    axios
      .get(`${apiBaseUrl}/Courses/SearchCourse/${match?.params?.slug}`)
      .then((response) => {
        setState({ ...state, categories: response.data.data, loading: false });
      })
      .catch((error) => {
        setState({ ...state, loading: false });
        console.log(error);
      });
  };

  const renderCategories = () => {
    const cats = state.categories;
    var settings = {
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      arrows: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <>
        {cats?.length
          ? cats?.map((cat) => (
              <>
                {state.loading ? (
                  <MyLoader style={{ height: 50 }} />
                ) : (
                  <>
                    <div className="row pt-5">
                      <div
                        className="col-12 d-inline-flex align-items-center justify-content-between"
                        key={cat.id}
                        onClick={() => {
                          cat.active === false && cat.FeaturedInMain === true
                            ? cat.inactiveCategoryMessage
                              ? swal(
                                  "عفواً",
                                  cat.inactiveCategoryMessage,
                                  "error",
                                  {
                                    button: "متابعة",
                                  }
                                )
                              : swal(
                                  "عفواً",
                                  "انتهت الدورات الحالية نستأنف الدورات القادمة قريبًا",
                                  "error",
                                  {
                                    button: "متابعة",
                                  }
                                )
                            : history.push(`/categories/details/${cat.slug}`);
                        }}
                      >
                        <div className="d-flex align-items-center cursor-pointer">
                          <div className="full-circle-border mr-2">
                            <img
                              key={cat.id}
                              src={cat.icon}
                              height="25"
                              width="25"
                              className="contain-img"
                              alt={cat.nameAr}
                            />
                          </div>
                          <h5 key={cat.id} className="dark-text mb-0">
                            {cat.nameAr}
                          </h5>
                        </div>
                        <Link
                          to={{
                            pathname: `/categories/details/${cat.slug}`,
                            state: {
                              catId: cat.id,
                            },
                          }}
                          key={cat.id}
                          className="btn dark-btn unset-height unset-line-height br-5"
                        >
                          {state.loading === true ? (
                            <Loader type="ball-beat" className="dark-loader" />
                          ) : (
                            "شاهد المزيد"
                          )}
                        </Link>
                      </div>
                    </div>
                    <div className="row pt-4">
                      <div className="col-12">
                        <Slider className="w-100" {...settings}>
                          {cat?.courses.map((course) => (
                            <div key={course.id} className="px-3">
                              <Card key={course.id} course={course} />
                            </div>
                          ))}
                        </Slider>
                      </div>
                    </div>
                  </>
                )}
              </>
            ))
          : null}
      </>
    );
  };

  useEffect(() => {
    setState({ ...state, loading: true });
    getSearchResult();
  }, [match?.params?.slug]);

  return (
    <>
      <Helmet>
        <title>الدورات الحالية | منصّة همّة التعليمية</title>
        <meta
          name="description"
          content="تعرّف على أحدث الدورات المتاحة حالياً وقم باختيار الدورة المناسبة الآن!"
        />
      </Helmet>
      <section className="pt-3 pb-5">
        <div className="container">{renderCategories()}</div>
      </section>
    </>
  );
};

export default Search;
