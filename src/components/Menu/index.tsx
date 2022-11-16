import React from 'react'
import { Layout, Menu as AntMenu } from 'antd'
import { ReactComponent as DashboardSvg } from '../../assets/icons/dashboard.svg'
import { ReactComponent as ProjectSvg } from '../../assets/icons/project.svg'
import { ReactComponent as TeamSvg } from '../../assets/icons/team.svg'
import { ReactComponent as ApplicantsSvg } from '../../assets/icons/aplicants.svg'
import { ReactComponent as ProductGuideSvg } from '../../assets/icons/product-guide.svg'
import { ReactComponent as ShortcutsSvg } from '../../assets/icons/shortcuts.svg'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { MenuItems } from '../../helpers/constants'

const MenuLayout = styled(Layout)`
     height: 100%;
     background: var(--white);
     box-shadow: var(--manu-box-shadow);
     max-width: 250px;

     .ant-menu {
       border-right: 1px solid var(--white) !important;
       display: flex;
       flex-direction: column;
       margin-top: 2.3rem;
       height: 100%;
       
       &-item {
         padding-left: 50px !important;
       }
       
       &-title-content {
         margin-left: 0;
       }
       
       &-item {
         margin-bottom: 0 !important;
         
         &:active {
           background: none;
         }
       }

       &-item:not(:last-child):not(:nth-last-child(2)) {
         height: 70px;
         display: flex;
         align-items: center;
         cursor: pointer;
         gap: 14px;
         color: var(--dark-border-ultramarine);

         &:hover {
           background: var(--primary-light-3);
         }
       }
       
       &-item-selected:not(:last-child):not(:nth-last-child(2)){
         background: var(--primary-light-1) !important;

         &:after {
           border-right: 3px solid var(--dark-border-ultramarine);
         }
       }

       &-item:nth-last-child(1), &-item:nth-last-child(2) {
         &:after {
           border: none;
         }

         span {
           color: var(--dark-border-ultramarine);
           font-size: var(--font-size-semismall);
         }
       }

       &-item:nth-last-child(1) {
         margin-bottom: 2rem !important;
       }   
       
       &-item:nth-last-child(2) {
         margin-top: auto;
       }
     }
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

export const Menu: React.FC = () => {
  const navigate = useNavigate()

  const onNavigateHandle: (ev: any) => void = (ev: any) => {
    switch (ev.key) {
      case '1': {
        navigate('/dashboard')
        break
      }
      case '2': {
        navigate('/')
        break
      }
      case '3': {
        navigate('/teams')
        break
      }
      case '4': {
        navigate('/applicants')
        break
      }
    }
  }

  return (
    <MenuLayout>
      <Header>Meetk</Header>
        <AntMenu
            mode="inline"
            onClick={onNavigateHandle}
            defaultSelectedKeys={['2']}
            style={{ fontSize: '18px', lineHeight: '64px', float: 'right' }}
            items={[DashboardSvg, ProjectSvg, TeamSvg, ApplicantsSvg, ProductGuideSvg, ShortcutsSvg].map(
              (icon, index) => ({
                key: String(index + 1),
                icon: React.createElement(icon),
                label: MenuItems[index]
              })
            )}
        />
    </MenuLayout>
  )
}
