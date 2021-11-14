import Axios from "axios";
import { useEffect,useState } from "react";
import swal from "@sweetalert/with-react";
const SUCCESS_STATUS = 200;
// const token = localStorage.getItem("token");

const initConfig = {
  method: "GET",
};

const baseInstance = Axios.create();

export const useFetch = (url = "", mainConfig = {isAuthed:true}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [accessToken,setAccessToken]=useState(null);
  const {isAuthed = true} = mainConfig;

  useEffect(()=>{
    const token = localStorage.getItem("token");
    setAccessToken(token)
  },[])
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const authedInstance = Axios.create({
    headers,
  });
  const fetchData = async (
    reqConf = initConfig,
    onSuccess = () => {},
    onError = () => {}
  ) => {
    const reqConfig = { ...mainConfig, ...reqConf };
    const AxiosInstance = accessToken ? authedInstance : baseInstance;
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
