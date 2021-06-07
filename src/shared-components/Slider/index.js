import React from "react";

const Bullet = ({ index = 0, isActive }) => {
  const baseBulletClass = "glide__bullet";
  const activeClass = "glide__bullet--active";
  const bulletClass = isActive
    ? `${baseBulletClass} ${activeClass}`
    : baseBulletClass;
  return (
    <div>
      <button class={bulletClass} data-glide-dir={`=${index}`}></button>
    </div>
  );
};
// glide__slide glide__slide--active
export default function Slider({ options = [] }) {
  return (
    <div className="slider">
      <div className="glide_features">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides py-2">
            {options.map((option,i) => (
              <Bullet {...option} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
