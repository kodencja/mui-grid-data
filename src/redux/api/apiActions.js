import axios from "axios";
import {
  FETCH_DATA_SUCCESS,
  FETCH_REQUEST,
  REQUEST_COMPLETE,
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  PUT_DATA_SUCCESS,
  POST_DATA_SUCCESS,
  DEL_ROWS_SUCCESS,
  SET_RESPONSE_TEXT,
} from "./apiTypes";
import { initApiState } from "./apiReducer";
import {
  throwErrDefined,
  throwErrUndefined,
} from "../../functions/validation/throwErrors";

export const apiRequest = () => {
  return {
    type: FETCH_REQUEST,
  };
};

export const apiDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
  };
};

export const apiResponseTxt = (txt) => {
  try {
    throwErrUndefined(txt);
    throwErrDefined("string", txt);
    return {
      type: SET_RESPONSE_TEXT,
      payload: txt,
    };
  } catch (err) {
    console.log(
      `Error in apiResponseTxt(): Error name: ${err.name}. Error message: ${err.message}`
    );
  }
};

export const apiDataSuccess = (data) => {
  try {
    throwErrUndefined(data);
    return {
      type: FETCH_DATA_SUCCESS,
      payload: data,
    };
  } catch (err) {
    console.log(
      `Error in apiDataSuccess(): Error name: ${err.name}. Error message: ${err.message}`
    );
  }
};

export const putDataSuccess = (data) => {
  try {
    throwErrUndefined(data);
    return {
      type: PUT_DATA_SUCCESS,
      payload: data,
    };
  } catch (err) {
    console.log(
      `Error in putDataSuccess(): Error name: ${err.name}. Error message: ${err.message}`
    );
  }
};

export const deleteRowsSuccess = (idsArray) => {
  try {
    throwErrUndefined(idsArray);
    return {
      type: DEL_ROWS_SUCCESS,
      payload: idsArray,
    };
  } catch (err) {
    console.log(
      `Error in deleteRowsSuccess(): Error name: ${err.name}. Error message: ${err.message}`
    );
  }
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
        .then(
          (response) => {
            dispatch(apiDataSuccess(response.data));
          },
          (err) => {
            console.log("Error in fetchData(): " + err);
            throw new Error("Error in fetchData(): " + err);
          }
        )
        // .then(() => dispatch(apiResponseTxt('')))
        // .then(() => dispatch(apiResponseTxt('Data fetched from database:')))
        .catch((error) => {
          console.log(error.name);
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
      .then(
        (res) => {
          if (res.status < 200 || res.status > 299) {
            throw new Error("Could not amend data from that resource!");
            // console.log("Could not fetch data from that resource!");
          }
          console.log("Amend");
          dispatch(putDataSuccess(res.data));
        },
        (err) => {
          console.log("Error in putData(): " + err);
          throw new Error("Error in putData(): " + err);
        }
      )
      .then(() =>
        dispatch(apiResponseTxt("The record has been successfully amended"))
      )
      // .then((res) => dispatch(fetchData(initApiState.baseURLtoDB)))
      .catch((error) => {
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
      .then(
        (res) => {
          if (res.status < 200 || res.status > 299) {
            throw new Error("Could not post data from that resource!");
            // console.log("Could not fetch data from that resource!");
          }
          console.log("Post");
          dispatch(apiResponseTxt("The product has been added to database!"));
          // return true;
          // dispatch(postDataSuccess(true));
        },
        (err) => {
          console.log("Error in postData(): " + err);
          throw new Error("Error in postData(): " + err);
        }
      )
      // .then(() => dispatch(apiResponseTxt("The product has been added to database!")))
      .then(() => {
        setTimeout(() => {
          dispatch(fetchData(initApiState.baseURLtoDB));
        }, 1000);
      })
      .catch((error) => {
        console.log("Error");
        console.log(error.message);
        dispatch(apiDataFailure(error.message));
        // return false;
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
      .then(
        (res) => {
          if (res.status < 200 || res.status > 299) {
            throw new Error("Could not fetch data from that resource!");
            // console.log("Could not fetch data from that resource!");
          }
          console.log("Post");
          // dispatch(deleteDataSuccess());
        },
        (err) => {
          console.log("Error in deleteData(): " + err);
          throw new Error("Error in deleteData(): " + err);
        }
      )
      .then(() =>
        dispatch(apiResponseTxt("The product has been removed from database!"))
      )
      .then((res) => {
        setTimeout(() => {
          dispatch(fetchData(initApiState.baseURLtoDB));
        }, 1000);
      })
      .catch((error) => {
        console.log(error.name);
        console.log(error.message);
        dispatch(apiDataFailure(error.message));
      });
    // }, 1500)
  };
};

const deleteSomeRows = (dispatch, idsArray) => {
  return new Promise((resolve, reject) => {
    // resolve(dispatch(deleteRowsSuccess()));
    if (idsArray.length <= 0) {
      reject(new Error("There is no selected data to delete"));
    } else {
      dispatch(deleteRowsSuccess(idsArray));
      // setTimeout(()=> {
      resolve();
      // }, 2000)
    }
  });
};

export const deleteRows = (idsArray) => {
  try {
    if (idsArray.length <= 0) {
      throw new Error("There is no selected data to delete");
    }

    return async (dispatch) => {
      dispatch(apiDataRequest());

      // rows are deleted only in aplication memory ('data' array), not in database so as not to loose all records in the database. Here we simulate api latency ????
      // setTimeout(async () => {
      console.log("deleteRows async");
      await deleteSomeRows(dispatch, idsArray);
      // setTimeout(() => {
      dispatch(apiResponseTxt("The products have been deleted!"));
      // }, 1000)
      console.log("After deleteSomeRows");
      //   await dispatch(apiRequestComplete());
      console.log("After apiRequestComplete");
      // }, 500);
    };
  } catch (err) {
    console.log(
      `Error in deleteRows(): Error name: ${err.name}. Error message: ${err.message}`
    );
  }
};
