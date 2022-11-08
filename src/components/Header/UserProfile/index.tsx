import React from 'react'
import MainLayout from '../../Layout/MainLayout'
import styled from 'styled-components'
import { Layout } from 'antd'
import { AsnButton } from '../../Forms/Button'
import ManagerIcon from '../../ManagerIcon'

const Content = styled(Layout)`
  background: #ffffff;
  border-top: 3px solid #2a5578;
  box-shadow: -4px -4px 4px rgba(42, 85, 120, 0.05),
    4px 4px 4px rgba(42, 85, 120, 0.05);
  border-radius: 20px;
  height: calc(100% - 150px);
  form {
    display: grid;
    grid-gap: 49px;
    grid-template-columns: 30% 66%;
  }
  .cmGgXD {
    width: 255px;
    height: 255px;
    font-size: 100px;
  }
  .userInfo {
    display: grid;
    justify-content: center;
    grid-gap: 80px;
    align-items: center;
    padding: 32px 0px;
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
  return (
    <MainLayout>
      <Content>
        <form>
          <div className="userInfo">
            <ManagerIcon letter="HD" color="#F3C262" />
            <AsnButton type="primary">Change Password</AsnButton>
          </div>
          <div>
            <div className='userInfoEdit'>
              <span className="userMiddleName">Anun Azganun</span>
              <a>Edit</a>
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
        </form>
      </Content>
    </MainLayout>
  )
}

export default UserProfile
