import React from 'react';
import { Row, Space, Typography } from 'antd';

import DraggerForm from './Dragger';
import FormWrapper from '../../SubActivityWrapper';
import SubActivityFooter from '../../SubActivityWrapper/Footer';

const SelectionForm: React.FC = () => {
  const { Title } = Typography;
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 64]}>
      <FormWrapper className="selection_form">
        <Row justify="center" style={{ marginBottom: '6.4vh' }}>
          <Title level={5}>Enrollment test interview</Title>
        </Row>
        <DraggerForm text="Attach related document" />
      </FormWrapper>
      <SubActivityFooter />
    </Space>
  );
};

export default SelectionForm;
