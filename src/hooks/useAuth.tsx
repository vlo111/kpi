import { useContext, useDebugValue } from 'react'
import AuthContext from '../context/AuthProvider'

const useAuth: any = () => {
  const { auth }: any = useContext(AuthContext)
  useDebugValue(auth, auth => auth?.user !== null ? 'Logged In' : 'Logged Out')
  return useContext(AuthContext)
}

export default useAuth
