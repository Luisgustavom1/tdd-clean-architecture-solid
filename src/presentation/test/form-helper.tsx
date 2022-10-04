import { faker } from "@faker-js/faker";
import { fireEvent, screen } from "@testing-library/react";

const testChildCount = (fieldName: string, count: number) => {
  const errorWrap = screen.getByTestId(fieldName);
  expect(errorWrap.childElementCount).toBe(count);
};

const testStatusForField = (fieldName: string, validationError?: string) => {
  const emailError = screen.getByTestId(`${fieldName}-error`);
  expect(emailError.textContent).toBe(validationError || "");
};

const populateField = (fieldName: string, value = faker.random.word()) => {
  const input = screen.getByTestId(fieldName);
  fireEvent.input(input, { target: { value } });
};

const testElementExists = (fieldName: string) => {
  const element = screen.getByTestId(fieldName);
  expect(element).toBeTruthy();
};

const testElementText = (fieldName: string, text: string) => {
  const el = screen.getByTestId(fieldName);
  expect(el.textContent).toBe(text);
};

export {
  testChildCount,
  testStatusForField,
  populateField,
  testElementExists,
  testElementText,
};
