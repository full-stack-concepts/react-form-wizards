import TextField from '../elements/TextField';

export const Password = ({label, control, register, onChangeHandler, onBlurHandler}) => <TextField
    fieldName={`password`}
    fieldType={`password`}
    label={`Password`}
    control={control}
    register={register}
    required={true}
    onChangeHandler={onChangeHandler}
    onBlurHandler={onBlurHandler}
/>