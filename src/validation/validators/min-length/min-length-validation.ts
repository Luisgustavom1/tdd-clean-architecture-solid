import { MinLengthError } from "@/validation/errors/min-length";
import { FieldValidation } from "@/validation/protocols/field-validation";

export class MinLengthValidation implements FieldValidation {
  constructor(readonly fieldName: string, readonly minLenght: number) {}

  validate(fieldValue: string): Error {
    return new MinLengthError(this.minLenght)
  }
}