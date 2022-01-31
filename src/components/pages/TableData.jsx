import React, {
  useState,
  // useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import {
  DataGrid,
  // GridCellParams,
  // GridApi,
  // useGridApiRef,
  // esES,
  // GridToolbarContainer,
  // GridToolbarFilterButton,
  // GridActionsCellItem,
  // GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import {
  pink,
  purple,
  red,
  grey,
  blueGrey,
  yellow,
} from "@mui/material/colors";
import axios from "axios";
import datadb from "../fakeDB/datadb.json";
// import ErrorBoundary from "../components/ErrorBoundary";
import ModalComp from "../ModalComp";
import useColumns from "../customHooks/useColumns";

const TableData = () => {
  console.log("Table Data Comp.");
  // const DataTable = ({ columns, rows }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [row_params, set_row_params] = useState({});
  const [pageSize, setPageSize] = useState(5);
  const [editRowsModel, setEditRowsModel] = useState({});

  const rowsRef = useRef([]);
  //   const rowsRef = useRef(datadb);
  const [rowsData, setRowsData] = useState();
  //   const rowsRef = React.createRef(datadb);
  const isMounted = useRef(true);
  // store row data after editing
  const [editRowData, setEditRowData] = useState({});

  // const { data, err_msg, isLoading, isError } = useFetch(
  // currentURLtoDB,
  // apiMethod,
  // postData
  // "http://localhost:8000/grocery",
  // "GET"
  // null
  // isMountedRef.current
  // );

  useEffect(() => {
    const abortContr = new AbortController();
    // let isMounted = true;
    isMounted.current = true;
    const options = {
      method: "GET",
      url: "http://localhost:8000/grocery",
      // headers: { "Content-type": "application/json" },
      // data: JSON.stringify(formData),
    };
    // if (isMounted && rows.length <= 0) {
    // if (isMounted) {
    if (isMounted.current) {
      //   getData(options, isMounted, abortContr);
      // async function callGetdata() {
      //   await getData(options, isMounted, abortContr);
      // }
      // callGetdata();
      rowsRef.current = datadb;
      //   console.log(rowsRef.current);
      //   setRowsData(rowsRef.current);
      //   setRowsData(datadb);
    }
    // return () => (isMounted.current = false);

    return () => {
      //   isMounted = false;
      isMounted.current = false;
      abortContr.abort();
    };
  }, []);

  //   useEffect(() => {
  //     isMounted.current = true;
  //     setRowsData(rowsRef.current);
  //     return () => (isMounted.current = false);
  //   }, [rowsRef]);
  // }, [rowsRef.current]);

  const getData = (options, isMounted, abortContr) => {
    setTimeout(() => {
      // fetch("http://localhost:8000/grocery")
      //   .then((res) => res.json())
      //   .then((resp) => setRowsData(resp))
      //   .catch((err) => {
      //     console.log(err);
      //     console.log(err.name);
      //     console.log(err.message);
      //   });

      axios(options, { signal: abortContr.signal })
        .then((res) => {
          //   if (isMounted) {
          if (isMounted.current) {
            // if (res.statusText !== "OK") {
            if (res.status < 200 || res.status > 299) {
              throw Error("Could not fetch data from that resource!");
              // console.log("Could not fetch data from that resource!");
            }
            // console.log(res.data);
            // if (rows.length > 0 && rows !== rowsData) {
            setRowsData(res.data);
            // setRowsData(datadb);
            // }
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(err.name);
          console.log(err.message);
        });
    }, 700);
  };

  //   const rows = useMemo(() => {
  //     return rowsData;
  //   }, [rowsData]);

  const handleOpen = (params) => {
    console.log("handleOpen Fn");
    set_row_params(params);
    setModalOpen(true);
  };

  // const columnsAll = useColumns(handleOpen, classes);
  const columnsAll = useColumns(handleOpen);

  const columny = useMemo(() => {
    console.log("columny");
    // return datadb;
    return columnsAll;
  }, []);

  const rows = useMemo(() => {
    // const rows = useCallback(() => {
    if (isMounted.current) {
      // if (rowsData && Array.isArray(rowsData)) {
      console.log("rows");
      // setRowsData(data);
      return rowsData;
    }
    // else return;
  }, [rowsData]);
  // }, [data, isMountedRef]);

  // useEffect(() => {
  //   let isMounted = true;
  //   if (isMounted) {
  //     // if (isMountedRef.current) {
  //     setRowsData(data);
  //     // rows();
  //   }
  //   return () => (isMounted = false);
  // }, [data]);

  const handleClose = () => {
    console.log("handleClose Fn");
    setModalOpen(false);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    console.log("row_params");
    console.log(row_params);
    const id = row_params.id;
    console.log(id);
    row_params.api.updateRows([{ id, _action: "delete" }]);
    console.log("Row DELETED!");
    handleClose();
    set_row_params({});

    // console.log(apiRef.current);
    // apiRef.current.updateRows([{ id, _action: 'delete' }]);
  };

  const style = {
    color: yellow["50"],
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    // bgcolor: 'background.paper',
    bgcolor: grey[800],
    // backgroundColor: 'background.paper',
    border: "2px solid #000",
    // overlay: { backgroundColor: "rgba(169, 169, 180, 0.733)" },
    boxShadow: 24,
    p: 3,
    textAlign: "center",
  };

  // const handleEditRowsModelChange = useCallback(
  const handleEditRowsModelChange = (model) => {
    console.log("handleEditRowsModelChange");
    console.log("model");
    console.log(model); // {3:  age: {value: 45}, firstName: {value: 'Jaime', error: false}, lastName: {value: 'Lannisterro'} }
    // console.log(details); // {}
    // console.log(cos); // {}
    // setEditRowsModel(model);
    const editedIds = Object.keys(model); // 3
    // console.log(editedIds);
    // console.log("refApi");
    // console.log(refApi);
    // console.log("apiRef");
    // console.log(apiRef);
    // user stops editing when the edit model is empty
    if (editedIds.length === 0) {
      // alert(JSON.stringify(editRowData, null, 4));
      console.log(editRowData);
      // update on firebase
    } else {
      // setEditRowData({ id: editedIds[0], ...model[editedIds[0]] });
      // setEditRowData({ ...editRowData, ...model[editedIds[0]] });

      // TUTAJ ROBIMY VALIDATION
      if (model[editedIds[0]].name.value.length < 3) {
        console.log("Too SHORT");
        return;
        // return false;
        // setEditRowData({});
      } else {
        console.log("OKAY");
        // setEditRowData(model[editedIds[0]]);
        setEditRowData({ id: Number(editedIds[0]), ...model[editedIds[0]] });
      }

      // setEditRowData({
      //   ...model[editedIds[0]],
      //   firstName: {
      //     value: model[editedIds[0]].firstName.value,
      //     error: true,
      //   },
      // });
    }
    setEditRowsModel(model);
    console.log("editRowData");
    console.log(editRowData);
  };
  //   [editRowData]
  // );

  // console.log(editRowData);

  // const rowStop = (params, event, details) => {
  //   // event.defaultMuiPrevented = true;
  //   console.log("ROW_STOP");
  //   console.log(params.row);
  //   // console.log("editRowsModel");
  //   // console.log(editRowsModel);
  //   // console.log("editRowData");
  //   // console.log(editRowData);
  //   // console.log(event);
  //   // console.log(details);
  // };

  // const rowStart = (params, event, details) => {
  //   // event.defaultMuiPrevented = true;
  //   console.log("ROW_START");
  //   // console.log(params);
  //   console.log(params.row); // {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16}
  //   // console.log(event);
  //   // console.log(details);
  //   // console.log("editRowsModel");
  //   // console.log(editRowsModel);
  //   // console.log("editRowData");
  //   // console.log(editRowData);
  // };

  const editCommit = (params, event, details) => {
    console.log("EDIT_COMMIT: ");
    console.log(params); // id number
    // console.log(event);
    // console.log(details);
    // console.log(editRowsModel);
    console.log(editRowData);
    // TUTAJ ROBIMY ROW UPDATE
  };

  return (
    <div
      style={{
        // height: "80vh",
        height: "calc(80vh - 5vmin)",
        maxHeight: "85vh",
        width: "100%",
        // padding: "5px",
        // backgroundColor: "#eef5ee",
        backgroundColor: "oldlace",
      }}
    >
      {/* <ErrorBoundary> */}
      <DataGrid
        // rows={rows || []}
        // rows={isMounted.current ? rowsData : []}
        // rows={rowsData}
        rows={rowsRef.current}
        // rows={data}
        // rows={datadb}
        columns={columny}
        // pagination
        // pageSize={pageSize}
        // rowsPerPageOptions={[5, 10, 25, 50, 100]}
        // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        // checkboxSelection
        // editRowsModel={editRowsModel}
        // editMode="row"
        // onEditRowsModelChange={handleEditRowsModelChange}
        // onRowEditCommit={editCommit}
        // style={{ padding: "5px" }}

        // onEditCellPropsChange={cellChange}
        // onRowEditStart={rowStart}
        // onCellEditCommit={changesCommit}
        // isCellEditable={(params) => params.row.id === 5}
        // isCellEditable={isEditing}

        // onRowEditStop={rowStop}
        // onRowClick={handleRowClick}
        // onCellDoubleClick={doubleClick}
        // apiRef={apiRef}
        // ref={refApi}
        // onCellValueChange={onCellValChange}
        // onCellEditStart={editCommit}
        // onCellDoubleClick={(params, event) => {
        //   if (!event.ctrlKey) {
        //     event.defaultMuiPrevented = true;
        //   }
        // }}
        // sx={{ "& .MuiDataGrid-root": { padding: "15px" } }}
      />
      <ModalComp
        style={style}
        handleDelete={handleDeleteClick}
        handleClose={handleClose}
        modalOpen={modalOpen}
        params={row_params}
      />
      {/* <ModalComp
          style={style}
          handleDelete={handleDelete}
          handleClose={handleClose}
          modalOpen={modalOpen}
          params={params}
        /> */}
      {/* </ErrorBoundary> */}
    </div>
  );
};

export default TableData;

/*

      "id": 1,
      "name": "Puree - Blackcurrant",
      "price_netto": 110.49,
      "discount": 20,
      "vat": 0.05,
      "currency": "EUR",
      "unit": "box",
      "quality": "M",
      "use_by_date": "2022-02-18",
      "origin": "Canada",
      "producer": "Langworth, Grady and Anderson",
      "email_contact": "rtidey0@bigcartel.com"
*/
