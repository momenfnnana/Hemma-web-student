import React, { Component } from "react";
import { Header } from "../components/shared/header/header";
import { Footer } from "../components/shared/footer/footer";
import { Auth } from "../components/auth/auth";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";

import { Verification } from "../components/verification/verification";
import { Categories } from "../components/categories/list";
import { Home } from "../components/home/home";
import { PrivacyPolicy } from "../components/privacypolicy/privacypolicy";

import { CategoryDetails } from "../components/categories/details";
import { CourseDetails } from "../components/courses/details";
import { forgotPassword } from "../components/phone-reset/forgot-password/forgot-password";
import { VerifyId } from "../components/phone-reset/verify-id/verify";
import { resetPassword } from "../components/phone-reset/reset-password/reset-password";

import { Cart, Checkout } from "../components/cart";

import { SubscriptionDetails } from "../components/account/subscriptions/subscription-details";
import { Subscriptions } from "../components/account/subscriptions/subscriptions";
import NotFound from "../components/shared/not-found/not-found";
import requireAuth from "../components/shared/authentication/require-auth";

import { Account } from "../components/account/settings/account";
import BankAccounts from "../components/banks/banks";
import FAQ from "../components/faq/faq";
import { Transaction } from "../components/cart/transaction";
import ScrollToTop from "../components/shared/scroll-to-top/ScrollToTop";
import { Competition } from "../components/categories/competitions/competition";
import { QuickQuestions } from "../components/categories/quick-questions/quick-questions";
import { QuickQuestion } from "../components/categories/quick-questions/quick-question";
import { QuestionSummary } from "../components/categories/quick-questions/question-summary";
import { BillingCourses } from "../components/account/billings/billing-courses";
import { BillingList } from "../components/account/billings/billing-list";
import { connect } from "react-redux";
import { EnterToLecture } from "../components/initiative/enter-lecture";
import { InitiativesRole } from "../components/initiative/initiatives-role";
import { InitiativesExam } from "../components/initiative/initiatives-exam";
import { InitiativesDetails } from "../components/initiative/initiatives-details";
import { CertificatesList } from "../components/account/certificates/certificates-list";
import { Certificate } from "../components/account/certificates/certificate";
import { Preparing } from "../components/account/certificates/preparing";
import { StartExam } from "../components/categories/quick-questions/exams/start-exam";
import { ExamDetails } from "../components/categories/quick-questions/exams/exam-details";
import { ExamResult } from "../components/categories/quick-questions/exams/exam-result";
import { StartTrainingExam } from "../components/categories/quick-questions/training/start-training";
import { TrainingExamDetails } from "../components/categories/quick-questions/training/training-details";
import { TrainingResult } from "../components/categories/quick-questions/training/training-result";
import { Healthy } from "../components/shared/healthy";

class AppBackground extends Component {
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
      path.startsWith("/course") ||
      path.startsWith("/account") ||
      path.startsWith("/cart") ||
      path.startsWith("/banks") ||
      path.startsWith("/quick-questions") ||
      path.startsWith("/quick-question") ||
      path.startsWith("/question-summary") ||
      path.startsWith("/faq") ||
      path.startsWith("/initiative/details") ||
      path.startsWith("/enter-To-Lecture") ||
      path.startsWith("/initiative-role") ||
      path.startsWith("/initiative-exam")
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
        className="wrapper-bg"
        style={{
          backgroundImage: `url(/assets/images/${img})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: imgSize,
          backgroundPosition: imgPosition,
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
        <ScrollToTop>
          <AppBackground>
            <Switch>
              {/* Start Healty check from FE/BE side  */}
              <Route path="/health">
                <h3>App is Healthy</h3>
              </Route>
              <Route exact path="/ready" component={Healthy} />
              {/* End Healty check from FE/BE side  */}
              
              <Route path="/home" component={Home} />
              <Route path="/privacypolicy" component={PrivacyPolicy} />

              {/* TODO hide initiative */}
              {/* <Route
                path="/initiative/details/:id"
                component={InitiativesDetails}
              /> */}
              <Route path="/enter-To-Lecture" component={EnterToLecture} />
              {/* TODO hide initiative */}
              {/* <Route path="/initiative-role" component={InitiativesRole} /> */}
              {/* <Route path="/initiative-exam" component={InitiativesExam} /> */}
              {!this.props.authenticated ? (
                <Route path="/auth" component={Auth} />
              ) : (
                <Redirect from="/auth" to="/course/content" />
              )}
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
              <Route
                path="/categories/details/:slug"
                exact
                component={CategoryDetails}
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
              {/* <Route
                path="/InitiativeFreeLectures/:id/preparing"
                exact
                component={requireAuth(Preparing)}
              /> */}
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
