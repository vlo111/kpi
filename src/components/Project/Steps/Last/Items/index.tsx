import React from 'react'
import { AsnCollapse } from '../../../../AsnCollapse'
import { Panel } from '../../../../Forms/AsnCollapse'
import { Col, Row } from 'antd'
import AsnInput from '../../../../Forms/Input'
import { AsnButton } from '../../../../Forms/Button'
import { IDetail } from '../../../../../types/project'
import { ReactComponent as DeleteSvg } from '../../../../../assets/icons/delete.svg'
import { Form } from '../../../../Forms/Form'
import { rules } from '../../../../../utils/ProjectUtils'
import styled from 'styled-components'

const FormList = styled(Form.List)`
  button {
    height: 44px !important;
    box-shadow: 0 4px 4px rgba(42, 85, 120, 0.05);
    border-radius: 6px;
  }
`

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
}
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 }
  }
}

// export const Items: React.FC<{
//   header: string
//   items: IDetail[]
//   addItemHandle: () => void
//   deleteItemHandle: (data: string[]) => void
// }> = ({ header, items, addItemHandle, deleteItemHandle }) => {
//   return (
//     <AsnCollapse key={header} id={header}>
//       <Panel key={header} className="input-rows" header={header}>
//         {items.map((r: IDetail, i: number) => (
//           <Row key={`${r.id}${i}`}>
//             <Form.Item
//               style={{ width: items.length > 1 ? '99%' : '100%' }}
//               key={r.id}
//               name={r.id}
//               {...rules(2, 256)}
//             >
//               <AsnInput placeholder="Organisation name" />
//             </Form.Item>
//             {items.length > 1 && (
//               <div
//                 className="delete-result"
//                 onClick={() => deleteItemHandle([header, r.id])}
//               >
//                 <DeleteSvg />
//               </div>
//             )}
//           </Row>
//         ))}
//         <AsnButton onClick={addItemHandle}>+Add Organizations</AsnButton>
//       </Panel>
//     </AsnCollapse>
//   )
// }

export const Items: React.FC<{
  name: string
}> = ({ name }) => {
  return (
      <FormList name={name}>
        {(fields: any[], { add, remove }: any, { errors }: any) => (
            <>
              {fields.map((field, index) => (
                  <Form.Item
                      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                      required={false}
                      key={field.key}
                  >
                    <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please input passenger's name or delete this field."
                          }
                        ]}
                        noStyle
                    >
                      <AsnInput placeholder="passenger name" />
                    </Form.Item>
                    {fields.length > 1
                      ? (
                            <DeleteSvg
                                className="dynamic-delete-button"
                                onClick={() => remove(field.name)}
                            />
                        )
                      : null}
                  </Form.Item>
              ))}
              <Row>
                <Col>
                  <Form.Item>
                    <AsnButton
                        onClick={() => add()}
                    >
                      +Add {name}
                    </AsnButton>
                  </Form.Item>
                </Col>
              </Row>
            </>
        )}
      </FormList>
  )
}
