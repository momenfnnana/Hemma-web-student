import React, { Component } from "react";
import "./styles.sass";
import { Link } from "react-router-dom";

import ReactDOM from "react-dom";

export class BookletCard extends Component {

  showAlert() {
    alert("I'm an alert");
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
      <div className="row  card-container">
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
              <button onClick={this.showAlert} className="add-to-collection">
                اضف ملزمة ملونة لمختاراتي
            </button> <span class="icon" >
                </span> </label>
            </div>
            
            <div className="row" >
            <label className="z-marg-bottom">
              <button onClick={this.showAlert} className="add-to-collection">
                اضف ملزمة أبيض وأسود لمختاراتي
            </button> <span class="icon" >
                </span> </label>
            </div>

            </div> <div className="col-md-6" >
                  <img className="card-img" src={booklet.icon} ></img> 
                  </div> 
                  </div>

            </React.Fragment>
        );
    }

}