import React, {Fragment, useEffect, useState, useContext} from 'react';
import { 
    Box, Button, Container, CssBaseline, Grid, Stepper, Step, StepLabel, Typography
} from '@mui/material';
import { steps } from './data';
import { FormContext } from './FormContext';
import Copyright from '../Copyright';

function SelectStepper() {

    /***
     * Form Store
     */
    const {
        step1Answered,
        step2Answered,
        finished
    } = useContext(FormContext);  

    /***
     * Local Store
     */
    const [solutionProvided, setSolutionProvided] = useState(false);
    const [activeStep, setActiveStep] = React.useState(0);   
    const [skipped, setSkipped] = React.useState(new Set());
    const allowSkip = false;

    const [components, setComponent] = useState({});
    const [view, setView] = useState();    

    /***
     * Monitor Form Progress
     */
    useEffect(() => {
        setSolutionProvided(false);
        if (activeStep === 0 && step1Answered) {
            setSolutionProvided(true);
        }
        if (activeStep === 1 && step2Answered) {
            setSolutionProvided(true);
        }
        if (activeStep === steps.length - 1 && finished) {
            setSolutionProvided(true);
        }       
    }, [activeStep, step1Answered, step2Answered, finished]);

    /***
     * Load Dynamic Content
     */
    useEffect(() => {       
        let Component;       
        const load = async () => {
            const StepView = `Step${activeStep+1}`;
            if(!components[StepView]) {             
                const { default:View } = await import(`./Steps/${StepView}`)
                Component = <View 
                    FormContext={FormContext} 
                />;             
                setComponent({...components, [StepView]: Component })
                setView(Component);
            } else {               
                setView(components[StepView]);
            }
        }
        load();       
    }, [activeStep]);  

    /*
     * Step Management
     */
    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = (activeStep, steps) => {

        if (activeStep === (steps.length - 1) && finished) {
            alert('Finished! You can now submit your form');          
            return;
        }

        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };    

    return (<div>        
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
                Select Stepper
            </Typography>
        </Box>
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
                            {activeStep === steps.length - 1 ? 'Save' : 'Next'}
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

export default SelectStepper;

