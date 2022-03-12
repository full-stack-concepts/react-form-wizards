import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green, blue } from '@mui/material/colors';
import { FormContextProvider } from './FormContext';
import Stepper from './Stepper';

const theme = createTheme({
	palette: {
    	mode: 'dark',
    	primary: {
      		main: blue[500],
    	},
    	secondary: {
      		main: green[500],
    	},
  	},
});

/**
 * Form Context Store
 */
function SelectStepper() {	
    return (
    	<ThemeProvider theme={theme}>
	        <FormContextProvider>              
	            <Stepper />
	        </FormContextProvider>
	    </ThemeProvider>
    );
}

export default SelectStepper;

