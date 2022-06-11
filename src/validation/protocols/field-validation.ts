export interface FieldValidation {
  fieldName: string,
  validate: (fieldValue: string) => Error
}
