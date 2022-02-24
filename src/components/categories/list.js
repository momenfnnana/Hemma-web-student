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
import swal from "@sweetalert/with-react";
import ShowAt from "../../HOC/show-at";

const MyLoader = props => (
  <div className="container">
    <div className="row mb-3">
      <div className="col-md-12">
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
      </div>
    </div>
 
   
    <div className="row">
      <div className="col-md-4">
        <ContentLoader height="300" className="mb-4">
          <rect x="0" y="0" rx="5" ry="5" width="370" height="300" />
        </ContentLoader>
      </div>
      <div className="col-md-4">
        <ContentLoader height="300" className="mb-4">
          <rect x="0" y="0" rx="5" ry="5" width="370" height="300" />
        </ContentLoader>
      </div>
      <div className="col-md-4">
        <ContentLoader height="300" className="mb-4">
          <rect x="0" y="0" rx="5" ry="5" width="370" height="300" />
        </ContentLoader>
      </div>
    </div>
  </div>
);
export class CategoriesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: false,
      CategoryName:"",
      CourseName:""
    };
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeCourse = this.handleChangeCourse.bind(this);
    this.getSearchResult = this.getSearchResult.bind(this);
  }
getSearchResult (){
  this.setState({ loading: true });
    axios
      .get(`${apiBaseUrl}/categories?limit=40&CategoryName=${this.state.CategoryName}&CourseName=${this.state.CourseName}`)
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
// componentWillMount()
// {
  
// }
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
  handleChangeCategory(event)
  {
    this.setState({CategoryName: event.target.value});
  }
  handleChangeCourse(event)
  {
    this.setState({CourseName: event.target.value});
  }
  renderCategories() {
    const cats = this.state.categories;
    const { match, location, history } = this.props;
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
                  onClick={() => {(cat.active==false && cat.FeaturedInMain==true)? 
                  (cat.inactiveCategoryMessage)? 
                  swal(
                    "عفواً",
                    cat.inactiveCategoryMessage,
                    "error", 
                   {
                     button: "متابعة"
                   }
                   ):
                   swal(
                    "عفواً",
                    "انتهت الدورات الحالية نستأنف الدورات القادمة قريبًا"  ,
                    "error", 
                   {
                     button: "متابعة"
                   }
                      )
                   :history.push(`/categories/details/${cat.id}`)}}
                >
              
                  {/* <Link
                    to={{
                      pathname: `/categories/details/${cat.slug}`,
                      state: {
                        catId: cat.id
                      }
                    }}
                    key={cat.id}
                    className="d-flex align-items-center"
                  > */}
                  <div className="d-flex align-items-center cursor-pointer">
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
                  </div>
                   
                  {/* </Link> */}
                 
                  <Link
                    to={{
                      pathname: `/categories/details/${cat.id}`,
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
                  <ShowAt at={!cat.professionalLicense}>
                  <CardsList catId={cat.id} />
                  </ShowAt>
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
        <form>
          <div className="row col-md-12"> 
        
            <input placeholder="اسم المنصة" value={this.state.CategoryName} onChange={this.handleChangeCategory} className="form-control col-md-3 m-2">
            </input>
            <input placeholder="اسم الكورس"  value={this.state.CourseName} onChange={this.handleChangeCourse} className="form-control col-md-3 m-2">
            </input>
            <input type="button" className="form-control col-md-1 m-2"  onClick={this.getSearchResult} value="بحث"></input>
            </div>
            </form>
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

export default withRouter(CategoriesComponent);
