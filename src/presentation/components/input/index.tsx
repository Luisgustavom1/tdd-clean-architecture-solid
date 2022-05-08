import React from 'react'
import Styles from './styles.scss'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { error?: string }

const Input = ({error, ...props}: InputProps) => {
    return (
        <>
            <input {...props} />
            <span className={Styles.errorMessage}>{error}</span>
        </>
    )
}

export default Input