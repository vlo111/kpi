import React from 'react'
import { Row, Col, Divider } from 'antd'
import styled from 'styled-components'

const DividerAnt = styled(Divider)`
    border-left: 1px solid var(--dark-1);
    border-top: 1px solid var(--dark-1);
    height: 100%;
    width: 24px;
    margin: 0;
    padding: 0;
`

const ActivityName: React.FC<{ activityName: string }> = ({ activityName }) => {
  return (
        <Row>
            <Col offset={1}>
                <DividerAnt type='vertical' />
            </Col>
            <Col style={{ paddingBottom: '16px' }} offset={4}>{activityName}</Col>
        </Row>
  )
}

export default ActivityName
