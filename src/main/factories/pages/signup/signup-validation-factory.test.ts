import { ValidationComposite } from "@/validation/validators"
import { ValidationBuilder as Builder } from "@/validation/validators/builder/validator-builder"
import { makeSignupValidation } from "./signup-validation-factory"

describe('Login', () => {
  it('Should make ValidationCompose with correct validations', () => {
    const composite = makeSignupValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('name').required().minLength(5).build(),
      ...Builder.field('email').required().email().build(),
      ...Builder.field('password').required().minLength(5).build(),
      ...Builder.field('passwordConfirmation').required().sameAs('password').build()
    ]))
  })
})