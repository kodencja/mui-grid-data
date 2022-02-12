import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { formStyle } from "./formStyle";
import { tableStyle } from "./tableStyle";
import { menuStyle, colorMenu } from "./menuStyle";
import { dateInputStyle, textInputStyle } from "./inputStyles";
import { columnStyle } from "./columnStyle";

const defaultTheme = createTheme();

const useSomeStyles = (value = "(min-width: 750px)") => {
  const matches = useMediaQuery(value);
  // const matches = useMediaQuery("(min-width: 750px)");

  const useStylesData = makeStyles(
    (theme) => {
      return tableStyle(theme);
    },
    { defaultTheme }
  );

  const useStylesForm = makeStyles(formStyle(matches));

  const useStylesDateComp = makeStyles(dateInputStyle);

  const useStylesTextComp = makeStyles(textInputStyle);

  const useStylesMenu = makeStyles(
    (theme) => {
    return menuStyle(theme);
  }, { defaultTheme });

  // const useStylesCol = makeStyles(columnStyle);
  // const useStylesCol = makeStyles(
  //   (theme) => {
  //   return columnStyle(theme);
  // }, { defaultTheme });

  return { useStylesData, useStylesForm, useStylesDateComp, useStylesTextComp, useStylesMenu };
};

export default useSomeStyles;
