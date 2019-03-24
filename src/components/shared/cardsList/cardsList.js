import React, { Component } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../card/card";
import ContentLoader from "react-content-loader";

const MyLoader = props => (
  <ContentLoader
    rtl
    height={300}
    width={300}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    <rect x="5" y="71.95" rx="5" ry="5" width="250" height="0" />
    <rect x="9" y="190" rx="4" ry="4" width="148" height="10" />
    <rect x="9" y="211" rx="4" ry="4" width="275" height="10" />
    <rect x="9" y="7.61" rx="0" ry="0" width="275" height="172.33" />
    <rect x="9" y="233" rx="4" ry="4" width="70" height="10" />
    <rect x="113" y="234" rx="4" ry="4" width="70" height="10" />
    <rect x="214" y="235" rx="4" ry="4" width="70" height="10" />
    <rect x="215" y="257" rx="4" ry="4" width="70" height="10" />
  </ContentLoader>
);

export class CardsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(
        "https://api.staging.hemma.sa/api/v1/categories/" +
          this.props.catId +
          "/courses?featuredOnly=true"
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
  }

  renderCards() {
    return this.state.courses.map(course => (
      <React.Fragment>
        {this.state.loading ? (
          <MyLoader />
        ) : (
          <Card key={course.id} course={course} />
        )}
      </React.Fragment>
    ));
  }

  render() {
    var settings = {
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
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
    return (
      <React.Fragment>
        <Slider {...settings}>{this.renderCards()}</Slider>
      </React.Fragment>
    );
  }
}
