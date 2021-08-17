import React, { Component,useEffect ,useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Card } from "../shared/card/card";
import { apiBaseUrl } from "../../api/helpers";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import { loginWithTwitter } from "../auth/firebase";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./styles.sass";
import "./main.sass";
 import AOS from 'aos';
 import Glide from '@glidejs/glide'
import HemmaSuccess from "./hemma-success";
import "./index.scss"
// Required Core Stylesheet
// import "public/assets/css/glide.core.min.css";
import WrapperText from './../../shared-components/WrappedText/inedx';
// // Optional Theme Stylesheet
// import "public/assets/css/glide.theme.min.css";


var moment = require("moment");
moment().format();
const MIN_ELEM_COUNT = 3
const MOBILE_SCREEN_WIDTH = 800
const {innerWidth} = window

const isMobile = innerWidth <= MOBILE_SCREEN_WIDTH


const disabledCarsoulOptions = {
  type : '',
  autoplay: false,
}

const mobileCarsoulOptions = {
  type : '',
  autoplay: false,
  perView: 1,
  startAt: 0,
  swipeThreshold:5000
}

const enabledCarsoulOptions = {
  type: 'carousel',
  startAt: 1,
  perView: 3,
  focusAt: 'center',
  gap: 20,
  autoplay: 4000,
  // animationTimingFunc: 'ease-in-out',
  animationDuration: 800,
  // peek: {
  //   before: 100,
  //   after: 100
  // },
  hoverpause: false,
  keyboard: true,
  direction: 'rtl',
  breakpoints: {

    1200: { perView: 2 },
    992: { perView: 2 },
    768: { perView: 1 }

  }
}

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      courses: [],
      testimonials: [],
      initiatives: [],
      categoryGroups: [],
      success : [],
      maxSuccessHeight : 'fit-content'
    };
  }

  activateGlide(glideWrapper,count) {
    //IF DATA LENGTH IS LESS THAN MIN SO IT SHOULD BE STATIC VIEW "NOT A CARSOUL"
    const lessThanThreeElemesOptions = count <= MIN_ELEM_COUNT ? disabledCarsoulOptions : null
    const isMobileOptions = isMobile ? mobileCarsoulOptions : null
    const mergedOptions = {...lessThanThreeElemesOptions,...isMobileOptions}
    new Glide(glideWrapper,{...enabledCarsoulOptions,...mergedOptions}).mount()
  }

  componentDidMount() {
    const myOptions = {
      type: 'carousel',
      startAt: 1,
      perView: 3,
      focusAt: 'center',
      gap: 20,
      autoplay: 4000,
      // animationTimingFunc: 'ease-in-out',
      animationDuration: 800,
      // peek: {
      //   before: 100,
      //   after: 100
      // },
      hoverpause: false,
      keyboard: true,
      direction: 'rtl',
      breakpoints: {

        1200: { perView: 2 },
        992: { perView: 2 },
        768: { perView: 1 }

      }
    }
    axios
      .get(`${apiBaseUrl}/categories/Main_Category`)
      .then((response) => {
        this.setState({ categories: response.data.data });
        this.activateGlide('.glide_features',response.data.data?.length)
        // new Glide('.glide_features',myOptions).mount()
      })
      .catch((error) => {
        console.log(error);
      });
      axios
      .get(`${apiBaseUrl}/Success?showinMain=true`)
      .then(response => {
        this.setState({ success: response.data.data.data});
        // new Glide('.glide',myOptions).mount();
        this.activateGlide('.glide',response.data.data.data.length)

      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get(`${apiBaseUrl}/courses/recent`)
      .then((response) => {
        this.setState({ courses: response.data.data.data });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${apiBaseUrl}/ratings/testimonials`)
      .then((response) => {
        this.setState({ testimonials: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${apiBaseUrl}/Initiatives/singleInitiative`)
      .then((response) => {
        this.setState({ initiatives: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${apiBaseUrl}/CategoryGroups/random`)
      .then((response) => {
        this.setState({ categoryGroups: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });

      var forEach = function (t, o, r) { if ("[object Object]" === Object.prototype.toString.call(t)) for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t); else for (var e = 0, l = t.length; l > e; e++)o.call(r, t[e], e, t) };

      var hamburgers = document.querySelectorAll(".hamburger");
      if (hamburgers.length > 0) {
        forEach(hamburgers, function (hamburger) {
          hamburger.addEventListener("click", function () {
            this.classList.toggle("is-active");
          }, false);
        });
      }
      AOS.init();
      // new Glide(".glide", {
      //   peek: 50,
      //   perView: 3,
      //   type: "carousel"
      // }).mount();
    
     
     
      // let collapsingBtn = document.querySelector('.collapsing-btn');
      // collapsingBtn.onclick = function (e) {
      //   let eleClickedTarget = e.currentTarget.dataset.collapser;
      //   let eleCollapser = document.querySelector('.' + eleClickedTarget);
      //   if (eleCollapser.classList.contains('collapse-box')) {
      //     eleCollapser.classList.remove('collapse-box');
      //     e.currentTarget.children[0].textContent = 'أغلق';
      //     e.currentTarget.children[1].classList.remove('fa-chevron-down');
      //     e.currentTarget.children[1].classList.add('fa-chevron-up');
      //     console.log('Yes')
      //   } else {
      //     eleCollapser.classList.add('collapse-box');
      //     e.currentTarget.children[0].textContent = 'المزيد';
      //     e.currentTarget.children[1].classList.add('fa-chevron-down');
      //     e.currentTarget.children[1].classList.remove('fa-chevron-up');
      //     console.log('No')
      //   }
      // }
  }
  renderCourses() {
    return this.state.courses.map((course) => (
      <Card key={course.id} course={course} />
    ));
  }
  responseGoogle = (response) => {
    let deviceId = localStorage.getItem("deviceId");
    let data = {
      accessToken: response.accessToken,
      deviceId: deviceId && deviceId != "undefined" ? deviceId : null,
    };
    if (!response.accessToken) return;
    axios
      .post(`${apiBaseUrl}/auth/login_with_google`, data)
      .then((response) => {
        localStorage.setItem("token", response.data.data.token);
        window.location = "/";
      })
      .catch((error) => {
        swal("عفواً", "هذا المستخدم غير موجود", "error", {
          button: "متابعة",
        });

        this.props.history.push("/auth/register");
      });
  };

  responseFacebook = (response) => {
    let deviceId = localStorage.getItem("deviceId");
    let data = {
      accessToken: response.accessToken,
      deviceId: deviceId && deviceId !== "undefined" ? deviceId : null,
    };
    if (!response.accessToken) return;
    axios
      .post(`${apiBaseUrl}/auth/login_with_facebook`, data)
      .then((response) => {
        localStorage.setItem("token", response.data.data.token);
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
        swal("عفواً", "هذا المستخدم غير موجود", "error", {
          button: "متابعة",
        });
        this.props.history.push("/auth/register");
      });
  };
  twitterLogin = async () => {
    loginWithTwitter()
      .then((token) => {
        localStorage.setItem("token", token);
        window.location = "/";
      })
      .catch((error) => {
        swal("عفواً", "هذا المستخدم غير موجود", "error", {
          button: "متابعة",
        });
        this.props.history.push("/auth/register");
      });
  };
renderBulit()
{
  const cats = this.state.categories;
 
  return(
    <React.Fragment>
    {cats.map((cat,indexcat) => {
      return(<button className="glide__bullet" data-glide-dir={"="+indexcat}></button>)
   
})}
</React.Fragment>
  );


}


hasSubcategoriesReq(slug){
  return axios.get(`${apiBaseUrl}/categories/${slug}/SubCategories`)
}


async validateHasSubCategories(slug){
  try {
    const {data : {data : {childCatgories = [],courses}}} = await this.hasSubcategoriesReq(slug)
    const navigationType = childCatgories?.length ? '_blank' : courses?.length ? 'direct' : null
    return new Promise((res,rej)=>res({childCatgories,navigationType,courses}))
  } catch (error) {
  }

}

handleNoChildCategories(){
  throw new Error("انتهت الدورات الحالية نستأنف الدورات القادمة قريبًا")
}

warningAlert(msg){

  swal(

    "عفواً",

    msg,

    "error",

    {

      button: "متابعة",

    }

  );

}

async onClick(Category){
  try {
    const { slug : categSlug } = Category;

    const {navigationType,courses}  = await this.validateHasSubCategories(categSlug)
    
    //if(!childCateg.length) this.handleNoChildCategories()

    const url = `/categories/details/${categSlug}`
    if(!navigationType) this.handleNoChildCategories()
    if(navigationType === '_blank') window.open(url)
    else {
      const { history } = this.props;
      history.push(url);
    }

  } catch (error) {

    this.warningAlert(error?.message)

  }
}
  renderCategories() {
    const cats = this.state.categories;
    const { match, location, history } = this.props;

    const slideElementBaseClassName = 'glide__slide m-0'
    const fullWidthClass = window.innerWidth < MOBILE_SCREEN_WIDTH ?  'w-100' : ''
    const elementClass = [slideElementBaseClassName,fullWidthClass].join(' ')
    return (
      <React.Fragment>
  

         {cats.map((cat,indexcat) => {
          //  if(indexcat < 3){


            return (
              <li className={elementClass}>
                    <div className="card">
                      <div className="card-items">
                      <div className="title-card font-weight-bold" onClick={() => this.onClick(cat)}
                >
                        
                        <h3> <span>{cat.nameAr}</span>  </h3>
                        </div>

                        <div className="text-card text-center mb-4">
                          <h5 className="h6 font-weight-bold">
                            <span className="d-block mb-2">{cat.descriptionAr.substring(0, 150)}
                            {cat.descriptionAr.length > 150 ?(<span>...</span>):null }

                            </span>
                          </h5>
                        </div>
                        {cat.childCatgories.length > 0 ?
                    ( <div className={"collapse-box  buttons-card d-flex-row flex-wrap "+"collapser_"+indexcat}>

                      {cat.childCatgories.map((child,indx)=>{
                      //   if(indx < 3)
                      // {
                        return(

                   <div
                    to={{
                      pathname: `categories/details/${child.slug}`,
                      state: {
                        catId: cat.id
                      }
                    }}
                    key={cat.id}
                  className="btn-card mx-2 mb-2 headShake"
                  onClick={()=> this.onClick(child)}
                  >
                    
                     {child.nameAr}
                   </div>



      );
//}
  //return null;
})}

                  </div>):
                   (
                   <div className={"collapse-box  buttons-card d-flex-row flex-wrap "+"collapser_"+indexcat}>
                   {cat.courses.map((course,indxcourse)=>{
                    //  if(indxcourse < 3)
                    //    {
                        return(

                   <div className="btn-card mx-2 mb-2 headShake " onClick={() => {(course.active==false && course.featuredInMain==true)? 
                    (course.inactiveCourseMessage)? 
                    swal(
                      "عفواً",
                      course.inactiveCourseMessage,
                      "error", 
                     {
                       button: "متابعة"
                     }
                     ):
                     swal(
                      "عفواً",
                      "سيتاح التسجيل في الدورة لاحقًا ، وسيتم الإعلان عن مواعيد التسجيل عبر منصتي تويتر و الإنستقرام (@hemmaedu) "  ,
                      "error", 
                     {
                       button: "متابعة"
                     }
                        )
                     :history.push(`/course/details/${course.slug}`)}}
                  >
                  
                  {course.nameAr}

                   </div>
      );
                  //  }
               //    return null;
                    })}

                  </div>
                   )
                   }
                        {/* <div className="collapsing-btn" data-collapser={"collapser_"+indexcat}>
                          <span>المزيد</span>
                          <i className="fas fa-chevron-down"></i>
                        </div> */}
                      </div>
                    </div>
                  </li>

              );
   })}
      </React.Fragment>
       
    );
  }

  categoryGroupRedirection(CategoryGroup, slug) {
    let token = localStorage.getItem("token");
    if (token) {
      this.props.history.push(
        `/categories/details/${slug}/quick-questions/${CategoryGroup}`
      );
    } else {
      swal(
        "عفواً",
        "يجب عليك تسجيل الدخول/تسجيل حساب حتى تتمكن من القيام بهذه الخطوة",
        "error",
        {
          button: "متابعة",
        }
      );
    }
  }

  async validateHasSubCategories(slug){
    try {
      const {data : {data : {childCatgories = []}}} = await this.hasSubcategoriesReq(slug)
      return new Promise((res,rej)=>res(childCatgories))
    } catch (error) {
      
    }
  }

  async handleClick (Category){

    try {
      const { slug : categSlug,professionalLicense } = Category;
      const childCateg  = await this.validateHasSubCategories(categSlug)

      if(childCateg.length &&  !Category?.professionalLicense) this.handleNoChildCategories()

      const url = `./${categSlug}`

      const { history } = this.props;

      this.changeTab(url);

      history.push(url);

    } catch (error) {

      this.warningAlert(error?.message)

    }

  };

  
  handleNoChildCategories(){
    throw new Error("انتهت الدورات الحالية نستأنف الدورات القادمة قريبًا")
  }
  renderCategoriesGroup() {
    const categoryGroups = this.state.categoryGroups;
    return (
      <React.Fragment>
        <div className="row">
          {categoryGroups.map((categoryGroup) => {
            return (
              <div className="col-lg-4 col-md-6" key={categoryGroup.id}>
                <div
                  className="category-group-box clickable shadow-sm d-flex align-items-center"
                  onClick={() =>
                    this.categoryGroupRedirection(
                      categoryGroup.id,
                      categoryGroup.category.slug)}>
                  <div className="row">
                    <div className="col-lg-4">
                      <img
                        key={categoryGroup.id}
                        src={categoryGroup.icon}
                        className="contain-img"
                        alt={categoryGroup.name}
                      />
                    </div>
                    <div className="col-lg-8 d-flex flex-column justify-content-center">
                      <h5 className="text-white">{categoryGroup.name}</h5>
                      <p className="text-white mb-0 word-break">{categoryGroup.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }

  renderTestimonials() {
    return this.state.testimonials.map((testimonial, index) => {
      let currentDate = new Date();
      let getCurrentDate =
        currentDate.getFullYear() +
        "-" +
        (currentDate.getMonth() + 1) +
        "-" +
        currentDate.getDate();
      let testimonialDate = new Date(testimonial.createdAt);
      let getTestimonialDate =
        testimonialDate.getFullYear() +
        "-" +
        (testimonialDate.getMonth() + 1) +
        "-" +
        testimonialDate.getDate();
      let currentDay = moment(getCurrentDate);
      let testimonialDay = moment(getTestimonialDate);
      let diff = moment.duration(currentDay.diff(testimonialDay));
      let weeks = Math.floor(diff.asWeeks());
      let days = diff.days() % 7;
      return (
        <div key={index} className="testimonial-slide" dir="rtl">
          <div className="row">
            <div className="col-md-12 mb-3">
              <p className="light-font-text small mid-text mb-0">
                {testimonial.feedBack}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 d-flex align-items-center justify-content-between">
              <div>
                <h6 className="mid-text small mb-1">
                  - {testimonial.studentName}
                </h6>
                <p className="light-font-text smaller mid-text mb-0">
                  {testimonial.courseName}
                </p>
              </div>
              <p className="light-font-text small dark-silver-text mb-0">
                {weeks === "0" ? (
                  <React.Fragment>
                    قبل <span className="en-text">{days}</span> أيام
                  </React.Fragment>
                ) : (
                    <React.Fragment>
                      قبل <span className="en-text">{weeks}</span> أسابيع
                    </React.Fragment>
                  )}
              </p>
            </div>
          </div>
        </div>
      );
    });
  }


  findSuccessElemsHeight(){
    let maxHeight = 10
    this.state.success.forEach((elem,index) =>{
      const elemNode = document.getElementById(`success-item ${index}`)
      if(elemNode?.offsetHeight > maxHeight)
      maxHeight = elemNode?.offsetHeight 
    })
    this.setState({...this.state,maxSuccessHeight : maxHeight})
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.success?.length !== this.state.success?.length)
    setTimeout(() => {
      this.findSuccessElemsHeight()
    },1000)
  }

renderSucces()
{
  return this.state.success.map((suc, index) => (
    <React.Fragment>
<li className="glide__slide d-flex flex-column" id={`success-item ${index}`} style={{minHeight:+this.state.maxSuccessHeight ? `${this.state.maxSuccessHeight}px` :  'fit-content'}}>
                <div className="sider-items  min-height-150 flex-1">
                  <div className="quote-icon"><i className="fas fa-quote-left"></i></div>
                  <h4 className="color-danger wrapped-text">{suc.courseName}</h4>
                  {suc.source == "Media" ? (
                    <React.Fragment>
<a href={suc?.url}>
        <img src={suc?.img} className="w-100 h-auto" />
      </a>

                    </React.Fragment>
                   
                  ):(
                    <React.Fragment>
                   <div className="card-body px-2 py-2">
    <p className="d-flex align-items-center light-gray mb-1 font-size-13">
      <span className="d-block main-color-light mr-2">اسم الطالب : </span>
      {suc?.rating?.studentName}
    </p>
    <p className="light-gray font-size-13 m-0">
      <span className="main-color-light">التقييم : </span>
      {suc?.rating?.feedBack}
    </p>
  </div>
                    </React.Fragment>
                  )}
                  
                </div>
              </li>

              </React.Fragment>
  ));
}
  render() {
    return (

      <React.Fragment>
       <section id="hemma-banner" className="main-banner ">
         <div className='banner banner-program'>
           <div className="container program-container py-4 ">
             <div>
               <h2>  برنامج
                        <span className='program-name'> معلم كفؤ </span>             الإثرائي والمجاني
               </h2>
               <p> صمم هذا البرنامج بعناية مع نخبة من الخبراء ليحقق احتياج المعلمين في تطوير مهاراتهم التدريسية </p>
             </div>
             <Link to='/course/details/معلم_كفؤ42327'>
               <button type="button" className="btn btn-warning join-now">انضم الان</button>
             </Link>
           </div>
         </div>
      {/* <!-- Start The Main Banner Text --> */}
      <div className="banner-image fixed-image-bg overlay-bg">
        <div className="banner-info d-flex-column overflow-hidden">
          <div className="container">
            <div className="banner-text text-white">
              <h1 className="h1 m-0 mb-4 animated bounceInUp">
                <span className="d-block">منصة رقمية لتطوير المعلمين والطلاب</span>
                <span className="d-block">والتدريب على اختبارات قياس</span>
              </h1>
              <h2 className="h2 m-0 animated bounceInDown">أكثر من 25 سنة فى خدمة الطلاب والمعلمين</h2>
            </div>
          </div>
        </div>
      </div>
        <div className="banner-cards">
        <div className="container">
          <div className="slider">
            <div className="glide_features">
              <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides py-2 w-100 px-2">
                 
{this.renderCategories()}
                </ul>
              </div>
              {this.state.categories?.length> MIN_ELEM_COUNT && <>
              <div className="glide__arrows" data-glide-el="controls">
                <button className="glide__arrow glide__arrow--left" data-glide-dir="<"><i
                    className="fas fa-chevron-left"></i></button>
                <button className="glide__arrow glide__arrow--right" data-glide-dir=">"><i
                    className="fas fa-chevron-right"></i></button>
              </div>
              <div className="glide__bullets" data-glide-el="controls[nav]">
              {this.renderBulit()}
               

              </div>
              </>}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End The Main Banner Text --> */}
    </section>
    {/* <!-- End The Main Banner -->

    <!-- ################################################################ -->

    <!-- ################################################################ -->

    <!-- Start More Info About Hemma --> */}
    <section id="more-details" className="more-details mb-4 overflow-x-hidden">
      <div className="container">
        <header className="mb-5">
          <h3 className="h3 text-center main-color font-weight-bold mb-2"
          data-aos="fade-right"
          data-aos-offset="150"
          data-aos-duration="1500"
          data-aos-easing="ease-in-sine">اجعل رحلتك التعليميه عميقة ومكثفة من خلال محتوى همة الاحترافى</h3>
          <h3 className="h3 text-center font-weight-bold"
          data-aos="fade-left"
          data-aos-offset="150"
          data-aos-duration="1500"
          data-aos-easing="ease-in-sine">وفرنا لك أفضل المميزات لعملية تعليمية فعالة</h3>
        </header>
        <div className="row">
          <div className="col-lg-3" data-aos="fade-right" data-aos-delay="200" data-aos-duration="1500">
            <div className="text-center mb-4">
              <div className="details-icon mb-3">
                <img src={process.env.PUBLIC_URL + "/assets/images/more-details1.svg"} alt="More-Details"/>
              </div>
              <h5 className="main-color font-weight-bold">متابعة مستمرة</h5>
              <p className="description-card m-0 font-weight-bold">من خلال خدمات الدعم المقدمة خلال رحلتك التعليمية معنا</p>
            </div>
          </div>
          <div className="col-lg-3" data-aos="fade-down" data-aos-delay="200" data-aos-duration="1500">
            <div className="text-center mb-4">
              <div className="details-icon mb-3">
                <img src={process.env.PUBLIC_URL + "/assets/images/more-details2.svg"} alt="More-Details"/>
              </div>
              <h5 className="main-color font-weight-bold">محتوى معد باحترافيه</h5>
              <p className="description-card m-0 font-weight-bold">دورات مصممة بواسطة خبراء محترفين ومتخصصين</p>
            </div>
          </div>
          <div className="col-lg-3" data-aos="fade-down" data-aos-delay="200" data-aos-duration="1500">
            <div className="text-center mb-4">
              <div className="details-icon mb-3">
                <img src={process.env.PUBLIC_URL + "/assets/images/more-details3.svg"} alt="More-Details"/>
              </div>
              <h5 className="main-color font-weight-bold">تدريب مكثف وأنت في بيتك</h5>
              <p className="description-card m-0 font-weight-bold">محتوى شامل يغنيك عن مختلف المراجع</p>
            </div>
          </div>
          <div className="col-lg-3" data-aos="fade-left" data-aos-delay="200" data-aos-duration="1500">
            <div className="text-center mb-4">
              <div className="details-icon mb-3">
                <img src={process.env.PUBLIC_URL + "/assets/images/more-details1.svg"} alt="More-Details"/>
              </div>
              <h5 className="main-color font-weight-bold">نماذج محاكية للاختبارات</h5>
              <p className="description-card m-0 font-weight-bold">تطبيقات محاكية عملية من خلال نماذج حديثة للاختبار</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* <!-- End More Info About Hemma -->

    <!-- ################################################################ -->

    <!-- Start How Hemma Faciliate Its Mission --> */}
    <section id="more-about" className="more-about">
      <div className="about-wrapper about-wrapper-image fixed-image-bg overlay-bg overlay-bg-dark d-flex-column flex-column">
        <div className="container">
          <div className="about-hemma">
            <header className="mb-5"
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-duration="1500"
            data-aos-anchor-placement="bottom-bottom">
              <h3 className="h3 text-center font-weight-bold mb-2">كيف سهلت همة الاختبارات على الالاف خلال 25 عام؟</h3>
              <h3 className="h3 text-center font-weight-bold">هنا نستعرض بعض الارقام والتى نعدها مصدر اعتزاز !</h3>
            </header>
            <div className="row overflow-hidden">
              <div className="col-lg-3" data-aos="flip-right" data-aos-delay="50" data-aos-duration="1500">
                <div className="text-center mb-4">
                  <div className="about-head-wrapper">
                    <h2 className="about-head line-yellow font-weight-bold text-shadow text-effect">
                      <img src={process.env.PUBLIC_URL + "/assets/images/more-about1.svg"} alt="More-About-Hemma"/>
                    </h2>
                  </div>
                  <p className="font-weight-bold m-0 font-size-20">بدأت خدمتنا للطلاب والمعلمين فى (1415 هـ) ووصلنا لكل بيت بكتب التبسيط  </p>
                </div>
              </div>
              <div className="col-lg-3" data-aos="flip-down" data-aos-delay="200" data-aos-duration="1500">
                <div className="text-center mb-4">
                  <div className="about-head-wrapper">
                    <h2 className="about-head line-yellow font-weight-bold text-shadow text-effect">
                      <img src={process.env.PUBLIC_URL + "/assets/images/more-about2.svg"} alt="More-About-Hemma"/>
                    </h2>
                  </div>
                  <p className="font-weight-bold m-0 font-size-20">مجموع المستفيدين من خدامتنا تجاوز 3 مليون مستفيد </p>
                </div>
              </div>
              <div className="col-lg-3" data-aos="flip-up" data-aos-delay="200" data-aos-duration="1500">
                <div className="text-center mb-4">
                  <div className="about-head-wrapper">
                    <h2 className="about-head line-yellow font-weight-bold text-shadow text-effect">
                      <img src={process.env.PUBLIC_URL + "/assets/images/more-about3.svg"} className="height-img" alt="More-About-Hemma"/>
                    </h2>
                  </div>
                  <p className="font-weight-bold m-0 font-size-20">من مشتركينا حققوا 95% مايطمحوا له من درجات</p>
                </div>
              </div>
              <div className="col-lg-3" data-aos="flip-left" data-aos-delay="200" data-aos-duration="1500">
                <div className="text-center mb-4">
                  <div className="about-head-wrapper">
                    <h2 className="about-head line-yellow font-weight-bold text-shadow text-effect">
                      <img src={process.env.PUBLIC_URL + "/assets/images/more-about4.svg"}alt="More-About-Hemma"/>
                    </h2>
                  </div>
                  <p className="font-weight-bold m-0 font-size-20">أكثر من 200 ألف مشترك فى الموقع</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {this.state.success.length>0 ? (
      <section id="success-wrapper">
      <div class="container py-5">
        <header class="mb-5">
          <h3 class="h3 text-center font-weight-bold main-color mb-2">نجاحات مع همة</h3>
        </header>
        <div class="glide">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides py-2">
       {this.renderSucces()}
       </ul>
          </div>
          {/* <!-- <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
            <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
          </div> --> */}
         {this.state.success.length > MIN_ELEM_COUNT && <div class="glide__bullets" data-glide-el="controls[nav]">
           {this.state.success.map((elem,index) =>(
            <button class="glide__bullet" data-glide-dir={`=${index}`}></button>
           ))}
          </div>}
        </div>
        <div class="d-flex align-items-center justify-content-center mt-5">
        <Link to="/home/hemma-succes" className="btn-yellow headShake">المزيد من النجاحات</Link>
        </div>
      </div>
    </section>
    ) : null}
    
    {/* <!-- End How Hemma Faciliate Its Mission -->

    <!-- ################################################################ -->

    <!-- Start The Main Success OF Hemma  --> */}
    
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

HomeComponent = connect(mapStateToProps)(HomeComponent);

export const Home = HomeComponent;
