import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import Styles from './styles.scss'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
  variant: 'outlined' | 'filled'
}

const Button = ({ children, variant, ...rest }: ButtonProps) => (
    <button className={variant === 'outlined' ? Styles.outlined : Styles.filled} {...rest}>
        {children}
    </button>
)

export default Button
