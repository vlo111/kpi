import React from 'react'
import { Col, Row } from 'antd'
import { ProjectsDetailProps } from '../../../../../types/project'

const ProjectDetails: React.FC<ProjectsDetailProps> = ({ info }) => {
  return (
        <Col>
        <Row style={ { marginBottom: '8px' } }>
          <Col offset={5}>{info.title}</Col>
        </Row>
        {info?.descriptions.map((item, i) => (
         <Row key={i} style={ { marginBottom: '8px' } }>
         <Col offset={7}>{item}</Col>
       </Row>
        ))}
      </Col>
  )
}

export default ProjectDetails
