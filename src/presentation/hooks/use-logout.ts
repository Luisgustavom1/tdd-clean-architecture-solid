import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'

type CallBackType = () => void

export const useLogout = (): CallBackType => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  return () => {
    history?.replace('/login')
    setCurrentAccount(undefined)
  }
}
