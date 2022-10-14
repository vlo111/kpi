import React from 'react'
import { Input1 } from '../../../components/forms/input/input1'
import 'antd/dist/antd.css'
import { Container, Wrapper } from './style'
import { Button, Form } from 'antd'

export const SignOut: React.FC = () => {
  return (
        <Container>
            <Wrapper>
                <Form
                    colon={false}
                    labelCol={{
                      span: 4
                    }}
                    wrapperCol={{
                      span: 16
                    }}>
                    <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'The name is required.'
                          },
                          {
                            pattern: /^[a-zA-Z0-9]+$/,
                            message: 'Name can only include letters and numbers.'
                          }
                        ]}>
                        <Input1 type="email" placeHolder="email address"/>
                    </Form.Item>
                    <Button htmlType="submit">Submit</Button>
                </Form>
                <Input1 type="password" placeHolder="email address"/>
                <Input1 type="password" placeHolder="email address"/>
            </Wrapper>
        </Container>
  )
}
