import { EmailValidation } from "../email/email-validations"
import { RequireFieldValidation } from "../require-field/require-field-validation"
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
})