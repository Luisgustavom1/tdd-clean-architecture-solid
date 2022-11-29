import { AccessDeniedError } from '@/domain/errors'
import { useLogout } from './use-logout'

type CallBackType = (error: Error) => void

export const useErrorHandler = (callback: CallBackType): CallBackType => {
  const logout = useLogout()

  return (error: Error) => {
    if (error instanceof AccessDeniedError) {
      logout()
      return
    }

    callback(error)
  }
}
