import React, { Component } from "react";
import "./App.sass";

import { Header } from "./components/shared/header/header";
import { Footer } from "./components/shared/footer/footer";

import { Auth } from "./components/auth/auth";

import { BrowserRouter, Route } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Verification } from "./components/verification/verification";
import { Categories } from "./components/categories/list";
import { Home } from "./components/home/home";
import { CategoryDetails } from "./components/categories/details";
import { Courses } from "./components/account/courses";
import { CourseDetails } from "./components/courses/details";
import { EditAccount } from "./components/account/edit-account";
import { Cart } from "./components/cart/cart";
import { forgotPassword } from "./components/phone-reset/forgot-password/forgot-password";
import { VerifyId } from "./components/phone-reset/verify-id/verify";
import { resetPassword } from "./components/phone-reset/reset-password/reset-password";
import { AccountReset } from "./components/account/reset-password";
import { hemmaReducer } from "./reducers";
import ReduxPromise from "redux-promise";
import { Checkout } from "./components/checkout/checkout";

const store = createStore(hemmaReducer, {}, applyMiddleware(ReduxPromise));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <div
          // style={{
          //   backgroundImage: "url(./assets/images/home-bg.svg)",
          //   backgroundRepeat: "no-repeat",
          //   backgroundSize: "50%"
          // }}
          >
            <BrowserRouter>
              <div>
                <Header />
                <Route path="/auth" component={Auth} />

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
                <Route path="/account/courses" component={Courses} />
                <Route path="/account/edit" component={EditAccount} />
                <Route
                  path="/account/reset-password"
                  component={AccountReset}
                />
                <Route path="/course/details/:id" component={CourseDetails} />
                <Route exact path="/cart" component={Cart} />
                <Route path="/cart/checkout" component={Checkout} />
                <Footer />
              </div>
            </BrowserRouter>
          </div>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
