// import MainLayout from '../../Layout/MainLayout'
import styled from 'styled-components'
import { Layout } from 'antd'
import { AsnButton } from '../../Forms/Button'
import ManagerIcon from '../../ManagerIcon'
import React, { useState } from 'react'
import EditProfile from '../EditUserProfile'
import { AddManagerHandle } from '../../../types/project'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Edit } from '../../../assets/icons/edit.svg'

const Content = styled(Layout)`
  background: var(--white);
  border-top: 3px solid var(--dark-border-ultramarine);
  box-shadow: var(--base-box-shadow);
  border-radius: 20px;
  height: calc(100% - 150px);
  .infoAll {
    display: grid;
    grid-gap: 49px;
    grid-template-columns: 27% auto;
    margin: 20px 0px;
  }
  
  .userInfo {
    display: grid;
    justify-content: center;
    grid-gap: 80px;
    align-items: center;
    padding: 32px 0px;
    .manager-icon{
      font-size: 100px;
      height: clamp(14rem, 17vw, 24rem);
      width: clamp(14rem, 17vw, 24rem);
    }
  }
  .userMiddleName{
      font-size: var(--large-hedline-font-size);
      color: var(--dark-border-ultramarine);
  }
  .userInfoEdit{

      padding: 32px 36px;
  }
  .userInfoAll{
      display: grid;
      grid-template-columns: auto auto;
      padding: 0px 36px;
      font-size: 24px;
      color: var(--dark-2);
  }
  .userInfoAllTitle{
      display: grid;   
      grid-gap: 11px;
      
  }
  .editSvg{
    height: 24px;
    width: 24px;
  }
  a{
    width: 100%;
    display: flex;
    justify-content: end;
    padding: 0 36px;
    padding: 0 36px -10px 36px;
    position: relative;
    top: 36px;
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
        <a onClick={onEditedPublishProject
        }><Edit className='editSvg'/></a>
        <div className='infoAll'>
          <div className="userInfo">
            <ManagerIcon letter="AA" color="#F3C262" />
            <AsnButton type="primary" onClick={() => navigate('/change-password-profile')}>Change Password</AsnButton>
          </div>
          <div>
            <div className='userInfoEdit'>
              <span className="userMiddleName">Anun Azganun</span>
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
