import React, { Component } from "react";
import "./App.sass";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Login from "./components/login/login";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Login />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
