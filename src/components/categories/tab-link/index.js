import React, { useEffect } from "react";
import { ProfessionalLicenseText } from "../professional-license";

export const eventFire =(id, etype) =>{
  const el = document.getElementById(id)
  if(!el) return
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    try {
    el.dispatchEvent(evObj);
  } catch (error) {
  }
  }
}

export default function NavTab({name = "",onClick = ()=>{},id,currentTab,forceActive}) {

  const isActive = currentTab === id

  const baseClass = "tab-items nav-link px-4"
  const acticeClass = isActive || forceActive ?  'active show' : ''
  const className = [baseClass,acticeClass].join(' ')


  useEffect(()=>{
    if(!isActive) return
    setTimeout(()=>{
      eventFire(id,'click')
    },300)
  },[isActive])
  return (
    <>
        <a
          className={className}
          id={id}
          onClick={onClick}
        >
          <div className="tab-img">
            <img
              src={
                process.env.PUBLIC_URL + "/assets/images/hemma-logo-light.svg"
              }
              className="width-50"
              alt="Hemma-logo"
            />
          </div>
          <div className="main-color font-weight-bold">{name}</div>
        </a>
    </>
  );
}
