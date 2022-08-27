import { CompareFieldsError } from "@/validation/errors";
import { FieldValidation } from "@/validation/protocols/field-validation";

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly fieldName: string, private readonly fieldToCompare: string) {}

  validate(input: object): Error {
    return input[this.fieldToCompare] !== input[this.fieldName] ? new CompareFieldsError() : null
  }
}

