import React, { useEffect } from 'react'
import AnsModal from '../../../../../../Forms/Modal'
import { AsnButton } from '../../../../../../Forms/Button'
import { IAddManagers, HandleSubmit, IManagerState, IManager, AddManagerHandle } from '../../../../../../../types/project'
import { Form } from '../../../../../../Forms/Form'
import AnsInput from '../../../../../../Forms/Input'
import { ManagerFields, VALIDATE_MESSAGES } from '../../../../../../../helpers/constants'
import { useGeneralInfo } from '../../../../../../../hooks/project/useGeneralInfo'

const AddManagerModal: React.FC<IAddManagers> = ({ manager, setManagerModalOpen, setAddManager }) => {
  const [form] = Form.useForm()

  const { editManager }: IManagerState = useGeneralInfo()

  const handleOk: AddManagerHandle = (values) => {
    if (manager?.id) {
      const newManager = Object.assign({}, values as IManager)
      newManager.id = manager.id
      newManager.color = manager.color
      editManager(newManager)
    } else {
      setAddManager(values)
    }

    form.resetFields()
    setManagerModalOpen(null)
  }

  const handleCancel: HandleSubmit = () => {
    form.resetFields()
    setManagerModalOpen(null)
  }

  const fields = ManagerFields(manager)

  return (
        <AnsModal
            open={manager !== null}
            title={`${manager?.id ? 'Edit' : 'Add'} Person`}
            cancelText="Cancel"
            onCancel={handleCancel}
            footer={[
                <div key={'action'} className="footer-action">
                    <AsnButton key="back" onClick={handleCancel}>
                        Cancel
                    </AsnButton>
                    <AsnButton form="managerForm" key="submit" type="primary" htmlType="submit">
                        {manager?.id ? 'Edit' : 'Add'}
                    </AsnButton>
                </div>
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                name="managerForm"
                validateMessages={VALIDATE_MESSAGES}
                onFinish={handleOk}
                fields={fields}
            >
                <Form.Item name="firstName" label="First Name" rules={[{
                  required: true,
                  min: 2,
                  max: 256
                }]}>
                    <AnsInput placeholder="Anna"/>
                </Form.Item>
                <Form.Item name="lastName" label="Last Name" rules={[{
                  required: true,
                  min: 2,
                  max: 256
                }]}>
                    <AnsInput placeholder="Hakobyan"/>
                </Form.Item>
                <Form.Item name="email" label="Email Address" rules={[{ required: true }, { type: 'email' }]}>
                    <AnsInput placeholder="annahakobyan@name.com"/>
                </Form.Item>
                <Form.Item name="position" label="Position" rules={[{
                  required: true,
                  min: 2,
                  max: 256
                }]}>
                    <AnsInput placeholder="Project Manager"/>
                </Form.Item>
                <Form.Item name="assigned" label="Assign to" rules={[{
                  required: true
                }]}>
                    <AnsInput disabled placeholder="Project"/>
                </Form.Item>
            </Form>
        </AnsModal>
  )
}

export default AddManagerModal
