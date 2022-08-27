import { MinLengthError } from "@/validation/errors";
import { FieldValidation } from "@/validation/protocols/field-validation";

export class MinLengthValidation implements FieldValidation {
  constructor(readonly fieldName: string, readonly minLenght: number) {}

  validate(input: object): Error {
    return input[this.fieldName]?.length < this.minLenght ? new MinLengthError(this.minLenght) : null
  }
}