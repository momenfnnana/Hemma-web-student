import Axios from "axios";
import React, { useEffect, useState } from "react";
import { successUrl } from "../../../api/urls";
import { useFetch } from "../../../hooks/useFetch";
import { SuccessCard } from "./success-card";
import './index.scss'
const CardReducer = (card)=>{
  switch (card.source) {
    case "Media":
      return <div>
        med9a
      </div>
      break;
      case "Rating":
      
        break;
  
    default:
      break;
  }
}

export default function SuccessCases() {
  const [page,setPage] = useState(1)
  const [getCasesTest,casesResponse] = useFetch(successUrl(),{method:'GET'})
  const [allCases,setCases] = useState([])
  const [noMore,setNoMore] = useState(false)
  const [maxCount ,setMaxCount] = useState()
  const getNaxtPage = ()=> setPage(page+1)

  const handleCaseRequestSuccess = (response)=>{
    debugger
    const cases = response?.data?.data
    if(response.data.itemCount > (response.data.limit*response.data.page))
    {
      setNoMore(true);
    }
    else{
      setNoMore(false);
    }
    setCases([...allCases,...cases])
  }
  console.log({allCases});
  useEffect(()=>{
    if(page<= 1)return
    getCasesTest({url:successUrl(9,page)},handleCaseRequestSuccess)
  },[page])

  useEffect(()=>{

  },[allCases])
  useEffect(()=>{
    //init request
    getCasesTest({url:successUrl(9,page)},handleCaseRequestSuccess)
  },[])
  console.log({casesTest: casesResponse});
  return (
    <div className="container py-5">
      <div className="success-wrapper">
        {allCases?.map((_case) => (
          <SuccessCard successCase={_case}  />
        ))}
      </div>
      <div className="d-flex justify-content-center mt-5">
      {noMore &&<button className="btn dark-btn unset-height unset-line-height br-5 w-20 m-auto" onClick={getNaxtPage}>
          عرض المزيد
      </button>}
      </div>
    </div>
  );
}
