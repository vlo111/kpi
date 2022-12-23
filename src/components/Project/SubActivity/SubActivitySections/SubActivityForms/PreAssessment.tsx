import React from 'react';
import { Row, Space, Typography } from 'antd';

import { AsnButton } from '../../../../Forms/Button';
import DraggerForm from './Dragger';
import FormWrapper from '../../SubActivityWrapper';
import SubActivityFooter from '../../SubActivityWrapper/Footer';

const PreAssessmentForm: React.FC = () => {
  const { Title } = Typography;
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 64]}>
      <FormWrapper className="per_assessment_form">
        <Row justify="center" style={{ marginBottom: '3.2vh' }}>
          <Title level={5}>Pre-assessment form</Title>
        </Row>
        <Row justify="center" style={{ width: '100%' }}>
          <AsnButton className="primary" type="primary">
            Publish Pre-assessment form
          </AsnButton>
        </Row>
        <Row
          justify="center"
          style={{ marginBottom: '1.6vh', marginTop: '1.6vh' }}
        >
          <Title level={5}>Or</Title>
        </Row>
        <DraggerForm text="Attach related document" padding="0 6.1vw" />
      </FormWrapper>
      <SubActivityFooter />
    </Space>
  );
};

export default PreAssessmentForm;
