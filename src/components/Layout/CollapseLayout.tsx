import React from 'react'
import { AnsCollapseStyle, Panel } from '../Forms/Collapse'
import { CaretRightOutlined, DeleteOutlined } from '@ant-design/icons'
import { IPanelIsActive, IPanelPropData, IPanelData, PanelType } from '../../types/project'
import { Form } from '../Forms/Form'
import AsnInput from '../Forms/Input'
import Button from '../Forms/Button'

export const AnsCollapse: PanelType = ({ header, list, deleteData }) => {
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
                    <div key={l.id} className="form-item-collapse">
                        <Form.Item
                            name={l.id}
                            rules={[{ required: true }]}
                        >
                            <AsnInput placeholder="Organization name"/>
                        </Form.Item>
                        {list.length > 1 && <DeleteOutlined onClick={() => deleteData(header, l.id)}/>}
                    </div>
                )}
                <Button style={{ background: 'white', width: '100%' }} htmlType="submit" onClick={() => {
                  console.log('aaaaaaaaaaaaaaaaaa')
                }} value="Create">+Add {header}</Button>
            </Panel>
        </AnsCollapseStyle>
  )
}
