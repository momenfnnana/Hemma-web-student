import React, { Component } from "react";
import { Header } from "../components/shared/header/header";
import { Footer } from "../components/shared/footer/footer";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";

// import { Cart, Checkout } from "../components/cart";

import NotFound from "../components/shared/not-found/not-found";
import requireAuth from "../components/shared/authentication/require-auth";
import ScrollToTop from "../components/shared/scroll-to-top/ScrollToTop";
import { connect } from "react-redux";
// import { InitiativesRole } from "../components/initiative/initiatives-role";
// import { InitiativesExam } from "../components/initiative/initiatives-exam";


import {
  Auth,
  CategoryDetails,
  resetPassword,
  SubscriptionDetails,
  CourseDetails,
  Account,
  Verification,
  Certificate,
  Transaction,
  Subscriptions,
  Competition,
  QuickQuestion,
  StartExam,
  QuickQuestions,
  Categories,
  FAQ,
  Healthy,
  BankAccounts,
  ExamResult,
  Home,
  HemmaSuccessDetails,
  BookletDetailsComponent,
  BookletComponent,
  TrainingResult,
  TrainingExamDetails,
  PrivacyPolicy,
  ExamDetails,
  StartTrainingExam,
  Preparing,
  InitiativesDetails,
  CertificatesList,
  EnterToLecture,
  BillingList,
  BillingCourses,
  QuestionSummary,
  VerifyId,
  Cart,
  Checkout,
  forgotPassword
} from "./lazy-loaded-routes";
import { Suspense } from "react";
import LoadingScreen from './../shared-components/loading-screen/index';
import LandingPage from './../components/landing-page/index';
import CampaignMarketing from './../landing-pages/campaign-marketing/index';

class AppBackground extends Component {
  componentDidMount()
  {

    if(document.querySelector('.navbar') == undefined)
    {
      return;
    }
     /* Start Main Variables */ 
// const navabr = document.querySelector('.navbar');
const bannerText = document.querySelector('.banner-text');
const progressBarLoading = document.querySelector('.progressbar-wrapper .progressbar-line');
const translatedCard = document.querySelector('.translated-card');
const cardTranslated = document.querySelector('.card-translated');
const withFixedNav = document.querySelector('.with-fixed-header');
let previousScrollPosition = window.pageYOffset;
/* End Main Variables */

/* Start Making Padding Top For The Reset Of Elements Of Dom If The Navbar Fixed */
let plusPadding = 30;
function checkIfNavbarFixedAndSetPadding() {

  if (document.querySelector('.navbar').classList.contains('fixed-top')) {
      // withFixedNav.style.paddingTop = document.querySelector('.navbar').clientHeight + 'px';
  } else {
    // withFixedNav.style.paddingTop = '0';
  }
}
checkIfNavbarFixedAndSetPadding();
/* End Making Padding Top For The Reset Of Elements Of Dom If The Navbar Fixed */

window.onscroll = function() {
  // Window Offset OF Y Dimension
  let currentScrollPosition = window.pageYOffset;

  /* Start Navbar Animation While Window Scrolling */
  try {
    if (previousScrollPosition > currentScrollPosition) {
      document.querySelector('.navbar').style.top = '0';
    } else {
      document.querySelector('.navbar').style.top = '-70px';
    }
  } catch (error) {
    
  }
  
  previousScrollPosition = currentScrollPosition;
  /* End Navbar Animation While Window Scrolling */

  /**************************** LINE SEPERATE ****************************/

  /* Start Toggle For Image Side While Scrolling */
  if (currentScrollPosition > '10') {
    document.querySelector('.logo-img').style.height = '40px';
    document.querySelector('.navbar').style.boxShadow = '0 3px 20px -5px rgb(0 0 0 / 10%)';
  } else {
    document.querySelector('.logo-img').style.height = '60px';
    document.querySelector('.navbar').style.boxShadow = 'none';
  }
  /* End Toggle For Image Side While Scrolling */

  /**************************** LINE SEPERATE ****************************/

  /* Start Progress Bar Loading While Scrolling */
  loadingProgressbar();
  /* End Progress Bar Loading While Scrolling */

  /**************************** LINE SEPERATE ****************************/

  /* Start Banner Text Animation While Window Scrolling */
  if (bannerText) {
    bannerText.style.top = currentScrollPosition * 1 + 'px';
  }
  /* End Banner Text Animation While Window Scrolling */
}

/* Start Function OF Loadingbar Progress Animation */
function loadingProgressbar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  progressBarLoading.style.width = scrolled + "%";
}
  }
  render() {
    const path = this.props.location.pathname;
    let img = null;
    let imgSize = null;
    let imgPosition = null;

    if (path === "/home") {
      img = "pages-bg.png";
      imgSize = "100%";
      imgPosition = "center top";
    } else if (
      path.startsWith("/categories") ||
      path.startsWith("/booklet") ||
      path.startsWith("/course") ||
      path.startsWith("/account") ||
      path.startsWith("/booklet") ||
      path.startsWith("/cart") ||
      path.startsWith("/banks") ||
      path.startsWith("/quick-questions") ||
      path.startsWith("/quick-question") ||
      path.startsWith("/question-summary") ||
      path.startsWith("/faq") ||
      path.startsWith("/initiative/details") ||
      path.startsWith("/enter-To-Lecture") ||
      path.startsWith("/initiative-role") ||
      path.startsWith("/initiative-exam")||
      path.startsWith("/billing")||
      path.startsWith("/certificate")||
      path.startsWith("/home/hemma-succes")
      
    ) {
      img = "pages-bg.png";
      imgSize = "100%";
      imgPosition = "center top";
    } else if (
      path.startsWith("/auth") ||
      path.startsWith("/verify") ||
      path.startsWith("/forgot-password") ||
      path.startsWith("/reset-password")
    ) {
      img = "auth-bg.png";
      imgSize = "100%";
      imgPosition = "center bottom";
    }

    if (!img) return <div>{this.props.children}</div>;

    return (

      <div
        className="wrapper-bg d-flex flex-column"
        style={{
          backgroundImage: `url(/assets/images/${img})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: imgSize,
          backgroundPosition: imgPosition,
          minHeight:'100vh'
        }}
      >
        {path !== '/cart/anonymouscheckout' && <Header/>}
        {this.props.children}
        {path !== '/cart/anonymouscheckout' && <Footer />}
      </div>
    );
  }
}

AppBackground = withRouter(AppBackground);

class MainRouterComponent extends Component {
  render() {
    return (
      <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <ScrollToTop>
          <AppBackground>
            <Switch>
              {/* Start Healty check from FE/BE side  */}
              <Route path="/health">
                <h3>App is Healthy</h3>
              </Route>
              <Route exact path="/ready" component={Healthy} />
              {/* End Healty check from FE/BE side  */}
              <Route path="/home/hemma-succes" exact component={HemmaSuccessDetails} />
              <Route path="/home" component={Home} />
              <Route path="/privacypolicy" component={PrivacyPolicy} />
              <Route path="/market" component={LandingPage} />
              <Route path="/campaign-marketing" component={CampaignMarketing} />

              {/* TODO hide initiative */}
              { <Route
                path="/initiative/details/:id"
                component={InitiativesDetails}
              /> }
              <Route path="/enter-To-Lecture" component={EnterToLecture} />
              <Route path="/auth" component={Auth} />
              {/* TODO hide initiative */}
              {/* { <Route path="/initiative-role" component={InitiativesRole} />}
              { <Route path="/initiative-exam" component={InitiativesExam} /> }
               {!this.props.authenticated ? (
                 
                ) : (
                  <Redirect from="/auth" to="/course/content" />
               )} */}
              <Route
                path="/verify"
                exact
                to="/course/content"
                component={requireAuth(Verification)}
              />
              <Route path="/verify/identity" component={VerifyId} />
              <Route path="/forgot-password" component={forgotPassword} />
              <Route path="/reset-password" component={resetPassword} />
              <Route path="/categories" exact component={Categories} />
              <Route path="/booklet" exact component={BookletComponent} />
              <Route
                path="/categories/details/:slug"
                exact
                component={CategoryDetails}
              />
               <Route
                path="/booklet/details/:slug"
                exact
                component={BookletDetailsComponent}
              />
              <Route
                path="/categories/:slug/:categoryGroupId/exam/:id"
                exact
                component={StartExam}
              />
              <Route
                path="/categories/:slug/:categoryGroupId/exam/details/:id"
                exact
                component={ExamDetails}
              />
              <Route
                path="/categories/quick-questions/:categoryGroupId/exam/:id/result"
                exact
                component={ExamResult}
              />
              <Route
                path="/categories/:slug/:categoryGroupId/training/:id"
                exact
                component={StartTrainingExam}
              />
              <Route
                path="/categories/:slug/:categoryGroupId/training/details/:id"
                exact
                component={TrainingExamDetails}
              />
              <Route
                path="/categories/quick-questions/:categoryGroupId/training/:id/result"
                exact
                component={TrainingResult}
              />
              <Route
                path="/categories/details/:slug/competition/:id"
                exact
                component={requireAuth(Competition)}
              />
              <Route
                path="/categories/details/:slug/quick-questions/:categoryGroupId"
                exact
                component={QuickQuestions}
              />
              <Route
                path="/categories/details/:slug/quick-questions/details/:questionId"
                component={QuickQuestion}
              />
              <Route
                path="/categories/details/:slug/quick-questions/summary/:questionId"
                component={QuestionSummary}
              />
              <Route path="/quick-question" component={QuickQuestion} />
              <Route path="/question-summary" component={QuestionSummary} />
              <Route path="/course/details/:slug" component={CourseDetails} />
              <Route path="/cart" exact component={requireAuth(Cart)} />
              <Route path="/cart/checkout" component={requireAuth(Checkout)} />
              <Route path="/cart/anonymouscheckout" component={Checkout} />

              <Redirect exact from="/account" to="/account/update" />
              <Route path="/account" component={requireAuth(Account)} />
              <Route
                path="/certificates"
                exact
                component={requireAuth(CertificatesList)}
              />
              {/* TODO hide initiative */}
              { <Route
                path="/InitiativeFreeLectures/:id/preparing"
                exact
                component={requireAuth(Preparing)}
              /> }
              <Route
                path="/certificate/:id"
                exact
                component={requireAuth(Certificate)}
              />
              <Route
                path="/billing"
                exact
                component={requireAuth(BillingCourses)}
              />
              <Route path="/billing/:id" component={requireAuth(BillingList)} />
              <Route
                path="/course/content"
                exact
                component={requireAuth(Subscriptions)}
              />
              <Redirect
                exact
                from="/course/content/:id"
                to="/course/content/:id/schedule"
              />
              <Route
                path="/course/content/:id"
                component={requireAuth(SubscriptionDetails)}
              />
              <Route path="/banks" component={BankAccounts} />
              <Route path="/faq" component={FAQ} />
              <Route path="/transactions/:id" component={Transaction} />
              <Route path="/not-found" component={NotFound} />

              {!this.props.authenticated ? (
                <Redirect from="/" exact to="/home" />
              ) : (
                  <Redirect from="/" exact to="/course/content" />
                )}
              <Redirect to="/not-found" />
            </Switch>
          </AppBackground>
        </ScrollToTop>
      </Suspense>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

MainRouterComponent = connect(mapStateToProps)(MainRouterComponent);

export const MainRouter = MainRouterComponent;
