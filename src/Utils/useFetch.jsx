import React, { useEffect, useState } from "react";
import fetchDataFromApi from "./Api";

const useFetch = (url) => {
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setLoading("Loading...");
    setdata(null);
    fetchDataFromApi(url)
      .then((res) => {
        setdata(res);
        setLoading(false);
      })
      .catch((err) => {
        setError("Something went wrong");
        setLoading(false);
        console.log(error);
      });
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
