import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";
import MenuComp from "../forMenu/MenuComp";
import PropTypes from "prop-types";
import {
  StorageRounded,
  AddCircleOutlineOutlined,
  PeopleAltRounded,
} from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CottageRoundedIcon from "@mui/icons-material/CottageRounded";

const menuItems = [
  {
    text: "Data table",
    icon: <StorageRounded />,
    path: "/",
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

const Layout = ({ mainTitle, children }) => {
  // console.log("Layout Comp.");
  const matches = useMediaQuery("(max-width: 700px)");

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <MenuComp menuItems={menuItems} />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontSize: matches ? "1rem" : "1.25rem" }}
            >
              {mainTitle}
            </Typography>
            <Button
              variant="text"
              size="small"
              sx={{ color: "lightgoldenrodyellow" }}
              target="_blank"
              rel="noreferrer"
              href="https://codencja.herokuapp.com/"
            >
              <CottageRoundedIcon />
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ my: 2 }}>{children}</Container>
    </>
  );
};

Layout.propTypes = {
  mainTitle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.instanceOf(Object),
    PropTypes.element,
  ]),
};

export default Layout;
