import Glide from "@glidejs/glide";
import React, { useState, useEffect } from "react";
import "@glidejs/glide/dist/css/glide.core.min.css";

const enabledCarsoulOptions = {
  type: "carousel",
  startAt: 1,
  perView: 3,
  focusAt: "center",
  gap: 20,
  autoplay: 4000,
  animationDuration: 800,
  hoverpause: false,
  keyboard: true,
  direction: "rtl",
  breakpoints: {
    1200: { perView: 3 },
    992: { perView: 2 },
    768: { perView: 1 },
  },
};
export const Carousel = ({
  element = "glide",
  elems = [],
  SliderComponent
}) => {

  useEffect(() => {
    let glide = new Glide(".glide", enabledCarsoulOptions);
    if (!elems.length) return;
    if (!elems.length) return;
    glide.destroy();
    setTimeout(() => {
      glide.mount();
    }, 500);
  }, [elems?.length]);

  return (
    <div className="container-fluid py-5">
      <div className="d-flex mx-auto">
        <div class="glide">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              {elems.map((elem) => (
                <li className="glide__slide"> <SliderComponent data={elem} /> </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
