import React from 'react'
import Styles from './loading.scss'
import Spinner from '@/presentation/components/spinner'

export const Loading = () => {
  return (
    <div data-testid='loading' className={Styles.loadingWrap}>
      <div className={Styles.loading}>
      <p>Aguarde...</p>
      <Spinner></Spinner>
      </div>
    </div>
  )
}
