import React, { useRef } from 'react'
import { Input } from '../../../components/forms/input/new'
import { InputRef, RefInput, UInputRef } from '../../../types/form'
import { FormEventHandler } from '../../../types/event'
import { Container, Wrapper } from './style'
import { ReactComponent as LogoSvg } from '../../../assets/icons/logo.svg'
import { Style } from '../../../data/style'

export const SignIn: React.FC = () => {
  const refEmail: RefInput = useRef(null)
  const refPassword: RefInput = useRef(null)

  const onSubmit: FormEventHandler = (ev) => {
    ev.preventDefault()
    if (refEmail.current != null) {
      const inputValue = (refEmail as InputRef)

      if (inputValue !== undefined) {
        const email = inputValue.current?.value
        console.log('email', email)
      }
    }

    if (refPassword.current != null) {
      const inputValue = (refPassword as InputRef)

      if (inputValue !== undefined) {
        const email = inputValue.current?.value
        console.log('email', email)
      }
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
                            label="email address"
                            placeHolder="email address"
                            style={Style.SignInInput}
                            error="Please enter your email address in format: yourname@domain.com"
                        />
                        <Input
                            onRef={(ref: UInputRef) => {
                              refEmail.current = ref
                            }}
                            label="password"
                            placeHolder="password"
                            style={Style.SignInInput}
                        />
                        <button> submit</button>
                    </form>
                </Container>
            </Wrapper>
        </>
  )
}
