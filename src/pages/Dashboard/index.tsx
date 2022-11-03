import React from 'react'
import { Row } from 'antd'
import { AsnButton } from '../../components/Forms/Button'

const Dashboard: React.FC = () => {
  return (

    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>

      <AsnButton style={{ color: 'red', width: '250px' }} ></AsnButton>
    </Row>
  )
}
export default Dashboard
