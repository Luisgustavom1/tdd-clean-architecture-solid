import { AccountModel } from '@/domain/model'
import { createContext } from 'react'

type Props = {
  setCurrentAccount: (account: AccountModel) => void
  getCurrentAccount?: AccountModel
}

export default createContext<Props>(null)