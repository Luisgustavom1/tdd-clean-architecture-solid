import { RenderResult } from "@testing-library/react"

const testChildCount = (sut: RenderResult, fieldName: string, count: number) => {
  const errorWrap = sut.getByTestId(fieldName)
  expect(errorWrap.childElementCount).toBe(count)
}

const simulateErrorForField = (sut: RenderResult, fieldName: string, validationError?: string) => {
  const emailError = sut.getByTestId(`${fieldName}-error`)
  expect(emailError.textContent).toBe(validationError || '')
}

export { testChildCount, simulateErrorForField } 