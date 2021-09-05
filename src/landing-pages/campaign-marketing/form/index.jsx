import React, { useEffect } from "react";
import { useState } from "react";
import CampaignField from "./field/index";
import { useFetch } from "./../../../hooks/useFetch";
import { apiBaseUrl } from "./../../../api/helpers";
import swal from "@sweetalert/with-react";

const url = (CategoryId) =>
  `${apiBaseUrl}/MarketingCampaign${CategoryId ? `/${CategoryId}` : ""}`;

const fixedToken = "ec054203e5aaefed0a9390a9d6099703a8137f8a";
const category = "3ccb028d-bb70-450c-b4cd-d21bc23f3102";

const numbersStringEnum = {
  0: "الاول",
  1: "الثاني",
  2: "الثالث",
  3: "الرابع",
  4: "الخامس",
};

const recieversLength = 5;

export default function CampaignForm() {
  const [getAllowedFields,loading] = useFetch(url(category));
  const [minInvention,setMinInvitation]=useState(0)
  const [values, setValues] = useState({sender:''});

  const submitInvitation = ()=>{
      const {sender} = values
      let recieversNumbers = values
      delete  recieversNumbers.sender
      recieversNumbers =Object.values(recieversNumbers)
      getAllowedFields({method:"POST",url : url(),data:{
        categoryId: category,
        senderPhoneNumber: sender,
        "recipientPhoneNumber": recieversNumbers
      }},()=>{
          setValues({...values,sent:true})
          swal("تم ارسال الدعوة بنجاح", "", {
            button: "متابعة"
          });
      })
  }

  const recievers = new Array(minInvention)
  .fill(1)
  .map((elem, index) => ({ title: numbersStringEnum?.[index] }));

  useEffect(() => {
    getAllowedFields({ method: "GET" }, (response) => {
      if (!response?.data) return;
      const {
        data: { minAcceptInvention,numberPerInvention },
      } = response;
      setMinInvitation(numberPerInvention)
    });
  }, []);


  const handleChange = (key, value) => {
    const dataObj = {
      [key]: value,
    };
    const newData = {
      ...values,
      ...dataObj,
    };
    setValues(newData);
  };

  const submitDisabled = Object.values(values).filter(value => !!value).length < 2
  return (
    <div className="mt-4">
      <span className="h3 gheed-black-color font-weight-600">
        يمكنك دعوة أصدقائك للاشتراك بدورات منصة
      </span>
      <CampaignField
        label="رقم جوال المرسل"
        name="sender"
        onChange={handleChange}
      />

      <div className="mt-4 w-100 row m-0">
        {recievers.map((rec, index) => (
          <CampaignField
            label={`رقم جوال المرسل ${rec.title}`}
            name={index}
            onChange={handleChange}
            classkey={index}
          />
        ))}
        <button onClick={submitInvitation} disabled={submitDisabled || !loading || values.sent} className="btn gheed-purple-bg p-2 color-white col-md-6 px-1 h-fit  mt-md-auto mt-3">
          {
              !loading ? "يتم الارسال" : values?.sent ? "تم الارسال" :"أرسل الدعوة"
          }
        </button>
      </div>
    </div>
  );
}
