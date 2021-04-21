import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { apiBaseUrl } from "../../api/helpers";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { NULL } from "node-sass";

export class BookletDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booklets: []
        }
    }


    componentDidMount() {
        this.setState({ loading: true });
        const {
            match: { params },
        } = this.props;
        axios
            .get(`${apiBaseUrl}/bookletforsell/bookletforselldetails?idOrSlug=${params.slug}`)
            .then(response => {
                debugger;
                this.setState({ booklets: response.data.data });
                setTimeout(
                    function () {
                        this.setState({ loading: false });
                    }.bind(this),
                    800
                );
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderAttachments(booklet) {

        debugger;
        if(booklet.attachments)
        {
            return (booklet.attachments.map(att => (
                <img className="pad-5" src={att.fileUrl}></img>
            )));
        }
      
    }

    renderBookletDetails() {
        const booklet = this.state.booklets;

        var settings = {
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
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
                {/* <div className="row">
                    <div className="col-md-4 ">
                        <img className="card-img min-top-padd" src={booklet.icon} ></img>
                    </div>

                    <div className="col-md-4">
                        <div className="row">
                            <div className="booklet-description">
                                {booklet.nameAr}
                            </div>
                        </div>

                        <div className="row marg-top-10">
                            <div className="price-title ">
                                سعر الملزمة ملونة
                            </div>
                            <div className="price-value">
                                ريال {booklet.coloredSellPrice}
                            </div>
                        </div>

                        <div className="row">
                            <div className="price-title ">
                                سعر الملزمة أبيض واسود
                            </div>
                            <div className="price-value">
                                ريال {booklet.blackAndWhiteSellPrice}
                            </div>
                        </div>

                        <div className="row marg-top-5">
                            <div className="price-title ">
                                الكمية المتاحة ملونة
                            </div>
                            <div className="price-value">
                                {booklet.availableQtyColored}
                            </div>
                        </div>

                        <div className="row">
                            <div className="price-title ">
                                الكمية المتاحة أبيض واسود
                            </div>
                            <div className="price-value">
                                {booklet.availableQtyBlackAndWhite}
                            </div>
                        </div>


                        <div className="row marg-top-5">
                            <p>
                                {booklet.description}
                            </p>
                        </div>


                    </div>

                    <div className="col-md-4">
                        <label className="lable-height">
                            <button onClick={this.showAlert} className="add-to-collection-max">
                               أضف ملزمة ملونة الى مختاراتي
                             </button>
                            <span class="icon">
                            </span>
                        </label>

                        <label className="lable-height">
                            <button onClick={this.showAlert} className="add-to-collection-max">
                            أضف ملزمة أبيض وأسود الى مختاراتي
                             </button>
                            <span class="icon">
                            </span>
                        </label>
                        
                    </div>

                </div> */}
                {/* <div class="container">
                 <nav aria-label="breadcrumb">
                  <ol class="breadcrumb bg-transparent pt-5">
                    <li class="breadcrumb-item"><a href="/home">الرئيسيه</a></li>
                    <li class="breadcrumb-item"><a href="/booklet">متجر همة للكتب</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{booklet.nameAr}</li>
                  </ol>
                 </nav>
                </div> */}
                <section id="license-one" class="license-one">
                <div class="container">
                <div className="row">
                    <div className="col-md-3 ">
                        <img className="card-img min-top-padd" src={booklet.icon} alt="Hemma-Book" ></img>
                    </div>

                    <div className="col-md-9">
                      <div class="mb-3">
                        <div class="d-flex align-items-center flex-column-small">
                         <h3 class="lic-title h3 main-color font-weight-bold"> {booklet.nameAr}</h3>
                         <div class="d-flex align-items-center">
                            <a class="btn-title" href={`/booklet/details/${booklet.id}`}>كتاب ملون</a>
                            <span class="mx-1"></span>
                            <a class="btn-title" href={`/booklet/details/${booklet.id}`}>أبيض و أسود</a>
                         </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <div class="d-flex align-items-center mb-2">
                          <div class="main-color mr-4">وزن الملزمة </div>
                          <div class="sub-color">{booklet.weight} جرام</div>
                        </div>
                        <div class="d-flex align-items-center ">
                          <div class="main-color mr-4">سعر الملزمة ملونة</div>
                          <div class="sub-color">{booklet.coloredSellPrice} ريال</div>
                        </div>
                        <div class="d-flex align-items-center mb-2">
                         <div class="main-color mr-4">الكمية المتاحة ملونة </div>
                         <div class="sub-color">{booklet.availableQtyColored}</div>
                        </div>
                        <div class="d-flex align-items-center ">
                          <div class="main-color mr-4">سعر الملزمة أبيض و اسود</div>
                          <div class="sub-color">{booklet.blackAndWhiteSellPrice} ريال</div>
                        </div>
                        <div class="d-flex align-items-center  mb-2">
                         <div class="main-color mr-4">الكمية المتاحة أبيض و اسود </div>
                         <div class="sub-color">{booklet.availableQtyBlackAndWhite}</div>
                        </div>
                      </div>
                      <p class="description-card light-gray font-weight-bold mb-3"> {booklet.description}</p>

                     </div> 
                    </div>
               

                </div>
                </section>
                {/* <div className="row marg-top-5">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <Slider {...settings}>


                            {
                                this.renderAttachments(booklet)
                            }


                        </Slider>
                    </div>
                    <div className="col-md-3"></div>
                </div> */}
            </React.Fragment>
        )
    }



    render() {

        return (
            <React.Fragment>
                <Helmet>
                    <title>بيع الملازم | منصّة همّة التعليمية</title>
                    <meta
                        name="description"
                        content="تعرّف على أحدث الدورات المتاحة حالياً وقم باختيار الدورة المناسبة الآن!"
                    />
                </Helmet>
                <section className="pt-3 pb-5">
                    <div className="container">{this.renderBookletDetails()}</div>
                </section>
            </React.Fragment>
        );


    }


}