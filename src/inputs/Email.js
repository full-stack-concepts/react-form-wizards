import TextField from '../elements/TextField';

export const Email = ({label, control, register, onChangeHandler, onBlurHandler}) => <TextField
    fieldName={`email`}
    fieldType={`email`}
    label={`Email`}
    control={control}
    register={register}
    required={true}
    onChangeHandler={onChangeHandler}
    onBlurHandler={onBlurHandler}
/>