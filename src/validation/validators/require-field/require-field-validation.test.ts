import { RequiredFieldError } from "@/validation/errors"
import { RequireFieldValidation } from "@/validation/validators/require-field/require-field-validation"
import { faker } from "@faker-js/faker"

const makeSut = (field: string): RequireFieldValidation => new RequireFieldValidation(field)

describe('RequireFieldValidation', () => {
  it('Should return error if field is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })

  it('Should return falsy if field is not  empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})