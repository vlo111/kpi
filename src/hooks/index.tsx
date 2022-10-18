import React from 'react'
import { UserProvider } from './Auth'
import { Props } from '../types/provider'

const AppProvider: React.FC<Props> = ({ children }) => (
    <>
        <UserProvider>{ children }</UserProvider>
    </>
)

export default AppProvider
