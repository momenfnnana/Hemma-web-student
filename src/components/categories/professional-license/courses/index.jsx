import React, { useEffect } from "react";
import SubscribtionRequest from "../subscribtion-request";
import ProfessionalCourse from "./course";
import Axios from "axios";
import { useState } from "react";
import swal from "@sweetalert/with-react";
import { useHistory, withRouter } from "react-router-dom";
import KnowMore from "./course/video-content";

const token = localStorage.getItem("token");
let headers = {
  Authorization: `Bearer ${token}`,
};

const specUrl = `${process.env.REACT_APP_API_ENDPOINT}/Packages/SpecialCourse`;
const generalUrl = `${process.env.REACT_APP_API_ENDPOINT}/Packages/GeneralCourse`;
const getTrinerInfoUrl = (id) =>
  `${process.env.REACT_APP_API_ENDPOINT}/Users/instructor/${id}`;
//GET
const getTotalsUrl = `${process.env.REACT_APP_API_ENDPOINT}/Packages`;
//POST
// {
// "courseId": "string"
// }
const noPackageSubscribtionUrl = `${process.env.REACT_APP_API_ENDPOINT}/cart_v2/items/courses`;
// {
// "packageId": 0,
// "firstCourseId": "string",
// "secoundCourseId": "string"
// }
//POST
const packageSubscribtionUrl = `${process.env.REACT_APP_API_ENDPOINT}/cart_v2/packages`;

const getSpecUrl = (CategoryId) =>
  `${process.env.REACT_APP_API_ENDPOINT}/Specialities/${CategoryId}/Specialities`;

export default withRouter(function ProfessionalCourses({
  categoryData,
  history,
}) {
  const [selectedGeneralCourse, setSelectedGeneralCourse] = useState();
  const [selecteSpecCourse, setSelectedSpecCourse] = useState();
  const [specialities, setSpecialities] = useState([]);
  const [defaultCourse, setDefaultCourse] = useState();
  const [trainer, setTrainer] = useState({
    id: null,
    info: {},
  });
  const [totalInfo, setTotalInfo] = useState({
    data: null,
    error: "",
  });

  const authErrorMsg = () => {
    swal("عفواً", "عليك تسجيل الدخول للقيام بهذه الخطوة", "error", {
      button: "متابعة",
    }).then((response) => {
        window.location = "/auth/login";
});
  };

  const { push } = history;

  const [show, setShow] = useState({
    spec: true,
    general: true,
  });

  const authValidator = () => {
    if (!token) throw new Error("requires sign-in");
  };

  const [mergedData, setMeregedData] = useState({
    general: selectedGeneralCourse,
    spec: selecteSpecCourse,
  });

  const moveToCart = () => {
    push("/cart");
  };

  const showThirdCard = !!mergedData.general | !!mergedData.spec;

  const getTotalData = async () => {
    setTotalInfo({ ...totalInfo, error: "" });
    try {
      //authValidator();
      const { data } = await Axios.get(getTotalsUrl, {
        headers,
        params: {
          CourseId: mergedData?.general?.id,
          CourseId2: mergedData?.spec?.id,
        },
      });
      if (!data.data)
        setTimeout(() => {
          setTotalInfo({
            error: "لا توجد باقة على هذه الدورات",
            data: data.data,
          });
        }, 200);
      else
        setTimeout(() => {
          setTotalInfo({ ...totalInfo, data: data.data });
        }, 200);
    } catch (error) {
      console.log({ error });
    }
  };

  const validMergedData = Object.values(mergedData).every((value) => value);

  const specAlert = () => {
    if (!mergedData?.general)
      swal(
        "تم اختيار دورة تخصص … يمكنك اختيار دورة عام للحصول علي خصم مميز",
        " ",
        "",
        {
          button: "متابعة",
        }
      );
  };

  const generalAlert = () => {
    if (!mergedData?.spec)
      swal(
        "تم اختيار دورة عام … يمكنك اختيار دورة تخصص للحصول علي خصم مميز",
        " ",
        "",
        {
          button: "متابعة",
        }
      );
  };

  useEffect(() => {
    if (validMergedData) getTotalData();
    else
      setTotalInfo({
        error: "",
        data: null,
      });
  }, [mergedData]);

  const toggleShow = (key) => {
    setShow({
      ...show,
      [key]: false,
    });
    setTimeout(() => {
      setShow({
        ...show,
        [key]: true,
      });
    }, 100);
  };

  const handleGeneralDelete = () => {
    setMeregedData({ ...mergedData, general: null });
    setSelectedGeneralCourse(null);
    toggleShow("general");
  };

  const handleSpecDelete = () => {
    setMeregedData({ ...mergedData, spec: null });
    setSelectedSpecCourse(null);
    toggleShow("spec");
  };
  const refreshShow = () => {
    handleSpecDelete();
    setTimeout(() => {
      handleGeneralDelete();
      setMeregedData({ general: null, spec: null });
    }, 100);
  };

  const getSpecialities = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      //authValidator();
      const { data } = await Axios.get(getSpecUrl(categoryData?.id), {
        headers,
      });
      if (data?.data) setSpecialities(data.data);
    } catch (error) {}
  };

  const handleJoin = (key, value) => {
    const data = {
      [key]: value,
    };

    setMeregedData({ ...mergedData, ...data });
    generalAlert();
    specAlert();
  };

  const onGeneralCourseSelect = (course = null) => {
    setSelectedGeneralCourse(course);
  };

  const onSpecSelected = (course) => {
    setSelectedSpecCourse(course);
  };

  useEffect(() => {
    if (!categoryData?.id) return;

    getSpecialities();
  }, [categoryData]);

  const hasPackageCase = async (ids = [], pkg, onEnd) => {
    const pkgID = pkg.id;
    const body = {
      packageId: pkgID,
      firstCourseId: ids?.[0],
      secoundCourseId: ids?.[1],
    };
    if (!token) {
      localStorage.setItem("PostCardAction",JSON.stringify([{"url":packageSubscribtionUrl,"body":body}]));
      return;
    }
    try {
      //authValidator();
      const {
        data: { status },
      } = await Axios.post(packageSubscribtionUrl, body, {
        headers,
      });
      onEnd();
    } catch (error) {
    }
  };

  const hasNoPackageCaseSingleReq = (id) => {
    const body = {
      courseId: id,
    };
    authValidator();
    return Axios.post(noPackageSubscribtionUrl, body, {
      headers,
    });
  };

  const hasNoPackageCase = async (ids = [], onEnd) => {
    debugger;

    if (!token) {
      let postCardActions = [];
      ids.map(async (id, index) => {
        postCardActions.push({"url":noPackageSubscribtionUrl,"body":{courseId: id}});
      });

      localStorage.setItem("PostCardAction",JSON.stringify(postCardActions));
      return;
    }
    const promises = ids.map((id, index) => hasNoPackageCaseSingleReq(id));

    promises.map(async (promise, index) => {
      try {
        const res = await promise;
        if (index === ids.length - 1) onEnd();
      } catch (error) {}
    });
  };

  const handleSubscribtion = () => {
   
      
      
    const ids = [mergedData.general?.id, mergedData.spec?.id].map((id) => id);
    //in case of totalInfo.data so there is a pkg
    switch (!!totalInfo.data) {
      case true:
        hasPackageCase(ids, totalInfo.data, moveToCart);
        break;

      case false:
        hasNoPackageCase(ids, moveToCart);
        break;

      default:
        break;
    }

    if (!token) {
      authErrorMsg(); 
      return;
    }
  };

  const onTrainerSelected = (_trianer) => {
    setTrainer({ id: _trianer?.id, info: {} });
  };

  const getTrainerInfo = async (id) => {
    try {
      //authValidator();
      const { data } = await Axios.get(getTrinerInfoUrl(id), {
        headers,
      });
      const { data: trainerData } = data;
      setTrainer({ ...trainer, info: trainerData });
    } catch (error) {}
  };

  useEffect(() => {
    if (!trainer) return;
    getTrainerInfo(trainer?.id);
  }, [trainer.id]);

  const toPriceArray = [mergedData.general, mergedData.spec].map(
    (course) => course?.price || 0
  );
  const totalPrice = toPriceArray.reduce((prev, current) => (prev += current));

  return (
    <div className="row mt-6">
      {show?.["spec"] && (
        <ProfessionalCourse
          url={specUrl}
          title={selecteSpecCourse?.nameAr || "رخصة مهنية"}
          hasPickTrainer={false}
          categoryData={categoryData}
          specialities={specialities}
          triggerkeysCount={3}
          onCourseSelect={onSpecSelected}
          onResponse={onSpecSelected}
          descriptionData={selecteSpecCourse}
          defaultCourse={defaultCourse}
          setDefaultCourse={setDefaultCourse}
          onJoin={() => handleJoin("spec", selecteSpecCourse)}
          onTrainerSelected={onTrainerSelected}
        />
      )}
      {show?.["general"] && (
        <ProfessionalCourse
          setSelectedGeneralCourse={setSelectedGeneralCourse}
          descriptionData={selectedGeneralCourse}
          showDescriptionAt={selectedGeneralCourse}
          onCourseSelect={onGeneralCourseSelect}
          triggerkeysCount={1}
          url={generalUrl}
          title={selectedGeneralCourse?.nameAr || "العام"}
          hasChooseOptions={false}
          categoryData={categoryData}
          specialities={specialities}
          onJoin={() => handleJoin("general", selectedGeneralCourse)}
          onTrainerSelected={onTrainerSelected}
        />
      )}
      {!!showThirdCard && (
        <SubscribtionRequest
          localTotal={totalPrice}
          info={totalInfo}
          onGeneralDelete={handleGeneralDelete}
          onSpecDelete={handleSpecDelete}
          mergedData={mergedData}
          categoryData={categoryData}
          refreshShow={refreshShow}
          onSubscribe={handleSubscribtion}
        />
      )}
      <KnowMore trainer={trainer.info} />
    </div>
  );
});
