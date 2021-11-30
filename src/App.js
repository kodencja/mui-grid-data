import React, { useMemo, useRef, useState, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import DataTable from "./pages/DataTable";
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
import AddRecord from "./pages/AddRecord";
import About from "./pages/About";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import ErrorBoundary from "./components/ErrorBoundary";
import { Button } from "@mui/material";
import useFetch from "./components/customHooks/useFetch";
import reducer from "./components/reducer/reducer";
import initState  from "./components/reducer/initState";
// import { set_final_text_resp } from "./components/reducer/actions";
import {
  final_text_resp,
  api_method,
  current_url,
  post_data,
} from "./components/reducer/types";
import useColumns from "./components/customHooks/useColumns";
import TableData from "./pages/TableData";

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { finalTextResponse, postData, apiMethod, currentURLtoDB, baseURLtoDB } = state;

  // const [modalOpen, setModalOpen] = useState(false);
  // const [row_params, set_row_params] = useState({});

  const useFetchOptions = {baseURLtoDB, currentURLtoDB, apiMethod, postData, dispatch};

  const { data, err_msg, isLoading, isError } = useFetch(useFetchOptions);
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

  const rows = useMemo(() => {
    if(data.length > 0) return data;
    else return [];
  }, [data]);

  
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

  useEffect(() => {
    console.log("finalTextResponse:");
    console.log(finalTextResponse);
  // });
  }, [finalTextResponse]);

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
const dataTableProps = { dispatch, finalTextResponse, baseURLtoDB };


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
                  dataTableProps={dataTableProps}
                  // modalOpen={modalOpen}
                  // handleDelete={handleDeleteClick}
                  // handleClose={handleClose}
                  // params={row_params}
                />
              }
            ></Route>
            <Route path="/data" element={<TableData />}></Route>
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