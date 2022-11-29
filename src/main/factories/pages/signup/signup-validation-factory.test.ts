import { CompareFieldsValidation, EmailValidation, MinLengthValidation, RequireFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeSignupValidation } from './signup-validation-factory'

describe('Login', () => {
  it('Should make ValidationCompose with correct validations', () => {
    const composite = makeSignupValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequireFieldValidation('name'),
      new MinLengthValidation('name', 5),
      new RequireFieldValidation('email'),
      new EmailValidation('email'),
      new RequireFieldValidation('password'),
      new MinLengthValidation('password', 5),
      new RequireFieldValidation('passwordConfirmation'),
      new CompareFieldsValidation('passwordConfirmation', 'password')
    ]))
  })
})
