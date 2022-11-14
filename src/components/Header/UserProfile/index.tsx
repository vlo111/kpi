import styled from 'styled-components'
import { Layout, Col, Row, Typography } from 'antd'
import { AsnButton } from '../../Forms/Button'
import ManagerIcon from '../../ManagerIcon'
import React, { useState } from 'react'
import EditProfile from '../EditUserProfile'
import { AddManagerHandle } from '../../../types/project'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Edit } from '../../../assets/icons/edit.svg'
const { Title } = Typography

const Content = styled(Layout)`
  background: var(--white);
  border-top: 3px solid var(--dark-border-ultramarine);
  box-shadow: var(--base-box-shadow);
  border-radius: 20px;
  margin: 4vw 4vw 0px 4vw;
  
  .userInfo {
    .manager-icon{
      font-size: clamp(6rem,3vw,21rem);
      height: clamp(14rem, 17vw, 24rem);
      width: clamp(14rem, 17vw, 24rem);
       margin-bottom: 8vh;;
    }
  }
  .userMiddleName{
      font-size: var(--large-hedline-font-size);
      color: var(--dark-border-ultramarine);
  }
  
  .editSvg{
    height: 24px;
    width: 24px;
  }
`
const UserProfile: React.FC = () => {
  const [isOpenCreateActivityModal, setIsOpenCreateActivityModal] = useState<boolean>(false)

  const onEditedPublishProject: AddManagerHandle = () => {
    setIsOpenCreateActivityModal(true)
  }
  const navigate = useNavigate()
  return (
      <Content>
          <Col style={{ top: '4vh', marginLeft: 'auto', padding: '0 4vh' }}> <a onClick={onEditedPublishProject}><Edit className='editSvg'/></a></Col>
        <Row style={{ marginTop: '9vh', paddingLeft: '3.3vw', justifyContent: 'space-between' }}>
          <Col className="userInfo">
            <Col>
            <ManagerIcon letter="AA" color="#F3C262" /></Col>
            <Col>
            <AsnButton type="primary" onClick={() => navigate('/change-password-profile')} style={{ width: 'clamp(14rem,17vw,24rem)', marginBottom: '20vh' }}>Change Password</AsnButton></Col>
          </Col>
          <Col style={{ width: '66%' }}>
            <div >
              <Title level={5} style={{ fontSize: 'clamp(1rem, 5vw, 3rem)', color: 'var(--dark-border-ultramarine)', fontWeight: 'var(--font-normal)' }} >Anun Azganun</Title>
         <EditProfile isOpenCreateActivityModal={isOpenCreateActivityModal} setIsOpenCreateActivityModal={setIsOpenCreateActivityModal}/>
            </div>
            <Row gutter={[60, 11]} style={{ color: 'var(--dark-2)', fontSize: ' clamp(1rem, 1.8vw, 3rem)' }}>
                  <div>
                        <Col>E-mail:</Col>
                        <Col>Phone:</Col>
                        <Col>Organization:</Col>
                        <Col>Position:</Col>
                        <Col>Assign to:</Col>
                  </div>
                  <div>
                        <Col>yaho@yaho.yaho</Col>
                        <Col>+374 77 77 77</Col>
                        <Col>Analyased</Col>
                        <Col>Developer</Col>
                        <Col>Project</Col>
                  </div>
            </Row>
          </Col>
        </Row>
      </Content>
  )
}

export default UserProfile
