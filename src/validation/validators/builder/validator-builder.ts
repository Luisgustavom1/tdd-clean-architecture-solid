import { FieldValidation } from "@/validation/protocols/field-validation";
import { RequireFieldValidation } from "@/validation/validators";
import { EmailValidation } from "../email/email-validations";

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

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this;
  }

  build(): FieldValidation[] {
    return this.validations
  }
}