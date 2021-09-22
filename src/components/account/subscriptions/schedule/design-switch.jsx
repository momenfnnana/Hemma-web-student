import React, { useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./index.scss";

const btnSettings = {
  isClassic: {
    title: "تقسيم الموقع حسب الفصول",
    path: (id)=> `/course/content/${id}/schedule`,
    icon: "fas fa-th-large",
  },
  other: {
    title: "الرجوع للتقيم السابق",
    path: (id)=> `/course/content/${id}/classic-schedule`,
    icon: "fas fa-grip-lines",
  },
};

function _DesignSwitch(props) {
  const { pathname } = window.location;
  const [render,setRender] = useState(true)
  const btnType = pathname.includes("classic-schedule") ? "isClassic" : "other";
  const courseId = props.match.params.id;


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
     {render && <NavLink className="main-color ml-auto" to={btnSetting.path(courseId)}>
        <span>{btnSetting.title}</span>
         <i class={btnSetting.icon+' mx-2'}></i>
      </NavLink>}
    </div>
  );
}

const DesignSwitch =  withRouter(_DesignSwitch);
export default DesignSwitch;