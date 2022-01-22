import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
  yellow,
} from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";

const styles = {
  iconMenu: {
    // color: yellow["A100"],
    color: lime[100],
    // color: purple[50],
  },
  textMenu: {
    // color: yellow[50],
    color: lime[50],
  },
};

const MenuComp = ({ menuItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  console.log("MenuComp0");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    // <div style={{ backgroundColor: green[500] }}>
    <div
      style={{
        // backgroundColor: green[500],
        textAlign: "center",
        // marginLeft: "-12px",
      }}
    >
      <IconButton
        size="large"
        edge="start"
        aria-label="menu"
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        // sx={{ color: "white" }}
        sx={styles.iconMenu}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        sx={(theme) => ({
          "& .MuiMenu-paper": {
            bgcolor: theme.palette.primary.main,
            color: theme.palette.text.secondary,
          },
        })}
        // sx={{
        //   //   bgcolor: indigo[400],
        //   //   "& .MuiMenu-list": {
        //   "& .MuiMenu-paper": {
        //     bgcolor: indigo[600],
        //   },
        // }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.text}
            // onClick={() => navigate(item.path)}
            onClick={() => handleMenuClick(item.path)}
            // sx={{ color: "white" }}
          >
            {/* <ListItemIcon sx={{ color: yellow["A200"] }}> */}
            <ListItemIcon sx={styles.iconMenu}>{item.icon}</ListItemIcon>
            <ListItemText sx={styles.textMenu}>{item.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default MenuComp;

/* <MenuItem onClick={handleClose}>Profile</MenuItem>
<MenuItem onClick={handleClose}>My account</MenuItem>
<MenuItem onClick={handleClose}>Logout</MenuItem> */
