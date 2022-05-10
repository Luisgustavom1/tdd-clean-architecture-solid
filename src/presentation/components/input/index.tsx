import React from 'react'

import Context from '@/presentation/contexts/form/form-context';

import Styles from './styles.scss'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = ({ ...props }: InputProps) => {
    const errors = React.useContext(Context)

    const error = errors[`${props.name}`]

    const enableInput = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.readOnly = false
    }

    return (
        <>
            <input onChange={enableInput} data-testid={props.name} readOnly {...props} />
            <span data-testid={`${props.name}-error`} className={Styles.errorMessage}>{error}</span>
        </>
    )
}

export default Input