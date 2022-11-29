import { MinLengthError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (fieldName: string, minLength: number) => new MinLengthValidation(fieldName, minLength)

describe('MinLengthValidation', () => {
  it('Should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field, 5)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })
    expect(error).toEqual(new MinLengthError(sut.minLenght))
  })

  it('Should return falsy if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field, 5)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  it('Should return falsy if field does not exists in schema', () => {
    const field = faker.database.column()
    const sut = makeSut(field, 5)
    const error = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })
})
