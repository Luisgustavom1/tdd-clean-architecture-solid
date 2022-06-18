import React from 'react'
import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import Input from '.'
import Context from '@/presentation/contexts/form/form-context'
import { StateErrorsProps, ValuesProps } from '@/presentation/pages/login'

const makeSut = (): RenderResult => {
  return render(
    <Context.Provider value={{ stateErrors: {} as StateErrorsProps, setValues: jest.fn(), values: {} as ValuesProps }}>
      <Input />
    </Context.Provider>
  )
}

describe('<Input />', () => {
  it('Should begin with readOnly', () => {
    makeSut()

    expect((screen.getByRole('textbox') as HTMLInputElement).readOnly).toBeTruthy()
  })

  it('Should remove readOnly on focus', () => {
    makeSut()
    
    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.focus(input);

    expect(input.readOnly).toBeFalsy()
  })
})