import React from 'react'
import { UserProvider } from './auth'
import { Props } from '../types/provider'

const AppProvider: React.FC<Props> = ({ children }) => (
    <>
        <UserProvider>{ children }</UserProvider>
    </>
)

export default AppProvider
