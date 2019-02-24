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
                <Route path="/" component={Auth} />
                {/* <Route path="/" exact component={Verification} /> */}
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
