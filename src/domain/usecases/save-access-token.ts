export interface SaveAccesssToken {
  save: (accessToken: string) => Promise<void>
}