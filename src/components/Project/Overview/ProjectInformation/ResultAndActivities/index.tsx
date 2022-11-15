import React from 'react'
import { Row, Col, Divider } from 'antd'
import styled from 'styled-components'
import { ResultAndActivitiesProps } from '../../../../../types/project'

const DividerAnt = styled(Divider)`
    border-left: 1px solid var(--dark-1);
    height: 100%;
    width: 0;
    margin: 0;
    vertical-align: baseline;
    top: 0;
`

const ResultAndActivities: React.FC<ResultAndActivitiesProps> = ({ option, description, count }) => {
  return (
        <Row gutter={[16, 0]}>
            <Col style={{ padding: '0' }} offset={1}><DividerAnt type='vertical' /></Col>
            <Col span={2} offset={4} lg={3} xl={2} xs={4}>{option}</Col>
            <Col span={12} style={{ paddingBottom: '16px' }} >{description}</Col>
            <Col span={2}>{count}</Col>
        </Row>
  )
}

export default ResultAndActivities
