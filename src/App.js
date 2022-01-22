import React, { useMemo, useRef, useState, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import DataTable from "./components/pages/DataTable";
import PropTypes from "prop-types";
import {
  GridCellParams,
  GridApi,
  // useGridApiRef,
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
import CircularProgress from '@mui/material/CircularProgress';
import AddRecord from "./components/pages/AddRecord";
import About from "./components/pages/About";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import ErrorBoundary from "./components/ErrorBoundary";
import { Button } from "@mui/material";
import useFetch from "./components/customHooks/useFetch1";
import useAxios from "./components/customHooks/useAxios";
import usePostPut from "./components/customHooks/usePostPut";
import reducer from "./reducer/reducer";
import initState  from "./reducer/initState";
import {
  api_method,
  current_url,
  post_data,
  current_record_id,
} from "./reducer/types";
import useGetData from "./components/customHooks/useGetData";
// import { set_final_text_resp } from "./components/reducer/actions";
// import {
//   final_text_resp,
//   api_method,
//   current_url,
//   post_data,
// } from "./reducer/types";
// import useColumns from "./components/customHooks/useColumns";
// import TableData from "./components/pages/TableData";

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { finalTextResponse, postData, apiMethod, currentURLtoDB, baseURLtoDB, currentRecordId } = state;

  // const [modalOpen, setModalOpen] = useState(false);
  // const [row_params, set_row_params] = useState({});

  const useFetchOptions = {baseURLtoDB, currentURLtoDB, apiMethod, postData, dispatch};
  // const useFetchOptions = {baseURLtoDB, currentURLtoDB, apiMethod};

  // const { data, err_msg, isLoading, isError, changeData, setChangeData } = useAxios(useFetchOptions);
  // const { data, err_msg, isLoading, isError } = useGetData();
  // const { data, err_msg, isLoading, isError } = useFetch();
  const { data, err_msg, isLoading, isError } = useFetch(useFetchOptions);

  console.log("isLoading in App.js");
  console.log(isLoading);
  // const vat1 = data && data[0] && data[0].vat;
  // data && console.log(data[0]);
  // const { data, err_msg, isLoading, isError } = useFetch(currentURLtoDB);
  // const { error_msg, loading, anyError } = usePostPut(currentURLtoDB, postData);

  // const { data, err_msg, isLoading, isError } = useFetch(
  //   currentURLtoDB,
  //   // "http://localhost:8000/grocery",
  //   apiMethod,
  //   postData,
  //   dispatch
  // );

  // const defaultTheme = createTheme();
  // const useStyles = makeStyles(
  //   (theme) => ({
  //     actions: {
  //       color: theme.palette.text.secondary,
  //     },
  //     textPrimary: {
  //       color: theme.palette.text.primary,
  //     },
  //   }),
  //   { defaultTheme }
  // );

  // const classes = useStyles();

  // const handleOpen = (params) => {
  //   set_row_params(params);
  //   setModalOpen(true);
  // };
  
  // const columnsAll = useColumns(handleOpen, classes);
  // const columnsAll = useColumns(handleOpen);

  // const columns = useMemo(()=>{
  //   return columnsAll;
  // },[])

  // useEffect(()=>{
  //   getData({method: "GET",
  //   url: currentURLtoDB,
  //   headers: { "Content-type": "application/json" },});
  // },[])

  // useEffect(() => {
  //   console.log("currentRecordId");
  //   console.log(currentRecordId);
  //   console.log("postData");
  //   console.log(postData);
  //   if(currentRecordId !== null){
  //     dispatch({ type: current_url, payload: `${baseURLtoDB}/${currentRecordId}` });
  //   }
  // }, [postData.id])
  // }, [currentRecordId])
  // }, [post_data, currentRecordId])

  // const rows = () => {
  //   console.log("data in App.js");
  //   console.log(data);
  //   if(data && data.length > 0) return data;
  //   else return [];
  // };

  const rows = useMemo(() => {
    console.log("rows in App.js");
    // console.log(data);
    if(data && data.length > 0) return data;
    else return [];
  }, [data]);
  // }, [data, vat1]);

  // }, [data && data.length]);

  // const rows = useMemo(() => {
  //   if(changeData){
  //     // setChangeData(false);
  //     if(data.length > 0) {
  //       return data;
  //     }
  //     else {
  //       // setChangeData(false);
  //       return [];
  //     }
  //   }
  // }, [changeData]);
  // }, [data]);

  // const handleClose = () => setModalOpen(false);

  // useEffect(() => {
    // set_final_text_resp(dispatch, "Good evening again!" );
    // setTimeout(()=>{
    //   dispatch({type: final_text_resp, payload: "Half past five"});
    // }, 1000)
    // callDisptach("Good afternoon!", dispatch);
    // dispatch({ type: "final_text_resp", payload: "Morning!"});
    // console.log('columnsHeaders: ');
    // console.log(columnsHeaders);
  // }, [data]);

  // useEffect(() => {
  //   console.log("finalTextResponse:");
  //   console.log(finalTextResponse);
  // // });
  // }, [finalTextResponse]);

  // const handleDeleteClick = (id) => (event) => {
  // const handleDeleteClick = (event, params) => {
  // const handleDeleteClick = (e) => {
  //   e.stopPropagation();
  //   console.log("row_params");
  //   console.log(row_params);
  //   const id = row_params.id;
  //   console.log(id);
  //   row_params.api.updateRows([{ id, _action: "delete" }]);
  //   console.log("Row DELETED!");
  //   handleClose();
  //   set_row_params({});

  //   // console.log(apiRef.current);
  //   // apiRef.current.updateRows([{ id, _action: 'delete' }]);
  // };

  // const rows = useMemo(() => {
  //   return columns;
  // }, [columns]);

// const dataTableProps = { modalOpen, handleDeleteClick, handleClose, row_params, dispatch, finalTextResponse, baseURLtoDB };
const dataTableProps = { dispatch, finalTextResponse, baseURLtoDB, currentURLtoDB, apiMethod };
// const dataTableProps = { finalTextResponse, baseURLtoDB, currentURLtoDB, apiMethod };


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
                isLoading ? <CircularProgress /> :
                <DataTable
                  // columns={columns}
                  rows={rows}
                  // rows={data}
                  dataTableProps={dataTableProps}
                  // modalOpen={modalOpen}
                  // handleDelete={handleDeleteClick}
                  // handleClose={handleClose}
                  // params={row_params}
                />
              }
            ></Route>
            {/* <Route path="/data" element={<TableData />}></Route> */}
            <Route path="/add" element={<AddRecord />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </Layout>
      </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;

  // zamiana tekstu pisanego camel case np. 'firstName' na zwyky np. 'First name'
  // const getColumnsHeaders = (name) => {
  //   return [...name]
  //     .map((letter, index) =>
  //       index === 0
  //         ? letter.toUpperCase()
  //         : letter === letter.toUpperCase()
  //         ? [" ", letter.toLowerCase()]
  //         : letter
  //     )
  //     .flat(1)
  //     .join("");
  // };

  // const columnsHeaders = useMemo(() => {
  //   if(data[0]){
  //     const columnsOrdered =  Object.keys(data[0]).map((key, ind) => {
  //       console.log(key);
  //       if (ind === 0) return { field: "id", headerName: "ID", width: 70 };
  //       else {
  //         return {
  //           field: key,
  //           headerName: getColumnsHeaders(key),
  //           width: 130,
  //           editable: true,
  //         };
  //       }
  //     });
  //     console.log(columnsOrdered);
  //     return columnsOrdered;
  //   }

  // }, [data]);