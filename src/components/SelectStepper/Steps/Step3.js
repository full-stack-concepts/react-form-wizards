import React, {useState, useEffect, useContext, useCallback} from 'react';
import { useForm  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { SelectBox} from '../../../elements';
import { capitalOptions, citiesQuiz as solutions } from '../data';
const formSchema = yup.object().shape({
    citizens: yup
        .string()
        .test('has-made-select-choice', 'Please make a selection', value => value > 0)
        .test('has-choosen-select-country', 'Selected option is out of range', value => (value >= 1 && value <= 3)),
    age: yup
        .string()
        .test('has-made-select-choice', 'Please make a selection', value => value > 0)
        .test('has-choosen-select-capital', 'Selected option is out of range', value => (value >= 1 && value <= 4)),
});

const formValues = {
    citizens: 0,
    age: 0,
}

function Step3({
    FormContext
}) {

    const [citizens, setCitizens] = useState(0);
    const [age, setAge] = useState(0);

    const {
        step3Answered,
        setStep3Answered,
        stepData: data,
        setStepData: setFormData,
        setFinished
    } = useContext(FormContext);

    const {
        register,
        watch,
        setValue,
        getValues,
        control,
        formState: {
            isValid
        }
    } = useForm({
        formValues,
        resolver: yupResolver(formSchema)
    });

    const formFields = watch();

    const onChangeCitizensHandler = e => setValue('citizens', parseInt(e.target.value), {
        shouldValidate: true
    });
    const onChangeAgeHandler = e => setValue('age', parseInt(e.target.value), {
        shouldValidate: true
    });

    const getSolution = useCallback(values => {
        const guess = getValues();
        const solution = (
            guess.citizens === solutions.citizens &&
            guess.age === solutions.age
        );
        return (solution) ? true : false;
    }, [getValues]);

    const implementSolution = useCallback(() => {
        if (step3Answered) {
            const {
                step3: {
                    state: {
                        citizens,
                        age
                    }
                }
            } = data;
            setCitizens(citizens);
            setAge(age);
            setValue('citizens', citizens, {
                shouldValidate: false
            });
            setValue('age', age, {
                shouldValidate: false
            });
        }
    }, [data, setValue, step3Answered]);

    /**
     * Load solution from context store on component mount
     */
    useEffect(() => {
        implementSolution();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /***
     * If all form fields were touched evaluate user's answers
     */
    useEffect(() => {
        if (isValid) {
            const solutionProvided = getSolution();
            setStep3Answered(solutionProvided);
        }
    }, [
        formFields,
        isValid,
        data,
        getSolution,
        setStep3Answered
    ]);

    /**
     * Finalize 
     */
    useEffect(() => {
        const result = { ...data,
            step3: {
                solved: step3Answered,
                state: getValues()
            }
        }
        setFormData(result);
        if (step3Answered) {
            setFinished(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        step3Answered,
        getValues,
        setFormData
    ]); 

    return (<>       
        <Box component="form" noValidate sx={{ mt: 1, p: 2 }}>
            <Box sx={{ mb: 2}}>
                <SelectBox
                    fieldName={`citizens`}
                    label={`Citizens`}
                    startItemText={`Which city has the most citizens?`}
                    value={citizens}
                    options={capitalOptions['US']}
                    register={register}
                    control={control}
                    onChange={onChangeCitizensHandler}
                />
            </Box>
            <Box sx={{ mb: 2}}>
                <SelectBox
                    fieldName={`age`}
                    label={`First Founded`}
                    startItemText={`Which city was first founded?`}
                    value={age}
                    options={capitalOptions['US']}
                    register={register}
                    control={control}
                    onChange={onChangeAgeHandler}
                />
            </Box>  
           {!step3Answered && <Box component="div" noValidate sx={{ mt: 0, p: 1, textAlign: 'center', color: '#fff', fontWeight: 200, background: '#1976d2' }}>
            <Typography component="p" variant="9">
                When alll answers are correctyour answers can be submitted!
            </Typography>
        </Box>}  
        </Box>
    </>);


}

export default Step3;