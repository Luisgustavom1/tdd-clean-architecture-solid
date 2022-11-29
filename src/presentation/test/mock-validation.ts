import { Validation } from '../protocols/validations'

export class ValidationStub implements Validation {
    errorMessage: string

    validate (fieldName: string, input: object): string {
      return this.errorMessage
    }
}
