import React, { useRef } from 'react'
import { ButtonType, InputRef, InputType, RefInput, UInputRef } from '../../../types/form'
import { Container, Wrapper } from './style'
import { ReactComponent as LogoSvg } from '../../../assets/icons/logo.svg'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/Auth'
import Button from '../../../components/forms/button'
import { Form } from 'antd'
import { ASInput } from '../../../components/forms/input'

const SignIn: React.FC = () => {
  const refEmail: RefInput = useRef(null)
  const refPassword: RefInput = useRef(null)

  const { login } = useAuth()
  const navigate = useNavigate()

  const onFinish: () => void = () => {
    try {
      const email = (refEmail as InputRef).current?.input.value ?? ''
      const password = (refPassword as InputRef).current?.input.value ?? ''

      void login({ email, password })

      navigate('/', { replace: true })
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
                    <Form
                        name="basic"
                        initialValues={{
                          remember: true
                        }}
                        layout="vertical"
                        autoComplete="off"
                        onFinish={onFinish}
                    >
                        <ASInput
                            onRef={(ref: UInputRef) => {
                              refEmail.current = ref
                            }}
                            label="Email"
                            placeHolder="Email"
                            type={InputType.Email}/>
                        <ASInput
                            onRef={(ref: UInputRef) => {
                              refPassword.current = ref
                            }}
                            label="Password"
                            placeHolder="Password"
                            type={InputType.Password}/>

                        <Button type={ButtonType.Primary} value="Submit"/>
                    </Form>
                </Container>
            </Wrapper>
        </>
  )
}

export default SignIn
