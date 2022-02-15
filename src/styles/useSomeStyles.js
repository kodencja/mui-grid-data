import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { formStyle } from "./formStyle";
import { tableStyle } from "./tableStyle";
import { menuStyle } from "./menuStyle";
import { dateInputStyle, textInputStyle } from "./inputStyles";

const defaultTheme = createTheme();

const useSomeStyles = (value = "(min-width: 750px)") => {
  const matches = useMediaQuery(value);

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

  return { useStylesData, useStylesForm, useStylesDateComp, useStylesTextComp, useStylesMenu };
};

export default useSomeStyles;
