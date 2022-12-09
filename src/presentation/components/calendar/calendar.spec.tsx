import React from 'react'
import { render, screen } from '@testing-library/react'
import { Calendar } from '.'

const makeSut = (date: Date) => {
  render(<Calendar date={date} />)
}

describe('Calendar component', () => {
  it('Should render with correct values', () => {
    makeSut(new Date('2022-01-10T00:00:00'))
    expect(screen.getByTestId('day').textContent).toBe('10')
    expect(screen.getByTestId('month').textContent).toBe('jan')
    expect(screen.getByTestId('year').textContent).toBe('2022')
  })

  it('Should render with correct values', () => {
    makeSut(new Date('2022-01-10T00:00:00'))
    expect(screen.getByTestId('day').textContent).toBe('05')
    expect(screen.getByTestId('month').textContent).toBe('mai')
    expect(screen.getByTestId('year').textContent).toBe('2019')
  })
})
