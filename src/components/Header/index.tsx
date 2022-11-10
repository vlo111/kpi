import React from 'react'
import { Layout } from 'antd'
import { ReactComponent as Notification } from '../../assets/icons/notification.svg'
import { ReactComponent as Setting } from '../../assets/icons/setting.svg'
import { useNavigate } from 'react-router-dom'
import ManagerIcon from '../ManagerIcon'

import styled from 'styled-components'

const HeaderLayout = styled(Layout)`
  background: var(--white);
  box-shadow: var(--header-box-shadow);
  z-index: 1;
  max-height: 60px;
  min-height: 60px;

  .headerUser {
    display: flex;
    align-items: center;
    grid-gap: 16px;
    cursor: pointer;
  }
  .headerUserInfo {
    display: grid;
    .userMiddleName {
      font-size: var(--base-font-size);
      color: var(--dark-border-ultramarine);
    }
    .userEmail {
      font-size: var(--font-size-small);
      color: var(--secondary-light-orage);
    }
  }
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
  return (
    <HeaderLayout>
      <HeaderMenu>
        <Notification />
        <Setting />
        <div className="headerUser" onClick={() => navigate('/user-profile')}>
          <ManagerIcon letter="HD" color="#F3C262" />
          <div className="headerUserInfo">
            <span className="userMiddleName">Anun Azganun</span>
            <span className="userEmail">yaho@yaho.yaho</span>
          </div>
        </div>
      </HeaderMenu>
    </HeaderLayout>
  )
}
