import React from 'react'
import { Row } from 'antd'
import AnsButton from '../../components/Forms/Button'

const Dashboard: React.FC = () => {
  const data = []
  return (

    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>

      <AnsButton style={{ color: 'red', width: '250px' }} ></AnsButton>
    </Row>
  )
}
export default Dashboard
