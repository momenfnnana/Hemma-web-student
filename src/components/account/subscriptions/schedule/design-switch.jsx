import React, { useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./index.scss";

const btnSettings = [
  {
    title: "تقسيم الموقع حسب الفصول",
    path: (id) => `/course/content/${id}/schedule`,
    icon: "fas fa-th-large",
    id: 0,
  },
  {
    title: "الرجوع للتقسيم السابق",
    path: (id) => `/course/content/${id}/classic-schedule`,
    icon: "fas fa-grip-lines",
    id: 1,
  },
];

function _DesignSwitch(props) {
  const [render, setRender] = useState(true);
  const {designType,onChange: toggleDesign} = props


  const toggleShow = () => {
    setRender(false);
    setTimeout(() => {
      setRender(true);
    }, 100);
  };

  useEffect(() => {
    toggleShow();
    localStorage.setItem('designType',designType)
  }, [designType]);

  return (
    <div className="deisgn-switch-wrapper mb-3 d-flex">
      {render && (
        <a
          onClick={toggleDesign}
          className="main-color ml-auto"
        >
          <span>{btnSettings?.[designType].title}</span>
          <i class={btnSettings?.[designType].icon + " mx-2"}></i>
        </a>
      )}
    </div>
  );
}

const DesignSwitch = withRouter(_DesignSwitch);
export default DesignSwitch;
