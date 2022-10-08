import React from 'react'import { BrowserRouter, Routes, Route } from 'react-router-dom'import { Index } from './pages'import { SignIn } from './pages/sign/SignIn'import { SignUp } from './pages/sign/SignUp'import { SignOut } from './pages/sign/SignOut'export const App: React.FC = () => {  return (        <BrowserRouter>            <Routes>                <Route path="/sign/sign-in" element={<SignIn />}/>                <Route path="/sign/sign-up" element={<SignUp />} />                <Route path="/sign/sign-out" element={<SignOut />}/>                <Route path="/" element={<Index />}/>            </Routes>        </BrowserRouter>  )}