import React, { Component } from 'react';
import Slider from "react-slick";
import { Api } from '../../api';
import { Card } from "../shared/card/card";

export class RecentCoursesSlider extends Component {
    state = {
        courses: []
    };

    // sliderSettings = {
    //     infinite: false,
    //     slidesToShow: 3,
    //     slidesToScroll: 3,
    //     autoplay: true,
    //     autoplaySpeed: 2000,
    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 3,
    //                 slidesToScroll: 3,
    //                 infinite: false
    //             }
    //         },
    //         {
    //             breakpoint: 600,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 2,
    //                 initialSlide: 2
    //             }
    //         },
    //         {
    //             breakpoint: 480,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1
    //             }
    //         }
    //     ]
    // };
     sliderSettings = {
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        arrows:true,
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
      }
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Api.courses.getRecentCourses()
            .then(paginator =>this.setState({ courses: paginator.data }));
    }

    render() {
        const courses = this.state.courses;

        if (!courses) return null;

        return <Slider {...this.sliderSettings}>
            {courses.map(course =>
            <div className="px-3"><Card key={course.id} course={course} /></div>
                
            )}
        </Slider>
    }
}