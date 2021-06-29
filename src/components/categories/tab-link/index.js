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
    el.dispatchEvent(evObj);
  }
}

export default function NavTab({name = "",onClick = ()=>{},isActive}) {

  useEffect(()=>{
    if(!isActive) return
    setTimeout(()=>{
      eventFire(ProfessionalLicenseText,'click')
    },300)
  },[isActive])
  return (
    <>
        <a
          className='tab-items nav-link px-4 '
          data-toggle="tab"
          href="#tab-two"
          id={ProfessionalLicenseText}
          role="tab"
          aria-controls="nav-two"
          aria-selected="false"
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
