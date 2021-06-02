import React, { Component } from "react";
import "./styles.sass";
import { Link } from "react-router-dom";

import ReactDOM from "react-dom";
import { Api } from "../../../api";
import swal from "@sweetalert/with-react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class BookletCardComponent extends Component {

  constructor(props) {
    super(props);
  }
  showAlert() {
    alert("I'm an alert");
  }
  onSubmit(type) {
    const booklet = this.props.booklet;
    debugger;
    Api.cart
      .addBookletForSale(booklet.id, type)
      .then((response) => {
        this.props.history.push("/cart");
      })
      .catch((error) => {
        debugger;
        switch (error.response.data && error.response.data.error) {
          case "Duplicate":
            swal("عفواً", "هذه الملزمة مضافة سابقاً إلى سلة التسوق", "error", {
              button: "متابعة",
            });
            break;
          case "BadRequest":
            swal("عفواً", "هذه الملزمة مضافة سابقًا إلى سلة التسوق", "error", {
              button: "متابعة",
            });
            break;
          case "ItemAlreadyPurchased":
            swal("عفواً", "هذه الملزمة موجودة ضمن قائمة دوراتك", "error", {
              button: "متابعة",
            });
            break;
          case "ItemAlreadyAdded":
            this.props.history.push("/cart");
            break;
          case "BookletNotAvailable":
            swal("عفواً", "هذة الملزمة غير متاحة", "error", {
                   button: "متابعة",
             });
            break;
          default:
            swal("عفواً", "عليك تسجيل الدخول للقيام بهذه الخطوة", "error", {
              button: "متابعة",
            });
            break;
        }
      });
  }

  render() {
    const booklet = this.props.booklet;
    return (<React.Fragment > {
      /* <Link to={`/course/details/`} key="0">
                <div className="card course-card shadow-sm m-2 border-0" dir="rtl">
                  <header className="card-thumb">
                    <img key="" src="https://hemma.ams3.cdn.digitaloceanspaces.com/img/course_banners/b359ee89-c5c9-4172-99d5-a73cb8d5df1f.jpeg" alt="" />
                  </header>
                  <div className="card-body">

                    <p>{booklet.nameAr}</p>
                    <p>{booklet.sellPrice}</p>
                  </div>

                </div>
              </Link> */
    }

     
    
<div className = "col-lg-4" >
      <div class="d-flex">
        <div className="mr-4" >
           <img  src={booklet.icon}  class="width-130" alt="Hemma-Logo"></img> 
        </div>
        <div >
           <h5 > <a  class="h5 main-color" id="link" href={`/booklet/details/${booklet.id}`} > {booklet.nameAr} </a> </h5>
           <div class="gray-tag">كتاب ملون</div>
           <div  onClick={() => this.onSubmit("Colored")} class="price-tag"> {booklet.coloredSellPrice} ريال</div>
           <div class="gray-tag">أبيض وأسود</div>
           <div  onClick={() => this.onSubmit("BlackAndWhite")} class="price-tag">{booklet.blackAndWhiteSellPrice} ريال</div>
        </div> 
      </div>
    
  </div>



      {/* <div className="row  card-container">
        <div className="col-md-6" >
          <div className="row">
            <div className="booklet-description">
              <a id="link" href={`/booklet/details/${booklet.id}`} > {booklet.nameAr} </a>
            </div>
          </div>

          <div className="row top-padd">
            <div className="col-xs-6 price-badge" > {booklet.coloredSellPrice}
            ملونة ريال </div>
          </div> <div className="row">
            <div className="col-xs-6 price-badge" > {booklet.blackAndWhiteSellPrice}
            ابيض واسود ريال </div>
          </div>


          <div className="row" >
            <label className="z-marg-bottom">
              <button className="add-to-collection"  onClick={() => this.onSubmit("Colored")}>
                اضف ملزمة ملونة لمختاراتي
            </button> <span class="icon" >
                </span> </label>
            </div>
            
            <div className="row" >
            <label className="z-marg-bottom">
              <button  onClick={() => this.onSubmit("BlackAndWhite")} className="add-to-collection">
                اضف ملزمة أبيض وأسود لمختاراتي
            </button> <span class="icon" >
                </span> </label>
            </div>

            </div> <div className="col-md-6" >
                  <img className="card-img" src={booklet.icon} ></img> 
                  </div> 
                  </div> */}

            </React.Fragment>
        );
    }

}
export const BookletCard = withRouter(BookletCardComponent);