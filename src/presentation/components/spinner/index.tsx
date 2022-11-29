import React from 'react'

import Styles from './styles.scss'

const Spinner = () => (
    <div data-testid='spinner' className={Styles['lds-ellipsis']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default Spinner
