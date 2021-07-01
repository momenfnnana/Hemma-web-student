import Axios from "axios";
import { useState } from "react";
import swal from "@sweetalert/with-react";
const SUCCESS_STATUS = 200;
const token = localStorage.getItem("token");

const headers = {
  Authorization: `Bearer ${token}`,
};

const initConfig = {
  method: "GET",
};

const authedInstance = Axios.create({
  headers,
});

const baseInstance = Axios.create();

export const useFetch = (url = "", mainConfig = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {isAuthed} = mainConfig

  const fetchData = async (
    reqConf = initConfig,
    onSuccess = () => {},
    onError = () => {}
  ) => {
    const reqConfig = { ...mainConfig, ...reqConf };
    const AxiosInstance = isAuthed ? authedInstance : baseInstance;
    try {

      setLoading(true);
      setError("");
      const { data: response } = await AxiosInstance({
        url,
        ...initConfig,
        ...reqConfig,
      });
      setData(response);
      if (response?.status === SUCCESS_STATUS) onSuccess(response);
    } catch (e) {
      const errorMsg = "";
      setError(errorMsg);
      setLoading(false);
      onError(e);

      if (errorMsg)
        swal("عفواً", errorMsg, "error", {
          button: "متابعة",
        });
    }
    setLoading(false);
  };

  return [fetchData, data, loading, error, setData];
};
