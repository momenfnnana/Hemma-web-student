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

const senderCanNotBeReceiverError = 'لا يمكن أن يتطابق رقم المرسل و المستقبل'

const numbersStringEnum = {
  0: "الاول",
  1: "الثاني",
  2: "الثالث",
  3: "الرابع",
  4: "الخامس",
};

const sentBeforeString = (str)=>str.includes('Invetation Before')

const recieversLength = 5;
const defaultValus = {sender:'',receivers:{}}
export default function CampaignForm() {
  const [getAllowedFields,loading] = useFetch(url(category));
  const [minInvention,setMinInvitation]=useState(0)
  const [errors,setErrors] = useState({})
  const [values, setValues] = useState(defaultValus);
  const [matchCondition,setMatchCondition]= useState(false)
  const [showForm,setShowForm] = useState(true)
  const [receiversMatchErrors,setReceiversMatchErrors]= useState(false)
  

  const togggleShow = ()=>{
    setShowForm(false)
    setTimeout(() => {
      setShowForm(true)
    },100)
  }

  const hasSentBeforeAlert = ()=>{
    swal("عفواً", "لا يمكن إرسال الدعوة لنفس الشخص أكثر من مرة ", "error", {
      button: "متابعة"
    });
  }

  const onError = (err)=>{
    const {response:{data:{message}}} = err
    const hasSentBefore = sentBeforeString(message)
    if(hasSentBefore)
    hasSentBeforeAlert()
  }

  const submitInvitation = (e)=>{
      e.preventDefault();
      const {sender} = values
      const recieversNumbers =Object.values(values.receivers)
      getAllowedFields({method:"POST",url : url(),data:{
        categoryId: category,
        senderPhoneNumber: sender,
        "recipientPhoneNumber": recieversNumbers
      }},()=>{
          setValues({...defaultValus,sent:true})
          togggleShow()
          swal("تم ارسال الدعوة بنجاح", "", {
            button: "متابعة"
          });
      },onError)
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

  const handleReceverChange = (key,value)=>{
    const dataObj = {
      [key]: value,
    };
    const newData = {
      ...values,
      receivers : {
        ...values?.receivers,
        ...dataObj,
      }
    };
    setValues(newData);
  }


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

  const resetInputs = ()=>{
    setValues(defaultValus)
  }

  useEffect(()=>{
    const unrepeatedValues = [...new Set(Object.values(values?.receivers))]
    const originalValues = Object.values(values.receivers)
    const hasUniqueValues = !!(originalValues.length - unrepeatedValues.length)
    const condition = Object.values(values?.receivers).includes(values?.sender)  
    setMatchCondition(condition && senderCanNotBeReceiverError)
    setReceiversMatchErrors(hasUniqueValues && 'لا يمكن تكرار اسماء المرسل اليهم')
  },[values])

  const hasNoReceiver = Object.values(values.receivers).length === 0
  const hasNoSender = !values.sender
  const hasErros = Object.values(errors).filter(elem=>elem).length
  const submitDisabled = hasNoReceiver || hasNoSender || hasErros  || matchCondition || receiversMatchErrors

  return (
    <form className="mt-4" onSubmit={submitInvitation}>
      <span className="h3 gheed-black-color font-weight-600">
        يمكنك دعوة ٣ من أصدقاءك للاشتراك بدورات منصة همة التعليمية والحصول على مقعد مجاني في حال تم تسجيل اثنين من أصدقاءك في دورات القدرات لمنصة همة التعليمية تحصل على مقعد مجاني لدورة القدرات.
      </span>
      <CampaignField
        label="رقم جوال المرسل"
        name="sender"
        onChange={handleChange}
        errors={errors}
        defaultError={matchCondition}
        setErrors={setErrors}
        required
        values={values}
      />

      <div className="mt-4 w-100 row m-0">
        {showForm && recievers.map((rec, index) => (
          <CampaignField
            values={values?.receivers}
            defaultError={receiversMatchErrors}
            setErrors={setErrors}
            errors={errors}
            label={`رقم صديقك ${rec.title}`}
            name={index+''}
            onChange={handleReceverChange}
            classkey={index}
          />
        ))}
        <button type="submit"  disabled={submitDisabled || !loading} className="btn gheed-purple-bg p-2 color-white col-md-6 px-1 h-fit  mt-md-auto mt-3">
          {
              !loading ? "يتم الارسال" : values?.sent ? "تم الارسال" :"أرسل الدعوة"
          }
        </button>
      </div>
    </form>
  );
}
