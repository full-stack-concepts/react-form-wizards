import React, {useEffect, useContext } from 'react';
import { useForm  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box } from '@mui/material';
import { Password } from '../../../inputs';

const formSchema = yup.object({
    password: yup.string().required('Password is required').min(8).max(16),       
}).required();
const formValues = { password: ''}

function Step2 ({ FormContext }) {

    const { password, setPassword, setFinished } = useContext(FormContext);        
    const { register, trigger, control, setValue, getValues, formState: { isValid}  } = useForm( {        
        formValues,
        resolver: yupResolver(formSchema)
    });

    const onChangeHandler = (e, fieldName) => {
        setValue(fieldName, e.target.value );      
        trigger(fieldName);
        setPassword(getValues('password'));                    
    }       

    // Init Form   
    useEffect( () => setValue('password', password), [setValue, password]);

     // Monitor Form State   
    useEffect( () => {
        if(isValid) {           
             setFinished(isValid);           
        } 
    }, [isValid, setFinished]);      
   
    return (
        <Box component="form" noValidate sx={{ mt: 1 }}>
            <Password                
                control={control}
                register={register}
                onChangeHandler={onChangeHandler}
                onBlurHandler={onChangeHandler}
            />                
        </Box>
    );
}

export default Step2;