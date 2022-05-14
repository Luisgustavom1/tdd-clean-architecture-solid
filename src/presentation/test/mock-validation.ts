import { Validation } from "../protocols/validations"

class ValidationStub implements Validation {
    errorMessage: string

    validate(fieldName: string, fieldValue: string): string {
        return this.errorMessage
    }
}

export default ValidationStub