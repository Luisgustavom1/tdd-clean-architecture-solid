export class MinLengthError extends Error {
  constructor (readonly minLength: number) {
    super(`O tamanho mínimo é de ${minLength} caracteres`)
    this.name = 'MinLengthError'
  }
}
