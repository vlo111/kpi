import React from 'react'
import styled from 'styled-components'
import { AsnModal } from '../../Forms/Modal'

const PermissionInfoModal = styled(AsnModal)`
   width: 628px !important;
   top: 190px !important;

  .ant-modal-content{
    padding: 32px !important;
  }

  .permission_info_content{
    display: grid;
    gap: 24px;

    p{
        padding: 0;
        margin: 0;
        color: var(--dark-2);
        font-weight: 400;
        font-size: 16px;
    }
  }
  .ant-modal-close-x{
    font-size: 12px;
    svg {
        path{
            fill: var(--dark-1)
        }
    }
  }

`

const ApplicantPermissionInfoModal: React.FC<{ showPermissionModal: boolean, setShowPermissionModal: (b: boolean) => void }> = ({ showPermissionModal, setShowPermissionModal }) => {
  return (
        <PermissionInfoModal
            open={ showPermissionModal }
            footer={false}
            mask={false}
            onCancel={() => setShowPermissionModal(false)}
        >
            <div className='permission_info_content'>
              <p>Result Area {' > '} Result area 1 </p>
              <p>Template {' > '} Result area 1 {' > '} Activty 1.2  {' > '} One section course template</p>
            </div>

        </PermissionInfoModal>
  )
}

export default ApplicantPermissionInfoModal
