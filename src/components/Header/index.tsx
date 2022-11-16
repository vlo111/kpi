import React from 'react'
import { Layout, Dropdown, Space, Typography } from 'antd'
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

const HeaderMenu = styled(Layout)`
  justify-content: end;
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  grid-gap: 16px;
  padding: 0 56px;
  background: var(--white);
  box-shadow: var(--header-box-shadow);
`

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const items = [
    {
      label: <Title style={{ display: 'flex', justifyContent: 'center', padding: '6px 0', color: '#263238' }} level={5} onClick={() => navigate('/user-profile')}>Account</Title>,
      key: '0'
    },
    {
      label: <Title style={{ display: 'flex', justifyContent: 'center', padding: '6px 0', color: '#263238' }} level={5} onClick={() => navigate('/sign-in')}>Sign Out</Title>,
      key: '1'
    }

  ]

  return (
    <HeaderLayout>
      <HeaderMenu>
        <Notification />
        <Setting />
        <Dropdown
    menu={{
      items
    }}
    trigger={['click']}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
      <ManagerIcon letter="HD" color="#F3C262" />
      <Title level={5} style={{ color: 'var(--dark-border-ultramarine)', margin: 0 }}>Anun Azganun</Title>
      </Space>
    </a>
  </Dropdown>
        {/* <Row align="middle" style={{ gridGap: '16px', cursor: 'pointer' }} onClick={() => navigate('/user-profile')}>
          <ManagerIcon letter="HD" color="#F3C262" />
          <Row >
            <Col span={80}>
          <Title level={5} style={{ color: 'var(--dark-border-ultramarine)', margin: 0 }}>Anun Azganun</Title>
          <Title level={5} style={{ fontSize: 'var(--font-size-small)', color: 'var(--secondary-light-orage)', marginTop: 0 }}>Ayaho@yaho.yaho</Title></Col>
          </Row>
        </Row> */}
      </HeaderMenu>
    </HeaderLayout>
  )
}
