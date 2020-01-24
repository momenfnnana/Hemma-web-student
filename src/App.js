import React, { Component } from "react";
import "./App.sass";
import axios from "axios";
import { MainRouter } from "./modules/routes";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { hemmaReducer } from "./reducers";
import ReduxPromise from "redux-promise";
import { apiBaseUrl } from "./api/helpers";
import Intercom from "./Intercom";
import TwilioComponent from "./Twilio";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";

const store = createStore(hemmaReducer, {}, applyMiddleware(ReduxPromise));

export default class AppComponent extends Component {
  async componentDidMount() {
    this.initializeReactGA();
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

  initializeReactGA() {
    ReactGA.initialize("UA-151210995-1");
    ReactGA.pageview("/");
  }

  render() {
    return (
      <Provider store={store}>
        <Intercom />
        <TwilioComponent />
        <React.Fragment>
          <div>
            <Helmet>
              <title>
                منصّة همّة التعليمية | 25 عاماً في خدمة الطلاب والطالبات
              </title>
            </Helmet>
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
