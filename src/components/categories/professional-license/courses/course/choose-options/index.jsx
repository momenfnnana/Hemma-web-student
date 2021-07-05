import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import ShowAt from "../../../../../../HOC/show-at";
import { emptyOption, hiddenLvlsIds, lvls, mappedStringsToLvls } from "./data/options";

export const specKey = "SpecialityId";
export const lvlKey = "level";
export const courseTypeKey = "CourseType";

export default function ChooseOptions({
  specialitiesState: { specialities = [], loading = false },
  onChange,
  optionsData,
}) {
  const [changeCounter,setChangeCounter] = useState(0)
  // const { specialities, loading } = specialitiesState;
  const selectedSpec = specialities?.find(
    (spec) => spec.id == optionsData?.[specKey]
  );
  const specLvlsInStrings = selectedSpec?.levels || [];
  const lvlsToRender = mappedStringsToLvls(specLvlsInStrings);

  const handleChange = ({ target }, key) => {
    const { value } = target;
    onChange(key, value);
    setChangeCounter(c => c +1)
  };

  useEffect(() => {
    if (specLvlsInStrings?.length === 1) onChange(lvlKey, specLvlsInStrings[0]);
    else onChange(lvlKey, null);
  }, [selectedSpec?.id]);

  const isShown = useMemo(()=>{
    if(!lvlsToRender.length) return false
    if(hiddenLvlsIds.includes(lvlsToRender[0].id)) return false
    return true
  },[changeCounter,lvlsToRender.length])


  return (
    <div className="d-flex align-items-center justify-content-between mb-3">
      <select
        className="custom-select font-size-14 border-radius-50 border-sub-color"
        onChange={(e) => handleChange(e, specKey)}
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
      <ShowAt at={isShown}>
        <select
          className="custom-select font-size-14 border-radius-50 border-sub-color"
          onChange={(e) => handleChange(e, lvlKey)}
          
        >
          {lvlsToRender.length > 1 && (
            <option selected={emptyOption.title} value={emptyOption}>{emptyOption.title}</option>
          )}
          {lvlsToRender.map((option) => (
            <option value={option.id}>{option.title}</option>
          ))}
        </select>

      </ShowAt>
    </div>
  );
}
