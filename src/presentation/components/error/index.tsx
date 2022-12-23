import React from 'react'
import Button from '@/presentation/components/button'
import Styles from './error-style.scss'

interface IErrorProps {
  error: string
  reload: () => void
}

export const Error = ({ error, reload }: IErrorProps) => {
  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{error}</span>
      <Button variant="filled" data-testid='reload' onClick={reload}>
        Tentar novamente
      </Button>
    </div>
  )
}
