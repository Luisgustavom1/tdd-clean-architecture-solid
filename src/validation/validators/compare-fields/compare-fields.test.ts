import { CompareFieldsError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (fieldName: string, fieldToCompare: string) => new CompareFieldsValidation(fieldName, fieldToCompare)

describe('MinLengthValidation', () => {
  it('Should return error if compare is invalid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({ [field]: 'any_value', [fieldToCompare]: 'other_value' })
    expect(error).toEqual(new CompareFieldsError())
  })

  it('Should return error if compare is valid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const value = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({ [field]: value, [fieldToCompare]: value })
    expect(error).toBeFalsy()
  })
})
