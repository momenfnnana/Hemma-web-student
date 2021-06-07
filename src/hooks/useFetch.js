import Axios from "axios";
import { useState } from "react";

export const useFetch = (url = "",  config = null,defaultData = [],initInstance = null ) => {
    const [data, setData] = useState(defaultData);
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // const notify = useMessage()
  
  
    const fetchData = async (dynamicConfig = null,onSuccess = ()=>{}) => {
  
      try {
        setLoading(true);
        setError('')
        const { data: response } = await Axios({
          url,
          ...config,
          ...dynamicConfig
        });
        setData(response);
        onSuccess(response)
        //you could return an promise including response data here to replace callback with normal await
      } catch (e) {
        const status = e?.response?.status
        const errorMsg =  e?.response?.data?.error
        setError(errorMsg);
        setLoading(false);
      }
      setLoading(false);
     
    };
  
    return [fetchData, data, loading, error];
  };
  