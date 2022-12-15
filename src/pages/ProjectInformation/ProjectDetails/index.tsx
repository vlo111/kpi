import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';

import { IProjectDetailsProps } from '../../../types/project';

const AntCol = styled(Col)`
  font-size: var(--base-font-size);
`;

const ProjectDetails: React.FC<IProjectDetailsProps> = ({ title, details }) => {
  return (
        <>
        <Row style={ { marginBottom: '8px' } }>
          <AntCol offset={5}>{title}</AntCol>
        </Row>
        {details?.map((detail) => (
           <Row key={detail?.id} style={ { marginBottom: '8px' } }>
           <AntCol offset={7}>{detail?.title}</AntCol>
         </Row>
        ))}
      </>
  );
};

export default ProjectDetails;
