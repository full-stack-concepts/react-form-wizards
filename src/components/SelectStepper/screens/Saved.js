import React from 'react';
import { 
    Box, Grid, Link, Stack
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

function Saved() {
	return (
		<Grid 
		    container  spacing={0}
		    direction="column"
		    alignItems="center"
		    justifyContent="center"
		    sx={{p:6}}
		  >
		    <Box component="div" noValidate sx={{ mt: 1, p: 2 }}>
		        <p>Your quiz results have been saved</p>
		        <Link
		            display="block"
		            variant="body1"
		            color="#fff"
		            href={`/`}                      
		            sx={{ mb: 0.5 }}                                   
		            >
		             <Stack direction="row" spacing={1} alignItems="center" color="black">   
		                <HomeIcon color="blue" />                        
		            </Stack>
		        </Link>
		    </Box>
		</Grid>
	);
}

export default Saved;