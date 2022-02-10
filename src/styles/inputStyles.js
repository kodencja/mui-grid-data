export const dateInputStyle = {
    root: {
      marginTop: "10px",
      marginBottom: "10px",
      marginRight: "10px",
      maxWidth: "200px",
    },
  }

  export const textInputStyle = {
    textInput: {
        backgroundColor: "snow",
        fontSize: "16px",
        marginTop: "20px",
        marginBottom: "20px",
        marginRight: "10px",
      },
      textInputPadding: {
        paddingLeft: "10px",
        // "& .MuiInputBase-input-MuiInput-input": {
        "&:after": {
          // backgroundColor: "lightyellow",
          border: "1px solid green",
          paddingLeft: "15px",
        },
      },
      root: {
        marginTop: "15px",
        marginBottom: "15px",
        marginRight: "15px",
        maxWidth: (props) => (props.name === "discount" ? "100px" : "200px"),
        // maxWidth: "200px",
        "& .MuiInputBase-root": {
          paddingLeft: 5,
        },
        "& .MuiInput-underline.Mui-focused": {
          backgroundColor: "#e8f0fe",
          color: "darkslategray",
        },
      },
  }