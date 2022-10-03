import { AccountModel } from '@/domain/model'
import { createContext } from 'react'

type Props = {
  setCurrentAccount: (account: AccountModel) => void
}

export default createContext<Props>(null)