import { useState, useEffect, useRef } from "react";
// import { set_final_text_resp, set_current_url, set_api_method } from '../reducer/actions';
import {
  final_text_resp,
  api_method,
  current_url,
  post_data,
} from "../reducer/types";
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
  // console.log("currentURLtoDB: ", currentURLtoDB);
  // const isMountedRef = useRef(true);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err_msg, set_err_msg] = useState("");
  const [isError, setIsError] = useState(false);
  // const [options, setOptions] = useState();

  // console.log("useFetch HOOK");
  // console.log("useFetch getData: ", getData);

  // console.log(method);

  const options = {
    method: apiMethod,
    url: currentURLtoDB,
    headers: { "Content-type": "application/json" },
    data: JSON.stringify(postData),
  };

  useEffect(() => {
    let isMounted = true;
    // isMountedRef.current = true;
    const abortContr = new AbortController();
    // console.log("usEffect in useFecth");
    // console.log("prev_url_db: ", prev_url_db);
    // if(isMountedRef.current){
    if (isMounted) {
      set_err_msg("");
      setIsLoading(true);

      // if(apiMethod !== 'PUT'){
      setTimeout(() => {
        axios(options, { signal: abortContr.signal })
          // axios(options)
          .then(
            (res) => {
              // console.log(res);
              console.log("AXIOS done");
              // if(isMountedRef.current){
              if (isMounted) {
                // if (res.statusText !== "OK") {
                if (res.status < 200 || res.status > 299) {
                  throw new Error("Could not fetch data from that resource!");
                  // console.log("Could not fetch data from that resource!");
                }
                // console.log("res.data:");
                // console.log(res.data);
                setData(res.data);
                setIsError(false);
                set_err_msg("");
                setIsLoading(false);

                if (apiMethod === "GET") {
                  dispatch({
                    type: final_text_resp,
                    payload: "The records have been fetched",
                  });
                  // console.log("The records have been GOT");
                } else if (apiMethod === "DELETE") {
                  // console.log("The record has been deleted");
                  dispatch({ type: api_method, payload: "GET" });
                  dispatch({ type: current_url, payload: baseURLtoDB });
                  // setRes_txt("The record has been deleted");
                  // reversapiMethod('GET');
                  // setUrl(prev_url_db);
                } else if (apiMethod === "POST" || apiMethod === "PUT") {
                  dispatch({
                    type: final_text_resp,
                    payload: "The record has been updated",
                  });
                  setTimeout(() => {
                    dispatch({ type: api_method, payload: "GET" });
                    dispatch({ type: current_url, payload: baseURLtoDB });
                  }, 1000);
                  // console.log("POST / PUT method - sent");
                  // setRes_txt("The record has been added");
                  // reversMethod('GET');
                  // const prev_url_copy = prev_url_db;
                  // setUrl(prev_url_db);
                }
                // setTimeout(() => {
                //
                // const prev_url_copy = prev_url_db;
                //
                // }, 1000);

                // return console.log(res.data);
              }
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
              if (isMounted) {
                setIsLoading(false);
                setIsError(true);
                set_err_msg(err.message);
              }
            }
          });
      }, 700);
    }

    // }

    // }
    // });

    // abort updating the store / state when fetching is interuptted
    return () => {
      // isMountedRef.current = false;
      isMounted = false;
      abortContr.abort();
    };
    // }, []);
  }, [currentURLtoDB]);
  // }, [url_to_db, method]);
  // }, [url_to_db, getData]);
  // if(isMountedRef.current){
  // return { data, err_msg, isLoading, isError, isMountedRef };
  return { data, err_msg, isLoading, isError };
  // } else return {};
};

export default useFetch;
