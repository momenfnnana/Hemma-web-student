import React, { Component } from "react";
import "./App.sass";
import jwtDecode from "jwt-decode";
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
import { EditAccount } from "./components/account/settings/edit-account";
import { forgotPassword } from "./components/phone-reset/forgot-password/forgot-password";
import { VerifyId } from "./components/phone-reset/verify-id/verify";
import { resetPassword } from "./components/phone-reset/reset-password/reset-password";
import { AccountReset } from "./components/account/settings/reset-password";
import { hemmaReducer } from "./reducers";
import ReduxPromise from "redux-promise";
import { Cart, Checkout } from "./components/cart";

import ScrollToTop from "./components/shared/scroll-to-top/ScrollToTop";
import { SubscriptionDetails } from "./components/account/subscriptions/subscription-details";
import { Subscriptions } from "./components/account/subscriptions/subscriptions";
import { Schedule } from "./components/account/subscriptions/schedule";
import { RecordedLectures } from "./components/account/subscriptions/recorded-lectures";
import { RecordedVideos } from "./components/account/subscriptions/recorded-videos";
import { Booklet } from "./components/account/subscriptions/booklet";
import { LiveStream } from "./components/account/subscriptions/live-stream";
import { TransactionsList } from "./components/account/subscriptions/transactions/transactions-list";
import NotFound from "./components/shared/not-found/not-found";
import { apiBaseUrl } from "./api/helpers";

import requireAuth from "./components/shared/authentication/require-auth";
import { UsersChatComponent } from "./components/account/subscriptions/chat";

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
  state = {};
  async componentDidMount() {
    try {
      const jwt = await localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}

    let token = localStorage.getItem("token");
    let data = {};
    let headers = {
      Authorization: `Bearer ${token}`
    };
    await axios
      .post(`${apiBaseUrl}/auth/twilio/token`, data, {
        headers
      })
      .then(response => {
        localStorage.setItem("chatToken", response.data.data.token);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <Provider store={store}>
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
                      path="/categories/details/:id"
                      component={CategoryDetails}
                    />
                    <Route
                      path="/account/edit"
                      component={requireAuth(EditAccount)}
                    />
                    <Route
                      path="/account/reset-password"
                      component={AccountReset}
                    />
                    <Route
                      path="/course/details/:id"
                      component={CourseDetails}
                    />
                    <Route path="/cart" exact component={requireAuth(Cart)} />
                    <Route
                      path="/cart/checkout"
                      component={requireAuth(Checkout)}
                    />

                    <Route
                      path="/account/subscriptions"
                      component={requireAuth(Subscriptions)}
                    />
                    <Route
                      path="/subscriptions/details"
                      component={SubscriptionDetails}
                    />
                    <Route
                      path="/subscriptions/details/schedule"
                      component={Schedule}
                    />
                    <Route
                      path="/subscriptions/details/recorded-lectures"
                      component={RecordedLectures}
                    />
                    <Route
                      path="/subscriptions/details/recorded-videos"
                      component={RecordedVideos}
                    />
                    <Route
                      path="/subscriptions/details/booklet"
                      component={Booklet}
                    />
                    <Route
                      path="/subscriptions/details/transactions/list"
                      component={TransactionsList}
                    />
                    <Route
                      path="/subscriptions/details/chat"
                      component={UsersChatComponent}
                    />
                    <Route path="/live-stream" component={LiveStream} />
                    <Route path="/not-found" component={NotFound} />
                    <Redirect from="/" exact to="/home" />
                    <Redirect to="/not-found" />
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

export default App;
