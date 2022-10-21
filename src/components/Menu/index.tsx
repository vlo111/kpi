import React from 'react'
import { Layout } from 'antd'
import { ReactComponent as DashboardSvg } from '../../assets/icons/dashboard.svg'
import { ReactComponent as ProjectSvg } from '../../assets/icons/project.svg'
import { ReactComponent as TeamSvg } from '../../assets/icons/team.svg'
import { ReactComponent as ApplicantsSvg } from '../../assets/icons/aplicants.svg'
import { ReactComponent as ProductGuideSvg } from '../../assets/icons/product-guide.svg'
import { ReactComponent as ShortcutsSvg } from '../../assets/icons/shortcuts.svg'
import styled from 'styled-components'

const MenuLayout = styled(Layout)`
  height: 100%;
  background: var(--white);
`

const Header = styled(MenuLayout.Header)`
  background: var(--white);
  font-style: normal;
  font-weight: var(--font-bold);
  font-size: var(--headline-font-size);
  color: var(--dark-border-ultramarine);
  margin: 0 auto;
  padding: 0;
`

const Content = styled(MenuLayout.Content)`
  background: var(--white);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0.2%;
  padding-top: 40px;

  > div {
    height: 70px;
    display: flex;
    align-items: center;
    padding-left: 50px;
    cursor: pointer;
    gap: 10px;

    &:hover {
      background: var(--primary-light-1);
      border-right: 2px solid var(--dark-border-ultramarine);
    }
  }
`

const Footer = styled(MenuLayout.Footer)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 90px;
  margin: 0 auto;
  padding: 0;
  background: var(--white);
  
  > div {
    cursor: pointer;

    > svg {
      margin-right: 10px;
    }
  }
`

export const Menu: React.FC = () => {
  return (
    <MenuLayout>
      <Header>Meetk</Header>
      <Content>
        <div><DashboardSvg/> <span>Dashboard</span></div>
        <div><ProjectSvg/> <span>Project</span></div>
        <div><TeamSvg/> <span>Team</span></div>
        <div><ApplicantsSvg/> <span>Applicants</span></div>
      </Content>
      <Footer className="menu-footer">
        <div><ProductGuideSvg/> <span>Product Guide</span></div>
        <div><ShortcutsSvg/> <span>Keyboard Shortcuts</span></div>
      </Footer>
    </MenuLayout>
  )
}
