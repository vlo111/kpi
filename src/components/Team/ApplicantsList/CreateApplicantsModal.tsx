/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import styled from 'styled-components'
import { Cascader, Col, Radio, RadioChangeEvent, Row } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import { AsnModal } from '../../Forms/Modal'
import { Form } from '../../Forms/Form'
import AsnInput from '../../Forms/Input'
import { VALIDATE_MESSAGES } from '../../../helpers/constants'
import { AsnButton } from '../../Forms/Button'
import { UsersPermissionsRule } from '../../../helpers/fakeData'

const AddApplicantsModalWrapper = styled(AsnModal)`
    width: 600px !important;
    padding: 4.3vh 1.3vw 4.5vh 4.3vh !important;
    background: var(--white);
    border-radius: 20px;
    top: 40px !important;

    .ant-modal-body{
      max-height: 62.5vh;
      overflow-y: scroll;
      overflow-x: hidden;
      padding-right: 1.8vw;
    }
    .ant-modal-close{
      top: -25px;
      right: -14px;
    }
    .ant-modal-content{
      box-shadow: none !important;
      position: inherit !important;
      padding: 0;
    }
    .ant-modal-title {
      font-size: var(--headline-font-size);
    }
    .ant-select, .ant-cascader{
            width: 100%;
            height: 44px;
            font-size: var(--base-font-size);
            background: var(--white);
            border: 1px solid var(--dark-border-ultramarine);
            border-radius: 5px;

            .ant-select-selector{
                position: inherit !important;
                background: none !important;
                height: 100% !important;
                border:  none !important;
            }

            .ant-select-selection-item{
              display: flex;
              align-items: center;    
            }

            .ant-select-arrow{
                display: none !important;
            }
    }
    .anticon[tabindex]{
        position: absolute;
        top: 42px;
        right: -17px;
     }
    
    .ant-row {
      width: 100%;
    }
    .ant-form-item{
      margin-bottom: 1.6vh !important;
    }
    .ant-modal-header{
      padding-bottom: 3vh;
    }
    .ant-form-item-control-input-content{
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .ant-radio-checked .ant-radio-inner{
      border-color: var(--dark-border-ultramarine);
    }
    .ant-radio-inner{
      width: 20px;
      height: 20px;

      ::after{
        transform: scale(0.7);
        background-color: var(--dark-border-ultramarine);
      }
    }
    .ant-radio-group{
      display: flex;
      flex-direction: column;
      width: 100%;
    }
`

const AddApplicantModal: React.FC<{ setShowModal: React.Dispatch<React.SetStateAction<string >> }> = ({ setShowModal }) => {
  const [form] = Form.useForm()
  const [value, setValue] = useState(1)
  const [filedValue, setFiledValue] = useState<string [] | undefined>(undefined)
  const [cascadeValue, setCascadeValue] = useState<string [] | undefined>(undefined)

  const [defaultVal, setDefaultVal] = useState(UsersPermissionsRule)

  const onChange: any = (value: string[]) => {
    setCascadeValue(value)
    setFiledValue(value)
  }

  const onChangePermission: (e: RadioChangeEvent) => void = (e: RadioChangeEvent) => {
    setValue(e.target.value)
  }

  const handleCancel = (): void => {
    form.resetFields()
    setShowModal('')
  }

  return (
        <AddApplicantsModalWrapper
            open={true}
            title={'Add Person'}
            cancelText="Cancel"
            onCancel={handleCancel}
            footer={[
              <Row key={'action'} gutter={14} justify='center'>
                <Col span={7}>
                  <Row justify='start'>
                   <AsnButton key="back" onClick={handleCancel} style={{ width: '133px' }}>
                        Cancel
                   </AsnButton>
                   </Row>
                </Col>
                <Col span={7}>
                  <Row justify='end'>
                    <AsnButton form="managerForm" key="submit" type="primary" htmlType="submit" style={{ width: '133px' }}>
                        {/* { false ? 'Edit' : 'Add'} */}
                        Add
                    </AsnButton>
                  </Row>
                </Col>
              </Row>
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                name="managerForm"
                validateMessages={VALIDATE_MESSAGES}
                // onFinish={handleOk}
                // fields={fields}
            >
                <Form.Item name="email" label="Email Address" rules={[{ required: true }, { type: 'email' }]}>
                    <AsnInput/>
                </Form.Item>
                <Form.Item name="firstName" label="First Name" rules={[{
                  required: true,
                  min: 2,
                  max: 256
                }]} >
                    <AsnInput/>
                </Form.Item>
                <Form.Item name="lastName" label="Last Name" rules={[{
                  required: true,
                  min: 2,
                  max: 256
                }]}>
                    <AsnInput/>
                </Form.Item>
                <Form.Item name="position" label="Position">
                    <AsnInput/>
                </Form.Item>
                <Form.List name="users" initialValue={[{}]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name }, index) => (
                           <Row key={key} justify='space-between' align='middle' style={{ marginBottom: '1.03vh', width: '100%', position: 'relative' }}>
                            <Form.Item
                             style={{ width: '100%' }}
                             name={[index, 'Assign to']}
                             label="Assign to"
                             rules={[{ required: true }]}
                            >
                              <Cascader
                               value={filedValue}
                               popupClassName="customCascaderPopup"
                               options={defaultVal}
                               onChange={onChange}
                               displayRender={label => label.join(' >  ')}
                               multiple
                               allowClear
                               maxTagCount="responsive"
                               changeOnSelect
                              />
                            </Form.Item>
                            <Row justify='end' align='middle'>
                              {fields.length > 1 && index !== 0
                                ? (
                                   <DeleteOutlined onClick={() => remove(name)} />
                                  )
                                : null}
                            </Row>
                            <Form.Item name={[index, 'Radio']}>
                              <Radio.Group value={value} key={key} defaultValue={1}>
                                <Radio value={1} onChange={onChangePermission}>
                                   View
                                </Radio>
                                <Radio value={2} onChange={onChangePermission}>
                                   Edit
                                </Radio>
                              </Radio.Group>
                            </Form.Item>
                           </Row>
                      ))}
                      <Form.Item>
                          <AsnButton
                           key="submit"
                           type="primary"
                           style={{ width: '100%', marginBottom: '2.88vh' }}
                           disabled={cascadeValue === undefined || cascadeValue.length === 0}
                           onClick={() => {
                             add()
                             setCascadeValue(undefined)
                           }}>
                              +
                          </AsnButton>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
            </Form>
        </AddApplicantsModalWrapper>
  )
}

export default AddApplicantModal
