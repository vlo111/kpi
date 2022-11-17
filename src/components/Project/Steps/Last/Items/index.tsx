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
                <AsnCollapse key={name} id={name}>
                    <Panel key={name} className="input-rows" header={name}>
                        {/* {items.map((r: IDetail, i: number) => ( */}
                        {/*    <Row key={`${r.id}${i}`}> */}
                        {/*        <Form.Item */}
                        {/*            style={{ width: items.length > 1 ? '99%' : '100%' }} */}
                        {/*            name={r.id} */}
                        {/*            {...rules(2, 256)} */}
                        {/*        > */}
                        {/*            <AsnInput placeholder="Organisation name" /> */}
                        {/*        </Form.Item> */}
                        {/*        {items.length > 1 && ( */}
                        {/*            <div */}
                        {/*                className="delete-result" */}
                        {/*                onClick={() => deleteItemHandle([header, r.id])} */}
                        {/*            > */}
                        {/*                <DeleteSvg /> */}
                        {/*            </div> */}
                        {/*        )} */}
                        {/*    </Row> */}
                        {/* ))} */}
                        {fields.map((field, index) => (
                            <Row key={index}>
                                {/* <Form.Item */}
                                {/*    style={{ width: items.length > 1 ? '99%' : '100%' }} */}
                                {/*    name={r.id} */}
                                {/*    {...rules(2, 256)} */}
                                {/* > */}
                                {/*    <AsnInput placeholder="Organisation name" /> */}
                                {/* </Form.Item> */}
                                {/* {items.length > 1 && ( */}
                                {/*    <div */}
                                {/*        className="delete-result" */}
                                {/*        onClick={() => deleteItemHandle([header, r.id])} */}
                                {/*    > */}
                                {/*        <DeleteSvg /> */}
                                {/*    </div> */}
                                {/* )} */}
                                <Form.Item
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        {...rules(2, 256)}
                                        noStyle
                                    >
                                        <AsnInput placeholder="passenger name" />
                                    </Form.Item>
                                    {fields.length > 1
                                      ? (
                                          <div className="delete-result">
                                              <DeleteSvg
                                                  className="dynamic-delete-button"
                                                  onClick={() => remove(field.name)}
                                              />
                                          </div>
                                        )
                                      : null}
                                </Form.Item>
                            </Row>
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
                        </Row>/

                    </Panel>
                </AsnCollapse>
            </>
        )}
      </FormList>
  )
}
