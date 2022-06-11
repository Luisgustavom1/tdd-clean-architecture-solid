import { RequiredFieldError } from "@/validation/errors"
import { RequireFieldValidation } from "@/validation/require-field/require-field-validation"
import faker from "@faker-js/faker"

const makeSut = (): RequireFieldValidation => new RequireFieldValidation(faker.database.column())

describe('RequireFieldValidation', () => {
  it('Should return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  it('Should return falsy if field is not  empty', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toBeFalsy()
  })
})