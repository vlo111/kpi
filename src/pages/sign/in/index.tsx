import React, { useRef } from 'react'
import { Input } from '../../../components/forms/customInput'
import { InputRef, RefInput, UInputRef } from '../../../types/form'
import { FormEventHandler } from '../../../types/event'
import { Container, Wrapper } from './style'
import { ReactComponent as LogoSvg } from '../../../assets/icons/logo.svg'
import { Style } from '../../../data/style'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/auth'

const SignIn: React.FC = () => {
  const refEmail: RefInput = useRef(null)
  const refPassword: RefInput = useRef(null)

  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit: FormEventHandler = (ev) => {
    try {
      ev.preventDefault()

      const email = (refEmail as InputRef).current?.value ?? ''
      const password = (refPassword as InputRef).current?.value ?? ''

      navigate('/', { replace: true })

      void login({ email, password })
    } catch (e) {
      console.log(e)
    }
  }

  return (
        <>
            <Wrapper>
                <Container>
                    <div className="logo">
                        <LogoSvg/>
                    </div>
                    <div className="title">
                        sign in
                    </div>
                    <form onSubmit={onSubmit}>
                        <Input
                            onRef={(ref: UInputRef) => {
                              refEmail.current = ref
                            }}
                            label="Email Address"
                            placeHolder="Email Address"
                            style={Style.SignInInput}
                        />
                        <Input
                            onRef={(ref: UInputRef) => {
                              refPassword.current = ref
                            }}
                            label="Password"
                            placeHolder="Password"
                            style={Style.SignInInput}
                        />
                        <button> submit</button>
                    </form>
                </Container>
            </Wrapper>
        </>
  )
}

export default SignIn
