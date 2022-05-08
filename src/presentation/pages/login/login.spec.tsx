import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('<Login />', () => {
    it('', () => {
        const { getByTestId } = render(<Login />)
        const errorWrap = getByTestId('status-wrap')

        expect(errorWrap.childElementCount).toBe(0)
    })
})