import React from 'react';
import { Box, Typography, Button } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

const AboutInfo = () => {
    return (
        <Box sx={{ width: '100%', m: 1, textAlign: 'justify' }}>
            <Typography variant="h5" component="div" color="success.main" sx={{textAlign: 'center', mb: 3, mt: 5}}>Information about the Project</Typography>
            <Typography variant="body1" gutterBottom><Typography variant="subtitle1" color="info.dark" component="span">This REACT application</Typography> was built with MATERIAL UI components (5.3.1), mainly dataGrid and Form, both connected with database through JSON-SERVER. The API requests (GET, POST, PUT, DELETE) are sent to and from JSON-SERVER url address, among others using asynchronous action functions in redux (redux-thunk) and AXIOS package. Most of the variables used in the application are stored in REDUX STORE supplied with separate STATES manipulated by three reducers (apiReducer, gridReducer and constantsReducer) as well as ACTIONS passed to App component through mapStateToProps and mapDispatchToProps functions and further by createContext method and useContext hook. Some the variables, which cannot be pass to functions through useContext, are stored in 'constsNotInStore' folder.</Typography> 
            <Typography variant="body2" gutterBottom><Typography variant="subtitle1" color="info.dark" component="span">The DATABASE</Typography> contains originally over 1500 records - grocery products with the following properties: id, name, price netto, discount, vat, currency, unit, quality, use by date, origin, producer and email contact. All records are displayed in dataGrid table with options of sorting, filtering and hiding the columns. The addition columns embrace: checkbox selection and Action. The former allowes us to check selected rows and delete more than one of them at once. To prevent users from deleting all records the 'multi_del' api remove records only from the DATA variable, storing records from the database, not directly from the database. The latter, action column, comprises icons tiggerring the following actions: edit the row, save changes, cancel changes, delete the row and two icons, which alternately indicate whether there is any error in the editing row or not. Moreover, the dataGrid is furnished with expanded pagination component. The appilcation uses three CUSTOM HOOKS: useEditRow (to deal with editing row data), useColumns (to get all columns with), useModalCommands (to deal with commands coming from modal component:  open and close the modal and delete the row/rows), useSomeStyles (to get style object/classes for some components).</Typography>
            <Typography variant="body1" gutterBottom><Typography variant="subtitle1" color="info.dark" component="span">The data from database are validated on the fly,</Typography> both while editing the current row in dataGrid as well as whereas filling the form (in AddRecord component) using the same validation functions. Some records have on purpose invalid values (e.g. use_by_date is equal 'false' or empty string) just to present validation and appropriate error logs in the console.</Typography>
            <Typography variant="body1" gutterBottom>The App component is embraced with ErrorBoundary component. The validation and error service is asserted n two levels: by PropTypes methods (for components in development mode) and by custom throwing errors functions (in file throwErrors.js) - for the components and functions in both development and production mode. For managing the form submition and error service (in AddRecord component) FINAL FORM package is used.</Typography>
            <Typography variant="body1" gutterBottom >The code of the application may be see on <Typography variant="subtitle1" color="secondary.dark" component="span">my github account</Typography><Button
              variant="text"
              size="small"
              color="secondary"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/kodencja/mui-grid-data"
            > 
             <GitHubIcon />
            </Button></Typography>
        </Box>
    )
}

export default React.memo(AboutInfo)
