import {useState, useEffect} from 'react';
import axios from 'axios';

export const useApi = (url, reqData, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        options.data = reqData;
        options.url = url;
        const res = await axios(options);
        setData(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, data, options]);

  return { data, error, loading };
}