import React, { useEffect } from 'react'
import AnsModal from '../../../../../../Forms/Modal'
import { AsnButton } from '../../../../../../Forms/Button'
import { AddManagers, HandleSubmit } from '../../../../../../../types/project'
import { Form } from '../../../../../../Forms/Form'
import AnsInput from '../../../../../../Forms/Input'
import { ManagerFields, VALIDATE_MESSAGES } from '../../../../../../../helpers/constants'

const AddManagerModal: React.FC<AddManagers> = ({ manager, setManagerModalOpen, setAddManager }) => {
  const [form] = Form.useForm()

  const handleOk: any = (values: any) => {
    setAddManager(values)
    form.resetFields()
    setManagerModalOpen(null)
  }

  const handleCancel: HandleSubmit = () => {
    setManagerModalOpen(null)
  }

  const fields = ManagerFields(manager)

  useEffect(() => {
    form.resetFields()
  }, [])

  return (
        <AnsModal
            open={manager !== null}
            title="Add Person"
            cancelText="Cancel"
            onCancel={handleCancel}
            footer={[
                <div key={'action'} className="footer-action">
                    <AsnButton key="back" onClick={handleCancel}>
                        Cancel
                    </AsnButton>,
                    <AsnButton form="managerForm" key="submit" type="primary" htmlType="submit">
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
                    <AnsInput disabled placeholder="Project" />
                </Form.Item>
            </Form>
        </AnsModal>
  )
}

export default AddManagerModal
