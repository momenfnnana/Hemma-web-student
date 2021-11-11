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

export const useFetch = (url = "", mainConfig = {isAuthed:true}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {isAuthed = true} = mainConfig;

  const fetchData = async (
    reqConf = initConfig,
    onSuccess = () => {},
    onError = () => {}
  ) => {
    debugger;
    console.log(token);
    const reqConfig = { ...mainConfig, ...reqConf };
    const AxiosInstance = token ? authedInstance : baseInstance;
    try {
      setLoading(true);
      setError("");
      const response = await AxiosInstance({
        url,
        ...initConfig,
        ...reqConfig,
      });
      const data = response?.data
      setData(data);
      onSuccess(data);
    } catch (err) {
      setError(err);
      setLoading(false);
      onError(err);

      // if (errorMsg)
      //   swal("عفواً", errorMsg, "error", {
      //     button: "متابعة",
      //   });
    }
    setLoading(false);
  };

  return [fetchData, data, loading, error, setData];
};

export const hasLogin = ()=>{
  return localStorage.getItem('token')
}
