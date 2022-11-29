export class EmailInUseError extends Error {
  constructor () {
    super('O email já esta em uso, digite um diferente'),
    this.name = 'EmailInUseError'
  }
}
