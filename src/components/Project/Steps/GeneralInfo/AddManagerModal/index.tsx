import React from 'react'
import AnsModal from '../../../../Forms/Modal'
import AnsButton from '../../../../Forms/Button'
import { AddManagers, HandleSubmit } from '../../../../../types/project'

const GeneralInfo: React.FC<AddManagers> = ({ isModalOpen, setIsModalOpen, setAddManager }) => {
  const handleOk: HandleSubmit = () => {
    setAddManager([{}])
  }

  const handleCancel: HandleSubmit = () => {
    setIsModalOpen(false)
  }

  return (
            <AnsModal
                title="Add Person"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <div key={'action'} className="action">
                        <AnsButton key="back" onClick={handleCancel}>
                            Cancel
                        </AnsButton>,
                        <AnsButton key="submit" type="primary" onClick={handleOk}>
                            Add
                        </AnsButton>
                    </div>
                ]}
            >
                <p>Some contents</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </AnsModal>
  )
}

export default GeneralInfo
