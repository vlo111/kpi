import React from 'react'
import { useAuth } from '../hooks/auth'
import { useNavigate } from 'react-router-dom'
import Input from '../components/forms/input'
import { ButtonType, InputType } from '../types/form'
import { Form, Row } from 'antd'
import Button from '../components/forms/button'

export const Home: React.FC = () => {
  const navigate = useNavigate()

  const { logout } = useAuth()

  return (
        <div>
            <h1 style={{ position: 'fixed' }}>This is the Home Page</h1>
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Form
                    name="basic"
                    initialValues={{
                      remember: true
                    }}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Input label="Home" placeHolder="Home"/>
                    <Input label="Password" validatePassword={false} placeHolder="Password" type={InputType.Password}/>
                    <Input label="Email" placeHolder="Email" type={InputType.Email}/>

                    <Button value="Default"/>
                    <Button value="Primary" type={ButtonType.Primary}/>
                    <Button value="Secondary" type={ButtonType.Secondary}/>
                </Form>
            </Row>
            <div style={{ position: 'fixed', right: '5px', top: '5px' }} onClick={() => {
              logout()
              navigate('sign/in', { replace: true })
            }}>Log out
            </div>
        </div>
  )
}
