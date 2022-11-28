import React from 'react'
import styled from 'styled-components'
import { Card, Row, Col } from 'antd'

import { AddManagerHandle, ICreateTemplate } from '../../../types/project'
import { AsnModal } from '../../Forms/Modal'

const SubModal = styled(AsnModal)`
    padding: 4.3vh 1.3vw 4.5vh 2.3vh !important;
    background: var(--white);
    border-radius: 20px;
    top: 30vh;

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
    .ant-card-head{
        border-bottom: 0;
    }
    .cardActive{
        border-top: 2px solid var(--dark-5);
        width: 140px;
        height: 140px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 20px;
}
.ant-card-body{
color: var(--dark-1);
font-size: var(--font-size-small);
height: 138px;
display: flex;
align-items: center;
}
`

const AddSubActivity: React.FC<ICreateTemplate> = ({
  isOpenCreateActivityModal,
  setIsOpenCreateActivityModal
}) => {
  const handleCancel: AddManagerHandle = () => {
    setIsOpenCreateActivityModal(false)
  }
  return (
    <SubModal
      footer={false}
      open={isOpenCreateActivityModal}
      title="Active Templates "
      onCancel={handleCancel}
    >
      <Row gutter={[64, 0]}>
      <Col span={8}>
        <Card className='cardActive'>
          Python Course
        </Card>
      </Col>
      <Col span={8}>
      <Card className='cardActive'>
          Node.js course
        </Card>
      </Col>
      <Col span={8}>
      <Card className='cardActive'>
          React js course
        </Card>
      </Col>
    </Row>

    </SubModal>
  )
}

export default AddSubActivity
