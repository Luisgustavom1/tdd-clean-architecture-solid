export class CompareFieldsError extends Error {
  constructor() {
    super('Os valores não são iguais');
    this.name = 'CompareFieldsError'
  }
}