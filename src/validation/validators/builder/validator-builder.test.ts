import { FieldValidation } from "@/validation/protocols/field-validation"
import { RequireFieldValidation } from "../require-field/require-field-validation"
import { ValidationBuilder } from "./validator-builder"

describe('ValidationBuilder', () => {
  it('Should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build()    
    expect(validations).toEqual([new RequireFieldValidation('any_field')])
  })
})