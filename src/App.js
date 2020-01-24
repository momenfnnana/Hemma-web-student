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
            <MainRouter />
          </div>
        </React.Fragment>
      </Provider>
    );
  }
}
