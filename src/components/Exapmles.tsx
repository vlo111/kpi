import React, { useState } from 'react'
import { useAuth } from '../hooks/auth'
import { useNavigate } from 'react-router-dom'
import Input from '../components/forms/input'
import { ButtonType, InputType } from '../types/form'
import { Form, Divider, Space, Card, DatePicker } from 'antd'
import Button from '../components/forms/button'

const { RangePicker } = DatePicker

const Examples: React.FC = () => {
  const navigate = useNavigate()
  const [homeError, setHomeError] = useState('')
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined)

  const { logout } = useAuth()

  // 1 CARD
  const CardInputs = <Card style={{ width: '350px' }} title="1. Form Inputs Validation" size="default">
        <Form
            name="basic"
            id="formInputs"
            initialValues={{
              remember: true
            }}
            layout="vertical"
            autoComplete="off"
        >
            <Input
                id="inputHome"
                label="Required Input"
                placeHolder="Enter Required Input"
                requiredItem={true}
            />
            <Input
                label="Password"
                validatePassword={false}
                placeHolder="Password"
                type={InputType.Password}/>
            <Input
                label="Email"
                placeHolder="Email"
                type={InputType.Email}
            />
            <Button value="Submit" type={ButtonType.Secondary}/>
            <Divider orientation="left"/>
            <h2>Input Types</h2>
            <span>
                <p>{'export enum InputType {'}</p>
                <p>{'Default = 1, Password = 2, Email = 3 }'}</p>
                <h2>Required Param</h2>
                <p>{'requiredItem={true} - label *'}</p>
            </span>
        </Form>
    </Card>

  // 2 CARD
  const CardButtons = <Card title="2. Buttons" size="default">
        <Button value="Default"/>
        <Divider orientation="left"/>
        <Button value="Primary" type={ButtonType.Primary}/>
        <Divider orientation="left"/>
        <Button value="Secondary" type={ButtonType.Secondary}/>
    </Card>

  // 3 CARD
  const CartInputsTypes = <Card title="3. Form Input types" size="default">
        <Form
            name="basic"
            id="formInputsTypes"
            initialValues={{
              remember: true
            }}
            layout="vertical"
            autoComplete="off"
            style={{ width: '350px' }}
        >
            <Input
                id="1"
                label="Gray Input"
                placeHolder="Home"
            />
            <Input
                id="2"
                label="Dark Gray Input"
                placeHolder="Home"
            />
            <Input
                id="3"
                label="Light Gray Border"
                placeHolder="Home"
            />
            <Input
                id="4"
                label="Title Input"
                placeHolder="Home"
            />
        </Form>
    </Card>

  // 4 CARD
  const CardValidateInput = <Card title="4. Custom validate input in the form " size="default">
        <Form
            id="formValidation"
            name="basic"
            initialValues={{
              remember: true
            }}
            layout="vertical"
            autoComplete="off"
        >
            <Input
                id="validateInput"
                label="Custom Input"
                placeHolder="Input PlaceHolder"
                onChange={() => {
                  setHomeError('')
                }}
                error={homeError}/>

            <Button value="Set Error" onClick={() => {
              setHomeError('Custom error message')
            }
            }/>
        </Form>
        <Divider orientation="left"/>
        <Form
            name="basic"
            id="formInputs1"
            initialValues={{
              remember: true
            }}
            layout="vertical"
            autoComplete="off"
        >
            <Input
                label="Custom Validation Password"
                validatePassword={true}
                placeHolder="Password"
                type={InputType.Password}
                onChange={() => {
                  setPasswordError(undefined)
                }}
                error={passwordError ?? undefined}
            />
            <Button onClick={() => {
              setPasswordError('set server server error')
            }} value="Submit" type={ButtonType.Secondary}/>
            <Divider orientation="left"/>
            <h2>Props</h2>
            <span>
                <p>{'label = "Custom Validation Password"'}</p>
                <p style={{ color: 'red', fontStyle: 'italic' }}>{'validatePassword = {true}'}</p>
                <p>{'placeHolder = "Password"'}</p>
                <p>{'type={InputType.Password}'}</p>
                <p>{'onChange={() => {setPasswordError(undefined)}}'}</p>
                <p style={{ display: 'flex' }}>{'error={passwordError}- - '} <p
                    style={{ color: 'green', fontStyle: 'italic' }}>custom error message</p></p>
            </span>

        </Form>
    </Card>

  // 5 CARD
  const CardStartEnd = <Card title="5. Select start-end date" size="default">
        <RangePicker/>
    </Card>

  // style fields
  const spaceStyle = {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'start'
  }

  const logStyle = {
    cursor: 'pointer',
    color: 'blueviolet',
    fontSize: '25px',
    right: '5px',
    top: '5px'
  }

  const logOut = <div style={logStyle} onClick={() => {
    logout()
    navigate('sign/in', { replace: true })
  }}>Log out
    </div>

  return (
        <div>
            <Divider style={{ margin: '0' }} orientation="left"><span style={{ fontSize: '30px' }}>GUIDE. Examples of Global Meetk Fields</span></Divider>

            <Space
                direction="horizontal"
                size="large"
                style={spaceStyle}
            >
                {CardInputs}
                {CardButtons}
                {CartInputsTypes}
                {CardValidateInput}
                {CardStartEnd}
            </Space>
            {logOut}
        </div>
  )
}

export default Examples
