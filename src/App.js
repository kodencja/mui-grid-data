import React, { useMemo, useRef, useState, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import DateData from "./components/pages/DateData";
import Layout from "./components/Layout";
import "./App.css";
import DataTable from "./components/pages/DataTable";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchData,
  putData,
  postData,
  deleteData,
  deleteRows,
  set_modal_action,
  set_row_params,
  set_selection_row,
  apiResponseTxt,
} from "./redux";
import CircularProgress from "@mui/material/CircularProgress";
import AddRecord from "./components/pages/AddRecord";
import About from "./components/pages/About";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import ErrorBoundary from "./components/ErrorBoundary";
import { Button, Typography } from "@mui/material";
import { useModalCommands } from "./components/customHooks/useModalCommands";

export const ActionsContext = React.createContext();
export const ConstsContext = React.createContext();

// function App({api_db, fetchData, api_put, api_post, api_del}) {
function App(props) {
  const isMountedRef = useRef(true);
  const [path, setPath] = useState('');

  const {
    api_db_state: { data, loading, baseURLtoDB, error, responseTxt },
    grid_actions_state: { row_params, modal_action_name, selection_row },
    fetchData,
    api_put,
    api_post,
    api_del,
    rows_del,
    set_row_params,
    set_modal_action,
    set_selection_row,
    apiResponseTxt,
    constantsReducer: {
      list_of_countries,
      currencies,
      units,
      qualities,
      vat,
      discounts,
      warning,
      product_details,
      if_sure_single_del,
      if_sure_multi_del,
      multi_del, del, view
    },
  } = props;

  // const [modalOpen, setModalOpen] = useState(false);

  const propsForModal = {
    modal_action_name,
    baseURLtoDB,
    row_params,
    selection_row,
    set_selection_row,
    rows_del,
    api_del,
    set_row_params,
    set_modal_action,
    multi_del,
    // apiResponseTxt
  };

  const { modalOpen, handleClose, handleDelete, handleOpen } =
    useModalCommands(propsForModal);

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef.current) {
      console.log("fetchData in App.js");
      fetchData(baseURLtoDB);
    }

    return () => {
      console.log("App.js return: " + isMountedRef.current);
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    console.log("modal_action_name in App");
    console.log(modal_action_name);
  }, [modal_action_name]);

  // useEffect(() => {
  //   console.log("isLoading in App.js");
  //   console.log(loading);
  //   console.log("error: ");
  //   console.log(error);
  //   console.log("data.length: ");
  //   console.log(data.length);
  // })

  useEffect(() => {
    if (!modalOpen) {
      set_row_params({});
      console.log("Change row params in useEffect");
    }
  }, [modalOpen]);

  // const handleClose = () => {
  //   handleCloseFn(setModalOpen);
  // };

  const rows = useMemo(() => {
    console.log("rows in App.js");
    // console.log(data);
    if (isMountedRef.current) {
      if (data && data.length > 0) return data;
      else return [];
    }
  }, [data]);
  // }, [data, isMountedRef]);
  // }, [data, vat1]);

  const apiPropsPost = { baseURLtoDB, api_post, loading, error, responseTxt, apiResponseTxt };

  return (
    <div className="App">
      <ErrorBoundary>
        <Router>
          <ActionsContext.Provider
            value={{
              baseURLtoDB,
              api_put,
              api_del,
              rows_del,
              row_params,
              modal_action_name,
              set_row_params,
              set_modal_action,
              modalOpen,
              handleClose,
              handleDelete,
              handleOpen,
              set_selection_row,
              selection_row,
              apiResponseTxt,
              responseTxt,
              error
            }}
          >
            <ConstsContext.Provider
              value={{
                list_of_countries,
                currencies,
                units,
                qualities,
                vat,
                discounts,
                warning,
                product_details,
                if_sure_single_del,
                if_sure_multi_del, multi_del, del, view
              }}
            >
              <Layout>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      // error ? <Typography>{error.message}</Typography> :
                      loading ? <CircularProgress /> : <DataTable rows={rows} />
                    }
                  ></Route>
                  <Route
                    path="/add"
                    element={<AddRecord apiPropsPost={apiPropsPost} />}
                  ></Route>
                  <Route path="/about" element={<About />}></Route>
                </Routes>
              </Layout>
            </ConstsContext.Provider>
          </ActionsContext.Provider>
        </Router>
      </ErrorBoundary>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    api_db_state: state.api_db,
    grid_actions_state: state.grid_actions,
    constantsReducer: state.constantsReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(fetchData(url)),
    api_put: (url, sendData) => dispatch(putData(url, sendData)),
    api_post: (url, sendData) => dispatch(postData(url, sendData)),
    api_del: (url) => dispatch(deleteData(url)),
    rows_del: (url) => dispatch(deleteRows(url)),
    set_modal_action: (name) => dispatch(set_modal_action(name)),
    set_row_params: (params) => dispatch(set_row_params(params)),
    set_selection_row: (row_id) => dispatch(set_selection_row(row_id)),
    apiResponseTxt: (txt) => dispatch(apiResponseTxt(txt)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
