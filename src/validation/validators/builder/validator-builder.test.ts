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
    const validations = sut.field('any_field').email().build()
    expect(validations).toEqual([new MinLengthValidation('any_field', 5)])
  })

  it('Should return MinLengthValidation and EmailValidation', () => {
    const validations = sut.field('any_field').email().minLength(5).build()
    expect(validations).toEqual([new EmailValidation('any_field'), new MinLengthValidation('any_field', 5)])
  })
})