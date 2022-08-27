import { RequiredFieldError } from "@/validation/errors";
import { FieldValidation } from "@/validation/protocols/field-validation";

export class RequireFieldValidation implements FieldValidation {
  constructor(readonly fieldName: string) {}

  validate(input: object): Error {
    return input[this.fieldName] ? null : new RequiredFieldError()
  }
}

