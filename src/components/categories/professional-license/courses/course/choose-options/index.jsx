import React from "react";
import { options } from "./data/options";

export default function ChooseOptions({
  specialitiesState: { specialities = [], loading = false },
  onChange,
}) {
  const [firstOption] = options;
  const otherOptions = options.filter((option, index) => index);
  // const { specialities, loading } = specialitiesState;

  const handleChange = ({ target }, key) => {
    const { value } = target;
    onChange(key, value);
  };
  return (
    <div className="d-flex align-items-center justify-content-between mb-3">
      <select
        className="custom-select font-size-14 border-radius-50 border-sub-color"
        onChange={(e) => handleChange(e, "SpecialityId")}
      >
        {!specialities?.length ? (
          <option selected=""> لا يوجد تخصصات</option>
        ) : (
          <option selected="">اختر التخصص</option>
        )}
        {specialities.map((spec) => (
          <option value={spec.id}>{spec.name}</option>
        ))}
      </select>
      <span className="mx-1"></span>
      <select
        className="custom-select font-size-14 border-radius-50 border-sub-color"
        onChange={(e) => handleChange(e, "level")}
      >
        <option selected={firstOption.id}>{firstOption.title}</option>
        {otherOptions.map((option) => (
          <option value={option.id}>{option.title}</option>
        ))}
      </select>
    </div>
  );
}
