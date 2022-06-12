import { ValidationComposite } from "@/validation/validators";
import { ValidationBuilder } from "@/validation/validators/builder/validator-builder";

export const makeLoginValidation = () => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(5).build()
  ])
}