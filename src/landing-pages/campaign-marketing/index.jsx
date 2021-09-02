import React, { useEffect, useRef } from "react";
import { useState } from "react";
import CampaignForm from "./form";
import "./index.scss";
import CampaignVideo from "./video";
import FixedBox from './box/index';
import Description from './describtion/index';
import LogoSection from "./logo-section";

export default function CampaignMarketing() {
  const [showThumb, setShowThumb] = useState(true);
  const videoRef  = useRef(null)

  const toggleShow = () => setShowThumb(false);

  useEffect(() => {
      if(!videoRef.current) return
    !showThumb ? videoRef.current.play() :videoRef.current.pause()  
  },[showThumb])

  return (
    <div className="camapaign-marketing-wrapper position-absolute">
      <FixedBox  position={{top:'14%',right:5}} width={80}  className="bg-yellow" />
      <FixedBox  position={{top:'25%',right:'5%'}} width={30}  className="bg-gheed" />
      <FixedBox  position={{top:'10%',left:'2%',zIndex:10}} width={120}  className="bg-yellow" />
      <FixedBox  position={{top:'40%',left:'60%'}} width={30}  className="bg-yellow d-none d-lg-block" />
      <FixedBox  position={{top:'0%',left:'30%',zIndex:0}} width={300} height={350}  className="bg-gheed d-none d-lg-block" />
      <LogoSection />
      <div className="row m-0 justify-content-between">
       <Description />
        <div className="col-lg-5">
          <CampaignVideo  showThumb={showThumb} toggleShow={toggleShow} videoRef={videoRef} />
          <CampaignForm />
        </div>
      </div>
    </div>
  );
}
