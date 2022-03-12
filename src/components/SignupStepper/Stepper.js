import React, {Fragment, useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from './FormContext';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser, clearFetchStatus } from '../../Store/UserSlice';
import toast from 'react-hot-toast';
import StepperBody from '../StepperBody';

const steps = ['Your email', 'Your Password'];

function Main() {	

	/***
     * Redux Block
     */
    const dispatch = useDispatch();  
    const navigate = useNavigate();
    const { status } = useSelector((state) => state.user);   

    useEffect(() => {              
        if (status.success) {                             
           navigate('/signin_stepper');          
        }
        if (status.error) {         
            setActiveStep(steps.length-1);
            // alert('Error')
            toast.error(status.message);              
        }
        dispatch(clearFetchStatus());
      }, [status, dispatch, navigate]);

	/***
     * Form Store
     */
    const {
        email, password, step1, finished       
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

    const submitForm = async () => {          	
        await dispatch(signupUser({ email, password }));         
    }; 

   /***
     * Monitor Form Progress
     */
    useEffect(() => {    
        setSolutionProvided(false);
        if (activeStep === 0 && step1) {
            setSolutionProvided(true);
        }       
        if (activeStep === steps.length - 1 && password && finished) {
            setSolutionProvided(true);
        }       
    }, [activeStep, email, password, step1, finished]);

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
            return submitForm();
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

	return <StepperBody
        view={view}
        pending={status.fetching}
        solutionProvided={solutionProvided}
        headerText={`SIGN UP`}
        buttonText={`Sign Up`}   
        activeStep={activeStep} 
        steps={steps} 
        isStepSkipped={isStepSkipped}
        handleBack={handleBack}
        isStepOptional={isStepOptional}
        allowSkip={allowSkip}
        handleSkip={handleSkip}
        handleNext={handleNext}
    />   
}

export default Main;
