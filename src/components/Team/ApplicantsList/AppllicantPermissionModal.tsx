import React from 'react'
import styled from 'styled-components'
import { Breadcrumb, Col, Row } from 'antd'

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
             <Row gutter={24}>
               <Col span={24} style={{ marginBottom: '24px' }}>
                 <Breadcrumb separator=">" style={{ color: 'var(--dark-2)', fontSize: 'var(--base-font-size)' }}>
                   <Breadcrumb.Item>Result Area</Breadcrumb.Item>
                   <Breadcrumb.Item >Result area 1</Breadcrumb.Item>
                 </Breadcrumb>
               </Col>
               <Col span={24}>
                 <Breadcrumb separator=">" style={{ color: 'var(--dark-2)', fontSize: 'var(--base-font-size)' }}>
                   <Breadcrumb.Item>Template</Breadcrumb.Item>
                   <Breadcrumb.Item >Result area 1</Breadcrumb.Item>
                   <Breadcrumb.Item>Activity 1.2</Breadcrumb.Item>
                   <Breadcrumb.Item>One section course template</Breadcrumb.Item>
                 </Breadcrumb>
               </Col>
           </Row>

        </PermissionInfoModal>
  )
}

export default ApplicantPermissionInfoModal
