import React from 'react'
import { Row, Typography, Space } from 'antd'
import styled from 'styled-components'
import { AsnCard } from '../../Forms/AsnCards'

const { Title } = Typography

const Container = styled.div`
`
export const SubActivity: React.FC = () => {
  return (
    <Container>
            <Space>
  <Title level={5}> Status
   {/* <StatusFilter/> */}
   </Title>
  <Title level={5}>Assigned
   {/* <AssingnesFilter/> */}
   </Title>
  <Title level={5}>Date</Title>
  <Title level={5}>Reset</Title>
  </Space>
     <Row >
  <AsnCard/>
    </Row>
      </Container>
  )
}
