import React, { useState } from 'react'
import { AsnModal } from '../../Forms/Modal'
// import { AsnButton } from '../../Forms/Button'
// import { IAddManagers, HandleSubmit, IManagerState, IManager, AddManagerHandle } from '../../../../../../../types/project'
import { Form } from '../../Forms/Form'
import AsnInput from '../../Forms/Input'
import { VALIDATE_MESSAGES } from '../../../helpers/constants'
// import { useGeneralInfo } from '../../../../../../../hooks/project/useGeneralInfo'
import styled from 'styled-components'
import { AsnButton } from '../../Forms/Button'
import { Cascader } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const AddApplicantsModalWrapper = styled(AsnModal)`
    width: 600px !important;
    padding: 32px !important;
    background: white;
    border-radius: 20px;

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
            width: 98%;
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
    }

    .new_permission{
        width: 100%;
    }
`

const AddApplicantModal: React.FC<{}> = () => {
  const [form] = Form.useForm()

  //   const { editManager }: IManagerState = useGeneralInfo()

  //   const handleOk: AddManagerHandle = (values) => {
  //     if (manager?.id) {
  //       const newManager = Object.assign({}, values as IManager)
  //       newManager.id = manager.id
  //       newManager.color = manager.color
  //       editManager(newManager)
  //     } else {
  //       setAddManager(values)
  //     }

  //     form.resetFields()
  //     setManagerModalOpen(null)
  //   }

  //   const handleCancel: HandleSubmit = () => {
  //     form.resetFields()
  //     setManagerModalOpen(null)
  //   }

  //   const fields = ManagerFields(manager)

  interface Option {
    value: string
    label: string
    children?: Option[]
  }

  const options: Option[] = [
    {
      value: 'project',
      label: 'Project'
    },
    {
      value: 'result_area',
      label: 'Result Area',
      children: [
        {
          value: 'result_area',
          label: 'Result Area',
          children: [
            {
              value: 'result_area_1',
              label: 'Result Area 1'
            },
            {
              value: 'result_area_2',
              label: 'Result Area 2'
            },
            {
              value: 'result_area_3',
              label: 'Result Area 3'
            }
          ]
        }
      ]
    },
    {
      value: 'activity',
      label: 'Activity',
      children: [
        {
          value: 'result_area',
          label: 'Result Area',
          children: [
            {
              value: 'activity_1',
              label: 'Activity 1',
              children: [
                {
                  value: 'activty_1.1 ',
                  label: 'Activty 1.1 '
                },
                {
                  value: 'activty_1.2 ',
                  label: 'Activty 1.2 '
                },
                {
                  value: 'activty_1.3 ',
                  label: 'Activty 1.3 '
                }
              ]
            },
            {
              value: 'activity_2',
              label: 'Activity 2'
            },
            {
              value: 'activity_3',
              label: 'Activity 3'
            }
          ]
        },
        {
          value: 'result_area_2',
          label: 'Result Area 2'
        },
        {
          value: 'result_area_3',
          label: 'Result Area 3'
        }
      ]
    },
    {
      value: 'template',
      label: 'Template'
    },
    {
      value: 'sub_activity',
      label: 'Sub-Activity'
    }
  ]

  const [defaultVal, setDefaultVal] = useState(options)

  const onChange = (value: any, selectedOptions: any) => {
    console.log(defaultVal, 'value', value)
  }

  return (
        <AddApplicantsModalWrapper
            open={true}
            title={'Add Person'}
            cancelText="Cancel"
            // onCancel={handleCancel}
            footer={[
                <div key={'action'} className="footer-action">
                    <AsnButton key="back">
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
                <Form.Item name="firstName" label="First Name" rules={[{
                  required: true,
                  min: 2,
                  max: 256
                }]}>
                    <AsnInput placeholder="Anna"/>
                </Form.Item>
                <Form.Item name="lastName" label="Last Name" rules={[{
                  required: true,
                  min: 2,
                  max: 256
                }]}>
                    <AsnInput placeholder="Hakobyan"/>
                </Form.Item>
                <Form.Item name="email" label="Email Address" rules={[{ required: true }, { type: 'email' }]}>
                    <AsnInput placeholder="annahakobyan@name.com"/>
                </Form.Item>
                <Form.Item name="position" label="Position">
                    <AsnInput placeholder="Project Manager"/>
                </Form.Item>

                {/* <Form.Item name="assigned" label="Assign to" rules={[{
                  required: true
                }]}>
                    <AsnInput disabled placeholder="Project"/>
                </Form.Item> */}
                {/* <AsnButton key="submit" type="primary" className='new_permission'>
                    +
                </AsnButton> */}
                <Form.List name="users">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                          <div className='cascade_items' key={key}>
                           <Cascader
                             {...restField}
                             options={defaultVal}
                             onChange={onChange}
                             displayRender={label => label.join(' >  ')}
                             multiple
                             maxTagCount="responsive"
                            />
                           <DeleteOutlined onClick={() => remove(name)} />
                          </div>
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
