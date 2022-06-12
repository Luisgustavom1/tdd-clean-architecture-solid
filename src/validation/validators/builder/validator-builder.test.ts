import { EmailValidation, RequireFieldValidation, MinLengthValidation } from "@/validation/validators"
import { ValidationBuilder as sut } from "./validator-builder"

describe('ValidationBuilder', () => {
  it('Should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequireFieldValidation('any_field')])
  })

  it('Should return EmailValidation', () => {
    const validations = sut.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })

  it('Should return EmailValidation', () => {
    const validations = sut.field('any_field').minLength(5).build()
    expect(validations).toEqual([new MinLengthValidation('any_field', 5)])
  })

  it('Should return a list of validations', () => {
    const validations = sut.field('any_field').email().required().minLength(5).build()
    expect(validations).toEqual([new EmailValidation('any_field'), new RequireFieldValidation('any_field'), new MinLengthValidation('any_field', 5)])
  })
})