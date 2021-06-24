import React, { useState } from "react";
import "./index.scss";

const TrainerOption = ({
  name = "اسم المدرب",
  id,
  onTrainerSelected = () => {},
}) => (
  <div class="trainer-list-item d-flex align-items-center justify-content-between">
    <div class="trainer-name lighter-gray font-weight-bold">{name}</div>
    <a
      class="lighter-gray text-underline font-size-14 link-hover cursor-pointer"
      data-bs-toggle="modal"
      data-bs-target="#coach-modal"
      onClick={() => onTrainerSelected({ id })}
    >
      اعرف المزيد عن مدربك
    </a>
  </div>
);

const SignleTrainer = ({
  id,
  onClick,
  selctedTrainer,
  trainerCheckedClass,
  nameAr = "",
  subTrainers = [],
  onTrainerSelected = () => {},
}) => {
  const isCurrentSelected = selctedTrainer === id;
  const checkboxClass = isCurrentSelected ? trainerCheckedClass : "";
  const arrowClass = isCurrentSelected ? "rotate-180" : "";
  const firstTrainer = subTrainers?.[0];
  return (
    <div
      class={`input-area input_list_three mb-2 ${checkboxClass}`}
      onClick={() => onClick(id)}
    >
      <div class="trainer-chooice-btn d-flex align-items-center justify-content-between form-control border-radius-50 input-with-bullets">
        <div class="d-flex align-items-center">
          <span class={`bullets-before-input  ${checkboxClass}`}></span>
          <span
            class="lighter-gray font-weight-bold cursor-pointer choose-trainer-btn"
            data-trainer="input_list_three"
          >
            {firstTrainer?.name}
          </span>
        </div>
        <div class="d-flex align-items-center">
          <a
            class="lighter-gray text-underline font-size-14 link-hover cursor-pointer"
            data-bs-toggle="modal"
            data-bs-target="#coach-modal"
            onClick={() => onTrainerSelected({ id: firstTrainer?.id })}
          >
            اعرف عن مدربك
          </a>
          <div className={arrowClass}>
            <i class={`fas fa-angle-down lighter-gray ml-2 trainer-arrow`}></i>
          </div>
        </div>
      </div>
      {subTrainers?.length > 1 && (
        <div class="trainer-chooice-list smoth-scroll trainer-list-1">
          {subTrainers?.slice(1,subTrainers.length)?.map((subTrainer) => (
            <TrainerOption
              key={subTrainer?.id}
              {...subTrainer}
              onTrainerSelected={onTrainerSelected}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function PickTrainer({
  trainers = [],
  subTrainers = [],
  onSelect = () => {},
  onTrainerSelected = () => {},
}) {
  const [selectedId, setSelectedId] = useState(null);
  const trainerCheckedClass = "active show";

  const handleClick = (course) => {
    setSelectedId(course?.id);
    onSelect(course);
  };

  return (
    <div class="mb-3">
      <h6 class="h6 sub-color font-weight-bold">اختر مجموعة المدربين :</h6>
      {trainers.map((trainer) => (
        <SignleTrainer
          {...trainer}
          selctedTrainer={selectedId}
          onClick={() => handleClick(trainer)}
          subTrainers={trainer?.instructors}
          trainerCheckedClass={trainerCheckedClass}
          onTrainerSelected={onTrainerSelected}
        />
      ))}
      {/* <SignleTrainer trainerCheckedClass={trainerCheckedClass} id={1} selctedTrainer={selectedId} onClick={handleClick} /> */}
      {/* <SignleTrainer trainerCheckedClass={trainerCheckedClass} id={2} selctedTrainer={selectedId} onClick={handleClick} /> */}
    </div>
  );
}
