import React from "react";

export default function NavTab({name = "",onClick = ()=>{}}) {
  return (
    <>
        <a
          className={"tab-items nav-link px-4 "}
          data-toggle="tab"
          href="#tab-two"
          role="tab"
          aria-controls="nav-two"
          aria-selected="false"
          onClick={onClick}
        >
          <div className="tab-img">
            <img
              src={
                process.env.PUBLIC_URL + "/assets/images/hemma-logo-light.svg"
              }
              className="width-50"
              alt="Hemma-logo"
            />
          </div>
          <div className="main-color font-weight-bold">{name}</div>
        </a>
    </>
  );
}
