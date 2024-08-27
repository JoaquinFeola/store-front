import { ChangeEvent, useEffect, useState } from "react"


type FormCheckedValues<T> = {
    [key in keyof T as `is${Capitalize<string & key>}Valid`]: string | null;
};



export type FormValidation<T> = {
    [key in keyof T]: [(value: T[key]) => boolean, string];
};




export const useForm = <T>(initialForm: T, formValidations: FormValidation<T> = {} as FormValidation<T>) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState<FormCheckedValues<T>>({} as FormCheckedValues<T>)

    useEffect(() => {
        createValidators();
    }, [formState])

    const onInputWrite = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, lengthValidation?: number) => {
        const { name, value } = target;
        if (lengthValidation === undefined) {
            setFormState({
                ...formState,
                [name]: value
            });
        } else {
            if (value.length > lengthValidation) return;
            setFormState({
                ...formState,
                [name]: value
            })
        }

    };

    

    const onInputLoadFile = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = target;
        const reader = new FileReader();

        
        reader.onload = function(e) {
           let base64Image = e.target?.result;
           if ( base64Image === null || base64Image === undefined ) return;
            
            setFormState({
                ...formState,
                [name]:  base64Image
            });
        };
        reader.readAsDataURL(files![0]);
    };

    const assignAllNewValues = (values: Partial<T>) => {
        
        setFormState({...formState, ...values as T});
    }

    const resetFormValues = () => {
        setFormState(initialForm);
    };


    const createValidators = () => {
        const formCheckedValues = {} as FormCheckedValues<T>;

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField as keyof T];
            const capitalizedFormField = formField.charAt(0).toUpperCase() + formField.slice(1);
            formCheckedValues[(`is${capitalizedFormField}Valid`)] = fn(formState[formField as keyof T]) ? errorMessage : null;
        }

        setFormValidation(formCheckedValues);
    }; // Crea los una nueva key con los validadores y su respectivo valor: string o null





    return {
        ...formValidation,
        ...formState,
        formState,
        initialForm,
        formValidation,
        onInputWrite,
        resetFormValues,
        onInputLoadFile,
        assignAllNewValues
    }



}
