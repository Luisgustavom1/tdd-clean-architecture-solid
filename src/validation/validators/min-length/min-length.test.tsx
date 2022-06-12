import { MinLengthError } from "@/validation/errors/min-length"
import faker from "@faker-js/faker"
import { MinLengthValidation } from "./min-length-validation"

const makeSut = () => new MinLengthValidation(faker.random.word(), 5)

describe('MinLengthValidation', () => {
  it('Should return error if value is invalid', () => {
    const sut = makeSut()
    const error = sut.validate('te')
    expect(error).toEqual(new MinLengthError(sut.minLenght))
  })
})