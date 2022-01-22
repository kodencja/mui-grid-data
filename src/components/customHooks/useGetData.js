import { useState, useEffect, useRef, useCallback } from "react";
// import { set_final_text_resp, set_current_url, set_api_method } from '../reducer/actions';
import {
  final_text_resp,
  api_method,
  current_url,
  post_data,
} from "../../reducer/types";
import axios from "axios";

// const useGetData = (
//   url_to_db,
//   method,
//   formData,
// dispatch
// ) => {

// const useGetData = ({
//   baseURLtoDB,
//   currentURLtoDB,
//   apiMethod,
//   postData,
//   dispatch,
// }) => {
// const useGetData = ({ baseURLtoDB, currentURLtoDB, apiMethod }) => {
const useGetData = () => {
  // console.log("currentURLtoDB: ", currentURLtoDB);
  const isMountedRef = useRef(true);
  const [data, setData] = useState();
  const [gotData, setGotData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err_msg, set_err_msg] = useState("");
  const [isError, setIsError] = useState(false);
  // const [options, setOptions] = useState();

  console.log("useGetData HOOK");
  // console.log("useGetData getData: ", getData);

  //   console.log(apiMethod);
  //   console.log(currentURLtoDB);

  console.log("useGetData HOOK 2");

  useEffect(() => {
    // console.log("currentURLtoDB: ");
    // console.log(currentURLtoDB);
    let isMounted = true;
    // isMountedRef.current = true;
    const options = {
      // method: apiMethod,
      method: "GET",
      // url: currentURLtoDB,
      url: "http://localhost:8000/grocery",
      headers: { "Content-type": "application/json" },
      // data: JSON.stringify(postData),
    };
    setIsLoading(true);
    axios(options)
    .then(
      (res) => {
        // console.log(res);
        console.log("getData done");
        // if(isMountedRef.current){
        // if (isMounted) {
        // if (res.statusText !== "OK") {
        if (res.status < 200 || res.status > 299) {
          throw new Error("Could not fetch data from that resource!");
          // console.log("Could not fetch data from that resource!");
        }
        console.log("res.data in getData:");
        if(isMounted){
            console.log(res.data);
            setData(res.data);
            setIsLoading(false);
            setIsError(false);
        }

        // setGotData(res.data);
        // set_err_msg("");
        // setTimeout(() => {

        // const prev_url_copy = prev_url_db;

        // }, 1000);

        // return console.log(res.data);
        // }
      })
    .catch((err) => {
      console.log(err);
      console.log(err.name);
      console.log(err.message);
      // if (err.name === "AbortError") {
      //   console.log("fetch aborted");
      // } else {
      if (isMounted) {
      setIsLoading(false);
      setIsError(true);
      set_err_msg(err.message);
      }
      // }
    });

    // abort updating the store / state when fetching is interuptted
    return () => {
      console.log("useGetData HOOK return: " + isMounted);
      //   console.log("useGetData HOOK return1: " + isMountedRef.current);
    //   isMountedRef.current = false;
      //   console.log("useGetData HOOK return2: " + isMountedRef.current);
      // isMountedRef.current = false;
      isMounted = false;
      // abortContr.abort();
    };
  }, []);
  // }, [currentURLtoDB, data]);
  // }, [currentURLtoDB, data, apiMethod]);

  const getData = async (opt) => {
    console.log("useGetData HOOK 5");
    // set_err_msg("");
    // setIsLoading(true);
    console.log("useGetData HOOK 6");
    // if(apiMethod !== 'PUT'){
    // setTimeout(() => {
    // axios(options, { signal: abortContr.signal })
    return axios(opt)
      .then(
        (res) => {
          // console.log(res);
          console.log("getData done");
          // if(isMountedRef.current){
          // if (isMounted) {
          // if (res.statusText !== "OK") {
          if (res.status < 200 || res.status > 299) {
            throw new Error("Could not fetch data from that resource!");
            // console.log("Could not fetch data from that resource!");
          }
          console.log("res.data in getData:");
          console.log(res.data);
          // setIsLoading(false);
          // setIsError(false);
          // setData(res.data);
          return res.data;
          // setGotData(res.data);
          // set_err_msg("");
          // setTimeout(() => {

          // const prev_url_copy = prev_url_db;

          // }, 1000);

          // return console.log(res.data);
          // }
        },
        (error) => {
          console.log(error);
          console.log(error.message);
          throw new Error(
            "Could not fetch data from the url! " + error.message
          );
        }
      )
      .catch((err) => {
        console.log(err);
        console.log(err.name);
        console.log(err.message);
        // if (err.name === "AbortError") {
        //   console.log("fetch aborted");
        // } else {
        // if (isMounted) {
        setIsLoading(false);
        setIsError(true);
        set_err_msg(err.message);
        // }
        // }
      });

    // console.log(respon);
    // }, 700);
  };

  return { data, err_msg, isLoading, isError, getData };
  // } else return {};
};

export default useGetData;

/*
useEffect(() => {
    // console.log("currentURLtoDB: ");
    // console.log(currentURLtoDB);
    let isMounted = true;
    // isMountedRef.current = true;
    const options = {
      // method: apiMethod,
      method: "GET",
      // url: currentURLtoDB,
      url: "http://localhost:8000/grocery",
      headers: { "Content-type": "application/json" },
      // data: JSON.stringify(postData),
    };

    const callData = async () => {
      // console.log("useGetData HOOK 3: "+ isMounted);
      console.log("useGetData HOOK 3: " + isMountedRef.current);
      // isMountedRef.current = true;
      // const abortContr = new AbortController();
      // console.log("usEffect in useFecth");
      // console.log("prev_url_db: ", prev_url_db);
      // if(isMountedRef.current){
      //  if(data && data.length <= 0){
      // if (apiMethod === "GET") {
      console.log("useGetData HOOK GET");
      //   set_err_msg("");
      //   setIsLoading(true);
      console.log("Before setData");
      // getData(options);
      //   const response = await getData(options);
      const respo = await getData(options);
      if (isMounted) {
        setData(respo);
        setIsLoading(false);
        setIsError(false);
      }
      //   console.log(respo);
      //   setIsLoading(false);
      //   setData(respo);
      console.log("After setData");
      // } else if (apiMethod === "PUT") {
      //   console.log("PUT method");
      // }
      // }
    };
    // if (isMounted) {
    // if (isMountedRef.current) {
    callData();
    // getData(options);
    // }
    // }
    // });

    // abort updating the store / state when fetching is interuptted
    return () => {
      console.log("useGetData HOOK return: " + isMounted);
      //   console.log("useGetData HOOK return1: " + isMountedRef.current);
    //   isMountedRef.current = false;
      //   console.log("useGetData HOOK return2: " + isMountedRef.current);
      // isMountedRef.current = false;
      isMounted = false;
      // abortContr.abort();
    };
  }, []);
*/