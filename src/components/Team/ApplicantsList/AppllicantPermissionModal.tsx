import { Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'

import { AsnModal } from '../../Forms/Modal'

const PermissionInfoModal = styled(AsnModal)`
   width: 628px !important;
   top: 190px !important;

  .ant-modal-content{
    padding: 32px !important;
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
            <Row gutter={24} style={{ color: 'var(--dark-2)', fontSize: 'var(--base-font-size)' }}>
              <Col span={24} style={{ marginBottom: '24px' }}>Result Area {' > '} Result area 1</Col>
              <Col span={24}>Template {' > '} Result area 1 {' > '} Activity 1.2  {' > '} One section course template</Col>
            </Row>

        </PermissionInfoModal>
  )
}

export default ApplicantPermissionInfoModal
