import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { apiBaseUrl } from "../../api/helpers";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Api } from "../../api";
import swal from "@sweetalert/with-react";
// import { NULL } from "node-sass";

const TraingleIcon = ({style={}})=>(
    <svg style={{...style}} className="svg-inline--fa fa-caret-left fa-w-6 light-sub-color mr-2 font-size-25" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" data-fa-i2svg=""><path fill="currentColor" d="M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z"></path></svg>
)

export default class BookletDetailsComponent extends Component {
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
        if(booklet.attachments)
        {
            return (booklet.attachments.map(att => (
                <img className="pad-5" src={att.fileUrl}></img>
            )));
        }
      
    }
    onSubmit(type) {
        const booklet = this.state.booklets;
        Api.cart
          .addBookletForSale(booklet.id, type)
          .then((response) => {
            this.props.history.push("/cart");
          })
          .catch((error) => {
            switch (error.response.data && error.response.data.error) {
              case "Duplicate":
                swal("??????????", "?????? ?????????????? ?????????? ???????????? ?????? ????????????????", "error", {
                  button: "????????????",
                });
                break;
              case "BadRequest":
                swal("??????????", "?????? ?????????????? ?????????? ???????????? ?????? ????????????????", "error", {
                  button: "????????????",
                });
                break;
              case "ItemAlreadyPurchased":
                swal("??????????", "?????? ?????????????? ???????????? ?????? ?????????? ????????????", "error", {
                  button: "????????????",
                });
                break;
              case "ItemAlreadyAdded":
                this.props.history.push("/cart");
                break;
                case "BookletNotAvailable":
                    swal("??????????", "?????? ?????????????? ?????? ??????????", "error", {
                           button: "????????????",
                     });
                    break;
              default:
                swal("??????????", "???????? ?????????? ???????????? ???????????? ???????? ????????????", "error", {
                  button: "????????????",
                });
                break;
            }
          });
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
                                ?????? ?????????????? ??????????
                            </div>
                            <div className="price-value">
                                ???????? {booklet.coloredSellPrice}
                            </div>
                        </div>

                        <div className="row">
                            <div className="price-title ">
                                ?????? ?????????????? ???????? ??????????
                            </div>
                            <div className="price-value">
                                ???????? {booklet.blackAndWhiteSellPrice}
                            </div>
                        </div>

                        <div className="row marg-top-5">
                            <div className="price-title ">
                                ???????????? ?????????????? ??????????
                            </div>
                            <div className="price-value">
                                {booklet.availableQtyColored}
                            </div>
                        </div>

                        <div className="row">
                            <div className="price-title ">
                                ???????????? ?????????????? ???????? ??????????
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
                               ?????? ?????????? ?????????? ?????? ????????????????
                             </button>
                            <span class="icon">
                            </span>
                        </label>

                        <label className="lable-height">
                            <button onClick={this.showAlert} className="add-to-collection-max">
                            ?????? ?????????? ???????? ?????????? ?????? ????????????????
                             </button>
                            <span class="icon">
                            </span>
                        </label>
                        
                    </div>

                </div> */}
                {/* <div class="container">
                 <nav aria-label="breadcrumb">
                  <ol class="breadcrumb bg-transparent pt-5">
                    <li class="breadcrumb-item"><a href="/home">????????????????</a></li>
                    <li class="breadcrumb-item"><a href="/booklet">???????? ?????? ??????????</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{booklet.nameAr}</li>
                  </ol>
                 </nav>
                </div> */}
                {/* <div class="container-fluid p-0">
           <nav aria-label="breadcrumb">
           <ol class="breadcrumb bg-transparent pt-4 px-0">
            <li class="breadcrumb-item"><a href="/home">????????????????</a></li>
            <li class="breadcrumb-item active" aria-current="page">???????? ?????? ??????????</li>
           </ol>
           </nav>
            </div> */}


                <section id="license-one" class="license-one booklet-details">
                <div class="container">
                <div className="row">
                    <div className="col-md-3 col-12">
                        <img className="w-100 h-auto" src={booklet.icon} alt="Hemma-Book" ></img>
                    </div>

                    <div className="col-md-9">
                      <div class="mb-3">
                        <div class="d-flex  flex-column">
                         <h3 class="lic-title h3 main-color font-weight-bold"> {booklet.nameAr}</h3>
                         <div class="d-flex align-items-center">
                            <a class="booklet-tag font-bold p-2 " onClick={() => this.onSubmit("Colored")} >???????? ????????</a>
                            <span class="mx-1"></span>
                            <a class="booklet-tag font-bold p-2 " onClick={() => this.onSubmit("BlackAndWhite")}>???????? ?? ????????</a>
                         </div>
                        </div>
                      </div>
                      <div class="mb-3">
                      <div class="d-flex align-items-center mb-2">
                          <TraingleIcon />
                          <div class="main-color mr-5">?????? ?????????????? </div>
                          <div class="text-muted">{booklet.categoryNameAr}</div>
                        </div>
                       
                      </div>
                      <div class="d-flex align-items-center mb-2">
                          <TraingleIcon style={{alignSelf:'baseline'}} />
                          <p class="description-card light-gray font-weight-bold m-0 p-0"> {booklet.description}</p>
                      </div>
                      <div  class="d-flex align-items-center mb-2">
                            <TraingleIcon />
                            <div  class="main-color mr-5">
                                ?????? ?????????????? ??????????
                            </div>
                            <div  class="text-muted" >
                                ???????? {booklet.coloredSellPrice}
                            </div>
                      </div>

                      <div  class="d-flex align-items-center mb-2">
                            <TraingleIcon />
                            <div class="main-color mr-5" >
                                ?????? ?????????????? ???????? ??????????
                            </div>
                            <div  class="text-muted" >
                                ???????? {booklet.blackAndWhiteSellPrice}
                            </div>
                       </div>
                       <div class="d-flex align-items-center mb-2">
                            <TraingleIcon />
                            <div class="main-color mr-5" >
                                ???????????? ?????????????? ??????????
                            </div>
                            <div class="text-muted">
                                {booklet.availableQtyColored}
                            </div>
                        </div>

                        <div class="d-flex align-items-center mb-2">
                            <TraingleIcon />
                            <div class="main-color mr-5">
                                ???????????? ?????????????? ???????? ??????????
                            </div>
                            <div class="text-muted">
                                {booklet.availableQtyBlackAndWhite}
                            </div>
                        </div>
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
                    <title>?????? ?????????????? | ?????????? ???????? ??????????????????</title>
                    <meta
                        name="description"
                        content="?????????? ?????? ???????? ?????????????? ?????????????? ???????????? ?????? ?????????????? ???????????? ???????????????? ????????!"
                    />
                </Helmet>
                <section className="pt-3 pb-5">
                    <div className="container">{this.renderBookletDetails()}</div>
                </section>
            </React.Fragment>
        );


    }


}