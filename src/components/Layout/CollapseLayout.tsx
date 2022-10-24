import React from 'react'
import { AnsCollapseStyle, Panel } from '../Forms/Collapse'
import { CaretRightOutlined } from '@ant-design/icons'
import { PanelIsActive, PanelPropData, PanelType } from '../../types/project'
import { Form } from '../Forms/Form'
import AsnInput from '../Forms/Input'
import Button from '../Forms/Button'

export const AnsCollapse: PanelType = ({ children, ...props }) => {
  const propsData: PanelPropData = {
    defaultActiveKey: ['1'],
    expandIcon: ({ isActive }: PanelIsActive) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
    )
  }

  return (
        <AnsCollapseStyle {...propsData}>
            <Panel key={1} {...props}>
                {children}
                <Form.Item>
                    <Form.Item
                        name="Input"
                        rules={[
                          {
                            required: true,
                            min: 2,
                            max: 256
                          }
                        ]}
                    >
                        <AsnInput placeholder="Example: Ararat Marz*" />
                    </Form.Item>
                </Form.Item>
                <Form.Item>
                    <Button style={{ background: 'white', width: '100%' }} htmlType="submit" onClick={() => {
                      console.log('aaaaaaaaaaaaaaaaaa')
                    }} value="Create">+Add {props.header}</Button>
                </Form.Item>
            </Panel>
        </AnsCollapseStyle>
  )
}
