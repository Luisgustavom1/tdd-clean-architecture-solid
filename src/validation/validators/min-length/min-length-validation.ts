import { MinLengthError } from "@/validation/errors";
import { FieldValidation } from "@/validation/protocols/field-validation";

export class MinLengthValidation implements FieldValidation {
  constructor(readonly fieldName: string, readonly minLenght: number) {}

  validate(fieldValue: string): Error {
    return fieldValue.length >= this.minLenght ? null : new MinLengthError(this.minLenght)
  }
}