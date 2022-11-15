import React from 'react'
import { Row, Col } from 'antd'
import { GeneralInfoProps } from '../../../../../types/project'
import { ReactComponent as DateSvg } from '../../../../../assets/icons/date.svg'

const GeneralInfo: React.FC<GeneralInfoProps> = ({ title, description }) => {
  return (
        <Row>
          <Col xl={2} lg={3} xs={4} offset={5} style={{ fontSize: '16px' }}>{title}</Col>
          {title.includes('Date') && <Col><DateSvg style={{ marginRight: '10px' }} /></Col>}
          <Col span={12} style={{ fontSize: '16px' }}>
          {description}
          </Col>
        </Row>
  )
}

export default GeneralInfo
