import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import useSomeStyles from "../../customHooks/useSomeStyles";

const MenuComp = ({ menuItems }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // console.log("MenuComp0");

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

  return (
    <div
      style={{
        textAlign: "center",
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
        className={classes.iconMenu}
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
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.text} onClick={() => handleMenuClick(item.path)}>
            <ListItemIcon className={classes.iconMenu}>
              {item.icon}
            </ListItemIcon>
            <ListItemText className={classes.textMenu}>
              {item.text}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

MenuComp.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.exact({
      text: PropTypes.string,
      icon: PropTypes.element,
      path: PropTypes.string,
    })
  ),
};

export default MenuComp;
