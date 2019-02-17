import React, { Component } from "react";
import "./App.sass";

import { Header } from "./components/shared/header/header";
import { Footer } from "./components/shared/footer/footer";

import { Auth } from "./components/auth/auth";

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <BrowserRouter>
            <div>
              <Header />

              <Route path="/" component={Auth} />
            </div>
          </BrowserRouter>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
