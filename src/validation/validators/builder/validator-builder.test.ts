import { EmailValidation, RequireFieldValidation, MinLengthValidation } from '@/validation/validators'
import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from '../compare-fields/compare-fields-validation'
import { ValidationBuilder as sut } from './validator-builder'

describe('ValidationBuilder', () => {
  it('Should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).required().build()
    expect(validations).toEqual([new RequireFieldValidation(fieldName)])
  })

  it('Should return EmailValidation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).email().build()
    expect(validations).toEqual([new EmailValidation(fieldName)])
  })

  it('Should return MinLengthValidation', () => {
    const fieldName = faker.database.column()
    const length = faker.datatype.number()
    const validations = sut.field(fieldName).minLength(length).build()
    expect(validations).toEqual([new MinLengthValidation(fieldName, length)])
  })

  it('Should return ComparFieldsValidation', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const validations = sut.field(field).sameAs(fieldToCompare).build()
    expect(validations).toEqual([new CompareFieldsValidation(field, fieldToCompare)])
  })

  it('Should return a list of validations', () => {
    const fieldName = faker.database.column()
    const length = faker.datatype.number()
    const validations = sut.field(fieldName).email().required().minLength(length).build()
    expect(validations).toEqual([new EmailValidation(fieldName), new RequireFieldValidation(fieldName), new MinLengthValidation(fieldName, length)])
  })
})
