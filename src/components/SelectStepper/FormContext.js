
import {createContext, useState} from 'react';

export const FormContext = createContext();

export const FormContextProvider = ({children}) => {

	const [step1Answered, setStep1Answered] = useState(false);
	const [step2Answered, setStep2Answered] = useState(false);
	const [step3Answered, setStep3Answered] = useState(false);
		
	const [finished, setFinished] = useState(false);
	const [stepData, setStepData] = useState({
		step1: {
			state: { country: 0, capital: 0 },   
	    	solved: false    
		},
		step2: {
			state: { country: 0, capital: 0 },   
	    	solved: false    
		},
		step3: {
			state: { citizens: 0, age: 0 },
	    	solved: false      
		}
	});	

	const formContextValues = {    	
		step1Answered, setStep1Answered,
		step2Answered, setStep2Answered,
		step3Answered, setStep3Answered,

	    finished, setFinished,
	    stepData, setStepData
	}; 	

	return (<div>
		<FormContext.Provider value={formContextValues}>
			{children}
		</FormContext.Provider>
	</div>);
}