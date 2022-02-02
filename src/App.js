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
<<<<<<< HEAD
import {fetchData, putData, postData, deleteData, deleteRows} from "./redux/api";
=======
import {fetchData, putData, postData, deleteData, set_if_to_del_row, set_row_params} from "./redux";
>>>>>>> redux
import CircularProgress from '@mui/material/CircularProgress';
import AddRecord from "./components/pages/AddRecord";
import About from "./components/pages/About";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import ErrorBoundary from "./components/ErrorBoundary";
import { Button, Typography } from "@mui/material";


// function App({api_db, fetchData, api_put, api_post, api_del}) {
function App(props) {
  const isMountedRef = useRef(true);
  // const [state, dispatch] = useReducer(reducer, initState);
<<<<<<< HEAD
  const {data_db: { data, loading, currentURLtoDB, baseURLtoDB, error }, fetchData, api_put, api_post, api_del, rows_del} = props;
  // const { data, loading, currentURLtoDB, baseURLtoDB, error } = data_db;
=======
  const {api_db: { data, loading, currentURLtoDB, baseURLtoDB, error }, grid_actions: {row_params, del_to_row}, fetchData, api_put, api_post, api_del, set_if_to_del_row, set_row_params} = props;
  // const { data, loading, currentURLtoDB, baseURLtoDB, error } = api_db;
>>>>>>> redux

  // const [modalOpen, setModalOpen] = useState(false);
  // const [row_params, set_row_params] = useState({});


  useEffect(() => {
    isMountedRef.current = true;
    // getData(baseURLtoDB);
    if(isMountedRef.current){
      console.log("fetchData in App.js");
      fetchData(baseURLtoDB);
    }

    return () => {
        console.log("App.js return: " + isMountedRef.current);
        isMountedRef.current = false;
    };
  },[])

  // useEffect(() => {
  //   console.log("isLoading in App.js");
  //   console.log(loading);
  //   console.log("error: ");
  //   console.log(error);
  //   console.log("data.length: ");
  //   console.log(data.length);
  // })



  const rows = useMemo(() => {
    console.log("rows in App.js");
    // console.log(data);
    if(isMountedRef.current){
      if(data && data.length > 0) return data;
      else return [];
    }
  }, [data]);
  // }, [data, isMountedRef]);
  // }, [data, vat1]);

  // }, [data && data.length]);


// const dataTableProps = { modalOpen, handleDeleteClick, handleClose, row_params, dispatch, finalTextResponse, baseURLtoDB };
// const dataTableProps = { baseURLtoDB, currentURLtoDB, apiMethod };
// const dataTableProps = { finalTextResponse, baseURLtoDB, currentURLtoDB, apiMethod };
const apiProps = {baseURLtoDB, api_put, api_del, rows_del};
const apiPropsPost = {baseURLtoDB, api_post, loading};


  return (
    <div className="App">
      <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            {/* <Route exact path="/" element={<DataTable apiRef={apiRef} columns={columns} rows={rows} />} ></Route> */}
            <Route
              exact
              path="/"
              // element={<DataTable columns={columns} rows={rows} modalOpen={modalOpen} handleDelete={handleDeleteClick} handleClose={handleClose} params={row_params} />}
              element={
                // error ? <Typography>{error.message}</Typography> :
                loading ? <CircularProgress /> :
                // data.length <= 0 ? <CircularProgress /> :
                <DataTable
                //   // columns={columns}
                  rows={rows}
                  apiProps={apiProps}
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
                // <DateData />
              }
            ></Route>
            {/* <Route path="/data" element={<TableData />}></Route> */}
            <Route path="/add" element={<AddRecord apiPropsPost={apiPropsPost} />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </Layout>
      </Router>
      </ErrorBoundary>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    api_db: state.api_db,
    grid_actions: state.grid_actions
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(fetchData(url)),
    api_put: (url, sendData) => dispatch(putData(url, sendData)),
    api_post: (url, sendData) => dispatch(postData(url, sendData)),
    api_del: (url) => dispatch(deleteData(url)),
<<<<<<< HEAD
    rows_del: (url) => dispatch(deleteRows(url)),
=======
    set_if_to_del_row: (flag) => dispatch(set_if_to_del_row(flag)),
    set_row_params: (params) => dispatch(set_row_params(params))
>>>>>>> redux
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

  