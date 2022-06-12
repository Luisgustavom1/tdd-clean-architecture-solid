import { FieldValidation } from "@/validation/protocols/field-validation";
import { RequireFieldValidation } from "../require-field/require-field-validation";

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) { }

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required(): ValidationBuilder {
    this.validations.push(new RequireFieldValidation(this.fieldName))
    return this;
  }

  build(): FieldValidation[] {
    return this.validations
  }
}