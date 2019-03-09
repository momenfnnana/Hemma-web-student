import React, { Component } from "react";
import "./App.sass";

import { Header } from "./components/shared/header/header";
import { Footer } from "./components/shared/footer/footer";

import { Auth } from "./components/auth/auth";

import { BrowserRouter, Route } from "react-router-dom";

import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { Provider } from "react-redux";
import { Verification } from "./components/verification/verification";
import { forgotPassword } from "./components/forgotPassword/forgotPassword";
import { Categories } from "./components/categories/list";
import { Home } from "./components/home/home";
import { CategoryDetails } from "./components/categories/details";

const rootReducer = combineReducers({
  form: formReducer
});

const store = createStore(rootReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <div>
            <BrowserRouter>
              <div>
                <Header />
                <Route path="/auth" component={Auth} />

                <Route path="/" exact component={Home} />
                <Route path="/verify" component={Verification} />
                <Route exact path="/categories" component={Categories} />
                <Route
                  path="/categories/details/:id"
                  component={CategoryDetails}
                />
              </div>
            </BrowserRouter>
          </div>
          <Footer />
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
