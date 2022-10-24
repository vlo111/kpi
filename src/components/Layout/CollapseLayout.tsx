import React from 'react'
import { AnsCollapseStyle, Panel } from '../Forms/Collapse'
import { CaretRightOutlined } from '@ant-design/icons'
import { IPanelIsActive, IPanelPropData, PanelType } from '../../types/project'
import { Form } from '../Forms/Form'
import AsnInput from '../Forms/Input'
import Button from '../Forms/Button'

export const AnsCollapse: PanelType = ({ children, ...props }) => {
  const propsData: IPanelPropData = {
    defaultActiveKey: [props.header],
    expandIcon: ({ isActive }: IPanelIsActive) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0}/>
    )
  }

  return (
        <AnsCollapseStyle {...propsData}>
            <Panel key={props.header} {...props}>
                <Form.Item
                    name="Input"
                    rules={[{ required: true }]}
                >
                    <AsnInput placeholder={props.header} />
                </Form.Item>
                {children}
                <Form.Item>
                    <Button style={{ background: 'white', width: '100%' }} htmlType="submit" onClick={() => {
                      console.log('aaaaaaaaaaaaaaaaaa')
                    }} value="Create">+Add {props.header}</Button>
                </Form.Item>
            </Panel>
        </AnsCollapseStyle>
  )
}
