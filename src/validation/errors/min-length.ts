export class MinLengthError extends Error {
  constructor (readonly minLength: number) {
    super(`O mínimo de caracteres é de ${minLength}`)
    this.name = 'MinLengthError'
  }
}