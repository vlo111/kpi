import React from 'react'
import { AsnCollapse } from '../../../../AsnCollapse'
import { Panel } from '../../../../Forms/AsnCollapse'
import { Row } from 'antd'
import AsnInput from '../../../../Forms/Input'
import { AsnButton } from '../../../../Forms/Button'
import { IDetail } from '../../../../../types/project'
import { ReactComponent as DeleteSvg } from '../../../../../assets/icons/delete.svg'
import { Form } from '../../../../Forms/Form'
import { rules } from '../../../../../utils/ProjectUtils'

export const Items: React.FC<{
  header: string
  items: IDetail[]
  addItemHandle: () => void
  deleteItemHandle: (data: string[]) => void
}> = ({ header, items, addItemHandle, deleteItemHandle }) => {
  return (
    <AsnCollapse key={header} id={header}>
      <Panel key={header} className="input-rows" header={header}>
        {items.map((r: IDetail, i: number) => (
          <Row key={`${r.id}${i}`}>
            <Form.Item
              style={{ width: items.length > 1 ? '99%' : '100%' }}
              name={r.id}
              {...rules(2, 256)}
            >
              <AsnInput placeholder="Organisation name" />
            </Form.Item>
            {items.length > 1 && (
              <div
                className="delete-result"
                onClick={() => deleteItemHandle([header, r.id])}
              >
                <DeleteSvg />
              </div>
            )}
          </Row>
        ))}
        <AsnButton onClick={addItemHandle}>+Add Organizations</AsnButton>
      </Panel>
    </AsnCollapse>
  )
}
