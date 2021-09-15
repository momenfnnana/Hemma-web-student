import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";

const btnSettings = {
  isClassic: {
    title: "تقسيم الموقع حسب الفصول",
    path: `${window.location.pathname.replace("classic-", "")}`,
    icon: "fas fa-th-large",
  },
  other: {
    title: "الرجوع للتقيم السابق",
    path: `${window.location.pathname.replace("schedule", "classic-schedule")}`,
    icon: "fas fa-grip-lines",
  },
};

export default function DesignSwitch() {
  const { pathname } = window.location;
  const [render,setRender] = useState(true)
  const btnType = pathname.includes("classic-schedule") ? "isClassic" : "other";

  const btnSetting = btnSettings?.[btnType];

  const toggleShow = ()=>{
      setRender(false)
      setTimeout(() => {
          setRender(true)
      },100)
  }

  useEffect(() => {
    toggleShow()
  },[btnSetting.icon])

  return (
    <div className="deisgn-switch-wrapper mb-3 d-flex">
     {render && <NavLink className="main-color ml-auto" to={btnSetting.path}>
        <span>{btnSetting.title}</span>
         <i class={btnSetting.icon+' mx-2'}></i>
      </NavLink>}
    </div>
  );
}
