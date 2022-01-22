import { useState, useEffect, useRef } from "react";
// import { set_final_text_resp, set_current_url, set_api_method } from '../reducer/actions';
import {
  final_text_resp,
  api_method,
  current_url,
  post_data,
} from "../../reducer/types";
import axios from "axios";

// const useAxios = (
//   url_to_db,
//   method,
//   formData,
// dispatch
// ) => {
const useAxios = ({
  baseURLtoDB,
  currentURLtoDB,
  apiMethod,
  postData,
  dispatch,
}) => {
  // console.log("currentURLtoDB: ", currentURLtoDB);
  // const isMountedRef = useRef(true);
  const [changeData, setChangeData] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err_msg, set_err_msg] = useState("");
  const [isError, setIsError] = useState(false);
  // const [options, setOptions] = useState();

  console.log("useAxios HOOK");
  // console.log("useAxios getData: ", getData);

  console.log(apiMethod);
  console.log(currentURLtoDB);

  const optionsGetDel = {
    method: apiMethod,
    url: currentURLtoDB,
    headers: { "Content-type": "application/json" },
    // data: JSON.stringify(postData),
  };

  const optionsPostPut = {
    method: apiMethod,
    url: currentURLtoDB,
    headers: { "Content-type": "application/json" },
    data: JSON.stringify(postData),
  };

  console.log("useAxios HOOK 2");

  useEffect(() => {
    setChangeData(false);
    console.log("useAxios HOOK 3");
    let isMounted = true;
    // isMountedRef.current = true;
    // const abortContr = new AbortController();
    // console.log("usEffect in useFecth");
    // console.log("prev_url_db: ", prev_url_db);
    // if(isMountedRef.current){
    const callApiFunction = async () =>{

        if (isMounted) {
            console.log(apiMethod);
            if(apiMethod === "GET"){
                console.log("useAxios HOOK 4");
                const result =  await getData(optionsGetDel);
                 console.log("After GET");
                 console.log(result);
            }
            else if (apiMethod === "DELETE"){
                const result = await deleteRow(optionsGetDel);
                console.log("After DELETE");
                console.log(result);
            } 
            // else if (apiMethod === "PUT"){
            //     const result = await putData(optionsPostPut);
            //     console.log("After PUT");
            //     console.log(result);
            // } 
        } 
    }
      callApiFunction();
    // }

    // }
    // });

    // abort updating the store / state when fetching is interuptted
    return () => {
      console.log("useAxios HOOK return");
      // isMountedRef.current = false;
      isMounted = false;
    //   return;
      // abortContr.abort();
    };
    // }, []);
  }, [currentURLtoDB]);

  const getData = async (opt) => {
    console.log("useAxios HOOK 5");
    set_err_msg("");
    setIsLoading(true);
    console.log("useAxios HOOK 6");
    // if(apiMethod !== 'PUT'){
    // setTimeout(() => {
      // axios(options, { signal: abortContr.signal })
        axios(opt)
        .then(
          (res) => {
            // console.log(res);
            console.log("AXIOS done");
            // if(isMountedRef.current){
            // if (isMounted) {
              // if (res.statusText !== "OK") {
              if (res.status < 200 || res.status > 299) {
                throw new Error("Could not fetch data from that resource!");
                // console.log("Could not fetch data from that resource!");
              }
              console.log("res.data:");
              console.log(res.data);      
            setData(res.data);
            setChangeData(true);
              setIsError(false);
              // set_err_msg("");
              setIsLoading(false);
              // return res.data;
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
    // }, 700);
  }

  const deleteRow = async (opt) => {
    console.log("useAxios DEL HOOK 5");
    set_err_msg("");
    setIsLoading(true);
    console.log("useAxios HOOK DEL 6");
    // if(apiMethod !== 'PUT'){
    setTimeout(() => {
      // axios(options, { signal: abortContr.signal })
        axios(opt)
        .then(
          (res) => {
            // console.log(res);
            console.log("AXIOS done DEL");
            // if(isMountedRef.current){
            // if (isMounted) {
              // if (res.statusText !== "OK") {
              if (res.status < 200 || res.status > 299) {
                throw new Error("Could not fetch data from that resource!");
                // console.log("Could not fetch data from that resource!");
              }
              console.log("res.data:");
              console.log(res.data);      
            // setData(res.data);
              setIsError(false);
              // set_err_msg("");
              setIsLoading(false);
              // return res.data;
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
    }, 700);
  }

  const putData = async (opt) => {
    set_err_msg("");
    setIsLoading(true);
    console.log("useAxios HOOK DEL 6");
    // if(apiMethod !== 'PUT'){
    // setTimeout(() => {
      // axios(options, { signal: abortContr.signal })
        axios(opt)
        .then(
          (res) => {
            // console.log(res);
            console.log("AXIOS done PUT");
            // if(isMountedRef.current){
            // if (isMounted) {
              // if (res.statusText !== "OK") {
              if (res.status < 200 || res.status > 299) {
                throw new Error("Could not fetch data from that resource!");
                // console.log("Could not fetch data from that resource!");
              }
              console.log("res.data:");
              console.log(res.data);
              console.log(data[0]);      
              // console.log(data[Number(res.data.id)]);      
              console.log(data[res.data.id-1]);      
              console.log(res.data.id-1);      
            // setData([...data, [0]: res.data  ]);
            // data[res.data.id-1] = res.data;
            const index = data[res.data.id-1];
            const updatedData = data.map( el => Number(el.id)-1 !== index ? el : res.data)
            console.log(updatedData);
            setData(updatedData);
            setChangeData(true);
            // setData([...data, { data[Number(res.data.id-1)]: res.data } ]);
              setIsError(false);
              // set_err_msg("");
              setIsLoading(false);
              // return res.data;
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
    // }, 700);
  }

  const connect_api = (opt) => {
    console.log("useAxios HOOK 5");
    set_err_msg("");
    setIsLoading(true);
    console.log("useAxios HOOK 6");
    // if(apiMethod !== 'PUT'){
    setTimeout(() => {
      // axios(options, { signal: abortContr.signal })
        axios(opt)
        .then(
          (res) => {
            // console.log(res);
            console.log("AXIOS done");
            // if(isMountedRef.current){
            // if (isMounted) {
              // if (res.statusText !== "OK") {
              if (res.status < 200 || res.status > 299) {
                throw new Error("Could not fetch data from that resource!");
                // console.log("Could not fetch data from that resource!");
              }
              console.log("res.data:");
              console.log(res.data);      
            setData(res.data);
              setIsError(false);
              // set_err_msg("");
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
    }, 700);
  }

  // useEffect(()=>{
  //   console.log("useEffect 2");
  //   // if (apiMethod === "DELETE" || apiMethod === "POST" || apiMethod === "PUT") {
  //   if (apiMethod === "GET" && currentURLtoDB !== baseURLtoDB) {
  //     dispatch({ type: current_url, payload: baseURLtoDB });
  //   }
  // },[api_method])


  // }, [url_to_db, method]);
  // }, [url_to_db, getData]);
  // if(isMountedRef.current){
  // return { data, err_msg, isLoading, isError, isMountedRef };
  return { data, err_msg, isLoading, isError, changeData, setChangeData };
  // } else return {};
};

export default useAxios;
