import { InvalidFieldError } from "@/validation/errors";
import { FieldValidation } from "@/validation/protocols/field-validation";

export class EmailValidation implements FieldValidation {
  constructor(readonly fieldName: string) {}

  validate (fieldValue: string): Error {
    return new InvalidFieldError()
  }
}
