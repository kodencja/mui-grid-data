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
import { lime } from "@mui/material/colors";
import { menuStyle } from "../styles/menuStyle";
import { useLocation, useNavigate } from "react-router-dom";
import useSomeStyles from "../styles/useSomeStyles";

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

  const { useStylesMenu } = useSomeStyles();
  const classes = useStylesMenu();

  // console.log("classes.colorPaper");
  // console.log(classes.colorPaper);
  // console.log(classes.iconMenu);

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
        sx={{ color: "white" }}
        // className={classes.iconMenu}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        // className={classes.colorPaper}
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
            {/* <ListItemIcon className={classes.iconMenu}>
              {item.icon}
            </ListItemIcon>
            <ListItemText className={classes.textMenu}>
              {item.text}
            </ListItemText> */}
            <ListItemIcon sx={{ color: lime[100] }}>{item.icon}</ListItemIcon>
            <ListItemText sx={{ color: lime[50] }}>{item.text}</ListItemText>
            {/* <ListItemIcon sx={menuStyle.iconMenu}>{item.icon}</ListItemIcon>
            <ListItemText sx={menuStyle.textMenu}>{item.text}</ListItemText> */}
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
