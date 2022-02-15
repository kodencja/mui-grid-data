import React, { useMemo, useRef, useState, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import DateData from "./components/pages/DateData";
import Layout from "./components/Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import useColumns from "./components/customHooks/useColumns";
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
  set_row_edit_error
} from "./redux";
import CircularProgress from "@mui/material/CircularProgress";
import AddRecord from "./components/pages/AddRecord";
import About from "./components/pages/About";
import validator from "validator";
import { format } from "date-fns";
import { addProduct, database, about } from "./constsNotInStore/titles";
import { makeStyles } from "@mui/styles";
import ErrorBoundary from "./components/ErrorBoundary";
import { Button, Typography } from "@mui/material";
import { useModalCommands } from "./components/customHooks/useModalCommands";

export const ActionsContext = React.createContext();
export const ConstsContext = React.createContext();

const defaultTheme = createTheme();

// function App({api_db, fetchData, api_put, api_post, api_del}) {
function App(props) {
  const isMountedRef = useRef(true);
  const [mainTitle, setMainTitle] = useState(database);

  const {
    api_db_state: { data, loading, baseURLtoDB, error, responseTxt },
    grid_actions_state: { row_params, modal_action_name, selection_row, row_edit_error },
    fetchData,
    api_put,
    api_post,
    api_del,
    rows_del,
    set_row_params,
    set_modal_action,
    set_selection_row,
    apiResponseTxt,
    setEditRowError,
    constantsReducer: {
      currencies,
      units,
      qualities,
      vat,
      discounts,
      warning,
      product_details,
      if_sure_single_del,
      if_sure_multi_del,
      multi_del, del, view, formInitData
    },
  } = props;

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
  };

  const { modalOpen, handleClose, handleDelete, handleOpen } =
  useModalCommands(propsForModal);

  const propForUseColumns = { handleOpen, currencies, units, discounts, vat, qualities, row_edit_error}
  
  const columnsAll = useColumns(propForUseColumns);

  const columns = useMemo(() => {
    return columnsAll;
  }, [row_edit_error]);

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef.current) {
      // console.log("fetchData in App.js");
      fetchData(baseURLtoDB);
    }

    return () => {
      // console.log("App.js return: " + isMountedRef.current);
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    console.log("modal_action_name in App");
    console.log(modal_action_name);
  }, [modal_action_name]);


  useEffect(() => {
    if (!modalOpen) {
      set_row_params({});
    }
  }, [modalOpen]);


  const rows = useMemo(() => {
    if (isMountedRef.current) {
      if (data && data.length > 0) return data;
      else return [];
    }
  }, [data]);

  const apiPropsPost = { baseURLtoDB, api_post, loading, error, responseTxt, apiResponseTxt };

  return (
    <div className="App">
      <ErrorBoundary>
      <ThemeProvider theme={defaultTheme}>
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
              error,
              setMainTitle,
              setEditRowError
            }}
          >
            <ConstsContext.Provider
              value={{
                currencies,
                units,
                qualities,
                vat,
                discounts,
                warning,
                product_details,
                if_sure_single_del,
                if_sure_multi_del, multi_del, del, view, formInitData
              }}
            >
              <Layout mainTitle={mainTitle}>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      loading ? <CircularProgress /> : <DataTable rows={rows} columns={columns} />
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
        </ThemeProvider>
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
    setEditRowError: (bool) => dispatch(set_row_edit_error(bool)),
  };
};

App.propTypes = {
  api_db_state: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
    loading: PropTypes.bool, 
    baseURLtoDB: PropTypes.string,
    error: PropTypes.string, 
    responseTxt: PropTypes.string,
  }),
  grid_actions_state: PropTypes.shape({
    row_params: PropTypes.instanceOf(Object),
    modal_action_name:  PropTypes.string,
    selection_row: PropTypes.arrayOf(PropTypes.number),
    row_edit_error: PropTypes.bool
  }),
  constantsReducer: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string),
    units: PropTypes.arrayOf(PropTypes.string),
    qualities: PropTypes.arrayOf(PropTypes.string),
    vat: PropTypes.arrayOf(PropTypes.number),
    discounts: PropTypes.arrayOf(PropTypes.number),
    warning: PropTypes.string,
    product_details: PropTypes.string,
    if_sure_single_del: PropTypes.string,
    if_sure_multi_del: PropTypes.string,
    multi_del: PropTypes.string,
    del: PropTypes.string,
    view: PropTypes.string,
    formInitData: PropTypes.exact({
      discount: PropTypes.number,
    vat: PropTypes.number,
    unit: PropTypes.string,
    use_by_date: (props, propName, componentName) => {
      if (!validator.isDate(props[propName])) {
        return new Error(`The ${propName}: ${props[propName]} is not a valid date`);
      } 
    }
    })
  }),
  fetchData: PropTypes.func,
  api_put: PropTypes.func,
  api_post: PropTypes.func,
  api_del: PropTypes.func,
  rows_del: PropTypes.func,
  set_row_params: PropTypes.func,
  set_modal_action: PropTypes.func,
  set_selection_row: PropTypes.func,
  apiResponseTxt: PropTypes.func,
  handleOpen: PropTypes.func,
  handleDelete: PropTypes.func,
  handleClose: PropTypes.func,
  modalOpen: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(App);