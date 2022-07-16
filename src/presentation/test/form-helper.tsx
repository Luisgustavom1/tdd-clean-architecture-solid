import { faker } from "@faker-js/faker"
import { fireEvent, RenderResult } from "@testing-library/react"

const testChildCount = (sut: RenderResult, fieldName: string, count: number) => {
  const errorWrap = sut.getByTestId(fieldName)
  expect(errorWrap.childElementCount).toBe(count)
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string) => {
  const emailError = sut.getByTestId(`${fieldName}-error`)
  expect(emailError.textContent).toBe(validationError || '')
}

const populateField = (sut: RenderResult, fieldName: string, value = faker.random.word()) => {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

const testElementExists = (sut: RenderResult, fieldName: string) => {
  const element = sut.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

export { testChildCount, testStatusForField, populateField, testElementExists } 