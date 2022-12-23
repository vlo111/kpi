import React from 'react';
import { Row, Space, Typography } from 'antd';

import FormWrapper from '../../../../Forms/SubActivityWrapper';
import DraggerForm from './Dragger';
import SubActivityFooter from '../../../../Forms/SubActivityWrapper/Footer';

const ParticipantForm: React.FC = () => {
  const { Title } = Typography;
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 64]}>
      <FormWrapper className="participant_form">
        <Row justify="center" style={{ marginBottom: '6.4vh' }}>
          <Title level={5}>Attendance form</Title>
        </Row>
        <DraggerForm text="Attach related document" />
      </FormWrapper>
      <SubActivityFooter />
    </Space>
  );
};

export default ParticipantForm;
