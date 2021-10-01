import React from "react";
import ShowAt from "./../../../../../../HOC/show-at/index";

export default function NavButton({ refId, title }) {
  return (
    <ShowAt at={!!refId}>
      <a
        className="d-block d-lg-none next-btn btn-card-normal pro-license-btn w-lg-auto m-0 headShake big-height linear-bg"
        href={`#${refId}`}
      >
        {title}
      </a>
    </ShowAt>
  );
}
