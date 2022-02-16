import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const Footer = ({ author, year }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        mb: 1,
        mt: 4,
        display: "flex",
        justifyContent: "center",
        alignContent: "flex-end",
      }}
    >
      <Typography variant="subtitle1" component="div" color="darkgrey">
        {author} &copy; {year}
      </Typography>
    </Box>
  );
};

Footer.propTypes = {
  author: PropTypes.string,
  year: PropTypes.number,
};

export default Footer;
