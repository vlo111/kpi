// import MainLayout from '../../Layout/MainLayout'
import styled from 'styled-components'
import { Layout } from 'antd'
import { AsnButton } from '../../Forms/Button'
import ManagerIcon from '../../ManagerIcon'
import React, { useState } from 'react'
import EditProfile from '../EditUserProfile'
import { AddManagerHandle } from '../../../types/project'
import { useNavigate } from 'react-router-dom'

const Content = styled(Layout)`
  background: #ffffff;
  border-top: 3px solid #2a5578;
  box-shadow: -4px -4px 4px rgba(42, 85, 120, 0.05),
    4px 4px 4px rgba(42, 85, 120, 0.05);
  border-radius: 20px;
  height: calc(100% - 150px);
  .infoAll {
    display: grid;
    grid-gap: 49px;
    grid-template-columns: 30% 66%;
  }
  
  .userInfo {
    display: grid;
    justify-content: center;
    grid-gap: 80px;
    align-items: center;
    padding: 32px 0px;
    .manager-icon{
      width: 255px;
      height: 255px;
      font-size: 100px;
    }
  }
  .userMiddleName{
      font-weight: 400;
      font-size: 48px;
      line-height: 60px;
      text-transform: capitalize;
      color: #2A5578;
  }
  .userInfoEdit{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 32px 36px;
  }
  .userInfoAll{
      display: grid;
      grid-template-columns: auto auto;
      padding: 0px 36px;
      font-weight: 400;
      font-size: 24px;
      line-height: 30px;
      color: #263238;
  }
  .userInfoAllTitle{
      display: grid;   
      grid-gap: 11px;
      
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
        <div className='infoAll'>
          <div className="userInfo">
            <ManagerIcon letter="AA" color="#F3C262" />
            <AsnButton type="primary" onClick={() => navigate('/change-password-profile')}>Change Password</AsnButton>
          </div>
          <div>
            <div className='userInfoEdit'>
              <span className="userMiddleName">Anun Azganun</span>
              <a onClick={onEditedPublishProject
        }>Edit</a>
         <EditProfile isOpenCreateActivityModal={isOpenCreateActivityModal} setIsOpenCreateActivityModal={setIsOpenCreateActivityModal}/>
            </div>
            <div className='userInfoAll'>
                  <div className='userInfoAllTitle'>
                        <span>E-mail:</span>
                        <span>Phone:</span>
                        <span>Organization:</span>
                        <span>Position:</span>
                        <span>Assign to:</span>
                  </div>
                  <div className='userInfoAllTitle'>
                       <span>yaho@yaho.yaho</span>
                        <span>+374 77 77 77</span>
                        <span>Analyased</span>
                        <span>Developer</span>
                        <span>Project</span>
                  </div>
            </div>
          </div>
        </div>
      </Content>
  )
}

export default UserProfile
