import React, { Component } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Card } from "../card/card";

export class CardsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      responsive: {
        0: { items: 1 },
        600: { items: 1 },
        1024: { items: 3 }
      },
      stagePadding: {
        paddingLeft: 0,
        paddingRight: 0
      }
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://api.staging.hemma.sa/api/v1/categories/" +
          this.props.catId +
          "/courses?featuredOnly=true"
      )
      .then(response => {
        this.setState({ courses: response.data.data.data });
        console.log("courses are ", this.state.courses);
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderCards() {
    return this.state.courses.map(course => (
      <Card key={course.id} course={course} />
    ));
  }

  render() {
    const items = this.renderCards();
    return (
      <React.Fragment>
        <div dir="ltr">
          <AliceCarousel
            items={items}
            responsive={this.state.responsive}
            dotsDisabled={true}
            buttonsDisabled={true}
            mouseDragEnabled={true}
            stagePadding={this.state.stagePadding}
            infinite={true}
            autoPlayDirection="rtl"
            startIndex={0}
          />
        </div>
      </React.Fragment>
    );
  }
}
