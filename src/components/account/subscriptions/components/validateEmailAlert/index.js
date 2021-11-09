import React, { useState } from "react";
import Loader from "react-loaders";
import "loaders.css/src/animations/ball-spin-fade-loader.scss";
import axios from "axios";
import swal from "@sweetalert/with-react";

import "./index.scss";
import { apiBaseUrl } from "../../../../../api/helpers";

const ValidateEmailAlert = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

  let token = localStorage.getItem("token");
  let headers = {
    Authorization: `Bearer ${token}`,
  };

  const addEmail = async () => {
    await axios({
      method: "put",
      url: `${apiBaseUrl}/Email?Email=${email}`,
      headers,
    })
      .then(() => {
        swal({
          title: "تم اضافة الايميل بنجاح",
          icon: "success",
        });
      })
      .catch((error) =>
        swal({
          title: "مشكلة في اضافة الايميل حاول لاحقا",
          icon: "error",
        })
      );
  };

  const submitForm = (keyName = "Enter") => {
    if (keyName === "Enter") {
      const checkResult = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        email
      );
      addEmail();
      setEmailError(!checkResult);
      setLoading(!loading);
    }
  };

  return (
    <div className="popup-container">
      <h1 className="popup-hint-title">
        برجاء إدخال البريد الإلكتروني الخاص بك.
      </h1>
      <p className="popup-email-lable">أدخل الإيميل الخاص بك</p>
      <div className="row filed-width mx-auto justify-content-start align-items-center">
        <p className="email-lable w-25 m-0">البريد الالكتروني</p>
        <input
          className="email-input w-75"
          placeholder="example@example.com"
          value={email}
          onChange={(val) => setEmail(val.target.value)}
          onKeyPress={(key) => submitForm(key.key)}
        />
        {emailError && (
          <p className="error-email m-0 w-100 text-right">
            البريد الالكتروني المدخل غير صحيح
          </p>
        )}
        <div
          className="save-btn px-5 py-1 mx-auto my-2 rounded"
          onClick={() => submitForm()}
        >
          {loading ? (
            <Loader
              type="ball-spin-fade-loader"
              className="loader p-2"
              style={{ transform: "scale(0.5)" }}
            />
          ) : (
            "حفظ"
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidateEmailAlert;
