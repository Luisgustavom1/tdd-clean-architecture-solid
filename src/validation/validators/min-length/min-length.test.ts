import { MinLengthError } from "@/validation/errors"
import { faker } from "@faker-js/faker"
import { MinLengthValidation } from "./min-length-validation"

const makeSut = (minLength: number) => new MinLengthValidation(faker.database.column(), minLength)

describe('MinLengthValidation', () => {
  it('Should return error if value is invalid', () => {
    const sut = makeSut(5)
    const error = sut.validate('')
    expect(error).toEqual(new MinLengthError(sut.minLenght))
  })

  it('Should return falsy if value is valid', () => {
    const sut = makeSut(5)
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})