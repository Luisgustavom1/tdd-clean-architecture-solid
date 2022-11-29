export interface FieldValidation {
  fieldName: string
  validate: (input: object) => Error
}
