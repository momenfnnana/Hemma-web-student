import React, { Component } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BookletCard } from "../bookletCard/bookletCard";
import { apiBaseUrl } from "../../../api/helpers";
import EmptyCountWrapper from "../../../HOC/EmptyCountWrapper";
import EmptyData from "../../../shared/EmptyData";

export class BookletCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booklets: [],
    };

    //this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  // forceUpdateHandler(){
  //     this.forceUpdate();
  //   };
  //

  componentDidMount() {
    // this.loadBooklets();
  }

  render() {
    // this.loadBooklets();
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

    const { booklets = [], loading } = this.props;

    return (
      <EmptyCountWrapper count={booklets?.length} loading={loading} emptyComp={()=><EmptyData />}>
          <>
        {booklets.map((category) => (
          <React.Fragment>
            <div className="col-lg-12">
              <h3 class="h3 sub-color ml-0" className="category-title ml-0">
                {category.nameAr}
              </h3>
            </div>
            {
              <>
                {category.bookletsForSell.map((booklet) => (
                  <React.Fragment key={booklet.id}>
                    {<BookletCard key={booklet.id} booklet={booklet} />}
                  </React.Fragment>
                ))}
              </>
            }
          </React.Fragment>
        ))}
        s
        </>
      </EmptyCountWrapper>
    );
  }
}
