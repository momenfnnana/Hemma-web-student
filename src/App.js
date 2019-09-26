import React, { Component } from "react";
import "./App.sass";
import axios from "axios";

import { Header } from "./components/shared/header/header";
import { Footer } from "./components/shared/footer/footer";
import { Auth } from "./components/auth/auth";
import {
  BrowserRouter,
  Route,
  withRouter,
  Switch,
  Redirect
} from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Verification } from "./components/verification/verification";
import { Categories } from "./components/categories/list";
import { Home } from "./components/home/home";
import { CategoryDetails } from "./components/categories/details";
import { CourseDetails } from "./components/courses/details";
import { forgotPassword } from "./components/phone-reset/forgot-password/forgot-password";
import { VerifyId } from "./components/phone-reset/verify-id/verify";
import { resetPassword } from "./components/phone-reset/reset-password/reset-password";
import { hemmaReducer } from "./reducers";
import ReduxPromise from "redux-promise";
import { Cart, Checkout } from "./components/cart";

import ScrollToTop from "./components/shared/scroll-to-top/ScrollToTop";
import { SubscriptionDetails } from "./components/account/subscriptions/subscription-details";
import { Subscriptions } from "./components/account/subscriptions/subscriptions";
import NotFound from "./components/shared/not-found/not-found";
import { apiBaseUrl } from "./api/helpers";
import requireAuth from "./components/shared/authentication/require-auth";
import Intercom from "./Intercom";
import TwilioComponent from "./Twilio";
import { Account } from "./components/account/settings/account";
import BankAccounts from "./components/banks/banks";
import FAQ from "./components/faq/faq";
import { Transaction } from "./components/cart/transaction";

const store = createStore(hemmaReducer, {}, applyMiddleware(ReduxPromise));

class AppBackground extends Component {
  render() {
    const path = this.props.location.pathname;
    let img = null;
    let imgSize = null;
    let imgPosition = null;

    if (path === "/") {
      img = "home-bg.png";
      imgSize = "100%";
      imgPosition = "center top";
    } else if (
      path.startsWith("/categories") ||
      path.startsWith("/course") ||
      path.startsWith("/account") ||
      path.startsWith("/cart") ||
      path.startsWith("/banks")
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
          backgroundPosition: imgPosition
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

AppBackground = withRouter(AppBackground);

export default class AppComponent extends Component {
  async componentDidMount() {
    let token = localStorage.getItem("token");
    let data = {};
    let headers = {
      Authorization: `Bearer ${token}`
    };
    await axios
      .post(`${apiBaseUrl}/auth/intercom/token`, data, {
        headers
      })
      .then(response => {
        localStorage.setItem("intercomToken", response.data.data.token);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Provider store={store}>
        <Intercom />
        <TwilioComponent />
        <React.Fragment>
          <div>
            <BrowserRouter>
              <ScrollToTop>
                <AppBackground>
                  <Header />
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" component={Auth} />
                    <Route
                      path="/verify"
                      exact
                      component={requireAuth(Verification)}
                    />
                    <Route path="/verify/identity" component={VerifyId} />
                    <Route path="/forgot-password" component={forgotPassword} />
                    <Route path="/reset-password" component={resetPassword} />
                    <Route path="/categories" exact component={Categories} />
                    <Route
                      path="/categories/details/:slug"
                      component={CategoryDetails}
                    />
                    <Route
                      path="/course/details/:slug"
                      component={CourseDetails}
                    />
                    <Route path="/cart" exact component={requireAuth(Cart)} />
                    <Route
                      path="/cart/checkout"
                      component={requireAuth(Checkout)}
                    />
                    <Redirect exact from="/account" to="/account/update" />
                    <Route path="/account" component={requireAuth(Account)} />
                    <Route
                      path="/subscriptions"
                      exact
                      component={requireAuth(Subscriptions)}
                    />
                    <Redirect
                      exact
                      from="/subscriptions/:id"
                      to="/subscriptions/:id/schedule"
                    />
                    <Route
                      path="/subscriptions/:id"
                      component={requireAuth(SubscriptionDetails)}
                    />
                    <Route path="/banks" component={BankAccounts} />
                    <Route path="/faq" component={FAQ} />
                    <Route path="/transactions/:id" component={Transaction} />
                    {/* <Route
                      path="/live-stream/:id"
                      component={requireAuth(SubscriptionDetails)}
                    /> */}
                    {/* <Route path="/not-found" component={NotFound} />
                    <Redirect from="/" exact to="/home" />
                    <Redirect to="/not-found" /> */}
                  </Switch>
                  <Footer />
                </AppBackground>
              </ScrollToTop>
            </BrowserRouter>
          </div>
        </React.Fragment>
      </Provider>
    );
  }
}
