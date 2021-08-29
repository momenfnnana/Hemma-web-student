import React from "react";
import "./index.scss";

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <img
        className="logo-img"
        src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
        height="60"
      />
    </div>
  );
}
