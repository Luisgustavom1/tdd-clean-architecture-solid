import React from 'react'
import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import Input from '.'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (): RenderResult => {
  return render(
    <Context.Provider value={{ stateErrors: {}, setValues: jest.fn(), values: {} }}>
      <Input />
    </Context.Provider>
  )
}

describe('<Input />', () => {
  it('Should begin with readOnly', () => {
    makeSut()

    const input: HTMLInputElement = screen.getByRole('textbox')

    expect(input.readOnly).toBeTruthy()
  })

  it('Should remove readOnly on focus', () => {
    makeSut()

    const input: HTMLInputElement = screen.getByRole('textbox')

    fireEvent.focus(input)

    expect(input.readOnly).toBeFalsy()
  })
})
