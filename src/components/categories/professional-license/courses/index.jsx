import React, { useEffect } from "react";
import SubscribtionRequest from "../subscribtion-request";
import ProfessionalCourse from "./course";
import Axios from "axios";
import { useState } from "react";
import swal from "@sweetalert/with-react";
import { useHistory, withRouter } from "react-router-dom";
import KnowMore from "./course/video-content";
import { hasLogin, useFetch } from "../../../../hooks/useFetch";
import { useLoaded } from "../../../../hooks/useLoaded";
import { getErrorMsg } from "../../../../utils/error-handling";
import { getAuthHeader, getToken } from "../../../../utils/auth";
import { checkCoursesUrl } from "../../../../urls/professional-license";

const specUrl = `${process.env.REACT_APP_API_ENDPOINT}/Packages/SpecialCourse`;
const generalUrl = `${process.env.REACT_APP_API_ENDPOINT}/Packages/GeneralCourse`;
const getTrinerInfoUrl = (id) =>
  `${process.env.REACT_APP_API_ENDPOINT}/Users/instructor/${id}`;
const getTotalsUrl = `${process.env.REACT_APP_API_ENDPOINT}/Packages`;
const noPackageSubscribtionUrl = `${process.env.REACT_APP_API_ENDPOINT}/cart_v2/items/courses`;
const packageSubscribtionUrl = `${process.env.REACT_APP_API_ENDPOINT}/cart_v2/packages`;
export const ITEAM_CAN_BE_ADDED = "ItemCanAdded";

const trainerInitState = {
  id: null,
  info: {},
};

const getSpecUrl = (CategoryId) =>
  `${process.env.REACT_APP_API_ENDPOINT}/Specialities/${CategoryId}/Specialities`;

export default withRouter(function ProfessionalCourses({
  categoryData,
  history,
}) {
  const [_getSpecialties, _specialites, _specLoading] = useFetch("", {
    isAuthed: true,
  });
  const [checkCourse] = useFetch(checkCoursesUrl, {
    method: "POST",
    isAuthed: true,
  });

  const [selectedGeneralCourse, setSelectedGeneralCourse] = useState();
  const [selecteSpecCourse, setSelectedSpecCourse] = useState();
  const [specialities, setSpecialities] = useState([]);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [defaultCourse, setDefaultCourse] = useState();
  const [trainer, setTrainer] = useState(trainerInitState);
  const [totalInfo, setTotalInfo] = useState({
    data: null,
    error: "",
  });

  const redirectToLogin = () => {
    const loginPath = `/auth/login`;
    window.location = loginPath;
  };

  const authErrorMsg = () => {
    swal("عفواً", "عليك تسجيل الدخول للقيام بهذه الخطوة", "error", {
      button: "متابعة",
    }).then(redirectToLogin);
  };

  const { push } = history;

  const [show, setShow] = useState({
    spec: true,
    general: true,
  });

  const authValidator = () => {
    const token = getToken();
    if (!token) throw new Error("requires sign-in");
  };

  const getOnlyActive = (array = []) => array?.filter((elem) => elem.active);

  const [mergedData, setMeregedData] = useState({
    general: selectedGeneralCourse,
    spec: selecteSpecCourse,
  });

  const moveToCart = () => {
    push("/cart");
  };

  const [showThirdCard, setShowThirdCard] = useState(false);

  const getTotalData = async () => {
    setTotalInfo({ ...totalInfo, error: "" });
    try {
      //authValidator();
      const { data } = await Axios.get(getTotalsUrl, {
        headers: getAuthHeader(),
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

  const validMergedData = Object.values(mergedData).every((value) => !!value);
  const noSelectedCourses = Object.values(mergedData).every((value) => !value);

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

  const triggerReset = () => setResetTrigger((c) => c + 1);

  useEffect(() => {
    if (!resetTrigger) return;
    setSelectedSpecCourse(null)
  }, [resetTrigger]);

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
    _getSpecialties({
      url: getSpecUrl(categoryData?.id),
    });
  };

  const notifyError = (msg) => {
    swal("عفواً", getErrorMsg(msg), "error", {
      button: "متابعة",
    });
  };

  const handleAddError = (response) => {
    const { error } = response;
    notifyError(error);
  };

  const checkAlreadyJoined = (id, cb) => {
    if (hasLogin()) {
      checkCourse(
        {
          data: {
            courseId: id,
          },
        },
        cb,
        handleAddError
      );
    } else {
      cb();
    }
  };

  const handleJoin = (key, value) => {
    if (!value.id) return;
    const data = {
      [key]: value,
    };
    const { id } = value;
    checkAlreadyJoined(id, () => setMeregedData({ ...mergedData, ...data }));
  };

  const delayedAction = (onTimeout = () => {}) => {
    setTimeout(() => {
      onTimeout();
    }, 200);
  };

  const handleShowThirdCard = () => {
    if (!!mergedData.general | !!mergedData.spec)
      delayedAction(() => {
        setShowThirdCard(true);
      });
    else
      delayedAction(() => {
        setShowThirdCard(false);
      });
  };

  useEffect(() => {
    handleShowThirdCard();
    if (noSelectedCourses || showThirdCard) return;
    generalAlert();
    specAlert();
  }, [mergedData.general, mergedData.spec]);

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
    const token = getToken();
    const body = {
      packageId: pkgID,
      firstCourseId: ids?.[0],
      secoundCourseId: ids?.[1],
    };

    if (!token) {
      localStorage.setItem(
        "PostCardAction",
        JSON.stringify([{ url: packageSubscribtionUrl, body: body }])
      );
      return;
    }
    try {
      //authValidator();
      const {
        data: { status },
      } = await Axios.post(packageSubscribtionUrl, body, {
        headers: getAuthHeader(),
      });
      onEnd();
    } catch (error) {
      const {
        response: { data },
      } = error;
      const errorMsg = data?.message || data?.error;
      swal("عفواً", getErrorMsg(errorMsg), "error", {
        button: "متابعة",
      });
    }
  };

  const hasNoPackageCaseSingleReq = (id) => {
    const body = {
      courseId: id,
    };
    authValidator();
    return Axios.post(noPackageSubscribtionUrl, body, {
      headers: getAuthHeader(),
    });
  };

  const handleBothRequestError = (foundError) => {
    if (!foundError) return;
    const {
      reason: {
        response: {
          data: { error },
        },
      },
    } = foundError;
    swal("عفواً", getErrorMsg(error), "error", {
      button: "متابعة",
    });
  };

  const hasNoPackageCase = async (ids = [], onEnd) => {
    const token = getToken();
    if (!token) {
      let postCardActions = [];
      ids.map(async (id, index) => {
        postCardActions.push({
          url: noPackageSubscribtionUrl,
          body: { courseId: id },
        });
      });

      localStorage.setItem("PostCardAction", JSON.stringify(postCardActions));
      return;
    }
    const promises = ids.map((id, index) => hasNoPackageCaseSingleReq(id));
    try {
      const promisesResult = await Promise.allSettled(promises);
      const foundError = promisesResult.find(
        ({ status }) => status === "rejected"
      );

      if (!promisesResult.find(({ status }) => status === "fulfilled"))
        handleBothRequestError(foundError);
      else onEnd();
    } catch (error) {
      console.error({ error });
    }
  };

  const handleSubscribtion = () => {
    const ids = [mergedData.general?.id, mergedData.spec?.id].filter(
      (id) => id
    );

    const token = getToken();

    if (!token) {
      authErrorMsg();
    }
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
  };

  const onTrainerSelected = (_trianer) => {
    setTrainer({ ...trainer, id: _trianer?.id });
  };

  const getTrainerInfo = async (id) => {
    try {
      //authValidator();
      const { data } = await Axios.get(getTrinerInfoUrl(id), {
        headers: getAuthHeader(),
      });
      const { data: trainerData } = data;
      setTrainer({ ...trainer, info: trainerData });
    } catch (error) {}
  };

  useEffect(() => {
    setTrainer({ ...trainer, info: {} });
    if (!trainer.id) return;
    getTrainerInfo(trainer?.id);
  }, [trainer.id]);

  const toPriceArray = [mergedData.general, mergedData.spec].map(
    (course) => course?.price || 0
  );
  const totalPrice = toPriceArray.reduce((prev, current) => (prev += current));

  const specialitiesState = {
    specialities: getOnlyActive(_specialites?.data) || [],
    loading: _specLoading,
  };

  const clearSelectedSpec = () => {
    setSelectedSpecCourse(null);
  };

  return (
    <div className="row mt-6">
      {show?.["spec"] && (
        <ProfessionalCourse
          url={specUrl}
          title={selecteSpecCourse?.nameAr || "دورات الرخصة المهنية"}
          general={'دورات الرخصة المهنية'}
          hasPickTrainer={false}
          categoryData={categoryData}
          specialitiesState={specialitiesState}
          triggerkeysCount={3}
          onCourseSelect={onSpecSelected}
          onResponse={onSpecSelected}
          descriptionData={selecteSpecCourse}
          defaultCourse={defaultCourse}
          setDefaultCourse={setDefaultCourse}
          onJoin={() => handleJoin("spec", selecteSpecCourse)}
          onTrainerSelected={onTrainerSelected}
          onClear={clearSelectedSpec}
          triggerReset={triggerReset}
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
          title={selectedGeneralCourse?.nameAr || "دورات الرخصة المهنية "}
          subTitle={'للعام'}
          general={'دورات الرخصة المهنية - عام'}
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
