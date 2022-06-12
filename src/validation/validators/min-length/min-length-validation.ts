import { MinLengthError } from "@/validation/errors";
import { FieldValidation } from "@/validation/protocols/field-validation";

export class MinLengthValidation implements FieldValidation {
  constructor(readonly fieldName: string, readonly minLenght: number) {}

  validate(fieldValue: string): Error {
    return new MinLengthError(this.minLenght)
  }
}