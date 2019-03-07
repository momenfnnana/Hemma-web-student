import React, { Component } from "react";
import axios from "axios";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { CardsList } from "../shared/cardsList/cardsList";

export class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    axios
      .get("https://api.staging.hemma.sa/api/v1/categories")
      .then(response => {
        this.setState({ categories: response.data.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderCategories() {
    const cats = this.state.categories;
    return cats.map(cat => (
      <React.Fragment>
        <div className="row pt-5">
          <div className="col-12 d-inline-flex align-items-center">
            <h5 key={cat.id} className="dark-text mb-0">
              <img key={cat.id} src={cat.icon} height="50" className="mr-2" />
              {cat.nameAr}
            </h5>
          </div>
        </div>

        <div className="row pt-4">
          <div className="col-12">
            <CardsList catId={cat.id} />
          </div>
        </div>
      </React.Fragment>
    ));
  }

  render() {
    return (
      <React.Fragment>
        <section className="pt-3 pb-5">
          <div className="container">{this.renderCategories()}</div>
        </section>
      </React.Fragment>
    );
  }
}
