import React from 'react';
import { Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

function SelectBox({      
	fieldName,
	label,
	startItemText,
	value,
	options,
    control, 
    register,  
    onChange,
    ...props
}) {	 

	return(<>
		<Box sx={{ minWidth: 120 }}>
      		<FormControl fullWidth>        		
                <InputLabel id={`${fieldName}-select`}>{label}</InputLabel>
	        	<Controller   
	        		name={fieldName}
            		control={control}    
            		defaultValue={value}        	               		         	            		
            		render={({ field: { value, name, ref }, fieldState: { error } }) => ( <>       
            			<Select                                                                         
		          			labelId={`${fieldName}-demo`}
		          			id={`${fieldName}`}				          							          			          
                 			{...register( fieldName, {
                    			onChange: (e) => onChange(e),
                    			onBlur: (e) => onChange(e)
                			})}     
                			value={value}  
                            label={label}                 			
		        		>
		        			<MenuItem value="0"><em>{startItemText}</em></MenuItem>
			        		{options.map( (option,i) =>
					        	<MenuItem value={option.value} key={i}>{`${option.label}`}</MenuItem>
					        )}   	        		
		        		</Select>   
		        		{error && 
                            <Typography component="h6" variant="h6" color="red">
                            	{error.message}
                            </Typography>   
                        }
            		</>)}         
	        	/>                     
        	</FormControl>
        </Box>
	</>);
}

export default SelectBox;
