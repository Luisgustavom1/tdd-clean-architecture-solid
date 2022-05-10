import React from 'react'

import Context from '@/presentation/contexts/form/form-context';

import Styles from './styles.scss'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = ({ ...props }: InputProps) => {
    const { stateErrors, setValues, values } = React.useContext(Context)

    const error = stateErrors[`${props.name}`]

    const enableInput = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.readOnly = false
    }

    const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <input onChange={handleChange} onFocus={enableInput} data-testid={props.name} readOnly {...props} />
            <span data-testid={`${props.name}-error`} className={Styles.errorMessage}>{error}</span>
        </>
    )
}

export default Input