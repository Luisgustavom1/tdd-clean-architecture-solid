import { RequiredFieldError } from "@/validation/errors"
import { RequireFieldValidation } from "@/validation/require-field/require-field-validation"

describe('RequireFieldValidation', () => {
  it('Should return error if field is empty', () => {
    const sut = new RequireFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})