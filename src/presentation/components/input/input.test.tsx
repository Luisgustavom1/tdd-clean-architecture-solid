import React from 'react'
import { render, screen } from '@testing-library/react'
import Input from '.'
import Context from '@/presentation/contexts/form/form-context'
import { StateErrorsProps, ValuesProps } from '@/presentation/pages/login'

describe('<Input />', () => {
  it('Should make any action begin with readOnly', () => {
    render(
      <Context.Provider value={{ stateErrors: {} as StateErrorsProps, setValues: jest.fn(), values: {} as ValuesProps }}>
        <Input name='field' />
      </Context.Provider>
    )

    expect((screen.getByRole('textbox') as HTMLInputElement).readOnly).toBeTruthy()
  })
})