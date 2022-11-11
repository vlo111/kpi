/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { AsnModal } from '../../Forms/Modal'
import { Form } from '../../Forms/Form'
import AsnInput from '../../Forms/Input'
import { VALIDATE_MESSAGES } from '../../../helpers/constants'
import styled from 'styled-components'
import { AsnButton } from '../../Forms/Button'
import { Cascader, Radio, RadioChangeEvent } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { UsersPermissionsRule } from '../../../helpers/fakeData'

const AddApplicantsModalWrapper = styled(AsnModal)`
    width: 600px !important;
    padding: 32px 32px 44px 32px !important;
    background: var(--white);
    border-radius: 20px;
    top: 40px !important;

    .ant-modal-close{
      top: -33px;
      right: -34px;
    }
    .ant-modal-content{
      box-shadow: none !important;
      position: inherit !important;
      padding: 0;
    }
    .ant-modal-title {
      font-size: var(--headline-font-size);
    }
    .cascade_items {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        width: 100%;

        .ant-select, .ant-cascader{
            width: 100%;
            height: 44px;
            font-size: 16px;
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
          right: -17px;
        }

        &_input_wrapper{
          width:100%;
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
    }
    .ant-row {
      width: 100%;
    }
    .ant-form-item{
      margin-bottom: 16px !important;
    }
    .ant-form-item-control-input-content{
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .new_permission{
        width: 100%;
        margin-bottom:28px;
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
    @media (min-width: 480px) and (min-height: 360px){
      top: 15px !important;
      padding-bottom: 8px !important;
      padding-right: 12px;

      .ant-modal-header{
        padding-bottom: 5px;
      }
      .ant-modal-body{
        max-height: 540px;
        overflow-y: scroll;
        overflow-x: hidden;
        padding-right: 20px;
      }
      .ant-radio-group{
        flex-direction: row;
      }
      .new_permission{
        margin-bottom: 3px !important;
      }
      .ant-form-item{
        margin-bottom: 4px !important;
      }
    }
    @media (min-width: 480px) and (min-height: 720px){
      top: 50px !important;
      padding-bottom: 12px !important;
      padding-right: 12px !important;
      .ant-modal-header{
        padding-bottom: 15px;
      }
      .ant-radio-group{
        flex-direction: row;
      }
      .new_permission{
        margin-bottom: 8px !important;
      }
      .ant-form-item{
        margin-bottom: 5px !important;
      }
      .ant-modal-close{
        right: -15px;
      }
    }
    @media (min-width: 480px) and (min-height: 1080px){
      top: 44px !important;
      .new_permission{
        margin-bottom: 15px !important;
      }
      .ant-form-item{
        margin-bottom: 10px !important;
      }
      .ant-modal-header{
        padding-bottom: 20px;
      }
      .ant-radio-group{
        flex-direction: row;
      }
      .ant-modal-close{
        right: -34px;
      }
    }
    @media (min-width: 1640px) and (min-height: 360px){
      top: 44px !important;
      padding-bottom: 44px !important;
      padding-right: 32px !important;
      .ant-modal-header{
        padding-bottom: 2rem;
      }
      .new_permission{
        margin-bottom: 28px !important;
      }
      .ant-form-item{
        margin-bottom: 16px !important;
      }
      .ant-radio-group{
        flex-direction: column;
      }
    }
    @media (min-width: 1640px) and (min-height: 720px){
      top: 44px !important;
      padding-bottom: 44px !important;
      .ant-modal-header{
        padding-bottom: 2rem;
      }
      .new_permission{
        margin-bottom: 28px !important;
      }
      .ant-form-item{
        margin-bottom: 16px !important;
      }
      .ant-radio-group{
        flex-direction: column;
      }
    }
    @media (min-width: 1640px) and (min-height: 1080px){
      top: 44px !important;
      .new_permission{
        margin-bottom: 28px !important;
      }
      .ant-form-item{
        margin-bottom: 16px !important;
      }
      .ant-modal-header{
        padding-bottom: 2rem;
      }
      .ant-radio-group{
        flex-direction: column;
      }
    }
`

const AddApplicantModal: React.FC<{ showModal: string, setShowModal: any }> = ({ showModal, setShowModal }) => {
  const [form] = Form.useForm()
  const [value, setValue] = useState(1)

  const [defaultVal, setDefaultVal] = useState(UsersPermissionsRule)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onChange = (value: any, selectedOptions: any) => {
    console.log(value)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onChangePermission = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleCancel = () => {
    form.resetFields()
    setShowModal(undefined)
  }

  return (
        <AddApplicantsModalWrapper
            open={showModal === 'create'}
            title={'Add Person'}
            cancelText="Cancel"
            onCancel={handleCancel}
            footer={[
                <div key={'action'} className="footer-action">
                    <AsnButton key="back" onClick={handleCancel}>
                        Cancel
                    </AsnButton>
                    <AsnButton form="managerForm" key="submit" type="primary" htmlType="submit">
                        {/* { false ? 'Edit' : 'Add'} */}
                        Add
                    </AsnButton>
                </div>
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
                    <AsnInput placeholder="annahakobyan@name.com"/>
                </Form.Item>
                <Form.Item name="firstName" label="First Name" rules={[{
                  required: true,
                  min: 2,
                  max: 256
                }]} >
                    <AsnInput placeholder="Anna"/>
                </Form.Item>
                <Form.Item name="lastName" label="Last Name" rules={[{
                  required: true,
                  min: 2,
                  max: 256
                }]}>
                    <AsnInput placeholder="Hakobyan"/>
                </Form.Item>
                <Form.Item name="position" label="Position">
                    <AsnInput placeholder="Project Manager"/>
                </Form.Item>
                <Form.List name="users" initialValue={[{}]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => (
                           <Form.Item key={key} className='cascade_items' name="assigned" label="Assign to" rules={[{
                             required: true
                           }]}>
                            <div className='cascade_items_input_wrapper'>
                             <Cascader
                               {...restField}
                               options={defaultVal}
                               onChange={onChange}
                               displayRender={label => label.join(' >  ')}
                              />
                                {fields.length > 1 && index !== 0
                                  ? (
                                 <DeleteOutlined onClick={() => remove(name)} />
                                    )
                                  : null}
                            </div>
                            {fields.length > 1 && index !== 0
                              ? (
                            <Radio.Group value={value} key={key}>
                              <Radio value={1} onChange={onChangePermission}>
                                 <div className="titleItems">View</div>
                              </Radio>
                              <Radio value={2} onChange={onChangePermission}>
                                <div className="titleItems">Edit</div>
                              </Radio>
                            </Radio.Group>
                                )
                              : null}
                           </Form.Item>
                      ))}
                      <Form.Item>
                          <AsnButton key="submit" type="primary" className='new_permission' onClick={() => add()}>
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
