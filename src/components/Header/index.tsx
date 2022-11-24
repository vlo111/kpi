import React from 'react'
import {
  Col,
  Layout,
  Row,
  Button,
  Dropdown,
  Space,
  Divider
} from 'antd'
import { ReactComponent as Notification } from '../../assets/icons/notification.svg'
import { CaretDownOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import ManagerIcon from '../ManagerIcon'

import styled from 'styled-components'
import DropdownMenu from '../Menu/DropdownMenu'

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
  const logOut: any = () => {
    localStorage.removeItem('token')
  }

  const data = [
    {
      label: (
        <Button onClick={() => navigate('/user-profile')} type="text">
          Profile
        </Button>
      ),
      key: 0
    },
    {
      label: (
        <Button onClick={() => logOut()} type="text">
          Sign Out
        </Button>
      ),
      key: 1
    }
  ]
  const newMenu = <DropdownMenu items={data} />

  return (
    <HeaderLayout>
      <HeaderMenu>
        <>
          <Row justify="end" align="middle">
            <Col>
              {' '}
              <Notification />
            </Col>
            <Col>
              <Dropdown overlay={newMenu} trigger={['click']}>
                <Button type="text" onClick={(e) => e.preventDefault()}>
                  <Space>
                    <ManagerIcon
                      letter="HD"
                      color="var(--secondary-light-amber)"
                    />
                    Անի Հովհաննիսըան
                    <CaretDownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </Col>
          </Row>
          <Divider />
        </>
      </HeaderMenu>
    </HeaderLayout>
  )
}

// import React from 'react'
// import { Layout, Dropdown, Space, Typography } from 'antd'
// import { ReactComponent as Notification } from '../../assets/icons/notification.svg'
// import { ReactComponent as Setting } from '../../assets/icons/setting.svg'
// import { useNavigate } from 'react-router-dom'
// import ManagerIcon from '../ManagerIcon'

// import styled from 'styled-components'
// const { Title } = Typography

// const HeaderLayout = styled(Layout)`
//   background: var(--white);
//   box-shadow: var(--header-box-shadow);
//   z-index: 1;
//   max-height: 60px;
//   min-height: 60px;
// `

// const HeaderMenu = styled(Layout)`
//   justify-content: end;
//   display: grid;
//   grid-template-columns: auto auto auto;
//   align-items: center;
//   grid-gap: 16px;
//   padding: 0 56px;
//   background: var(--white);
//   box-shadow: var(--header-box-shadow);
// `

// export const Header: React.FC = () => {
//   const navigate = useNavigate()
//   const items = [
//     {
//       label: (
//         <Title
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             padding: '6px 0',
//             color: 'var(--dark-2)'
//           }}
//           level={5}
//           onClick={() => navigate('/user-profile')}
//         >
//           Account
//         </Title>
//       ),
//       key: '0'
//     },
//     {
//       label: (
//         <Title
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             padding: '6px 0',
//             color: 'var(--dark-2)'
//           }}
//           level={5}
//           onClick={() => navigate('/sign-in')}
//         >
//           Sign Out
//         </Title>
//       ),
//       key: '1'
//     }
//   ]
//   return (
//     <HeaderLayout>
//       <HeaderMenu>
//         <Notification />
//         <Setting />
//         <Dropdown
//           menu={{ items }}
//           trigger={['click']}>
//           <a onClick={(e) => e.preventDefault()}>
//             <Space>
//               <ManagerIcon letter="HD" color="var(--secondary-light-amber)" />
//               <Title
//                 level={5}
//                 style={{ color: 'var(--dark-border-ultramarine)', margin: 0 }}
//               >
//                 Anun Azganun
//               </Title>
//             </Space>
//           </a>
//         </Dropdown>
//       </HeaderMenu>
//     </HeaderLayout>
//   )
// }
