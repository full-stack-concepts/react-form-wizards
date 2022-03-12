import React, { Fragment } from 'react';
import { 
    Box, Button, Container, CssBaseline, Grid, LinearProgress, Stepper, Step, StepLabel, Typography, 
} from '@mui/material';
import Copyright from './Copyright';

const StepperBody = ({
    pending, view, solutionProvided,
    headerText, buttonText,    
    activeStep, steps, isStepSkipped, handleBack, isStepOptional, allowSkip, handleSkip, handleNext    
}) => {    

    const buttonTextSmall = activeStep === steps.length - 1 ? buttonText : 'Next';

    return (
    <div>        
        <Container component="main" maxWidth="xs">
        <CssBaseline />            
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >                
            <Typography component="h1" variant="h4" sx={{color: '#1976d2', textTransform: 'uppercase', fontWeight: 700 }}>
                {headerText} 
            </Typography>
        </Box>
        {pending && <LinearProgress />}
        <Box noValidate sx={{ mt: 1, p: 1 }}>
            {/* Stepper Module */}
            <Box
                 sx={{
                    marginTop: 3,                        
                    alignItems: 'center',
                  }}
            >
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};                   
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>                         
                            </Step>
                        );
                    })}
                </Stepper>
            </Box>

            {/* Active Step  */}
            {activeStep !== steps.length ? (
                <Fragment>                              
                    <Grid container>            
                        <Grid item xs>                              
                            <React.Suspense fallback='Loading Form View..'>
                                {view}     
                            </React.Suspense>                          
                        </Grid>   
                    </Grid>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        {(activeStep>0) && <>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                              Back
                            </Button>
                        </>}
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <>{allowSkip && <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>}</>
                        )}
                        <Button variant="contained" disabled={!solutionProvided } onClick={() => handleNext(activeStep, steps)}>
                            {`${buttonTextSmall}`}
                        </Button>
                    </Box>
                </Fragment>
            ) : (<>
                
            </>)}
            <Copyright sx={{ mt: 4}}/>
        </Box>
        </Container>
    </div>);
}


export default StepperBody;
