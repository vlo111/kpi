import React from 'react'
import AnsModal from '../../../../../../Forms/Modal'

const ManagerOverviewModal: React.FC<{ id: string | undefined }> = ({ id }) => {
  debugger
  return (
    <AnsModal open={id !== undefined} title="Overview" cancelText="Cancel">
      Lala
    </AnsModal>
  )
}

export default ManagerOverviewModal
