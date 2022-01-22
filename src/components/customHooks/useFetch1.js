import { useState, useEffect, useRef, useCallback } from "react";
// import { set_final_text_resp, set_current_url, set_api_method } from '../reducer/actions';
import {
  final_text_resp,
  api_method,
  current_url,
  post_data,
} from "../../reducer/types";
import axios from "axios";

// const useFetch = (
//   url_to_db,
//   method,
//   formData,
// dispatch
// ) => {

const useFetch = ({
  baseURLtoDB,
  currentURLtoDB,
  apiMethod,
  postData,
  dispatch,
}) => {
  // const useFetch = ({ baseURLtoDB, currentURLtoDB, apiMethod }) => {
  // const useFetch = () => {
  // console.log("currentURLtoDB: ", currentURLtoDB);
  const isMountedRef = useRef(true);
  const [data, setData] = useState([]);
  const [gotData, setGotData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err_msg, set_err_msg] = useState("");
  const [isError, setIsError] = useState(false);
  // const [options, setOptions] = useState();
  const options = useRef({});
  console.log("useGetData HOOK");
  // console.log("useGetData getData: ", getData);

  //   console.log(apiMethod);
  //   console.log(currentURLtoDB);

  // console.log("useGetData HOOK 2");
  console.log("isLoading00:");
  console.log(isLoading);
  console.log("isMountedRef.current0");
  console.log(isMountedRef.current);

  useEffect(() => {
    // console.log("currentURLtoDB: ");
    // console.log(currentURLtoDB);
    // let isMounted = true;

    console.log("postData:");
    console.log(postData);

    isMountedRef.current = true;
    options.current = {
      method: apiMethod,
      url: currentURLtoDB,
      headers: { "Content-type": "application/json" },
    };
    // if (apiMethod === "GET"){

    // } else
    if (apiMethod === "PUT" || apiMethod === "POST") {
      options.current.data = JSON.stringify(postData);
    }

    const callData = async () => {
      //   console.log("useGetData HOOK 3: "+ isMounted);
      console.log("useGetData HOOK 3: " + isMountedRef.current);
      console.log("options:");
      console.log(options.current);
      // isMountedRef.current = true;
      // const abortContr = new AbortController();
      // console.log("usEffect in useFecth");
      // console.log("prev_url_db: ", prev_url_db);
      // if(isMountedRef.current){
      //  if(data && data.length <= 0){
      // if (apiMethod === "GET" && currentURLtoDB === baseURLtoDB) {
      console.log("useGetData HOOK GET");
      //   set_err_msg("");
      //   setIsLoading(true);
      console.log("Before setData");
      // getData(options);
      //   const response = await getData(options);
      // console.log("isLoading0:");
      // console.log(isLoading);
      // setIsLoading(true);

      // tutaj przy getData() ja mu wysyłam dane sprzed zmiany isLoading, a więc isLoading on czyta wcześniejsze czyli równe "false"
      // const respo = await getData(options);
      // const respo = getData(options);
      // console.log(respo);
      //   if (isMountedRef.current) {
      // setData(respo);
      //   console.log("After setData");
      //   console.log("isLoading4:");
      // console.log(isLoading);
      //   setIsLoading(false);
      //   console.log("After loading false");
      //     setIsError(false);
      //   }
      //   console.log(respo);
      //   setIsLoading(false);
      //   setData(respo);
      // } else if (apiMethod === "PUT" && currentURLtoDB !== baseURLtoDB) {
      //   console.log("PUT method");
      // } else if (apiMethod === "POST" && currentURLtoDB !== baseURLtoDB) {
      //   console.log("POST method");
      // } else if (apiMethod === "DELETE" && currentURLtoDB !== baseURLtoDB) {
      //   console.log("DELETE method");
      // }
      // }
    };
    if (isMountedRef.current) {
      // if (isMountedRef.current) {
      //   setIsLoading(true);
      // callData();
      // getData(options);

      console.log("isLoading0:");
      console.log(isLoading);
      setIsLoading(true);
    }
    // }
    // });

    // abort updating the store / state when fetching is interuptted
    return () => {
      //   console.log("useGetData HOOK return: " + isMounted);
      console.log("useGetData HOOK return1: " + isMountedRef.current);
      //   isMountedRef.current = false;
      //   console.log("useGetData HOOK return2: " + isMountedRef.current);
      isMountedRef.current = false;
      //   isMounted = false;
      // abortContr.abort();
    };
    //   }, []);
    //   }, [currentURLtoDB]);
  }, [currentURLtoDB, apiMethod]);

  useEffect(() => {
    let isMounted = true;
    // isMountedRef.current = true;
    console.log("useEff isLoading5:");
    console.log(isLoading);
    const callDataFn = async () => {
      // if (isMountedRef.current && isLoading) {
      // if (isMounted && isLoading) {
        const respo = await getData(options.current);
        // const respo = getData(options.current);
        console.log(respo);
        console.log("callDataFn isLoading6:");
        console.log(isLoading);
        setIsLoading(false);
        console.log("callDataFn isLoading7:");
        console.log(isLoading);
      // }
    };

    // if (isMountedRef.current) {
    if (isMounted && isLoading) {
      console.log("to callDataFn isLoading8:");
      console.log(isLoading);
      callDataFn();
    }

    return () => {
      //   console.log("useGetData HOOK return: " + isMounted);
      // console.log("useGetData HOOK return1: " + isMountedRef.current);
      //   isMountedRef.current = false;
      //   console.log("useGetData HOOK return2: " + isMountedRef.current);
      // isMountedRef.current = false;
        isMounted = false;
      // abortContr.abort();
    };
  }, [isLoading]);

  const getData = async (opt) => {
    console.log("useGetData HOOK 5");
    // set_err_msg("");
    console.log("opt:");
    console.log(opt);
    console.log("getData isLoading1:");
    console.log(isLoading);
    setIsLoading(true);
    // console.log("isLoading2:");
    // console.log(isLoading);
    // if(apiMethod !== 'PUT'){
    // setTimeout(() => {
    // axios(options, { signal: abortContr.signal })
    if (isMountedRef.current && isLoading) {
      console.log("Just before axios");
      console.log("isMountedRef.current1");
      console.log(isMountedRef.current);
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
            if (isMountedRef.current) {
              if (apiMethod === "GET" && currentURLtoDB === baseURLtoDB) {
                setData(res.data);
              } else if (
                apiMethod === "PUT" &&
                currentURLtoDB !== baseURLtoDB
              ) {
                // console.log("PUT method");
                // console.log(data[res.data.id - 1]);
                // console.log(res.data.id - 1);
                // const index = res.data.id - 1;
                // const updatedData = data.map((el) =>
                //   Number(el.id) - 1 !== index ? el : res.data
                // );
                // console.log(updatedData);
                // setData(updatedData);
                // console.log("useGetData HOOK 6");
              } else if (
                apiMethod === "POST" &&
                currentURLtoDB !== baseURLtoDB
              ) {
                console.log("POST method");
              } else if (
                apiMethod === "DELETE" &&
                currentURLtoDB !== baseURLtoDB
              ) {
                console.log("DELETE method");
              }
              console.log("isLoading3:");
              console.log(isLoading);
              // setIsLoading(false);
              setIsError(false);
            }
            //   setIsError(false);
            //   setIsLoading(false);

            //   return res.data;

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
          if (isMountedRef.current) {
            // setIsLoading(false);
            setIsError(true);
            set_err_msg(err.message);
          }
          // }
        });
    }
    // console.log(respon);
    // }, 700);
  };

  const putData = useCallback((url, putData) => {
    console.log("url: ", url);
    console.log("putData");
    console.log(putData);

    const opts = {
      method: "PUT",
      url: url,
      headers: { "Content-type": "application/json" },
      data: JSON.stringify(putData),
    };

    set_err_msg("");
    setIsLoading(true);

    // if(apiMethod !== 'PUT'){
    setTimeout(() => {
      axios(opts)
        .then(
          (res) => {
            // console.log(res);
            console.log("putData done");
            // if(isMountedRef.current){
            // if (res.statusText !== "OK") {
            if (res.status < 200 || res.status > 299) {
              throw new Error("Could not fetch data from that resource!");
              // console.log("Could not fetch data from that resource!");
            }
            console.log("PUT method");
            console.log("res.data:");
            console.log(res.data);
            // console.log(data[res.data.id - 1]);
            // console.log(res.data.id - 1);
            const index = res.data.id - 1;
            const updatedData = data.map((el) =>
              Number(el.id) - 1 !== index ? el : res.data
            );
            console.log(updatedData);
            setData(updatedData);
            setIsError(false);
            set_err_msg("");
            setIsLoading(false);
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
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setIsError(true);
            set_err_msg(err.message);
            setIsLoading(false);
          }
        });
    }, 700);
  }, []);

    return { data, err_msg, isLoading, isError, putData };
  // return { data, err_msg, isLoading, isError };
  // } else return {};
};

export default useFetch;

/* 
  useEffect(() => {
    console.log("currentURLtoDB: ");
    console.log(currentURLtoDB);
    let isMounted = true;
    console.log("useFetch HOOK 3: "+ isMounted);
    // isMountedRef.current = true;
    // const abortContr = new AbortController();
    // console.log("usEffect in useFecth");
    // console.log("prev_url_db: ", prev_url_db);
    // if(isMountedRef.current){
    if (isMounted && data.length <= 0) {
      if (apiMethod === "GET") {
        console.log("useFetch HOOK GET");
        setIsLoading(true);
        // const response = await getData(options);
        getData(options);
      } else if (apiMethod === "PUT") {
        console.log("PUT method");
      }
    }

    // }
    // });

    // abort updating the store / state when fetching is interuptted
    return () => {
      console.log("useFetch HOOK return: " + isMounted);
      // isMountedRef.current = false;
      isMounted = false;
      // abortContr.abort();
    };
    }, []);

*/
