export class InvalidFieldError extends Error {
  constructor () {
    super('Email inválido')
    this.name = 'InvalidFieldError'
  }
}