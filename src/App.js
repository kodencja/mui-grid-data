import React, { useMemo, useRef, useState, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DateData from "./components/pages/DateData";
import Layout from "./components/Layout";
import "./App.css";
import DataTable from "./components/pages/DataTable";
import PropTypes from "prop-types";
import {
  GridCellParams,
  GridApi,
  esES,
  GridColDef,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridActionsCellItem,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
// import {EditIcon, CancelIcon, DeleteIcon, SaveIcon } from '@mui/icons-material';
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { connect } from "react-redux";
// import {fetchData} from "./redux/api/apiActions";
import {
  fetchData,
  putData,
  postData,
  deleteData,
  deleteRows,
  set_modal_action,
  set_row_params,
  set_selection_row,
} from "./redux";
import CircularProgress from "@mui/material/CircularProgress";
import AddRecord from "./components/pages/AddRecord";
import About from "./components/pages/About";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import ErrorBoundary from "./components/ErrorBoundary";
import { Button, Typography } from "@mui/material";

export const ActionsContext = React.createContext();
export const ConstsContext = React.createContext();

// function App({api_db, fetchData, api_put, api_post, api_del}) {
function App(props) {
  const isMountedRef = useRef(true);

  const {
    api_db: { data, loading, baseURLtoDB, error },
    grid_actions: { row_params, modal_action_name, selection_row },
    fetchData,
    api_put,
    api_post,
    api_del,
    rows_del,
    set_row_params,
    set_modal_action,
    set_selection_row,
    constantsReducer: {
      list_of_countries,
      currencies,
      units,
      qualities,
      vat,
      discounts,
    },
  } = props;

  const [modalOpen, setModalOpen] = useState(false);
  // const [selectionRow, setSelectionRow] = useState([]);

  // const { data, loading, currentURLtoDB, baseURLtoDB, error } = api_db;

  // const [modalOpen, setModalOpen] = useState(false);
  // const [row_params, set_row_params] = useState({});

  useEffect(() => {
    isMountedRef.current = true;
    // getData(baseURLtoDB);
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

  // przy del_rows nie ma 'params'
  const handleOpen = (params, name) => {
    console.log("name");
    console.log(name);
    console.log("params in handleOpen");
    console.log(params);
    set_row_params(params);
    set_modal_action(name);
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  const checkIfMultiDel = () => {
    if (modal_action_name !== "multi_del") {
      return false;
    }
    return true;
  };

  const handleDelete = async (e) => {
    // e.stopPropagation();
    console.log("handleDelete1");

    if (!checkIfMultiDel()) {
      await api_del(`${baseURLtoDB}/${row_params.id}`);
      handleClose();
      return;
    }
    await rows_del(selection_row);
    handleClose();
    console.log("handleDelete2");
  };

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

  // }, [data && data.length]);

  // const dataTableProps = { modalOpen, handleDeleteClick, handleClose, row_params, dispatch, finalTextResponse, baseURLtoDB };
  // const dataTableProps = { baseURLtoDB, currentURLtoDB, apiMethod };
  // const dataTableProps = { finalTextResponse, baseURLtoDB, currentURLtoDB, apiMethod };
  // const apiProps = {baseURLtoDB, api_put, api_del, rows_del};
  // const gridActionsProps = {row_params, to_del_row, set_row_params, set_modal_action};
  const apiPropsPost = { baseURLtoDB, api_post, loading };

  const valueActionsContext = useMemo(() => {
    return {
      baseURLtoDB,
      api_put,
      api_del,
      rows_del,
      row_params,
      modal_action_name,
      set_row_params,
      set_modal_action,
      modalOpen,
    };
  }, []);

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
              }}
            >
              <Layout>
                <Routes>
                  {/* <Route exact path="/" element={<DataTable apiRef={apiRef} columns={columns} rows={rows} />} ></Route> */}
                  <Route
                    exact
                    path="/"
                    // element={<DataTable columns={columns} rows={rows} modalOpen={modalOpen} handleDelete={handleDeleteClick} handleClose={handleClose} params={row_params} />}
                    element={
                      // error ? <Typography>{error.message}</Typography> :
                      loading ? (
                        <CircularProgress />
                      ) : (
                        // data.length <= 0 ? <CircularProgress /> :
                        <DataTable
                          //   // columns={columns}
                          rows={rows}
                          // apiProps={apiProps}
                          // gridActionsProps={gridActionsProps}
                          //   // api_put={api_put}
                          //   // api_del={api_del}
                          //   // baseURLtoDB={baseURLtoDB}

                          //   // rows={data}
                          //   // dataTableProps={dataTableProps}
                          //   // modalOpen={modalOpen}
                          //   // handleDelete={handleDeleteClick}
                          //   // handleClose={handleClose}
                          //   // params={row_params}
                        />
                      )

                      // <DateData />
                    }
                  ></Route>
                  {/* <Route path="/data" element={<TableData />}></Route> */}
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
    api_db: state.api_db,
    grid_actions: state.grid_actions,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
