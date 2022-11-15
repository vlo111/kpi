import React from 'react'
import { Col, Layout, Row, Typography } from 'antd'
import { ReactComponent as Notification } from '../../assets/icons/notification.svg'
import { ReactComponent as Setting } from '../../assets/icons/setting.svg'
import { useNavigate } from 'react-router-dom'
import ManagerIcon from '../ManagerIcon'

import styled from 'styled-components'
const { Title } = Typography

const HeaderLayout = styled(Layout)`
  background: var(--white);
  box-shadow: var(--header-box-shadow);
  z-index: 1;
  max-height: 60px;
  min-height: 60px;
`

export const Header: React.FC = () => {
  const navigate = useNavigate()
  return (
    <HeaderLayout>
      <Row justify="end" align="bottom" gutter={16} style={{ marginRight: '4vw' }} >
        <Col>
        <Notification />
        </Col>
        <Col>
        <Setting />
        </Col>
        <Row style={{ gridGap: '16px', cursor: 'pointer', height: '5vh', padding: '6px 0' }} onClick={() => navigate('/user-profile')}>
          <ManagerIcon letter="HD" color="#F3C262" />
          <Row >
            <Col span={24}>
          <Title level={5} style={{ color: 'var(--dark-border-ultramarine)', margin: 0 }}>Anun Azganun</Title>
          <Title level={5} style={{ fontSize: 'var(--font-size-small)', color: 'var(--secondary-light-orage)', marginTop: 0 }}>Ayaho@yaho.yaho</Title></Col>
          </Row>
        </Row>
      </Row>
    </HeaderLayout>
  )
}
