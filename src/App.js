import React, { Component } from "react";
import "./App.sass";

import { Header } from "./components/shared/header/header";
import { Footer } from "./components/shared/footer/footer";

import { Auth } from "./components/auth/auth";

import { BrowserRouter, Route, withRouter } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Verification } from "./components/verification/verification";
import { Categories } from "./components/categories/list";
import { Home } from "./components/home/home";
import { CategoryDetails } from "./components/categories/details";
import { CourseDetails } from "./components/courses/details";
import { EditAccount } from "./components/account/settings/edit-account";
import { forgotPassword } from "./components/phone-reset/forgot-password/forgot-password";
import { VerifyId } from "./components/phone-reset/verify-id/verify";
import { resetPassword } from "./components/phone-reset/reset-password/reset-password";
import { AccountReset } from "./components/account/settings/reset-password";
import { hemmaReducer } from "./reducers";
import ReduxPromise from "redux-promise";
import { Cart, Checkout } from "./components/new-cart";

import ScrollToTop from "./components/shared/scroll-to-top/ScrollToTop";
import { SubscriptionDetails } from "./components/account/subscriptions/subscription-details";
import { Subscriptions } from "./components/account/subscriptions/subscriptions";

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
      path.startsWith("/cart")
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

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <div>
            <BrowserRouter>
              <ScrollToTop>
                <AppBackground>
                  {/* <Header /> */}
                  <Route path="/auth" component={Auth} />
                  <Route
                    path="subscriptions/details"
                    component={SubscriptionDetails}
                  />
                  <Route path="/" exact component={Home} />
                  <Route exact path="/verify" component={Verification} />
                  <Route path="/verify/identity" component={VerifyId} />
                  <Route path="/forgot-password" component={forgotPassword} />
                  <Route path="/reset-password" component={resetPassword} />
                  <Route exact path="/categories" component={Categories} />
                  <Route
                    path="/categories/details/:id"
                    component={CategoryDetails}
                  />
                  <Route path="/account/courses" component={Subscriptions} />
                  <Route path="/account/edit" component={EditAccount} />
                  <Route
                    path="/account/reset-password"
                    component={AccountReset}
                  />
                  <Route path="/course/details/:id" component={CourseDetails} />
                  <Route exact path="/cart" component={Cart} />
                  <Route path="/cart/checkout" component={Checkout} />
                  {/* <Footer /> */}
                </AppBackground>
              </ScrollToTop>
            </BrowserRouter>
          </div>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
