import React, { useEffect, useContext } from 'react';
import { useForm  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, Typography } from '@mui/material';
import { Email } from '../../../inputs';

const formSchema = yup.object({
    email: yup.string().email('Must be a valid email').required('Email is required'),       
}).required();
const formValues = { email: ''};

function Step1 ({ FormContext }) {

	const { email, setEmail, setStep1Finished:setStepFinished } = useContext(FormContext);        
    const { register, trigger, control, setValue, getValues, formState: { isValid}  } = useForm( {        
        formValues,
        resolver: yupResolver(formSchema)
    });

    const onChangeHandler = (e, fieldName) => {
        setValue(fieldName, e.target.value );      
        trigger(fieldName);
        setEmail(getValues('email'));                    
    } 

    // Init Form   
    useEffect( () => setValue('email', email), [setValue, email]);

    // Monitor Form State   
    useEffect( () => {
        if(isValid) {           
            setStepFinished(true);           
        } 
    }, [isValid, setStepFinished]);      
   
    return (
        <Box component="form" noValidate sx={{ mt: 1 }}>
            <Typography component="p" color="secondary">Default: johndoe@example.com</Typography>
            <Email                
                control={control}
                register={register}
                onChangeHandler={onChangeHandler}
                onBlurHandler={onChangeHandler}
            />            
        </Box>
    );
}

export default Step1;