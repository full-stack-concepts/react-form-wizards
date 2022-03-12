import React, {useState, useEffect, useContext, useCallback } from 'react';
import { useForm  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { SelectBox} from '../../../elements';
import { countryOptions, capitalOptions, countryToCapital as solutions } from '../data';


const formSchema = yup.object().shape({
    country: yup
        .string()
        .test('has-made-select-choice', 'Please make a selection', value => value > 0)
        .test('has-choosen-select-country', 'Selected option is out of range', value => (value >= 1 && value <= 3)),
    capital: yup
        .string()
        .test('has-made-select-choice', 'Please make a selection', value => value > 0)
        .test('has-choosen-select-capital', 'Selected option is out of range', value => (value >= 1 && value <= 4))
})

const formValues = {
    country: 0,
    capital: 0,
}

function SelectStep1({
    FormContext
}) {

    /**
     * Context Store
     */
    const {
        step1Answered,
        setStep1Answered,
        stepData: data,
        setStepData: setFormData
    } = useContext(FormContext);

    /**
     * React-Hook-Form hook
     */
    const {
        register,
        watch,
        setValue,
        control,
        getValues,
        formState: {
            isValid
        }
    } = useForm({
        formValues,
        resolver: yupResolver(formSchema)
    });

    /**
     *  Local State
     */
    const [country, setCountry] = useState(0);
    const [capital, setCapital] = useState(0);
    const [showCapitalSelect, setShowCapitalSelect] = useState(false);
    const [cOptions, setCOptions] = useState([]);

    /**
     * @param {object} event
     */
    const onChangeCountryHandler = e => {
        findChildOptions(e.target.value);
        setValue('country', parseInt(e.target.value), {
            shouldValidate: true
        });
        setValue('capital', 0, {
            shouldValidate: false
        });
    }

    /**
     * @param {object} event
     */
    const onChangeCapitalHandler = e => setValue('capital', parseInt(e.target.value), {
        shouldValidate: true
    });

    /**
     * @param {int} country
     */
    const findChildOptions = (country) => {
        try {
            const label = countryOptions.find(c => c.value === country).label;
            setCOptions(capitalOptions[label]);
            setShowCapitalSelect(true);
        } catch (e) {
            console.log('No options for sibling found')
        }
    }

    /**
     * @param {object} values
     */
    const getSolution = useCallback(values => {
        const guess = getValues();
        const solution = solutions.find(
            solution => (solution.country === guess.country && solution.capital === guess.capital)
        );
        return (solution) ? true : false;
    }, [getValues])

    const formFields = watch();

    const implementSolution = useCallback(() => {
        if (step1Answered && data) {
            const {
                step1: {
                    state: {
                        country,
                        capital
                    }
                }
            } = data;
            setCountry(country);
            findChildOptions(country);
            setShowCapitalSelect(true);
            setValue('country', parseInt(country), {
                shouldValidate: false
            });
            setValue('capital', parseInt(capital), {
                shouldValidate: false
            });
        }

    }, [data, setValue, step1Answered]);

    /**
     * Load solution from context store on component mount
     */
    useEffect(() => {
        implementSolution();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Monitor User Input
     */
    useEffect(() => {

        const {
            country,
            capital
        } = formFields;
        setCountry(country);
        setCapital(capital);

        // show sibling field and set focus
        const showSiblingSelect = (country > 0);
        setShowCapitalSelect(showSiblingSelect);


        // Did user provide a solution? Then enable next button
        if (isValid) {
            const solutionProvided = getSolution();
            setStep1Answered(solutionProvided);
        }
    }, [
        formFields,
        setShowCapitalSelect,
        isValid,
        getSolution,
        setStep1Answered
    ]);

    /**
     * Store Step Solution
     */
    useEffect(() => {
        if (step1Answered) {
            const result = { ...data,
                step1: {
                    solved: step1Answered,
                    state: getValues()
                }
            }
            setFormData(result);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        step1Answered,
        getValues,
        setFormData
    ]); 
   
    return (<>      
    	<Box component="form" noValidate sx={{ mt: 1, p: 2 }}>
    		<SelectBox
    			fieldName={`country`}
    			label={`Country`}
    			startItemText={`What's your favorite country`}
    			value={country}
    			options={countryOptions}
    			register={register}
    			control={control}
    			onChange={onChangeCountryHandler}
    		/>
    	</Box>

        { (showCapitalSelect) && <Box component="form" noValidate sx={{ mt: 1, p: 2 }}>
            <SelectBox
                fieldName={`capital`}
                label={`Capital`}
                startItemText={`What's the capital of this country?`}
                value={capital}
                options={cOptions}
                register={register}
                control={control}
                onChange={onChangeCapitalHandler}
            />
        </Box>}
       {!step1Answered && <Box component="div" noValidate sx={{ mt: 0, p: 1, textAlign: 'center', color: '#fff', fontWeight: 200, background: '#1976d2' }}>
            <Typography component="p" variant="9">
                When alll answers are correct the next step button will be enabled!
            </Typography>
        </Box>}  
    </>);
}

export default SelectStep1;

