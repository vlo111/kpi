import React from 'react'
import { Layout } from 'antd'
import { Wrapper } from './style'
import { ReactComponent as DashboardSvg } from '../../assets/icons/dashboard.svg'
import { ReactComponent as ProjectSvg } from '../../assets/icons/project.svg'
import { ReactComponent as TeamSvg } from '../../assets/icons/team.svg'
import { ReactComponent as ApplicantsSvg } from '../../assets/icons/aplicants.svg'
import { ReactComponent as ProductGuideSvg } from '../../assets/icons/product-guide.svg'
import { ReactComponent as ShortcutsSvg } from '../../assets/icons/shortcuts.svg'

const {
  Header,
  Footer,
  Content
} = Layout

export const Menu: React.FC = () => {
  return (
    <Wrapper>
      <Layout>
        <Header className="menu-header">Meetk</Header>
        <Content className="menu-content">
          <div><DashboardSvg/> <span>Dashboard</span></div>
          <div><ProjectSvg/> <span>Project</span></div>
          <div><TeamSvg/> <span>Team</span></div>
          <div><ApplicantsSvg/> <span>Applicants</span></div>
        </Content>
        <Footer className="menu-footer">
          <div><ProductGuideSvg/> <span>Product Guide</span></div>
          <div><ShortcutsSvg/> <span>Keyboard Shortcuts</span></div>
        </Footer>
      </Layout>
    </Wrapper>
  )
}
