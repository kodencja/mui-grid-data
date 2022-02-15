import { darken, lighten } from "@mui/material/styles";

export const getBackgroundColor = (color, mode) => {
  return mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);
};

export const getHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

export const getColor = (color, mode) => {
//   return mode === "dark" ? lighten(color, 0.2) : darken(color, 0.2);
  return mode === 'dark' ? darken(color, 0.2) : lighten(color, 0.2) ;
};

export const getColorContrast = (color, direction) =>
  direction === "dark" ? darken(color, 0.9) : lighten(color, 0.9);
