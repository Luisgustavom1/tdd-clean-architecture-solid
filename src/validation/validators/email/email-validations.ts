import { InvalidFieldError } from "@/validation/errors";
import { FieldValidation } from "@/validation/protocols/field-validation";

export class EmailValidation implements FieldValidation {
  constructor(readonly fieldName: string) {}

  validate (input: object): Error {
    const emailRegex =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return (!input[this.fieldName] || emailRegex.test(input[this.fieldName])) ? null : new InvalidFieldError()
  }
}
