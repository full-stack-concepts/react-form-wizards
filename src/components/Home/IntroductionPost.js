import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const post = {
    title: 'Advanced Javascript: Material-UI Form Steppers',
    subTitle: 'Material-UI Form Wizard with React, Context, Yup, React Hook Form, Nodejs',
    description:
        "React Starter package with code for building different forms steppers displaying progress through a sequence of logical and numbered steps. Features React Context, Yup, React Hooks Form, Material-ui and Nodejs!",
    image: 'http://localhost:3000/code.png',
    imageText: 'main image description',
    linkText: 'Continue reading…',
};

function IntroductionPost() {
  

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${post.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={9}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="gold" gutterBottom>
              {post.title}
            </Typography>
            <Typography component="h4" variant="h4" color="lightblue" gutterBottom>
              {post.subTitle}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>           
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

IntroductionPost.propTypes = {
};

export default IntroductionPost;
