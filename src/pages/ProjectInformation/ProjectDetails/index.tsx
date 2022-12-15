import React from 'react';
import { Col, Row } from 'antd';
// import { ProjectsDetailProps } from '../../../../../types/project';

const ProjectDetails: React.FC<{ title: string, organizations: any }> = ({ title, organizations }) => {
  return (
        <>
        <Row style={ { marginBottom: '8px' } }>
          <Col offset={5} style={ { fontSize: 'var(--base-font-size)' } }>{title}</Col>
        </Row>
        {organizations?.map((organization: any, i: number) => (
           <Row key={i} style={ { marginBottom: '8px' } }>
           <Col offset={7} style={ { fontSize: 'var(--base-font-size)' } }>{organization?.title}</Col>
         </Row>
        ))}
      </>
  );
};

export default ProjectDetails;
