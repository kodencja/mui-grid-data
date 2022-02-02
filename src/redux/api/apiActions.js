import axios from 'axios';
import { FETCH_DATA_SUCCESS, FETCH_REQUEST, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, PUT_DATA_SUCCESS } from "./apiTypes";
import {initApiState} from './apiReducer';


export const apiRequest = () => {
  return {
    type: FETCH_REQUEST,
  };
};

export const apiRequestComplete = () => {
  return {
    type: REQUEST_COMPLETE,
  };
};

// export const apiDataRequest = (url) => {
export const apiDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
    // payload: url,
  };
};

export const apiDataSuccess = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
};

export const putDataSuccess = (data) => {
  return {
    type: PUT_DATA_SUCCESS,
    payload: data,
  };
};

// export const postDataSuccess = (data) => {
//     return {
//         type: POST_DATA_SUCCESS,
//         payload: data
//     }
// }

export const deleteRowsSuccess = (idsArray) => {
  return {
    type: DEL_ROWS_SUCCESS,
    payload: idsArray,
  };
};

export const apiDataFailure = (error) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error,
  };
};

export const fetchData = (url) => {
  return (dispatch) => {
    dispatch(apiDataRequest());

    setTimeout(() => {
      axios
        .get(url)
        .then((response) => {
          dispatch(apiDataSuccess(response.data));
        })
        .catch((error) => {
          console.log(error.message);
          dispatch(apiDataFailure(error.message));
        });
    }, 1000);
  };
};

// export const fetchData = (url, apiMethod, sendData = undefined) => {
// export const putData = (url, apiMethod, sendData) => {
export const putData = (url, sendData) => {
  console.log("url");
  console.log(url);
  // console.log("apiMethod");
  // console.log(apiMethod);
  console.log("sendData");
  console.log(sendData);

  const options = {
    method: "PUT",
    url: url,
    headers: { "Content-type": "application/json" },
    data: JSON.stringify(sendData),
    // data: apiMethod === "GET" || apiMethod === "DELETE" ? undefined : JSON.stringify(sendData),
  };

  return (dispatch) => {
    // dispatch(apiDataRequest(url));
    // setTimeout(()=>{
    // dispatch(apiRequest());

    console.log("PUT request");
    // }, 1000);
    axios(options)
      .then((res) => {
        if (res.status < 200 || res.status > 299) {
          throw new Error("Could not amend data from that resource!");
          // console.log("Could not fetch data from that resource!");
        }
            console.log("Amend")
            dispatch(putDataSuccess(res.data));
    })
    // .then((res) => dispatch(fetchData(initApiState.baseURLtoDB)))
    .catch(error => {
        console.log("Error");
        console.log(error.message);
        dispatch(apiDataFailure(error.message));
      });
    // }, 1000)
  };
};

export const postData = (url, sendData) => {
  console.log("url");
  console.log(url);
  // console.log("apiMethod");
  // console.log(apiMethod);
  console.log("sendData");
  console.log(sendData);

  const options = {
    method: "POST",
    url: url,
    headers: { "Content-type": "application/json" },
    data: JSON.stringify(sendData),
    // data: apiMethod === "GET" || apiMethod === "DELETE" ? undefined : JSON.stringify(sendData),
  };

  return (dispatch) => {
    // dispatch(apiDataRequest(url));
    // setTimeout(()=>{
    dispatch(apiRequest());
    console.log("Post request");
    axios(options)
      .then((res) => {
        if (res.status < 200 || res.status > 299) {
          throw new Error("Could not post data from that resource!");
          // console.log("Could not fetch data from that resource!");
        }
        console.log("Post");
        // dispatch(postDataSuccess(res.data));
      })
      .then((res) => dispatch(fetchData(url)))
      .catch((error) => {
        console.log("Error");
        console.log(error.message);
        dispatch(apiDataFailure(error.message));
      });
    // }, 1500)
  };
};

export const deleteData = (url) => {
  console.log("url");
  console.log(url);
  // console.log("apiMethod");
  // console.log(apiMethod);

  const options = {
    method: "DELETE",
    url: url,
    headers: { "Content-type": "application/json" },
  };

  return (dispatch) => {
    // dispatch(apiDataRequest(url));
    // setTimeout(()=>{
    // dispatch(apiRequest());
    console.log("Del request");
    axios(options)
      .then((res) => {
        if (res.status < 200 || res.status > 299) {
          throw new Error("Could not fetch data from that resource!");
          // console.log("Could not fetch data from that resource!");
        }
            console.log("Post")
            // dispatch(deleteDataSuccess());
    })
    .then((res) => dispatch(fetchData(initApiState.baseURLtoDB)))
    .catch(error => {
        console.log("Error");
        console.log(error.message);
        dispatch(apiDataFailure(error.message));
      });
    // }, 1500)
  };
};

const deleteSomeRows = (dispatch, idsArray) => {
  return new Promise((resolve, reject) => {
    // resolve(dispatch(deleteRowsSuccess()));
    dispatch(deleteRowsSuccess(idsArray));
    // setTimeout(()=> {
        resolve();
    // }, 2000)
  });
};

export const deleteRows = (idsArray) => {
  return async (dispatch) => {
    dispatch(apiDataRequest());

    // rows are deleted only in aplication memory ('data' array), not in database so as not to loose all records in the database. Here we simulate api latency
    // setTimeout(async () => {
      console.log("deleteRows async");
      await deleteSomeRows(dispatch, idsArray);
      console.log("After deleteSomeRows");
    //   await dispatch(apiRequestComplete());
      console.log("After apiRequestComplete");
    // }, 500);
  };
};
