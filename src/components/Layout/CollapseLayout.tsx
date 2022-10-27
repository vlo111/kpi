import React from 'react'
import { Panel } from '../Forms/Collapse'
import { DeleteOutlined } from '@ant-design/icons'
import { IPanelData, IPanel } from '../../types/project'
import { Form } from '../Forms/Form'
import AsnInput from '../Forms/Input'
import Button from '../Forms/Button'
import { AnsCollapse } from '../AnsCollapse'

export const Ans: React.FC<IPanel> = ({ header, list, deleteData, addData }) => {
  return (
      <AnsCollapse id={header}>
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
              <Button style={{ background: 'white', width: '100%' }} htmlType="submit" onClick={() => addData(header)} value="Create">+Add {header}</Button>
          </Panel>
      </AnsCollapse>
  )
}
