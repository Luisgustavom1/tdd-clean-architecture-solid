import { EmailValidation, MinLengthValidation, RequireFieldValidation, ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/builder/validator-builder'
import { makeLoginValidation } from './login-validation-factory'

describe('Login', () => {
  it('Should make ValidationCompose with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequireFieldValidation('email'),
      new EmailValidation('email'),
      new RequireFieldValidation('password'),
      new MinLengthValidation('password', 5)
    ]))
  })
})
