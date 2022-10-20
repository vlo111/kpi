import React, { useEffect, useRef } from 'react'
import { ButtonType, InputRef, RefInput } from '../../../types/form'
import { Container, Wrapper } from './style'
import { ReactComponent as LogoSvg } from '../../../assets/icons/logo.svg'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/Auth'
import AsnButton from '../../../components/forms/button'
import { Form } from 'antd'
import AsnInput from '../../../components/forms/input'

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

  useEffect(() => {
    void login({ email: 'vv@vv.vv', password: '1111111aA' })
  }, [])

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
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <AsnInput name="Email" placeholder="Email"/>
                        <AsnInput name="Password" placeholder="Password"/>

                      <AsnButton type={ButtonType.Primary} value="Submit">submit </AsnButton>
                    </Form>
                </Container>
            </Wrapper>
        </>
  )
}

export default SignIn
