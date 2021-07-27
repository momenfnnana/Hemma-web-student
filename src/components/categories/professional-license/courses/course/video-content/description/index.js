import React from "react";

export const TrainerDescribtion = ({ name, description }) => {
  return (
    <div class="card-container mb-3">
      <div class="card-licences card-hover border-light-bold">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <div class="d-flex align-items-center font-size-20 main-color cursor-pointer">
            <i class="fas fa-angle-double-left"></i>
            <span class="ml-2 font-weight-bold">معلومات عن الأستاذ {name}</span>
          </div>
        </div>
        <p class="font-size-14">{description}</p>
      </div>
    </div>
  );
};
