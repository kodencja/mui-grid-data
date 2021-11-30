import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
} from "@mui/material";
import MenuComp from "./MenuComp";

import {
  StorageRounded,
  AddCircleOutlineOutlined,
  PeopleAltRounded,
} from "@mui/icons-material";

const menuItems = [
  {
    text: "Data table",
    icon: <StorageRounded />,
    path: "/",
  },
  {
    text: "Table data",
    icon: <StorageRounded />,
    path: "/data",
  },
  {
    text: "Add record",
    icon: <AddCircleOutlineOutlined />,
    path: "/add",
  },
  {
    text: "About",
    icon: <PeopleAltRounded />,
    path: "/about",
  },
];

const Layout = ({ children }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <MenuComp menuItems={menuItems} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Data from database
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ my: 2 }}>{children}</Container>
    </>
  );
};

export default Layout;
