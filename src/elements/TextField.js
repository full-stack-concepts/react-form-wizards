import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

function defaultTextField({
    fieldName, 
    fieldType, 
    control, 
    register, 
    label, 
    required,
    onChangeHandler,
    onBlurHandler
}) {	
	const type = (fieldType) ? fieldType : 'text';	
	return(
	   <Controller                  
            name={fieldName}
            control={control}
            defaultValue=""
            render={({ field: { value, name, ref }, fieldState: { error } }) => (              
                <TextField
                    {...register( fieldName, {
                        onChange: e => onChangeHandler(e, fieldName),
                        onBlur: e => onBlurHandler(e, fieldName)
                    })}
                	id={fieldName}
                    label={label}
                    type={type}
                   	variant="outlined"
                    value={value}                  
                    error={!!error}
                    helperText={error ? error.message : null}
                    margin="normal"                  
                    fullWidth
                    required={required}                               
              />
            )}           
        />
	)
}

export default defaultTextField;

