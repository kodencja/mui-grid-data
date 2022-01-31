import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { format, parseISO, parse, formatISO } from "date-fns";

export default function DateData() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid editMode="row" rows={rows} columns={columns} />
    </div>
  );
}

const columns = [
  { field: "name", headerName: "Name", width: 180, editable: true },
  { field: "age", headerName: "Age", type: "number", editable: true },
  {
    field: "dateCreated",
    headerName: "Date Created",
    type: "date",
    width: 180,
    editable: true,
    valueFormatter: (params) => {
      // console.log("valueFormatter in date");

      return format(new Date(params.value), "dd.MM.Y");
      // return format(new Date(params.value), 'Y/MM/dd');
    },
  },
  {
    field: "lastLogin",
    headerName: "Last Login",
    type: "dateTime",
    width: 220,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    name: "John Smith",
    age: 25,
    dateCreated: "01.02.2022",
    lastLogin: "2021-02-10",
  },
  {
    id: 2,
    name: "Will Trawn",
    age: 36,
    dateCreated: "04.02.2022",
    lastLogin: "2021-02-11",
  },
  {
    id: 3,
    name: "Karl Voy",
    age: 19,
    dateCreated: "05.05.2022",
    lastLogin: "2021-02-12",
  },
  {
    id: 4,
    name: "Greg Ogisho",
    age: 28,
    dateCreated: "01.02.2020",
    lastLogin: "2021-02-13",
  },
  {
    id: 5,
    name: "Paul Fields",
    age: 23,
    dateCreated: "05.10.2020",
    lastLogin: "2021-02-14",
  },
];
