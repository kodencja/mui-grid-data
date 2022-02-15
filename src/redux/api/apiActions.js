import axios from "axios";
import {
  FETCH_DATA_SUCCESS,
  FETCH_REQUEST,
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  PUT_DATA_SUCCESS,
  DEL_ROWS_SUCCESS,
  SET_RESPONSE_TEXT,
} from "./apiTypes";
import { initApiState } from "./apiReducer";

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
  return {
    type: SET_RESPONSE_TEXT,
    payload: txt,
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
        .then(
          (response) => {
            dispatch(apiDataSuccess(response.data));
          },
          (err) => {
            throw new Error("Error in fetchData(): " + err);
          }
        )
        .catch((err) => {
          console.log( `Error in fetchData(): Error name: ${err.name}. Error message: ${err.message}`);
          dispatch(apiDataFailure(err.message));
        });
    }, 1000);
  };
};

export const putData = (url, sendData) => {
  const options = {
    method: "PUT",
    url: url,
    headers: { "Content-type": "application/json" },
    data: JSON.stringify(sendData),
  };

  return (dispatch) => {
    axios(options)
      .then(
        (res) => {
          if (res.status < 200 || res.status > 299) {
            throw new Error(`Could not connect with the url: ${url}`);
          }
          dispatch(putDataSuccess(res.data));
        },
        (err) => {
          throw new Error("Error in putData(): " + err);
        }
      )
      .then(() =>
        dispatch(apiResponseTxt("The record has been successfully amended"))
      )
      .catch((err) => {
        console.log( `Error in putData(): Error name: ${err.name}. Error message: ${err.message}`);
        dispatch(apiDataFailure(err.message));
      });
  };
};

export const postData = (url, sendData) => {

  const options = {
    method: "POST",
    url: url,
    headers: { "Content-type": "application/json" },
    data: JSON.stringify(sendData),
  };

  return (dispatch) => {
    dispatch(apiRequest());
    axios(options)
      .then(
        (res) => {
          if (res.status < 200 || res.status > 299) {
            throw new Error(`Could not post data to the resource: ${url}!`);
          }
          dispatch(apiResponseTxt("The product has been added to database!"));
        },
        (err) => {
          throw new Error("Error in postData(): " + err);
        }
      )
      .then(() => {
        setTimeout(() => {
          dispatch(fetchData(initApiState.baseURLtoDB));
        }, 1000);
      })
      .catch((err) => {
        console.log( `Error in postData(): Error name: ${err.name}. Error message: ${err.message}`);
        dispatch(apiDataFailure(err.message));
      });
  };
};

export const deleteData = (url) => {
  const options = {
    method: "DELETE",
    url: url,
    headers: { "Content-type": "application/json" },
  };

  return (dispatch) => {
    axios(options)
      .then(
        (res) => {
          if (res.status < 200 || res.status > 299) {
            throw new Error(`Could not connect with the url: ${url}`);
          }
        },
        (err) => {
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
      .catch((err) => {
        console.log(`Error in deleteData(): Error name: ${err.name}. Error message: ${err.message}`);
        dispatch(apiDataFailure(err.message));
      });
  };
};

const deleteSomeRows = (dispatch, idsArray) => {
  return new Promise((resolve, reject) => {

    if (idsArray.length <= 0) {
      reject(new Error("There is no selected data to delete"));
    } else {
      dispatch(deleteRowsSuccess(idsArray));
      resolve();
    }
  });
};

export const deleteRows = (idsArray) => {

  return async (dispatch) => {

    try {
      if (idsArray.length <= 0) {
        throw new Error("There is no selected data to delete");
      }
      dispatch(apiDataRequest());

    // rows are deleted only in aplication memory ('data' array), not in database so as not to loose all records in the database
    await deleteSomeRows(dispatch, idsArray);
    dispatch(apiResponseTxt("The products have been deleted!"));
  
    } catch (err) {
      console.log(
        `Error in deleteRows(): Error name: ${err.name}. Error message: ${err.message}`
      );
    }

  };


};
