import { makeStyles } from "@mui/styles";
import { createTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

import { formStyle } from "./formStyle";
import { tableStyle } from "./tableStyle";

const defaultTheme = createTheme();


const useSomeStyles = (value = "(min-width: 750px)") => {

  const matches = useMediaQuery(value);
  // const matches = useMediaQuery("(min-width: 750px)");

    const useStylesData = makeStyles((theme)=>{
        return tableStyle;
      }, {defaultTheme});

      const useStylesForm = makeStyles(formStyle(matches));

return { useStylesData, useStylesForm};
}

export default useSomeStyles;