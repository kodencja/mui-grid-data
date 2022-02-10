import { makeStyles } from "@mui/styles";
import { createTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

import { formStyle } from "./formStyle";
import { tableStyle } from "./tableStyle";
import { dateInputStyle, textInputStyle } from "./inputStyles";

const defaultTheme = createTheme();


const useSomeStyles = (value = "(min-width: 750px)") => {

  const matches = useMediaQuery(value);
  // const matches = useMediaQuery("(min-width: 750px)");

    const useStylesData = makeStyles((theme)=>{
        return tableStyle;
      }, {defaultTheme});

      const useStylesForm = makeStyles(formStyle(matches));
      
      const useStylesDateComp = makeStyles(dateInputStyle);

      const useStylesTextComp = makeStyles(textInputStyle);

return { useStylesData, useStylesForm, useStylesDateComp, useStylesTextComp};
}

export default useSomeStyles;