import React, {useState, useEffect, useContext, useCallback} from 'react';
import { useForm  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { SelectBox} from '../../../elements';
import { countryOptions, countryQuiz as solutions } from '../data';

const formSchema = yup.object().shape({
    citizens: yup
        .string()
        .test('has-made-select-choice', 'Please make a selection', value => value > 0)
        .test('has-choosen-select-country', 'Selected option is out of range', value => (value >= 1 && value <= 3)),
    surface: yup
        .string()
        .test('has-made-select-choice', 'Please make a selection', value => value > 0)
        .test('has-choosen-select-capital', 'Selected option is out of range', value => (value >= 1 && value <= 3)),
    languages: yup
        .string()
        .test('has-made-select-choice', 'Please make a selection', value => value > 0)
        .test('has-choosen-select-capital', 'Selected option is out of range', value => (value >= 1 && value <= 3)),
})

let formValues = {
    citizens: 0,
    surface: 0,
    languages: 0,
}

function Step2({
    FormContext
}) {

    /**
     * Context Store
     */
    const {
        step2Answered,
        setStep2Answered,
        stepData: data,
        setStepData: setFormData
    } = useContext(FormContext);

    /**
     *  Local State
     */
    const [citizens, setCitizens] = useState(0);
    const [surface, setSurface] = useState(0);
    const [languages, setLanguages] = useState(0);

    /**
     * React-Hook-Form hook
     */
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

    /**
     * On Change Handlers
     * @param {object} event
     */
    const onChangeCitizensHandler = e => setValue('citizens', parseInt(e.target.value), {
        shouldValidate: true
    });
    const onChangeSurfaceHandler = e => setValue('surface', parseInt(e.target.value), {
        shouldValidate: true
    });
    const onChangeLanguagesHandler = e => setValue('languages', parseInt(e.target.value), {
        shouldValidate: true
    });

    /**
     * @param {object} values
     */
    const getSolution = useCallback(values => {
        const guess = getValues();
        const solution = (
            guess.citizens === solutions.citizens &&
            guess.surface === solutions.surface &&
            guess.languages === solutions.languages
        );
        return (solution) ? true : false;
    }, [getValues]);

    const implementSolution = useCallback(() => {
        if (step2Answered && data) {
            const {
                step2: {
                    state: {
                        citizens,
                        surface,
                        languages
                    }
                }
            } = data;
            setCitizens(citizens);
            setSurface(surface);
            setLanguages(languages);
            setValue('citizens', citizens, {
                shouldValidate: false
            });
            setValue('surface', surface, {
                shouldValidate: false
            });
            setValue('languages', languages, {
                shouldValidate: false
            });
        }
    }, [data, setValue, step2Answered]);

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

        const {
            citizens,
            surface,
            languages
        } = formFields;
        setCitizens(citizens);
        setSurface(surface);
        setLanguages(languages);

        if (isValid) {
            const solutionProvided = getSolution();
            setStep2Answered(solutionProvided);
        }
    }, [
        formFields,
        isValid,
        data,
        getSolution,
        setStep2Answered
    ]);

    /**
     * Store Step Solution
     */
    useEffect(() => {
        if (step2Answered) {
            const result = { ...data,
                step2: {
                    solved: step2Answered,
                    state: getValues()
                }
            }
            setFormData(result);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        step2Answered,
        getValues,
        setFormData
    ]);    

    return (<>       
        <Box component="form" noValidate sx={{ mt: 1, p: 2 }}>
            <Box sx={{ mt:2, mb: 3}}>
                <SelectBox
                    fieldName={`citizens`}
                    label={`Citizens`}
                    startItemText={`Which country has the most citizens?`}
                    value={citizens}
                    options={countryOptions}
                    register={register}
                    control={control}
                    onChange={onChangeCitizensHandler}
                />
            </Box>
            <Box sx={{ mb: 3}}>
                <SelectBox
                    fieldName={`surface`}
                    label={`Surface`}
                    startItemText={`Guess second largest country`}
                    value={surface}
                    options={countryOptions}
                    register={register}
                    control={control}
                    onChange={onChangeSurfaceHandler}
                />
            </Box>
            <Box sx={{ mb: 3}}>
                <SelectBox
                    fieldName={`languages`}
                    label={`Languages`}
                    startItemText={`Which country has the most languages?`}
                    value={languages}
                    options={countryOptions}
                    register={register}
                    control={control}
                    onChange={onChangeLanguagesHandler}
                />
            </Box>
            {!step2Answered && <Box component="div" noValidate sx={{ mt: 0, p: 1, textAlign: 'center', color: '#fff', fontWeight: 200, background: '#1976d2' }}>
                <Typography component="p" variant="9">
                    When alll answers are right the next step button will be enabled!
                </Typography>
            </Box>}  
        </Box>
    </>);
}

export default Step2;
