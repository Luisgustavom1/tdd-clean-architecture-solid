import { RequiredFieldError } from "@/validation/errors";
import { FieldValidation } from "@/validation/protocols/field-validation";

export class RequireFieldValidation implements FieldValidation {
  constructor(readonly fieldName: string) {}

  validate(fieldValue: string): Error {
    return fieldValue ? null : new RequiredFieldError()
  }
}

