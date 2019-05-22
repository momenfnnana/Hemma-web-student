import React from "react";

const NotFound = () => {
  return (
    <div className="container h-100">
      <div className="row h-100">
        <div
          className="col-12 d-flex align-items-center justify-content-center flex-column"
          style={{ height: 600 }}
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/images/error-404.png"}
            height="200"
            width="100%"
            className="contain-img mb-2"
          />
          <h3 className="dark-text en-text mb-0" dir="ltr">
            404 | Not Found
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
