import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from './Header';
import Sidebar from './Sidebar';
import IntroductionPost from './IntroductionPost';
import FeaturedPost from './FeaturedPost';
import CopyRight from '../Copyright';
const theme = createTheme();

const featuredPosts = [
    {
        title: 'Select Stepper',   
        description: 'Examples of Stepper witch selects',
        image: 'http://localhost:3000/select.png',
        link: '/select_stepper',
        imageLabel: 'Image Text',
    }, 
    {
        title: 'Sign up Stepper',    
        description:
          'Example of stepper sign up form build with packages such as Yup and React Hooks Form',
        image: 'http://localhost:3000/signup.png',
        link: '/signup_stepper',
        imageLabel: 'Image Text',
    },
    {
        title: 'Sign in Stepper',   
        description:
          'Example of stepper authentication form build with packages such as Yup and React Hooks Form',
        image: 'http://localhost:3000/signin.png',
        link: '/signin_stepper',
        imageLabel: 'Image Text',
  }, 
];


function Home() {
	return (
    	<ThemeProvider theme={theme}>
  		<CssBaseline />
  		<Container maxWidth="lg">
            <Header title="Tutorial"/>              
            <main>
                <IntroductionPost />
                 <Grid container spacing={4}>
                    {featuredPosts.map((post) => (
                        <FeaturedPost key={post.title} post={post} />
                    ))}
                </Grid>
                <Grid container spacing={5} sx={{ mt: 0 }}>
                    <Sidebar />                    
                    <Grid item xs={12} md={8} sx={{'& .markdown': { py: 3, }, }}>    
                        <h4>Material-Ui Form Steppers</h4>
                        <p>Steppers display progress through a sequence of logical and numbered steps. They may also be used for navigation. Steppers may display a transient feedback message after a step is saved.</p>

                        <h5 sx={{p:2}}>Linear</h5>
                        <p sx={{p:3}}>A linear stepper allows the user to complete the steps in sequence.
                            The Stepper can be controlled by passing the current step index (zero-based) as the activeStep prop. Stepper orientation is set using the orientation prop.
                            This example also shows the use of an optional step by placing the optional prop on the second Step component. Note that it's up to you to manage when an optional step is skipped. Once you've determined this for a particular step you must set completed={false} to signify that even though the active step index has gone beyond the optional step, it's not actually complete.
                        </p>

                        <h5 sx={{p:2}}>Non Linear</h5>
                        <p sx={{p:3}}>ANon-linear steppers allow the user to enter a multi-step flow at any point.
                            This example is similar to the regular horizontal stepper, except steps are no longer automatically set to disabled={true} based on the activeStep prop.
                            The use of the StepButton here demonstrates clickable step labels, as well as setting the completed flag. However because steps can be accessed in a non-linear fashion, it's up to your own implementation to determine when all steps are completed (or even if they need to be completed).
                        </p>
                        <CopyRight />

                   </Grid>
                </Grid>
            </main>       
  		</Container>      		
    </ThemeProvider>
  );
}

export default Home;

