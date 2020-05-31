import React, { Component } from "react";
import axios from "axios";
import { CardsList } from "../shared/cardsList/cardsList";
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";
import { apiBaseUrl } from "../../api/helpers";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-beat.scss";

const MyLoader = props => (
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
);
export class CategoriesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`${apiBaseUrl}/categories?limit=40`)
      .then(response => {
        this.setState({ categories: response.data.data.data });
        setTimeout(
          function () {
            this.setState({loading: false });
          }.bind(this),
          800 
        );
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderCategories() {
    const cats = this.state.categories;
    return cats.map(cat => (
      <>
        {this.state.loading ? (
          <MyLoader style={{ height: 50 }} />
        ) : (
            <React.Fragment>
              <div className="row pt-5">
                <div
                  className="col-12 d-inline-flex align-items-center justify-content-between"
                  key={cat.id}
                >

                  <Link
                    to={{
                      pathname: `/categories/details/${cat.slug}`,
                      state: {
                        catId: cat.id
                      }
                    }}
                    key={cat.id}
                    className="d-flex align-items-center"
                  >
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
                  </Link>
                  <Link
                    to={{
                      pathname: `/categories/details/${cat.slug}`,
                      state: {
                        catId: cat.id
                      }
                    }}
                    key={cat.id}
                    className="btn dark-btn unset-height unset-line-height br-5"
                  >
                    {this.state.loading == true ? (
                  <Loader type="ball-beat" className="dark-loader" />
                ) : (
                    "شاهد المزيد"
                    )}
            </Link>
                
                </div>
              </div>
              <div className="row pt-4">
                <div className="col-12">
                  <CardsList catId={cat.id} />
                </div>
              </div>
            </React.Fragment>
          )}
      </>
    ));
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>الدورات الحالية | منصّة همّة التعليمية</title>
          <meta
            name="description"
            content="تعرّف على أحدث الدورات المتاحة حالياً وقم باختيار الدورة المناسبة الآن!"
          />
        </Helmet>
        <section className="pt-3 pb-5">
          <div className="container">{this.renderCategories()}</div>
        </section>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    formValues: state.form.Search && state.form.Search.values
  };
}

CategoriesComponent = reduxForm({
  form: "Search"
})(CategoriesComponent);

CategoriesComponent = connect(mapStateToProps)(CategoriesComponent);

export const Categories = withRouter(CategoriesComponent);
