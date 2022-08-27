import { FieldValidation } from "@/validation/protocols/field-validation";
import { EmailValidation, MinLengthValidation, RequireFieldValidation, CompareFieldsValidation } from '@/validation/validators';

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

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this;
  }

  minLength(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length))
    return this;
  }

  sameAs(fieldToCompare: string): ValidationBuilder {
    this.validations.push(new CompareFieldsValidation(this.fieldName, fieldToCompare))
    return this;
  }

  build(): FieldValidation[] {
    return this.validations
  }
}