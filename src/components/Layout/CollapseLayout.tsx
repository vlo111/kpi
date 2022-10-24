import React from 'react'
import { AnsCollapseStyle, Panel } from '../Forms/Collapse'
import { CaretRightOutlined } from '@ant-design/icons'
import { IPanelIsActive, IPanelPropData, IPanelData, PanelType } from '../../types/project'
import { Form } from '../Forms/Form'
import AsnInput from '../Forms/Input'
import Button from '../Forms/Button'
import { VALIDATE_MESSAGES } from '../../helpers/constants'

export const AnsCollapse: PanelType = ({ header, list }) => {
  const [form] = Form.useForm()

  const propsData: IPanelPropData = {
    defaultActiveKey: [header],
    expandIcon: ({ isActive }: IPanelIsActive) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0}/>
    )
  }

  return (
        <AnsCollapseStyle {...propsData}>
            <Panel key={header} header={header}>
                {list.map((l: IPanelData) =>
                    <Form.Item
                        key={l.id}
                        name={l.name}
                        rules={[{ required: true }]}
                    >
                        <AsnInput placeholder="Organization name" defaultValue={l.name}/>
                    </Form.Item>)}
                <Form.Item>
                    <Button style={{ background: 'white', width: '100%' }} htmlType="submit" onClick={() => {
                      console.log('aaaaaaaaaaaaaaaaaa')
                    }} value="Create">+Add {header}</Button>
                </Form.Item>
            </Panel>
        </AnsCollapseStyle>
  )
}
