import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';

function Saving() {
	return (
		<Grid container  spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{p:6}}
          >            
              <Grid item xs><CircularProgress /></Grid>   
        </Grid>
	);
}

export default Saving;