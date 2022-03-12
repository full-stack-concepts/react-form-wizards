import {createContext, useState} from 'react';
export const FormContext = createContext();
export const FormContextProvider = ({children}) => {	
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [step1, setStep1Finished ] = useState(false);	
	const [finished, setFinished] = useState(false);
	const formContextValues = {    			
		email, setEmail, 
		password, setPassword,
		step1, setStep1Finished, 		
		finished, setFinished
	}; 	
	return (<div>
		<FormContext.Provider value={formContextValues}>
			{children}
		</FormContext.Provider>
	</div>);
}